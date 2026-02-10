"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Filter, RotateCcw, MapPin } from "lucide-react";

import { FilterState } from "@/lib/types";

export const INITIAL_FILTERS: FilterState = {
    categories: [],
    priceRange: [0, 1000000],
    condition: "all",
    locations: [],
};

const CATEGORY_OPTIONS = ["Hasil Laut", "Sayur & Buah", "Daging", "Olahan"];

// Provinsi Indonesia dikelompokkan per pulau
const LOCATION_BY_ISLAND = {
    "Sumatera": [
        "Aceh", "Sumatera Utara", "Sumatera Barat", "Riau", "Kepulauan Riau",
        "Jambi", "Sumatera Selatan", "Bangka Belitung", "Bengkulu", "Lampung"
    ],
    "Jawa & Bali": [
        "DKI Jakarta", "Banten", "Jawa Barat", "Jawa Tengah", "DI Yogyakarta",
        "Jawa Timur", "Bali"
    ],
    "Nusa Tenggara": [
        "Nusa Tenggara Barat", "Nusa Tenggara Timur"
    ],
    "Kalimantan": [
        "Kalimantan Barat", "Kalimantan Tengah", "Kalimantan Selatan",
        "Kalimantan Timur", "Kalimantan Utara"
    ],
    "Sulawesi": [
        "Sulawesi Utara", "Gorontalo", "Sulawesi Tengah", "Sulawesi Barat",
        "Sulawesi Selatan", "Sulawesi Tenggara"
    ],
    "Maluku & Papua": [
        "Maluku", "Maluku Utara", "Papua Barat", "Papua", "Papua Pegunungan",
        "Papua Selatan", "Papua Tengah", "Papua Barat Daya"
    ],
};

interface FilterSidebarProps {
    className?: string;
    filters: FilterState;
    onFiltersChange: (filters: FilterState) => void;
    onClose?: () => void;
}

