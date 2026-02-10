import { Fish, Package, Truck, ShieldCheck } from "lucide-react";
import { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";

interface OrderSummaryProps {
    product: Product;
    qty: number;
    onPlaceOrder?: () => void;
    isFormValid?: boolean;
}

export function OrderSummary({ product, qty, onPlaceOrder, isFormValid = false }: OrderSummaryProps) {
    const subtotal = product.price * qty;
    const shippingCost = 25000; // dummy flat rate
    const serviceFee = Math.round(subtotal * 0.02); // 2% platform fee
    const total = subtotal + shippingCost + serviceFee;

    const discount = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

    return (
        <div className="rounded-xl border border-border/40 bg-card p-5 space-y-5 sticky top-24">
            <h3 className="font-semibold text-lg">Ringkasan Pesanan</h3>

            {/* Product Summary */}
            <div className="flex gap-3">
                <div className="h-16 w-16 rounded-lg bg-muted flex items-center justify-center shrink-0 overflow-hidden">
                    {product.image && product.image !== "/placeholder" ? (
                        <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                    ) : (
                        <Fish className="h-6 w-6 text-muted-foreground/20" />
                    )}
                </div>
                <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm leading-tight line-clamp-2">{product.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                        {qty} kg × Rp {product.price.toLocaleString("id-ID")}
                    </p>
                    {discount > 0 && (
                        <span className="text-[10px] text-amber font-medium">Hemat {discount}%</span>
                    )}
                </div>
            </div>

            {/* Price Breakdown */}
            <div className="space-y-2.5 border-t border-border/40 pt-4 text-sm">
                <div className="flex justify-between text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                        <Package className="h-3.5 w-3.5" /> Subtotal
                    </span>
                    <span>Rp {subtotal.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                        <Truck className="h-3.5 w-3.5" /> Ongkir (Box Pendingin)
                    </span>
                    <span>Rp {shippingCost.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                    <span>Biaya Layanan (2%)</span>
                    <span>Rp {serviceFee.toLocaleString("id-ID")}</span>
                </div>
            </div>

            {/* Total */}
            <div className="border-t border-border/40 pt-4 flex justify-between items-baseline">
                <span className="font-semibold">Total</span>
                <span className="text-xl font-bold text-primary">
                    Rp {total.toLocaleString("id-ID")}
                </span>
            </div>

            {/* Escrow Notice */}
            <div className="rounded-lg bg-emerald/5 border border-emerald/20 p-3 text-xs text-emerald">
                <strong>🔒 Pembayaran Aman (Escrow)</strong>
                <p className="mt-1 text-emerald/80">
                    Dana Anda ditahan platform dan baru dicairkan ke penjual setelah Anda
                    mengkonfirmasi penerimaan barang.
                </p>
            </div>

            {/* Desktop Button - Inside Card to prevent overlap */}
            <div className="hidden lg:block pt-2">
                <Button
                    onClick={onPlaceOrder}
                    disabled={!isFormValid}
                    className="btn-press w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground text-base font-semibold shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <ShieldCheck className="mr-2 h-5 w-5" />
                    Bayar Sekarang
                </Button>
                {!isFormValid && (
                    <p className="text-xs text-amber-600 mt-2 text-center">
                        *Lengkapi alamat pengiriman untuk melanjutkan
                    </p>
                )}
            </div>
        </div>
    );
}
