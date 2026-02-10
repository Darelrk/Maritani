
"use client";

import { useCartStore } from "@/hooks/use-cart-store";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatRupiah } from "@/lib/utils"; // Assuming helper exists, or inline it

export default function CartPage() {
    const { items, removeItem, updateQuantity, subtotal, clearCart } = useCartStore();
    const total = subtotal();

    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 px-4 text-center">
                <div className="rounded-full bg-muted/50 p-6">
                    <ShoppingBag className="h-12 w-12 text-muted-foreground" />
                </div>
                <h2 className="text-2xl font-bold tracking-tight">Keranjang Belanja Kosong</h2>
                <p className="text-muted-foreground max-w-sm">
                    Belum ada produk yang ditambahkan. Yuk, cari produk segar dari petani dan nelayan lokal!
                </p>
                <Button asChild className="mt-4">
                    <Link href="/katalog">Mulai Belanja</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight mb-8">Keranjang Belanja</h1>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Cart Items List */}
                <div className="lg:col-span-8 space-y-4">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="flex gap-4 p-4 border rounded-xl bg-card shadow-sm hover:shadow-md transition-shadow"
                        >
                            {/* Product Image */}
                            <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg border bg-muted">
                                {item.image ? (
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center bg-secondary">
                                        <ShoppingBag className="h-8 w-8 text-muted-foreground" />
                                    </div>
                                )}
                            </div>

                            {/* Details */}
                            <div className="flex flex-1 flex-col justify-between">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-semibold text-lg line-clamp-1">{item.name}</h3>
                                        <p className="text-sm text-muted-foreground">Unit: {item.quantity} kg</p>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-muted-foreground hover:text-destructive h-8 w-8"
                                        onClick={() => removeItem(item.id)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>

                                <div className="flex justify-between items-end mt-2">
                                    <div className="flex items-center gap-2 border rounded-md p-1 bg-background">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-6 w-6"
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            disabled={item.quantity <= 1}
                                        >
                                            <Minus className="h-3 w-3" />
                                        </Button>
                                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-6 w-6"
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            disabled={item.quantity >= item.maxStock}
                                        >
                                            <Plus className="h-3 w-3" />
                                        </Button>
                                    </div>
                                    <p className="font-bold text-lg">
                                        {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(item.price * item.quantity)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}

                    <Button
                        variant="outline"
                        className="text-destructive hover:text-destructive w-full sm:w-auto"
                        onClick={clearCart}
                    >
                        Kosongkan Keranjang
                    </Button>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-4">
                    <div className="bg-card border rounded-xl p-6 shadow-sm sticky top-24">
                        <h2 className="text-lg font-semibold mb-4">Ringkasan Pesanan</h2>
                        <div className="space-y-4">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Subtotal ({items.reduce((acc, i) => acc + i.quantity, 0)} item)</span>
                                <span className="font-medium">
                                    {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(total)}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Biaya Layanan</span>
                                <span className="font-medium text-emerald-600">Gratis</span>
                            </div>
                            <div className="border-t pt-4 flex justify-between items-center">
                                <span className="font-bold text-lg">Total</span>
                                <span className="font-bold text-xl text-primary">
                                    {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(total)}
                                </span>
                            </div>
                        </div>

                        <Button className="w-full mt-6 h-12 text-lg font-semibold shadow-lg shadow-primary/20" asChild>
                            <Link href="/checkout">
                                Lanjut ke Pembayaran
                            </Link>
                        </Button>
                        <p className="text-xs text-center text-muted-foreground mt-4">
                            Transaksi aman dan terenkripsi.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
