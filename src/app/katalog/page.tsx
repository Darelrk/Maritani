"use client";

import { useMemo, useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import {
    FilterSidebar,
    INITIAL_FILTERS,
} from "@/components/filter-sidebar";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Filter, Search, ArrowUpDown, PackageOpen, X } from "lucide-react";
import { ALL_PRODUCTS } from "@/lib/dummy-data";
import { Product, FilterState } from "@/lib/types";


/* ================================================
   KATALOG PAGE — full state management
   ================================================ */
export default function KatalogPage() {
    const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("terbaru");
    const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

    // ---- FILTERING + SEARCH + SORT ----
    const filteredProducts = useMemo(() => {
        let result = [...ALL_PRODUCTS];

        // 1) Search
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            result = result.filter(
                (p) =>
                    p.name.toLowerCase().includes(q) ||
                    p.seller.name.toLowerCase().includes(q) ||
                    p.seller.location.toLowerCase().includes(q) ||
                    p.category.toLowerCase().includes(q)
            );
        }

        // 2) Category filter
        if (filters.categories.length > 0) {
            result = result.filter((p) => filters.categories.includes(p.category));
        }

        // 3) Price range
        result = result.filter(
            (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
        );

        // 4) Condition
        if (filters.condition === "fresh") {
            result = result.filter((p) => p.isFresh === true);
        } else if (filters.condition === "frozen") {
            result = result.filter((p) => !p.isFresh);
        }

        // 5) Location
        if (filters.locations.length > 0) {
            result = result.filter((p) =>
                filters.locations.some((loc) =>
                    p.seller.location.toLowerCase().includes(loc.toLowerCase())
                )
            );
        }

        // 6) Sort
        switch (sortBy) {
            case "terlaris":
                result.sort((a, b) => b.sold - a.sold);
                break;
            case "termurah":
                result.sort((a, b) => a.price - b.price);
                break;
            case "termahal":
                result.sort((a, b) => b.price - a.price);
                break;
            case "terbaru":
            default:
                // keep original order (newest = highest id)
                result.sort((a, b) => Number(b.id) - Number(a.id));
                break;
        }

        return result;
    }, [filters, searchQuery, sortBy]);

    // Active filter count for badge
    const activeFilterCount =
        filters.categories.length +
        filters.locations.length +
        (filters.condition !== "all" ? 1 : 0) +
        (filters.priceRange[0] > 0 || filters.priceRange[1] < 1000000 ? 1 : 0);

    return (
        <div className="flex min-h-screen flex-col bg-muted/10">


            <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-8">
                {/* Header */}
                <div className="mb-8 space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">Katalog Produk</h1>
                    <p className="text-muted-foreground">
                        Temukan hasil laut dan pertanian segar berkualitas langsung dari sumbernya.
                    </p>
                </div>

                {/* Search + Sort Bar */}
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Cari ikan, sayur, cabai, bawang..."
                            className="pl-9 bg-background"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        )}
                    </div>

                    <div className="flex gap-2">
                        {/* Mobile Filter Button */}
                        <Sheet open={mobileFilterOpen} onOpenChange={setMobileFilterOpen}>
                            <SheetTrigger asChild>
                                <Button variant="outline" className="lg:hidden relative">
                                    <Filter className="mr-2 h-4 w-4" />
                                    Filter
                                    {activeFilterCount > 0 && (
                                        <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-[10px] flex items-center justify-center bg-primary text-primary-foreground">
                                            {activeFilterCount}
                                        </Badge>
                                    )}
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-[300px] sm:w-[360px] overflow-y-auto">
                                <FilterSidebar
                                    className="mt-6"
                                    filters={filters}
                                    onFiltersChange={setFilters}
                                    onClose={() => setMobileFilterOpen(false)}
                                />
                            </SheetContent>
                        </Sheet>

                        {/* Sort */}
                        <Select value={sortBy} onValueChange={setSortBy}>
                            <SelectTrigger className="w-[180px] bg-background">
                                <ArrowUpDown className="mr-2 h-4 w-4 text-muted-foreground" />
                                <SelectValue placeholder="Urutkan" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="terbaru">Terbaru</SelectItem>
                                <SelectItem value="terlaris">Terlaris</SelectItem>
                                <SelectItem value="termurah">Harga Terendah</SelectItem>
                                <SelectItem value="termahal">Harga Tertinggi</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Active Filters Tags */}
                {(activeFilterCount > 0 || searchQuery) && (
                    <div className="flex flex-wrap items-center gap-2 mb-6">
                        <span className="text-sm text-muted-foreground">
                            {filteredProducts.length} produk ditemukan
                        </span>
                        <span className="text-muted-foreground/30">|</span>

                        {searchQuery && (
                            <Badge
                                variant="secondary"
                                className="cursor-pointer hover:bg-destructive/10 hover:text-destructive transition-colors"
                                onClick={() => setSearchQuery("")}
                            >
                                &quot;{searchQuery}&quot; <X className="ml-1 h-3 w-3" />
                            </Badge>
                        )}

                        {filters.categories.map((cat) => (
                            <Badge
                                key={cat}
                                variant="secondary"
                                className="cursor-pointer hover:bg-destructive/10 hover:text-destructive transition-colors"
                                onClick={() =>
                                    setFilters({
                                        ...filters,
                                        categories: filters.categories.filter((c) => c !== cat),
                                    })
                                }
                            >
                                {cat} <X className="ml-1 h-3 w-3" />
                            </Badge>
                        ))}

                        {filters.condition !== "all" && (
                            <Badge
                                variant="secondary"
                                className="cursor-pointer hover:bg-destructive/10 hover:text-destructive transition-colors"
                                onClick={() => setFilters({ ...filters, condition: "all" })}
                            >
                                {filters.condition === "fresh" ? "Segar" : "Beku"}{" "}
                                <X className="ml-1 h-3 w-3" />
                            </Badge>
                        )}

                        {filters.locations.map((loc) => (
                            <Badge
                                key={loc}
                                variant="secondary"
                                className="cursor-pointer hover:bg-destructive/10 hover:text-destructive transition-colors"
                                onClick={() =>
                                    setFilters({
                                        ...filters,
                                        locations: filters.locations.filter((l) => l !== loc),
                                    })
                                }
                            >
                                {loc} <X className="ml-1 h-3 w-3" />
                            </Badge>
                        ))}

                        {(filters.priceRange[0] > 0 || filters.priceRange[1] < 1000000) && (
                            <Badge
                                variant="secondary"
                                className="cursor-pointer hover:bg-destructive/10 hover:text-destructive transition-colors"
                                onClick={() =>
                                    setFilters({ ...filters, priceRange: [0, 1000000] })
                                }
                            >
                                Rp {filters.priceRange[0].toLocaleString("id-ID")} — Rp{" "}
                                {filters.priceRange[1].toLocaleString("id-ID")}{" "}
                                <X className="ml-1 h-3 w-3" />
                            </Badge>
                        )}

                        {activeFilterCount > 0 && (
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-xs text-muted-foreground hover:text-destructive"
                                onClick={() => {
                                    setFilters(INITIAL_FILTERS);
                                    setSearchQuery("");
                                }}
                            >
                                Hapus Semua
                            </Button>
                        )}
                    </div>
                )}

                {/* Main Content */}
                <div className="flex gap-8">
                    {/* Desktop Sidebar */}
                    <aside className="hidden lg:block w-64 flex-shrink-0">
                        <div className="sticky top-24">
                            <FilterSidebar filters={filters} onFiltersChange={setFilters} />
                        </div>
                    </aside>

                    {/* Product Grid */}
                    <div className="flex-1">
                        {filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                                {filteredProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            /* Empty State */
                            <div className="flex flex-col items-center justify-center py-20 text-center">
                                <PackageOpen className="h-16 w-16 text-muted-foreground/30 mb-4" />
                                <h3 className="text-lg font-semibold">Tidak Ada Produk Ditemukan</h3>
                                <p className="text-sm text-muted-foreground mt-1 max-w-md">
                                    Coba ubah filter atau kata kunci pencarian Anda untuk menemukan
                                    produk yang tersedia.
                                </p>
                                <Button
                                    variant="outline"
                                    className="mt-4"
                                    onClick={() => {
                                        setFilters(INITIAL_FILTERS);
                                        setSearchQuery("");
                                    }}
                                >
                                    Reset Semua Filter
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </main>


        </div>
    );
}