export function FilterSidebar({
    className,
    filters,
    onFiltersChange,
    onClose,
}: FilterSidebarProps) {
    const toggleCategory = (cat: string) => {
        const next = filters.categories.includes(cat)
            ? filters.categories.filter((c) => c !== cat)
            : [...filters.categories, cat];
        onFiltersChange({ ...filters, categories: next });
    };

    const toggleLocation = (loc: string) => {
        const next = filters.locations.includes(loc)
            ? filters.locations.filter((l) => l !== loc)
            : [...filters.locations, loc];
        onFiltersChange({ ...filters, locations: next });
    };

    const toggleAllInIsland = (island: string, provinces: string[]) => {
        const allSelected = provinces.every((prov) => filters.locations.includes(prov));
        if (allSelected) {
            // Unselect all
            const next = filters.locations.filter((l) => !provinces.includes(l));
            onFiltersChange({ ...filters, locations: next });
        } else {
            // Select all
            const newLocations = [...new Set([...filters.locations, ...provinces])];
            onFiltersChange({ ...filters, locations: newLocations });
        }
    };

    const handleReset = () => {
        onFiltersChange(INITIAL_FILTERS);
    };

    const activeCount =
        filters.categories.length +
        filters.locations.length +
        (filters.condition !== "all" ? 1 : 0) +
        (filters.priceRange[0] > 0 || filters.priceRange[1] < 1000000 ? 1 : 0);

    // Hitung berapa provinsi yang dipilih per pulau
    const getSelectedCount = (provinces: string[]) => {
        return provinces.filter((p) => filters.locations.includes(p)).length;
    };

    return (
        <div className={`space-y-6 ${className ?? ""}`}>
            {/* Header (Mobile) */}
            <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Filter
                    {activeCount > 0 && (
                        <span className="text-xs bg-primary text-primary-foreground rounded-full px-2 py-0.5">
                            {activeCount}
                        </span>
                    )}
                </h3>
                {activeCount > 0 && (
                    <Button variant="ghost" size="sm" onClick={handleReset} className="text-xs text-muted-foreground hover:text-destructive">
                        <RotateCcw className="mr-1 h-3 w-3" />
                        Reset
                    </Button>
                )}
            </div>

            {/* Kategori */}
            <div className="space-y-3">
                <h4 className="font-medium text-sm">Kategori</h4>
                <div className="space-y-2">
                    {CATEGORY_OPTIONS.map((cat) => (
                        <div key={cat} className="flex items-center space-x-2">
                            <Checkbox
                                id={`cat-${cat}`}
                                checked={filters.categories.includes(cat)}
                                onCheckedChange={() => toggleCategory(cat)}
                            />
                            <Label
                                htmlFor={`cat-${cat}`}
                                className="text-sm font-normal cursor-pointer text-muted-foreground"
                            >
                                {cat}
                            </Label>
                        </div>
                    ))}
                </div>
            </div>

            <Separator />

            {/* Harga */}
            <div className="space-y-4">
                <h4 className="font-medium text-sm">Rentang Harga (per kg)</h4>
                <Slider
                    value={filters.priceRange}
                    onValueChange={(val) =>
                        onFiltersChange({ ...filters, priceRange: val as [number, number] })
                    }
                    max={1000000}
                    step={5000}
                    className="py-4"
                />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Rp {filters.priceRange[0].toLocaleString("id-ID")}</span>
                    <span>Rp {filters.priceRange[1].toLocaleString("id-ID")}</span>
                </div>
            </div>

            <Separator />

            {/* Kondisi */}
            <div className="space-y-3">
                <h4 className="font-medium text-sm">Kondisi</h4>
                <RadioGroup
                    value={filters.condition}
                    onValueChange={(val) =>
                        onFiltersChange({ ...filters, condition: val as FilterState["condition"] })
                    }
                >
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="all" id="cond-all" />
                        <Label htmlFor="cond-all" className="font-normal">
                            Semua
                        </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="fresh" id="cond-fresh" />
                        <Label htmlFor="cond-fresh" className="font-normal text-emerald">
                            Segar (Fresh)
                        </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="frozen" id="cond-frozen" />
                        <Label htmlFor="cond-frozen" className="font-normal text-ocean">
                            Beku (Frozen)
                        </Label>
                    </div>
                </RadioGroup>
            </div>

            <Separator />

            {/* Lokasi dengan Accordion */}
            <div className="space-y-3">
                <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <h4 className="font-medium text-sm">Lokasi Penjual</h4>
                    {filters.locations.length > 0 && (
                        <span className="text-xs bg-primary/10 text-primary rounded-full px-2 py-0.5">
                            {filters.locations.length}
                        </span>
                    )}
                </div>
                
                <Accordion type="multiple" className="w-full">
                    {Object.entries(LOCATION_BY_ISLAND).map(([island, provinces]) => {
                        const selectedCount = getSelectedCount(provinces);
                        const allSelected = selectedCount === provinces.length;
                        
                        return (
                            <AccordionItem key={island} value={island} className="border-b-0">
                                <AccordionTrigger className="py-2 hover:no-underline">
                                    <div className="flex items-center justify-between w-full pr-4">
                                        <span className="text-sm font-medium">{island}</span>
                                        {selectedCount > 0 && (
                                            <span className="text-xs text-muted-foreground ml-2">
                                                ({selectedCount})
                                            </span>
                                        )}
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className="space-y-2 pb-2">
                                        {/* Select All Toggle */}
                                        <div className="flex items-center space-x-2 pb-2 border-b border-border/40">
                                            <Checkbox
                                                id={`all-${island}`}
                                                checked={allSelected}
                                                onCheckedChange={() => toggleAllInIsland(island, provinces)}
                                            />
                                            <Label
                                                htmlFor={`all-${island}`}
                                                className="text-xs font-medium cursor-pointer text-primary"
                                            >
                                                Pilih Semua di {island}
                                            </Label>
                                        </div>
                                        {/* Provinces */}
                                        <div className="grid grid-cols-1 gap-1.5 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
                                            {provinces.map((prov) => (
                                                <div key={prov} className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id={`loc-${prov}`}
                                                        checked={filters.locations.includes(prov)}
                                                        onCheckedChange={() => toggleLocation(prov)}
                                                    />
                                                    <Label
                                                        htmlFor={`loc-${prov}`}
                                                        className="text-xs font-normal cursor-pointer text-muted-foreground hover:text-foreground"
                                                    >
                                                        {prov}
                                                    </Label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        );
                    })}
                </Accordion>
            </div>

            {/* Apply (Mobile) */}
            {onClose && (
                <Button
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    onClick={onClose}
                >
                    <Filter className="mr-2 h-4 w-4" />
                    Terapkan ({activeCount} filter)
                </Button>
            )}
        </div>
    );
}
