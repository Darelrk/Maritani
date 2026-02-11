
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/lib/types";
import { formatRupiah } from "@/lib/utils";
import { Star, Clock, MapPin, CheckCircle, Verified } from "lucide-react";

interface CatalogProductCardProps {
    product: Product;
}

export function CatalogProductCard({ product }: CatalogProductCardProps) {
    // Calculate discount percentage if originalPrice exists
    const discountPercentage = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

    // Infer unit based on product name or category (simple heuristic for demo)
    const unit = product.name.toLowerCase().includes("500gr") ? "/pck" :
        product.name.toLowerCase().includes("/buah") ? "/buah" :
            product.name.toLowerCase().includes("/btr") ? "/btr" :
                product.name.toLowerCase().includes("paket") ? "/paket" :
                    "/kg";

    return (
        <div className="group bg-card border border-border/40 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
            {/* Image Section */}
            <div className="relative aspect-square overflow-hidden bg-muted">
                {/* Badges */}
                <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                    {product.isFresh && (
                        <Badge className="bg-emerald/90 text-white border-none shadow-sm text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-sm">
                            <span className="mr-1">🌱</span> Segar
                        </Badge>
                    )}
                </div>

                {discountPercentage > 0 && (
                    <div className="absolute top-3 right-3 z-10">
                        <Badge className="bg-amber text-white border-none shadow-sm text-[10px] font-bold px-2 py-1 rounded-full">
                            -{discountPercentage}%
                        </Badge>
                    </div>
                )}

                {/* Product Image */}
                {product.image ? (
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-stone-100 text-stone-300">
                        <span className="text-4xl">📷</span>
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-semibold tracking-wide uppercase text-primary bg-primary/10 px-2 py-0.5 rounded">
                        {product.category}
                    </span>
                    <div className="flex items-center text-amber-500 text-xs font-bold gap-1">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{product.rating}</span>
                        <span className="text-muted-foreground font-normal">({product.sold})</span>
                    </div>
                </div>

                <Link href={`/produk/${product.id}`} className="group-hover:text-primary transition-colors">
                    <h3 className="font-bold text-foreground text-base mb-1 line-clamp-2 leading-snug min-h-[2.5rem]">
                        {product.name}
                    </h3>
                </Link>

                <p className="text-xs text-muted-foreground mb-4 line-clamp-1 flex items-center gap-1">
                    {product.seller.name} • {product.seller.location.split(",")[0]}
                </p>

                {/* Meta Info (Harvest Time / Stock) */}
                <div className="flex items-center gap-2 text-xs text-emerald-600 font-medium mb-3 mt-auto">
                    {product.name.includes("Stok") ? (
                        <>
                            <CheckCircle className="w-3.5 h-3.5" /> Stok Terbatas
                        </>
                    ) : product.name.includes("Terlaris") ? (
                        <>
                            <Verified className="w-3.5 h-3.5 text-blue-500" /> Terlaris minggu ini
                        </>
                    ) : (
                        <>
                            <Clock className="w-3.5 h-3.5" /> {product.harvestTime || "Panen hari ini"}
                        </>
                    )}
                </div>

                {/* Price & Action */}
                <div className="flex items-end justify-between pt-2 border-t border-border/30">
                    <div>
                        {product.originalPrice && (
                            <span className="text-xs text-muted-foreground line-through block mb-0.5">
                                {formatRupiah(product.originalPrice)}
                            </span>
                        )}
                        <div className="text-lg font-bold text-primary flex items-baseline gap-1">
                            {formatRupiah(product.price)}
                            <span className="text-xs font-normal text-muted-foreground">{unit}</span>
                        </div>
                    </div>

                    <button className="w-9 h-9 rounded-full bg-secondary/10 text-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300 transform hover:scale-105 active:scale-95">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14" />
                            <path d="M12 5v14" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
