export interface Product {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    stock: number;
    image: string;
    seller: {
        id: string;
        name: string;
        location: string;
        type: "Nelayan" | "Petani" | "Peternak" | "UMKM";
    };
    rating: number;
    sold: number;
    category: "Hasil Laut" | "Sayur & Buah" | "Daging" | "Olahan";
    isFresh?: boolean;
    harvestTime?: string;
}

export interface FilterState {
    categories: string[];
    priceRange: [number, number];
    condition: "all" | "fresh" | "frozen";
    locations: string[];
}
