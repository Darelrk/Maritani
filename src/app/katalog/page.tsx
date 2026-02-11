
"use client";

import { useMemo, useState } from "react";
import {
    FilterSidebar,
    INITIAL_FILTERS,
} from "@/components/filter-sidebar";
import { CatalogProductCard } from "@/components/catalog-product-card";
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
import { Filter, Search, ArrowUpDown, PackageOpen, X, ChevronLeft, ChevronRight } from "lucide-react";
import { ALL_PRODUCTS } from "@/lib/dummy-data";
import { Product, FilterState } from "@/lib/types";

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
        <div className="flex min-h-screen flex-col bg-background">

            {/* Page Header - Stitch Style */}
            <div className="pt-32 pb-8 bg-background border-b border-border/40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-serif font-bold text-foreground mb-2">Katalog Produk</h1>
                    <p className="text-muted-foreground">Temukan hasil laut dan pertanian segar berkualitas langsung dari sumbernya.</p>

                    <div className="mt-8 flex flex-col md:flex-row gap-4 items-center">
                        <div className="relative flex-grow w-full md:w-auto">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Search className="text-muted-foreground w-5 h-5" />
                            </div>
                            <input
                                className="block w-full pl-12 pr-4 py-3 bg-muted/30 border border-border/60 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                placeholder="Cari ikan, sayur, cabai, bawang..."
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="absolute right-3 top-3.5 text-muted-foreground hover:text-foreground"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            )}
                        </div>
                        <div className="flex items-center gap-4 w-full md:w-auto">
                            <div className="relative w-full md:w-48">
                                <Select value={sortBy} onValueChange={setSortBy}>
                                    <SelectTrigger className="w-full h-[46px] rounded-xl bg-background border-border/60">
                                        <div className="flex items-center gap-2">
                                            <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
                                            <SelectValue placeholder="Urutkan" />
                                        </div>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="terbaru">Terbaru</SelectItem>
                                        <SelectItem value="terlaris">Terlaris</SelectItem>
                                        <SelectItem value="termurah">Harga Terendah</SelectItem>
                                        <SelectItem value="termahal">Harga Tertinggi</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Mobile Filter Trigger */}
                            <Sheet open={mobileFilterOpen} onOpenChange={setMobileFilterOpen}>
                                <SheetTrigger asChild>
                                    <Button variant="outline" className="lg:hidden h-[46px] w-[46px] p-0 rounded-xl" aria-label="Filter">
                                        <Filter className="h-5 w-5" />
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
                        </div>
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Desktop Sidebar */}
                    <div className="hidden lg:block w-64 flex-shrink-0 space-y-8">
                        <div className="sticky top-24">
                            <div className="flex items-center gap-2 text-lg font-bold text-foreground border-b border-border pb-4 mb-6">
                                <Filter className="w-5 h-5" />
                                Filter
                                {activeFilterCount > 0 && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="ml-auto text-xs h-7 px-2 text-primary hover:text-primary/80"
                                        onClick={() => {
                                            setFilters(INITIAL_FILTERS);
                                            setSearchQuery("");
                                        }}
                                    >
                                        Reset
                                    </Button>
                                )}
                            </div>
                            <FilterSidebar filters={filters} onFiltersChange={setFilters} />
                        </div>
                    </div>

                    {/* Product Grid */}
                    <div className="flex-1">
                        {/* Active Filters Tags */}
                        {(activeFilterCount > 0 || searchQuery) && (
                            <div className="flex flex-wrap items-center gap-2 mb-6">
                                <span className="text-sm text-muted-foreground mr-2">
                                    {filteredProducts.length} produk ditemukan
                                </span>

                                {searchQuery && (
                                    <Badge variant="secondary" className="cursor-pointer hover:bg-destructive/10 hover:text-destructive transition-colors gap-1 pl-2 pr-1 py-1" onClick={() => setSearchQuery("")}>
                                        &quot;{searchQuery}&quot; <X className="h-3 w-3" />
                                    </Badge>
                                )}

                                {filters.categories.map((cat) => (
                                    <Badge key={cat} variant="secondary" className="cursor-pointer hover:bg-destructive/10 hover:text-destructive transition-colors gap-1 pl-2 pr-1 py-1" onClick={() => setFilters({ ...filters, categories: filters.categories.filter(c => c !== cat) })}>
                                        {cat} <X className="h-3 w-3" />
                                    </Badge>
                                ))}

                                {filters.locations.map((loc) => (
                                    <Badge key={loc} variant="secondary" className="cursor-pointer hover:bg-destructive/10 hover:text-destructive transition-colors gap-1 pl-2 pr-1 py-1" onClick={() => setFilters({ ...filters, locations: filters.locations.filter(l => l !== loc) })}>
                                        {loc} <X className="h-3 w-3" />
                                    </Badge>
                                ))}
                            </div>
                        )}

                        {filteredProducts.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {filteredProducts.map((product) => (
                                        <CatalogProductCard key={product.id} product={product} />
                                    ))}
                                </div>

                                {/* Pagination - Stitch Style */}
                                <div className="mt-12 flex items-center justify-center gap-2">
                                    <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-input text-muted-foreground hover:border-primary hover:text-primary transition-colors">
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>
                                    <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold shadow-md">1</button>
                                    <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-input text-muted-foreground hover:border-primary hover:text-primary transition-colors">2</button>
                                    <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-input text-muted-foreground hover:border-primary hover:text-primary transition-colors">3</button>
                                    <span className="text-muted-foreground px-1">...</span>
                                    <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-input text-muted-foreground hover:border-primary hover:text-primary transition-colors">12</button>
                                    <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-input text-muted-foreground hover:border-primary hover:text-primary transition-colors">
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </>
                        ) : (
                            /* Empty State */
                            <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-muted rounded-3xl">
                                <PackageOpen className="h-16 w-16 text-muted-foreground/30 mb-4" />
                                <h3 className="text-lg font-semibold">Tidak Ada Produk Ditemukan</h3>
                                <p className="text-sm text-muted-foreground mt-1 max-w-md mb-6">
                                    Coba ubah filter atau kata kunci pencarian Anda untuk menemukan
                                    produk yang tersedia.
                                </p>
                                <Button
                                    variant="outline"
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
