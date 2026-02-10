
import { AddToCartButton } from "@/components/add-to-cart-button";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { Fish, Leaf, MapPin, Star, Clock } from "lucide-react"; // ShoppingCart removed, used in AddToCartButton
import { Product } from "@/lib/types";
import { formatRupiah } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
    return (
        <Card className="card-hover-lift group overflow-hidden border-border/40 bg-card">
            {/* Image — full-width, aspect 4:3 */}
            <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-muted to-muted/60 text-muted-foreground/15">
                    <Fish className="h-16 w-16" />
                </div>
                {product.image && (
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                )}

                {/* Overlay Badges (top-left) */}
                <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
                    {product.isFresh && (
                        <Badge className="bg-emerald/90 text-white border-none shadow-md text-[11px] px-2 py-0.5 backdrop-blur-sm">
                            <Leaf className="mr-1 h-3 w-3" />
                            Segar
                        </Badge>
                    )}
                    {product.originalPrice && (
                        <Badge className="bg-amber/90 text-amber-foreground border-none shadow-md text-[11px] px-2 py-0.5 backdrop-blur-sm">
                            -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                        </Badge>
                    )}
                </div>

                {/* Cart Button (top-right, appears on hover) */}
                <AddToCartButton
                    product={product}
                    iconOnly
                    className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100"
                />
            </div>

            <CardContent className="p-4 space-y-2.5">
                {/* Category & Rating row */}
                <div className="flex items-center justify-between">
                    <Badge
                        variant="outline"
                        className="text-[10px] px-1.5 py-0 h-5 border-primary/20 text-primary bg-primary/5 font-medium"
                    >
                        {product.category}
                    </Badge>
                    <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                        <Star className="h-3 w-3 fill-amber text-amber" />
                        <span className="font-medium">{product.rating}</span>
                        <span className="text-muted-foreground/60">({product.sold})</span>
                    </div>
                </div>

                {/* Product Name */}
                <Link href={`/produk/${product.id}`} className="block">
                    <h3 className="font-semibold text-sm leading-snug group-hover:text-primary transition-colors line-clamp-2 min-h-[2.5rem]">
                        {product.name}
                    </h3>
                </Link>

                {/* Seller Name, Location & Harvest Time */}
                <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-foreground">
                        <span className="truncate">{product.seller.name}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3 shrink-0" />
                        <span className="truncate">{product.seller.location}</span>
                    </div>
                    {product.harvestTime && (
                        <div className="flex items-center gap-1.5 text-xs text-emerald font-medium">
                            <Clock className="h-3 w-3 shrink-0" />
                            <span>{product.harvestTime}</span>
                        </div>
                    )}
                </div>

                {/* Price */}
                <div className="pt-1 border-t border-border/40">
                    <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold text-primary">
                            {formatRupiah(product.price)}
                        </span>
                        {product.originalPrice && (
                            <span className="text-xs text-muted-foreground line-through">
                                {formatRupiah(product.originalPrice)}
                            </span>
                        )}
                    </div>
                    <p className="text-[10px] text-muted-foreground/70">/ kg</p>
                </div>
            </CardContent>
        </Card>
    );
}
