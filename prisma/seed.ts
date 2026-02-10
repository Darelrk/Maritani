
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    console.log("Start seeding...");

    const hashedPassword = await bcrypt.hash("seller123", 10);
    const hashedBuyerPassword = await bcrypt.hash("buyer123", 10);

    // 1. Create Seller User
    const seller = await prisma.user.upsert({
        where: { email: "seller@maritani.com" },
        update: {
            password: hashedPassword,
        },
        create: {
            email: "seller@maritani.com",
            name: "Pak Budi Santoso",
            password: hashedPassword,
            role: "SELLER",
            sellerProfile: {
                create: {
                    storeName: "Nelayan Cilacap Jaya",
                    description: "Menyediakan hasil laut segar tangkapan harian langsung dari TPI Cilacap.",
                    city: "Cilacap",
                    address: "Jl. Pelabuhan No. 45",
                    status: "ACTION",
                },
            },
        },
    });

    console.log({ seller });

    // 1b. Create Buyer User
    const buyer = await prisma.user.upsert({
        where: { email: "buyer@maritani.com" },
        update: {
            password: hashedBuyerPassword
        },
        create: {
            email: "buyer@maritani.com",
            name: "Siti Pembeli",
            password: hashedBuyerPassword,
            role: "USER"
        }
    });
    console.log({ buyer });

    // 2. Create Products (linked to Seller)
    // Retrieve the seller profile ID first
    const sellerProfile = await prisma.sellerProfile.findUnique({
        where: { userId: seller.id },
    });

    if (!sellerProfile) throw new Error("Seller profile failed to create");

    // Check if products exist to avoid duplicates if seed runs multiple times
    const existingProducts = await prisma.product.count();
    if (existingProducts > 0) {
        console.log("Products already seeded, skipping creation.");
    } else {
        const products = [
            {
                name: "Ikan Tuna Sirip Kuning Segar (Yellowfin Tuna)",
                description: "Ikan tuna segar tangkapan harian, cocok untuk sashimi atau steak. Berat per ekor rata-rata 3-5kg. Dikirim dalam box styrofoam dengan es.",
                price: 85000,
                stock: 50,
                category: "Hasil Laut",
                images: JSON.stringify(["https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070&auto=format&fit=crop"]),
                unit: "kg",
                isFresh: true,
                harvestTime: "Tangkap dini hari tadi",
            },
            {
                name: "Udang Vaname Segar (Size 40-50)",
                description: "Udang vaname segar dari tambak intensif. Tekstur manis dan renyah. Cocok untuk goreng tepung atau asam manis.",
                price: 65000,
                stock: 100,
                category: "Hasil Laut",
                images: JSON.stringify(["https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?q=80&w=2070&auto=format&fit=crop"]),
                unit: "kg",
                isFresh: true,
                harvestTime: "Panen pagi ini",
            },
            {
                name: "Bayam Organik Ikat Besar",
                description: "Bayam hijau organik bebas pestisida. Daun lebar dan segar. Dipanen saat ada pesanan.",
                price: 5000,
                stock: 200,
                category: "Sayur & Buah",
                images: JSON.stringify(["https://images.unsplash.com/photo-1576045057995-568f588f82fb?q=80&w=2070&auto=format&fit=crop"]),
                unit: "ikat",
                isFresh: true,
                harvestTime: "Petik langsung",
            },
        ];

        for (const p of products) {
            const product = await prisma.product.create({
                data: {
                    ...p,
                    sellerId: sellerProfile.id,
                }
            })
            console.log(`Created product with id: ${product.id}`)
        }
    }

    console.log("Seeding finished.");
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
