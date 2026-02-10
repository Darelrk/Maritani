
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authenticate } from "@/lib/actions";

export default function LoginPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const callbackUrl = searchParams.get("callbackUrl") || "/";
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(formData: FormData) {
        setIsLoading(true);
        setError(null);
        
        try {
            await authenticate(callbackUrl, formData);
        } catch (err) {
            setError("Email atau password salah. Silakan coba lagi.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-stone-50 px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-sm space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-border/40">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-foreground">
                        Masuk ke Maritani
                    </h2>
                    <p className="mt-2 text-center text-sm text-muted-foreground">
                        Akses akun belanja atau toko Anda
                    </p>
                </div>

                <form action={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                            {error}
                        </div>
                    )}
                    
                    <div>
                        <Label htmlFor="email">Alamat Email</Label>
                        <div className="mt-2">
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                defaultValue="buyer@maritani.com"
                                required
                                className="block w-full"
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="password">Password</Label>
                        <div className="mt-2">
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                defaultValue="buyer123"
                                required
                                className="block w-full"
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    <div>
                        <Button
                            type="submit"
                            className="flex w-full justify-center h-10"
                            disabled={isLoading}
                        >
                            {isLoading ? "Memuat..." : "Masuk"}
                        </Button>
                    </div>
                </form>

                <div className="mt-4 p-4 bg-sky-50 rounded-lg text-xs text-sky-800">
                    <strong>Demo Credentials:</strong><br />
                    Buyer: <code>buyer@maritani.com</code> / <code>buyer123</code><br />
                    Seller: <code>seller@maritani.com</code> / <code>seller123</code>
                </div>
            </div>
        </div>
    );
}
