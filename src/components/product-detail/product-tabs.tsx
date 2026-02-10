"use client";

import { useState } from "react";
import { FileText, MessageSquare, Truck, Star, ShieldCheck } from "lucide-react";
import { Product } from "@/lib/types";

export function ProductTabs({ product }: { product: Product }) {
    const [activeTab, setActiveTab] = useState<"desc" | "reviews" | "shipping">("desc");

    return (
        <div className="mt-12 border-t border-border/40 pt-8">
            <div className="flex gap-6 border-b border-border/40 mb-6 overflow-x-auto">
                <button
                    onClick={() => setActiveTab("desc")}
                    className={`flex items-center gap-2 pb-3 text-sm font-medium border-b-2 transition-colors cursor-pointer whitespace-nowrap ${activeTab === "desc"
                        ? "border-primary text-primary"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                        }`}
                >
                    <FileText className="h-4 w-4" />
                    Deskripsi
                </button>
                <button
                    onClick={() => setActiveTab("reviews")}
                    className={`flex items-center gap-2 pb-3 text-sm font-medium border-b-2 transition-colors cursor-pointer whitespace-nowrap ${activeTab === "reviews"
                        ? "border-primary text-primary"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                        }`}
                >
                    <MessageSquare className="h-4 w-4" />
                    Ulasan (24)
                </button>
                <button
                    onClick={() => setActiveTab("shipping")}
                    className={`flex items-center gap-2 pb-3 text-sm font-medium border-b-2 transition-colors cursor-pointer whitespace-nowrap ${activeTab === "shipping"
                        ? "border-primary text-primary"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                        }`}
                >
                    <Truck className="h-4 w-4" />
                    Pengiriman
                </button>
            </div>

            <div className="min-h-[200px] animate-in fade-in slide-in-from-bottom-2 duration-300">
                {activeTab === "desc" && (
                    <div className="prose prose-sm max-w-none text-muted-foreground">
                        <p>
                            <strong className="text-foreground">{product.name}</strong> langsung dari{" "}
                            <strong className="text-foreground">{product.seller.name}</strong> di{" "}
                            {product.seller.location}. Produk ini dipanen/ditangkap dengan metode
                            tradisional yang menjaga kualitas dan kesegaran.
                        </p>
                        <h4 className="text-foreground mt-4">Keunggulan:</h4>
                        <ul className="space-y-1">
                            <li>✅ Langsung dari produsen — tanpa perantara</li>
                            <li>✅ Dikemas dalam box pendingin untuk menjaga kesegaran</li>
                            <li>✅ Lolos Quality Check di Hub Maritani</li>
                            <li>✅ Dana dilindungi sistem Escrow sampai Anda konfirmasi</li>
                        </ul>
                        <h4 className="text-foreground mt-4">Catatan:</h4>
                        <p>
                            Berat aktual mungkin sedikit berbeda (±50gr). Foto produk adalah
                            representasi — tampilan asli dapat bervariasi sesuai musim panen.
                        </p>
                    </div>
                )}

                {activeTab === "reviews" && (
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-xl">
                            <div className="text-center">
                                <span className="block text-3xl font-bold">{product.rating}</span>
                                <div className="flex text-amber">
                                    {[1, 2, 3, 4, 5].map((s) => (
                                        <Star key={s} className="h-3 w-3 fill-current" />
                                    ))}
                                </div>
                                <span className="text-xs text-muted-foreground">24 Ulasan</span>
                            </div>
                            <div className="h-10 w-px bg-border/60" />
                            <div className="space-y-1 text-sm flex-1">
                                <div className="flex items-center gap-2">
                                    <span className="text-xs w-3">5</span>
                                    <div className="h-1.5 flex-1 bg-muted rounded-full overflow-hidden">
                                        <div className="h-full w-[80%] bg-amber rounded-full" />
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs w-3">4</span>
                                    <div className="h-1.5 flex-1 bg-muted rounded-full overflow-hidden">
                                        <div className="h-full w-[15%] bg-amber rounded-full" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Dummy Review Items */}
                        <div className="space-y-4 pt-2">
                            {[1, 2].map((i) => (
                                <div key={i} className="border-b border-border/40 pb-4 last:border-0 hover:bg-muted/20 p-2 rounded-lg transition-colors">
                                    <div className="flex justify-between items-start mb-1">
                                        <div className="flex items-center gap-2">
                                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                                                U{i}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium">User {i}</p>
                                                <div className="flex text-amber">
                                                    {[1, 2, 3, 4, 5].map((s) => (
                                                        <Star key={s} className="h-3 w-3 fill-current" />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <span className="text-xs text-muted-foreground">2 hari lalu</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground ml-10">
                                        Produk sangat segar, pengiriman cepat. Recommended seller!
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === "shipping" && (
                    <div className="space-y-4 text-sm text-muted-foreground">
                        <div className="flex gap-3">
                            <div className="h-10 w-10 shrink-0 rounded-full bg-ocean/10 flex items-center justify-center text-ocean">
                                <Truck className="h-5 w-5" />
                            </div>
                            <div>
                                <h4 className="font-medium text-foreground">Pengiriman Standar</h4>
                                <p>Estimasi 1-2 hari kerja (Jabodetabek)</p>
                                <p>Rp 25.000 (Flat rate dengan box pendingin)</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <div className="h-10 w-10 shrink-0 rounded-full bg-emerald/10 flex items-center justify-center text-emerald">
                                <ShieldCheck className="h-5 w-5" />
                            </div>
                            <div>
                                <h4 className="font-medium text-foreground">Garansi Kesegaran</h4>
                                <p>
                                    Jika produk diterima dalam kondisi rusak/busuk, kami ganti 100% atau
                                    uang kembali. Wajib video unboxing.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
