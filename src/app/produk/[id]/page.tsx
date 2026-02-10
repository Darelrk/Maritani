"use client";

import { use } from "react";
import { notFound } from "next/navigation";

import { ProductGallery } from "@/components/product-detail/product-gallery";
import { ProductInfo } from "@/components/product-detail/product-info";
import { SellerCard } from "@/components/product-detail/seller-card";
import { ALL_PRODUCTS } from "@/lib/dummy-data";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import { ProductTabs } from "@/components/product-detail/product-tabs";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const product = ALL_PRODUCTS.find((p) => p.id === id);

    if (!product) return notFound();

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <main className="flex-1">
                {/* Breadcrumb */}
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
                    <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
                            <Home className="h-3.5 w-3.5" /> Beranda
                        </Link>
                        <ChevronRight className="h-3.5 w-3.5" />
                        <Link href="/katalog" className="hover:text-primary transition-colors">
                            Katalog
                        </Link>
                        <ChevronRight className="h-3.5 w-3.5" />
                        <span className="text-foreground font-medium truncate max-w-[200px]">
                            {product.name}
                        </span>
                    </nav>
                </div>

                {/* Product Detail Grid */}
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                        {/* Left — Gallery */}
                        <ProductGallery productName={product.name} image={product.image} />

                        {/* Right — Info + Seller */}
                        <div className="space-y-6">
                            <ProductInfo product={product} />
                            <SellerCard seller={product.seller} />
                        </div>
                    </div>

                    {/* Product Tabs */}
                    <ProductTabs product={product} />
                </div>
            </main>
        </div>
    );
}
