"use client";

import { CreditCard, Landmark, Wallet, Banknote } from "lucide-react";

interface PaymentSelectorProps {
    selected: string;
    onSelect: (method: string) => void;
}

const paymentMethods = [
    {
        id: "bank_transfer",
        label: "Transfer Bank",
        description: "BCA, BNI, Mandiri, BRI",
        icon: Landmark,
    },
    {
        id: "ewallet",
        label: "E-Wallet",
        description: "GoPay, OVO, DANA, ShopeePay",
        icon: Wallet,
    },
    {
        id: "va",
        label: "Virtual Account",
        description: "Pembayaran otomatis via VA",
        icon: CreditCard,
    },
    {
        id: "cod",
        label: "Bayar di Tempat (COD)",
        description: "Bayar saat barang sampai",
        icon: Banknote,
    },
];

export function PaymentSelector({ selected, onSelect }: PaymentSelectorProps) {
    return (
        <div className="rounded-xl border border-border/40 bg-card p-5 space-y-4">
            <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-lg">Metode Pembayaran</h3>
            </div>

            <div className="space-y-2">
                {paymentMethods.map((method) => (
                    <button
                        key={method.id}
                        onClick={() => onSelect(method.id)}
                        className={`w-full flex items-center gap-3 p-3.5 rounded-lg border-2 transition-all text-left cursor-pointer ${selected === method.id
                                ? "border-primary bg-primary/5"
                                : "border-border/40 hover:border-border"
                            }`}
                    >
                        <div
                            className={`h-10 w-10 rounded-lg flex items-center justify-center shrink-0 ${selected === method.id
                                    ? "bg-primary text-white"
                                    : "bg-muted text-muted-foreground"
                                }`}
                        >
                            <method.icon className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="font-medium text-sm">{method.label}</p>
                            <p className="text-xs text-muted-foreground">{method.description}</p>
                        </div>
                        <div className="ml-auto">
                            <div
                                className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${selected === method.id ? "border-primary" : "border-muted-foreground/30"
                                    }`}
                            >
                                {selected === method.id && (
                                    <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                                )}
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
