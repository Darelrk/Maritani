"use server";

import { auth, signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function registerUser(formData: FormData): Promise<{ error?: string; success?: boolean }> {
    try {
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const phone = formData.get("phone") as string;
        const password = formData.get("password") as string;
        const accountType = formData.get("accountType") as string || "PERSONAL";
        const role = formData.get("role") as string || "USER";

        console.log("Received data:", { name, email, phone, accountType, role });

        // Validation
        if (!name || !email || !password) {
            return { error: "Semua field wajib diisi" };
        }

        if (password.length < 6) {
            return { error: "Password minimal 6 karakter" };
        }

        // Check if email exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return { error: "Email sudah terdaftar" };
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user data object
        const userData: any = {
            name,
            email,
            phone,
            password: hashedPassword,
            accountType: accountType === "BUSINESS" ? "BUSINESS" : "PERSONAL",
            role: role === "SELLER" ? "SELLER" : "USER",
        };

        // If seller, add seller profile
        if (role === "SELLER") {
            userData.sellerProfile = {
                create: {
                    storeName: name,
                    description: "",
                    address: "",
                    city: "",
                    status: "PENDING"
                }
            };
        }

        // Create user with account type
        const user = await prisma.user.create({
            data: userData
        });

        return { success: true };
    } catch (error: any) {
        console.error("Registration error:", error);
        console.error("Error message:", error.message);
        console.error("Error code:", error.code);
        return { error: `Terjadi kesalahan: ${error.message || "Unknown error"}` };
    }
}

export async function authenticate(
    callbackUrl: string | undefined,
    formData: FormData
): Promise<void> {
    try {
        console.log("[Action] Authenticate called with:", { email: formData.get("email") });
        await signIn("credentials", {
            email: formData.get("email"),
            password: formData.get("password"),
            redirectTo: callbackUrl || "/",
        });
    } catch (error) {
        console.error("[Action] Authentication error:", error);
        if (error instanceof AuthError) {
            // Handle auth error without returning value
            console.error("[Action] AuthError type:", error.type);
            throw error;
        }
        throw error;
    }
}

export async function handleLogout() {
    await signOut({ redirectTo: "/" });
}

export async function createOrder(
    items: { productId: string; quantity: number; price: number }[],
    totalAmount: number
) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return { error: "Anda harus login untuk memproses pesanan" };
        }

        // RESTRICTION: Sellers cannot buy items
        // We need to fetch the user role from DB to be safe (or trust session if updated correctly)
        // Trusting session for now as it's faster, but best practice is DB check.
        if (session.user.role === "SELLER") {
            return { error: "Akun Penjual dilarang melakukan pembelian. Silakan gunakan akun Personal." };
        }

        // Simple server-side validation can be added here (check stock, re-calculate price)

        // Use transaction to ensure data integrity
        const order = await prisma.$transaction(async (tx) => {
            // 1. Create Order
            const newOrder = await tx.order.create({
                data: {
                    userId: session.user.id,
                    totalAmount,
                    status: "PAID", // Simulating instant payment
                    recipientName: session.user.name || "Penerima",
                    phone: "08123456789", // Mock data
                    address: "Jl. Contoh Pengiriman No. 1", // Mock data
                    city: "Jakarta", // Mock data
                    postalCode: "12345", // Mock data
                    items: {
                        create: items.map((item) => ({
                            productId: item.productId,
                            qty: item.quantity,
                            price: item.price,
                        })),
                    },
                },
            });

            // 2. Update Product Stock & Sold count
            for (const item of items) {
                await tx.product.update({
                    where: { id: item.productId },
                    data: {
                        stock: { decrement: item.quantity },
                        sold: { increment: item.quantity },
                    },
                });
            }

            return newOrder;
        });

        return { success: true, orderId: order.id };
    } catch (error) {
        console.error("Create Order Error:", error);
        return { error: "Gagal membuat pesanan. Silakan coba lagi." };
    }
}

// NEW: Create Product Action
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProduct(prevState: any, formData: FormData): Promise<{ error?: string; success?: string }> {
    const session = await auth();
    if (!session?.user || session.user.role !== "SELLER") {
        return { error: "Unauthorized. Hanya Penjual yang dapat menambah produk." };
    }

    const name = formData.get("name") as string;
    const category = formData.get("category") as string;
    const unit = formData.get("unit") as string;
    const price = Number(formData.get("price"));
    const stock = Number(formData.get("stock"));
    const description = formData.get("description") as string;
    const images = formData.get("images") as string;

    if (!name || !price || !stock || !category) {
        return { error: "Mohon lengkapi semua field wajib." };
    }

    try {
        // 1. Get Seller Profile ID
        const sellerProfile = await prisma.sellerProfile.findUnique({
            where: { userId: session.user.id }
        });

        if (!sellerProfile) {
            return { error: "Profil Toko tidak ditemukan. Silakan lengkapi profil toko Anda terlebih dahulu." };
        }

        // 2. Create Product
        await prisma.product.create({
            data: {
                sellerId: sellerProfile.id,
                name,
                category,
                unit,
                price,
                stock,
                description,
                images, // string URL
                slug: name.toLowerCase().replace(/ /g, "-") + "-" + Date.now().toString().slice(-4),
                isFresh: true, // Default
            }
        });

        revalidatePath("/dashboard/products");
        revalidatePath("/katalog");

    } catch (error) {
        console.error("Failed to create product:", error);
        return { error: "Gagal menyimpan produk. Coba lagi nanti." };
    }

    redirect("/dashboard/products");
}

export async function deleteProduct(formData: FormData) {
    const session = await auth();
    if (!session?.user || session.user.role !== "SELLER") {
        return;
    }

    const productId = formData.get("productId") as string;
    if (!productId) return;

    try {
        // Verify ownership
        const product = await prisma.product.findUnique({
            where: { id: productId },
            include: { seller: true }
        });

        if (!product || product.seller.userId !== session.user.id) {
            console.error("Unauthorized delete attempt or product not found");
            return;
        }

        // Delete (Physical delete or soft delete depending on requirement. Physical for now as per MVP)
        // Note: If product has orders, physical delete might fail due to strict foreign keys if not cascaded.
        // Prisma usually requires Cascade delete on relation or we handle it. 
        // For MVP, if it fails, we catch it.
        await prisma.product.delete({
            where: { id: productId }
        });

        revalidatePath("/dashboard/products");
        revalidatePath("/katalog");
    } catch (error) {
        console.error("Failed to delete product:", error);
    }
}

