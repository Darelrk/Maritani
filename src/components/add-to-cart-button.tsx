
"use client";

import { useCartStore } from "@/hooks/use-cart-store";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner"; // We need to install sonner or use standard alert
import { Product } from "@/lib/types";
import { cn } from "@/lib/utils";

interface AddToCartButtonProps {
    product: Product;
    className?: string;
    iconOnly?: boolean;
}

export function AddToCartButton({ product, className, iconOnly = false }: AddToCartButtonProps) {
    const addItem = useCartStore((state) => state.addItem);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent Link navigation if inside a Link
        e.stopPropagation();

        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image, // Product type has image string/array? We'll assert
            maxStock: product.stock,
            sellerId: product.seller.id,
        });

        // alert("Berhasil ditambahkan ke keranjang!"); 
        // Idealnya pakai Toast. Untuk sekarang alert atau console log.
        console.log("Added to cart:", product.name);
    };

    if (iconOnly) {
        return (
            <button
                onClick={handleAddToCart}
                className={cn(
                    "btn-press flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-primary shadow-md backdrop-blur-sm transition-all duration-200 hover:bg-primary hover:text-white cursor-pointer",
                    className
                )}
                aria-label="Tambah ke keranjang"
            >
                <ShoppingCart className="h-4 w-4" />
            </button>
        );
    }

    return (
        <Button onClick={handleAddToCart} className={className} size="lg">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Beli Sekarang
        </Button>
    );
}
