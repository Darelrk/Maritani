"use client";

import { use, useState } from "react";
import { useSearchParams } from "next/navigation";
import { notFound } from "next/navigation";

import { OrderSummary } from "@/components/order/order-summary";
import { ShippingForm, ShippingData } from "@/components/order/shipping-form";
import { PaymentSelector } from "@/components/order/payment-selector";
import { Button } from "@/components/ui/button";
import { ALL_PRODUCTS } from "@/lib/dummy-data";
import { ChevronRight, Home, ShieldCheck, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function OrderPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const searchParams = useSearchParams();
    const qty = Number(searchParams.get("qty")) || 1;

    const product = ALL_PRODUCTS.find((p) => p.id === id);
    if (!product) return notFound();

    const [shipping, setShipping] = useState<ShippingData>({
        name: "",
        phone: "",
        address: "",
        city: "",
        postalCode: "",
        note: "",
    });

    const [paymentMethod, setPaymentMethod] = useState("bank_transfer");
    const [orderPlaced, setOrderPlaced] = useState(false);

    const handlePlaceOrder = () => {
        setOrderPlaced(true);
    };

    if (orderPlaced) {
        return (
            <div className="min-h-screen flex flex-col bg-background">
                <main className="flex-1 flex items-center justify-center py-20">
                    <div className="text-center max-w-md mx-auto px-4 space-y-4">
                        <div className="mx-auto h-20 w-20 rounded-full bg-emerald/10 flex items-center justify-center">
                            <CheckCircle2 className="h-10 w-10 text-emerald" />
                        </div>
                        <h1 className="text-2xl font-bold">Pesanan Berhasil! 🎉</h1>
                        <p className="text-muted-foreground">
                            Terima kasih! Pesanan Anda untuk{" "}
                            <strong className="text-foreground">{product.name}</strong> sedang
                            diproses. Anda akan menerima notifikasi status pengiriman.
                        </p>
                        <p className="text-xs text-muted-foreground">
                            No. Pesanan: <strong>MTN-{Date.now().toString(36).toUpperCase()}</strong>
                        </p>
                        <div className="flex gap-3 justify-center pt-4">
                            <Link href="/katalog">
                                <Button variant="outline">Lanjut Belanja</Button>
                            </Link>
                            <Link href="/">
                                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                                    Ke Beranda
                                </Button>
                            </Link>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

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
                        <Link href={`/produk/${product.id}`} className="hover:text-primary transition-colors">
                            {product.name}
                        </Link>
                        <ChevronRight className="h-3.5 w-3.5" />
                        <span className="text-foreground font-medium">Order</span>
                    </nav>
                </div>

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-32 lg:pb-16">
                    <h1 className="text-2xl font-bold mb-6">Checkout</h1>

                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                        {/* Left — Form */}
                        <div className="lg:col-span-3 space-y-6">
                            <ShippingForm data={shipping} onChange={setShipping} />
                            <PaymentSelector selected={paymentMethod} onSelect={setPaymentMethod} />
                        </div>

                        {/* Right — Summary */}
                        <div className="lg:col-span-2 space-y-4">
                            <OrderSummary
                                product={product}
                                qty={qty}
                                onPlaceOrder={handlePlaceOrder}
                                isFormValid={!!(shipping.name && shipping.phone && shipping.address && shipping.city && shipping.postalCode)}
                            />
                        </div>
                    </div>
                </div>


                {/* Mobile Sticky Bottom Bar */}
                <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border/40 lg:hidden z-50 shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
                    <Button
                        onClick={handlePlaceOrder}
                        disabled={!shipping.name || !shipping.phone || !shipping.address || !shipping.city || !shipping.postalCode}
                        className="btn-press w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground text-base font-semibold shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ShieldCheck className="mr-2 h-5 w-5" />
                        Bayar Sekarang
                    </Button>
                    {(!shipping.name || !shipping.phone || !shipping.address) && (
                        <p className="text-xs text-amber-600 mt-2 text-center truncate">
                            *Lengkapi alamat pengiriman untuk melanjutkan
                        </p>
                    )}
                </div>
            </main >
        </div >
    );
}
