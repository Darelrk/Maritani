"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Fish, Eye, EyeOff, Loader2, CheckCircle2, ArrowRight } from "lucide-react";
import { registerUser } from "@/lib/actions";

export default function RegisterPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    async function handleSubmit(formData: FormData) {
        setIsLoading(true);
        setError(null);

        try {
            const result = await registerUser(formData);
            
            if (result.error) {
                setError(result.error);
            } else {
                setSuccess(true);
            }
        } catch (err) {
            setError("Terjadi kesalahan. Silakan coba lagi.");
        } finally {
            setIsLoading(false);
        }
    }

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-stone-50 to-ocean/5 px-4">
                <Card className="w-full max-w-md border-border/40 shadow-lg">
                    <CardContent className="pt-6 pb-6 text-center">
                        <div className="w-16 h-16 bg-emerald/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle2 className="h-8 w-8 text-emerald" />
                        </div>
                        <h2 className="text-2xl font-bold mb-2">Pendaftaran Berhasil! 🎉</h2>
                        <p className="text-muted-foreground mb-6">
                            Akun Anda telah berhasil dibuat. Silakan login untuk mulai berbelanja.
                        </p>
                        <Button asChild className="w-full">
                            <Link href="/login">
                                Ke Halaman Login
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-stone-50 to-ocean/5 px-4 py-12">
            <div className="w-full max-w-md space-y-6">
                {/* Logo */}
                <div className="text-center">
                    <Link href="/" className="inline-flex items-center justify-center gap-2 group">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-transform group-hover:scale-110">
                            <Fish className="h-6 w-6" />
                        </div>
                    </Link>
                    <h1 className="mt-4 text-3xl font-bold tracking-tight">
                        Mari<span className="text-primary">tani</span>
                    </h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Bergabung dengan marketplace hasil laut & tani terbesar
                    </p>
                </div>

                <Card className="border-border/40 shadow-lg">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl font-bold">Daftar Akun</CardTitle>
                        <CardDescription>
                            Buat akun untuk mulai berbelanja produk segar
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <form action={handleSubmit} className="space-y-4">
                            {error && (
                                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                                    {error}
                                </div>
                            )}

                            {/* Name */}
                            <div className="space-y-2">
                                <Label htmlFor="name">Nama Lengkap</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="Contoh: Budi Santoso"
                                    required
                                    disabled={isLoading}
                                    className="h-11"
                                />
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <Label htmlFor="email">Alamat Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="nama@email.com"
                                    required
                                    disabled={isLoading}
                                    className="h-11"
                                />
                            </div>

                            {/* Phone */}
                            <div className="space-y-2">
                                <Label htmlFor="phone">Nomor Telepon</Label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    placeholder="081234567890"
                                    required
                                    disabled={isLoading}
                                    className="h-11"
                                />
                                <p className="text-xs text-muted-foreground">
                                    Digunakan untuk konfirmasi pesanan
                                </p>
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Minimal 6 karakter"
                                        required
                                        minLength={6}
                                        disabled={isLoading}
                                        className="h-11 pr-10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Account Type Selection */}
                            <div className="space-y-2">
                                <Label>Tipe Akun</Label>
                                <div className="grid grid-cols-2 gap-3">
                                    <label className="cursor-pointer">
                                        <input
                                            type="radio"
                                            name="accountType"
                                            value="PERSONAL"
                                            defaultChecked
                                            className="peer sr-only"
                                        />
                                        <div className="flex flex-col items-center p-3 border-2 border-border rounded-lg peer-checked:border-primary peer-checked:bg-primary/5 transition-all">
                                            <span className="font-medium">Personal</span>
                                            <span className="text-xs text-muted-foreground">Untuk pemakaian pribadi</span>
                                        </div>
                                    </label>
                                    <label className="cursor-pointer">
                                        <input
                                            type="radio"
                                            name="accountType"
                                            value="BUSINESS"
                                            className="peer sr-only"
                                        />
                                        <div className="flex flex-col items-center p-3 border-2 border-border rounded-lg peer-checked:border-primary peer-checked:bg-primary/5 transition-all">
                                            <span className="font-medium">Bisnis</span>
                                            <span className="text-xs text-muted-foreground">Untuk perusahaan/UMKM</span>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            {/* Role Selection */}
                            <div className="space-y-2">
                                <Label>Daftar Sebagai</Label>
                                <div className="grid grid-cols-2 gap-3">
                                    <label className="cursor-pointer">
                                        <input
                                            type="radio"
                                            name="role"
                                            value="USER"
                                            defaultChecked
                                            className="peer sr-only"
                                        />
                                        <div className="flex flex-col items-center p-3 border-2 border-border rounded-lg peer-checked:border-primary peer-checked:bg-primary/5 transition-all">
                                            <span className="font-medium">Pembeli</span>
                                            <span className="text-xs text-muted-foreground">Beli produk segar</span>
                                        </div>
                                    </label>
                                    <label className="cursor-pointer">
                                        <input
                                            type="radio"
                                            name="role"
                                            value="SELLER"
                                            className="peer sr-only"
                                        />
                                        <div className="flex flex-col items-center p-3 border-2 border-border rounded-lg peer-checked:border-primary peer-checked:bg-primary/5 transition-all">
                                            <span className="font-medium">Penjual</span>
                                            <span className="text-xs text-muted-foreground">Jual hasil panen</span>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            {/* Terms */}
                            <div className="flex items-start space-x-2">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    name="terms"
                                    required
                                    className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary"
                                />
                                <Label htmlFor="terms" className="text-xs font-normal leading-relaxed">
                                    Saya setuju dengan{" "}
                                    <Link href="/syarat" className="text-primary hover:underline">
                                        Syarat & Ketentuan
                                    </Link>{" "}
                                    dan{" "}
                                    <Link href="/privasi" className="text-primary hover:underline">
                                        Kebijakan Privasi
                                    </Link>
                                </Label>
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                className="w-full h-11"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Mendaftar...
                                    </>
                                ) : (
                                    "Daftar Sekarang"
                                )}
                            </Button>
                        </form>
                    </CardContent>

                    <CardFooter className="flex flex-col space-y-4 border-t pt-4">
                        <div className="text-sm text-center text-muted-foreground">
                            Sudah punya akun?{" "}
                            <Link href="/login" className="text-primary font-medium hover:underline">
                                Masuk di sini
                            </Link>
                        </div>
                    </CardFooter>
                </Card>

                {/* Back to home */}
                <div className="text-center">
                    <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
                        ← Kembali ke Beranda
                    </Link>
                </div>
            </div>
        </div>
    );
}
