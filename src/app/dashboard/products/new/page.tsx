
"use client";

import { createProduct } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import { formatRupiah } from "@/lib/utils";
import { useState } from "react";

interface State {
    error?: string;
    success?: string;
}

const initialState: State = {
    error: "",
    success: "",
};

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button type="submit" className="w-full" disabled={pending}>
            {pending ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Menyimpan...
                </>
            ) : (
                "Simpan Produk"
            )}
        </Button>
    );
}

export default function AddProductPage() {
    const [state, formAction] = useActionState(createProduct, initialState);
    const [price, setPrice] = useState<number | string>("");

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <Button variant="ghost" asChild className="mb-4">
                <Link href="/dashboard">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Kembali ke Dashboard
                </Link>
            </Button>

            <Card>
                <CardHeader>
                    <CardTitle>Tambah Produk Baru</CardTitle>
                    <CardDescription>
                        Isi detail produk yang ingin Anda jual.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={formAction} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nama Produk</Label>
                            <Input id="name" name="name" placeholder="Contoh: Beras Organik 5kg" required />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="category">Kategori</Label>
                                <Select name="category" required defaultValue="BERAS">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih Kategori" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="SAYUR">Sayur</SelectItem>
                                        <SelectItem value="BUAH">Buah</SelectItem>
                                        <SelectItem value="BERAS">Beras</SelectItem>
                                        <SelectItem value="REMPEH">Rempah</SelectItem>
                                        <SelectItem value="LAINNYA">Lainnya</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="unit">Satuan</Label>
                                <Select name="unit" required defaultValue="kg">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih Satuan" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="kg">Kilogram (kg)</SelectItem>
                                        <SelectItem value="gram">Gram (gr)</SelectItem>
                                        <SelectItem value="ikat">Ikat</SelectItem>
                                        <SelectItem value="pack">Pack</SelectItem>
                                        <SelectItem value="pcs">Pcs</SelectItem>
                                        <SelectItem value="liter">Liter</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="price">Harga (Rp)</Label>
                                <Input
                                    id="price"
                                    name="price"
                                    type="number"
                                    min="100"
                                    placeholder="0"
                                    required
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                                {price && <p className="text-xs text-muted-foreground">{formatRupiah(Number(price))}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="stock">Stok Awal</Label>
                                <Input id="stock" name="stock" type="number" min="1" placeholder="10" required />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Deskripsi Produk</Label>
                            <Textarea
                                id="description"
                                name="description"
                                placeholder="Jelaskan kualitas, asal, dan keunggulan produk Anda..."
                                className="min-h-[100px]"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="image">Foto Produk (URL)</Label>
                            <Input id="image" name="images" placeholder="https://..." required />
                            <p className="text-xs text-muted-foreground">
                                *Untuk saat ini gunakan link gambar dari internet (contoh: Unsplash/Google Images).
                            </p>
                        </div>

                        {state?.error && (
                            <div className="bg-destructive/15 text-destructive p-3 rounded-md text-sm">
                                {state.error}
                            </div>
                        )}

                        {/* Success handled by redirect in action, but fallback UI here just in case */}
                        {state?.success && (
                            <div className="bg-green-100 text-green-700 p-3 rounded-md text-sm">
                                {state.success}
                            </div>
                        )}

                        <SubmitButton />
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
