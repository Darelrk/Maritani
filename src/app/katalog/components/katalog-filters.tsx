"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
    Search,
    Filter,
    ArrowUpDown,
    X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Categories data same as before
const categories = [
    { id: "all", label: "Semua Kategori" },
    { id: "hasil-laut", label: "Hasil Laut" },
    { id: "sayur-buah", label: "Sayur & Buah" },
    { id: "daging-ternak", label: "Daging & Ternak" },
    { id: "olahan-pangan", label: "Olahan Pangan" },
    { id: "paket-hemat", label: "Paket Hemat" },
];

export function KatalogFilters() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get("kategori") || "all");
    const [priceRange, setPriceRange] = useState([0, 1000000]);
    const [sortBy, setSortBy] = useState(searchParams.get("sort") || "terbaru");

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchQuery !== searchParams.get("q")) {
                updateFilters({ q: searchQuery });
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [searchQuery]); // Removed searchParams dependency loop

    const updateFilters = (newFilters: any) => {
        const params = new URLSearchParams(searchParams.toString());

        Object.entries(newFilters).forEach(([key, value]) => {
            if (value === null || value === "" || value === "all") {
                params.delete(key);
            } else {
                params.set(key, String(value));
            }
        });

        router.push(`/katalog?${params.toString()}`);
    };

    return (
        <div className="space-y-6">
            {/* Search & Mobile Filter Trigger */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Cari produk..."
                        className="pl-9"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex gap-2">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" className="sm:hidden">
                                <Filter className="mr-2 h-4 w-4" />
                                Filter
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left">
                            <SheetHeader>
                                <SheetTitle>Filter Produk</SheetTitle>
                                <SheetDescription>
                                    Sesuaikan pencarian Anda
                                </SheetDescription>
                            </SheetHeader>
                            {/* Mobile Filter Content would go here - simplified for brevity */}
                        </SheetContent>
                    </Sheet>

                    <Select
                        value={sortBy}
                        onValueChange={(val) => {
                            setSortBy(val);
                            updateFilters({ sort: val });
                        }}
                    >
                        <SelectTrigger className="w-[180px]">
                            <ArrowUpDown className="mr-2 h-4 w-4" />
                            <SelectValue placeholder="Urutkan" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="terbaru">Terbaru</SelectItem>
                            <SelectItem value="termurah">Harga Termurah</SelectItem>
                            <SelectItem value="termahal">Harga Termahal</SelectItem>
                            <SelectItem value="terlaris">Terlaris</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Desktop Categories (Horizontal for now or Sidebar) */}
            <div className="hidden md:flex flex-wrap gap-2">
                {categories.map((cat) => (
                    <Badge
                        key={cat.id}
                        variant={selectedCategory === cat.id ? "default" : "outline"}
                        className="cursor-pointer px-4 py-2 text-sm"
                        onClick={() => {
                            setSelectedCategory(cat.id);
                            updateFilters({ kategori: cat.id });
                        }}
                    >
                        {cat.label}
                    </Badge>
                ))}
            </div>
        </div>
    );
}
