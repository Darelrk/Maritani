"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin } from "lucide-react";

interface ShippingData {
    name: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    note: string;
}

interface ShippingFormProps {
    data: ShippingData;
    onChange: (data: ShippingData) => void;
}

export function ShippingForm({ data, onChange }: ShippingFormProps) {
    const update = (field: keyof ShippingData, value: string) => {
        onChange({ ...data, [field]: value });
    };

    return (
        <div className="rounded-xl border border-border/40 bg-card p-5 space-y-5">
            <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-lg">Alamat Pengiriman</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Nama Penerima</Label>
                    <Input
                        id="name"
                        placeholder="Nama lengkap"
                        value={data.name}
                        onChange={(e) => update("name", e.target.value)}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="phone">No. Handphone</Label>
                    <Input
                        id="phone"
                        type="tel"
                        placeholder="08xxxxxxxxxx"
                        value={data.phone}
                        onChange={(e) => update("phone", e.target.value)}
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="address">Alamat Lengkap</Label>
                <textarea
                    id="address"
                    rows={3}
                    placeholder="Jalan, RT/RW, No. Rumah, Patokan"
                    className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                    value={data.address}
                    onChange={(e) => update("address", e.target.value)}
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="city">Kota / Kabupaten</Label>
                    <Input
                        id="city"
                        placeholder="Contoh: Surabaya"
                        value={data.city}
                        onChange={(e) => update("city", e.target.value)}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="postalCode">Kode Pos</Label>
                    <Input
                        id="postalCode"
                        placeholder="60xxx"
                        value={data.postalCode}
                        onChange={(e) => update("postalCode", e.target.value)}
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="note">Catatan untuk Penjual (opsional)</Label>
                <Input
                    id="note"
                    placeholder="Contoh: Minta dipotong-potong"
                    value={data.note}
                    onChange={(e) => update("note", e.target.value)}
                />
            </div>
        </div>
    );
}

export type { ShippingData };
