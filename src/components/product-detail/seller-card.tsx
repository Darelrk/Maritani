import { Badge } from "@/components/ui/badge";
import { MapPin, Star, ShieldCheck, Store } from "lucide-react";
import { Product } from "@/lib/types";

interface SellerCardProps {
    seller: Product["seller"];
}

export function SellerCard({ seller }: SellerCardProps) {
    return (
        <div className="rounded-xl border border-border/40 bg-card p-5 space-y-4">
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Store className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-sm">{seller.name}</h3>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                            <MapPin className="h-3 w-3" />
                            <span>{seller.location}</span>
                        </div>
                    </div>
                </div>
                <Badge variant="outline" className="text-[10px] border-emerald/30 text-emerald bg-emerald/5">
                    <ShieldCheck className="mr-0.5 h-3 w-3" /> Terverifikasi
                </Badge>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
                <div className="rounded-lg bg-muted/50 p-2">
                    <div className="flex items-center justify-center gap-1">
                        <Star className="h-3.5 w-3.5 fill-amber text-amber" />
                        <span className="font-bold text-sm">4.8</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Rating</p>
                </div>
                <div className="rounded-lg bg-muted/50 p-2">
                    <span className="font-bold text-sm">2rb+</span>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Terjual</p>
                </div>
                <div className="rounded-lg bg-muted/50 p-2">
                    <span className="font-bold text-sm">{seller.type}</span>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Tipe</p>
                </div>
            </div>
        </div>
    );
}
