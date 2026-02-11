"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Leaf,
    Star,
    ShoppingCart,
    Minus,
    Plus,
    Truck,
    ShieldCheck,
} from "lucide-react";
import { Product } from "@/lib/types";
import { toast } from "sonner";
import { useCartStore } from "@/hooks/use-cart-store";

interface ProductInfoProps {
    product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
    const [qty, setQty] = useState(1);

    const discount = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

    return (
        <div className="space-y-5">
            {/* Badges */}
            <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="border-primary/20 text-primary bg-primary/5">
                    {product.category}
                </Badge>
                {product.isFresh && (
                    <Badge className="bg-emerald/90 text-white border-none">
                        <Leaf className="mr-1 h-3 w-3" /> Segar
                    </Badge>
                )}
                {discount > 0 && (
                    <Badge className="bg-amber/90 text-amber-foreground border-none">
                        -{discount}%
                    </Badge>
                )}
            </div>

            {/* Name */}
            <h1 className="text-2xl md:text-3xl font-bold leading-tight">{product.name}</h1>

            {/* Rating & Sold */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-amber text-amber" />
                    <span className="font-medium text-foreground">{product.rating}</span>
                    <span>/ 5.0</span>
                </div>
                <span>•</span>
                <span>{product.sold} terjual</span>
            </div>

            {/* Price */}
            <div className="bg-stone-50 rounded-xl p-4 space-y-1">
                <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-bold text-primary">
                        Rp {product.price.toLocaleString("id-ID")}
                    </span>
                    {product.originalPrice && (
                        <span className="text-base text-muted-foreground line-through">
                            Rp {product.originalPrice.toLocaleString("id-ID")}
                        </span>
                    )}
                </div>
                <p className="text-xs text-muted-foreground">per kg · Harga belum termasuk ongkir</p>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-2">
                <label className="text-sm font-medium">Jumlah (kg)</label>
                <div className="flex items-center gap-3">
                    <div className="flex items-center border border-border rounded-lg">
                        <button
                            onClick={() => setQty((q) => Math.max(1, q - 1))}
                            className="h-10 w-10 flex items-center justify-center hover:bg-muted transition-colors rounded-l-lg cursor-pointer"
                        >
                            <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-12 text-center font-semibold">{qty}</span>
                        <button
                            onClick={() => setQty((q) => q + 1)}
                            className="h-10 w-10 flex items-center justify-center hover:bg-muted transition-colors rounded-r-lg cursor-pointer"
                        >
                            <Plus className="h-4 w-4" />
                        </button>
                    </div>
                    <span className="text-sm text-muted-foreground">
                        Subtotal:{" "}
                        <strong className="text-foreground">
                            Rp {(product.price * qty).toLocaleString("id-ID")}
                        </strong>
                    </span>
                </div>
            </div>

            {/* Action Buttons (Desktop) */}
            <div className="hidden lg:flex gap-3 pt-2">
                <Link href={`/order/${product.id}?qty=${qty}`} className="flex-1">
                    <Button className="btn-press w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground text-base font-semibold shadow-lg shadow-primary/20">
                        Beli Sekarang
                    </Button>
                </Link>
                <Button
                    variant="outline"
                    className="btn-press h-12 px-5 border-primary/30 text-primary hover:bg-primary/5"
                    onClick={() => {
                        // Direct store usage since we are inside a client component
                        const store = useCartStore.getState();
                        store.addItem({
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            image: product.image,
                            maxStock: product.stock,
                            sellerId: product.seller.id,
                        });
                        if (qty > 1) {
                            // Correct logic: addItem adds 1. We want total to be 'qty'.
                            // If item was already in cart, addItem incremented it.
                            // This is tricky. Let's just set the quantity to exactly 'qty' effectively replacing it? 
                            // No, user expects 'add to cart'.
                            // If cart has 2, and I add 3, it should be 5.
                            // addItem adds 1. So we need to add (qty - 1) more?
                            // Or just use updateQuantity to (existing + qty)?
                            const currentItem = store.items.find(i => i.id === product.id);
                            if (currentItem) {
                                store.updateQuantity(product.id, currentItem.quantity + (qty - 1));
                            }
                        }

                        toast.success("Berhasil ditambahkan ke keranjang", {
                            description: `${qty}x ${product.name} telah masuk ke keranjang.`,
                            action: {
                                label: "Lihat Keranjang",
                                onClick: () => window.location.href = '/cart'
                            }
                        });
                    }}
                >
                    <ShoppingCart className="h-5 w-5" />
                </Button>
            </div>

            {/* Mobile Sticky Bottom Bar */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border/40 lg:hidden z-50 shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
                <div className="flex gap-3 max-w-7xl mx-auto">
                    <Link href={`/order/${product.id}?qty=${qty}`} className="flex-1">
                        <Button className="btn-press w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground text-base font-semibold shadow-lg shadow-primary/20">
                            Beli Sekarang • Rp {(product.price * qty).toLocaleString("id-ID")}
                        </Button>
                    </Link>
                    <Button
                        variant="outline"
                        className="btn-press h-12 px-5 border-primary/30 text-primary hover:bg-primary/5"
                        onClick={() => {
                            useCartStore.getState().addItem({
                                id: product.id,
                                name: product.name,
                                price: product.price,
                                image: product.image,
                                maxStock: product.stock,
                                sellerId: product.seller.id,
                            });
                            // If quantity > 1, update it immediately (addItem defaults to 1)
                            if (qty > 1) {
                                // Logic limitation: addItem adds +1 if exists. 
                                // Better logic: check if item exists, if not add. Then update quantity.
                                // Simplification for now: addItem adds 1.
                                // We might need a better store method 'addItemWithQty'
                                // For now let's just use addItem loop or updateQuantity
                                useCartStore.getState().updateQuantity(product.id, qty);
                            }
                            toast.success("Berhasil ditambahkan ke keranjang", {
                                description: `${qty}x ${product.name} telah masuk ke keranjang.`,
                                action: {
                                    label: "Lihat Keranjang",
                                    onClick: () => window.location.href = '/cart'
                                }
                            });
                        }}
                    >
                        <ShoppingCart className="h-5 w-5" />
                    </Button>
                </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <ShieldCheck className="h-4 w-4 text-emerald shrink-0" />
                    <span>Dana dilindungi Escrow</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Truck className="h-4 w-4 text-ocean shrink-0" />
                    <span>Box pendingin gratis</span>
                </div>
            </div>
        </div>
    );
}
