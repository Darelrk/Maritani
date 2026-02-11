"use client";

import { useCartStore } from "@/hooks/use-cart-store";
import { Button } from "@/components/ui/button";
import { formatRupiah } from "@/lib/utils";
import { Loader2, ShoppingBag, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { createOrder } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function CheckoutPage() {
    const { items, subtotal, clearCart } = useCartStore();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { data: session } = useSession();

    const total = subtotal();

    async function handlePayment() {
        if (!session?.user) {
            router.push("/auth/login?callbackUrl=/checkout");
            return;
        }

        setIsLoading(true);
        try {
            // Transform cart items to simplified format for server action
            const orderItems = items.map(item => ({
                productId: item.id,
                quantity: item.quantity,
                price: item.price // Note: In a real app, verify price on server!
            }));

            const result = await createOrder(orderItems, total);

            if (result.success) {
                clearCart();
                router.push(`/order/${result.orderId}`); // Redirect to order confirmation/detail
            } else {
                alert(result.error || "Gagal memproses pesanan");
            }
        } catch (error) {
            console.error("Payment error:", error);
            alert("Terjadi kesalahan sistem");
        } finally {
            setIsLoading(false);
        }
    }

    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 px-4 text-center">
                <div className="rounded-full bg-muted/50 p-6">
                    <ShoppingBag className="h-12 w-12 text-muted-foreground" />
                </div>
                <h2 className="text-2xl font-bold tracking-tight">Keranjang Kosong</h2>
                <Button asChild className="mt-4">
                    <Link href="/katalog">Kembali Belanja</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
            <Link href="/cart" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Kembali ke Keranjang
            </Link>

            <h1 className="text-3xl font-bold tracking-tight mb-8">Checkout / Pembayaran</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Order Summary */}
                <div className="space-y-6">
                    <h3 className="text-lg font-semibold border-b pb-2">Item Pesanan</h3>
                    <div className="space-y-4">
                        {items.map((item) => (
                            <div key={item.id} className="flex gap-4">
                                <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border bg-muted">
                                    {item.image && (
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-cover"
                                        />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-medium line-clamp-1">{item.name}</h4>
                                    <p className="text-sm text-muted-foreground">
                                        {item.quantity} x {formatRupiah(item.price)}
                                    </p>
                                </div>
                                <p className="font-medium">
                                    {formatRupiah(item.price * item.quantity)}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="pt-4 border-t space-y-2">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>{formatRupiah(total)}</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg text-primary">
                            <span>Total Tagihan</span>
                            <span>{formatRupiah(total)}</span>
                        </div>
                    </div>
                </div>

                {/* Shipping & Payment (Mock) */}
                <div className="bg-card border rounded-xl p-6 shadow-sm h-fit">
                    <h3 className="text-lg font-semibold mb-4">Informasi Pengiriman</h3>

                    {session?.user ? (
                        <div className="space-y-4 mb-6">
                            <div className="p-3 bg-muted/50 rounded-lg text-sm">
                                <p className="font-medium">{session.user.name}</p>
                                <p>{session.user.email}</p>
                                {/* Static address for now */}
                                <p className="mt-2 text-muted-foreground">
                                    Jl. Nelayan No. 123, Pesisir<br />
                                    Jakarta Utara, DKI Jakarta
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="mb-6 p-4 bg-yellow-50 text-yellow-800 rounded-lg text-sm">
                            Anda harus login terlebih dahulu untuk melanjutkan pembayaran.
                        </div>
                    )}

                    <Button
                        className="w-full h-12 text-lg"
                        onClick={handlePayment}
                        disabled={isLoading || !session?.user}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Memproses...
                            </>
                        ) : (
                            "Bayar Sekarang"
                        )}
                    </Button>
                    <p className="text-xs text-center text-muted-foreground mt-4">
                        (Simulasi) Order akan langsung tercatat 'Paid' di database.
                    </p>
                </div>
            </div>
        </div>
    );
}
