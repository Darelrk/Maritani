
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    console.log("Start seeding...");

    const hashedPassword = await bcrypt.hash("test123", 10);

    // 1. Create Seller User
    const seller = await prisma.user.upsert({
        where: { email: "demo.seller@maritani.id" },
        update: {
            password: hashedPassword,
            name: "Demo Seller",
        },
        create: {
            email: "demo.seller@maritani.id",
            name: "Demo Seller",
            password: hashedPassword,
            role: "SELLER",
            accountType: "BUSINESS",
            sellerProfile: {
                create: {
                    storeName: "Toko Demo Seller",
                    description: "Toko sayuran segar berkualitas",
                    city: "Jakarta",
                    address: "Jl. Demo No. 1",
                    status: "ACTIVE",
                },
            },
        },
    });

    console.log({ seller });

    // 1b. Create Personal/Buyer User
    const personal = await prisma.user.upsert({
        where: { email: "demo.personal@maritani.id" },
        update: {
            password: hashedPassword,
            name: "Demo Personal",
        },
        create: {
            email: "demo.personal@maritani.id",
            name: "Demo Personal",
            password: hashedPassword,
            role: "USER",
            accountType: "PERSONAL",
        }
    });

    console.log({ personal });

    // 2. Create Products (linked to Seller) - FROM DUMMY DATA
    // Retrieve the seller profile ID first
    const sellerProfile = await prisma.sellerProfile.findUnique({
        where: { userId: seller.id },
    });

    if (!sellerProfile) throw new Error("Seller profile failed to create");

    const { ALL_PRODUCTS } = require("../src/lib/dummy-data");

    console.log(`Seeding ${ALL_PRODUCTS.length} products from dummy data...`);

    for (const p of ALL_PRODUCTS) {
        // We need to match the fields from dummy data to prisma schema
        // Dummy data has: id, name, price, originalPrice, image, description(missing), category, isFresh, harvestTime, seller, rating, sold

        await prisma.product.upsert({
            where: { id: p.id }, // Force ID from dummy data
            update: {
                name: p.name,
                price: p.price,
                originalPrice: p.originalPrice,
                stock: p.stock,
                category: p.category,
                images: JSON.stringify([p.image]), // Convert single URL to JSON array
                unit: "kg", // Default
                isFresh: p.isFresh || true,
                harvestTime: p.harvestTime,
                rating: p.rating,
                sold: p.sold,
                sellerId: sellerProfile.id,
            },
            create: {
                id: p.id, // FORCE ID
                name: p.name,
                price: p.price,
                originalPrice: p.originalPrice,
                stock: p.stock,
                category: p.category,
                images: JSON.stringify([p.image]),
                unit: "kg",
                isFresh: p.isFresh || true,
                harvestTime: p.harvestTime,
                rating: p.rating,
                sold: p.sold,
                sellerId: sellerProfile.id,
            }
        });
        console.log(`Upserted product: ${p.name} (${p.id})`);
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
