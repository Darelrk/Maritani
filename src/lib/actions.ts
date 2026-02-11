
"use server";

import { signIn, signOut } from "@/auth";
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
    } catch (error) {
        console.error("Registration error:", error);
        return { error: "Terjadi kesalahan saat mendaftar" };
    }
}

export async function authenticate(
    callbackUrl: string | undefined,
    formData: FormData
): Promise<void> {
    try {
        await signIn("credentials", {
            email: formData.get("email"),
            password: formData.get("password"),
            redirectTo: callbackUrl || "/",
        });
    } catch (error) {
        if (error instanceof AuthError) {
            // Handle auth error without returning value
            console.error("Authentication error:", error.type);
            throw error;
        }
        throw error;
    }
}

export async function handleLogout() {
    await signOut({ redirectTo: "/" });
}
