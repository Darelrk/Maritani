"use client";

import { Fish, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface ProductGalleryProps {
    productName: string;
    image: string;
}

export function ProductGallery({ productName, image }: ProductGalleryProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const totalImages = 4; // dummy gallery count

    // Dummy logic to simulate different angles/images based on the main image
    // In a real app, `image` would be an array of URLs
    const getImageUrl = (index: number) => {
        if (index === 0) return image;
        // Append a random query param to the Unsplash URL to simulate different images/angles
        // Note: This works because Unsplash ignores extra query params if they don't conflict, 
        // or actually we can just use the same image for now or strictly different ones if we had a list.
        // For simple MVP "Visual Realism", let's just use the same image but maybe slight crop difference or just same image.
        // Actually, let's keep it simple: same image for all thumbnails for now to ensure consistency, 
        // or just use the main image.
        return `${image}&auto=format&fit=crop&q=80&w=800`;
    };

    return (
        <div className="space-y-3">
            {/* Main Image */}
            <div className="relative aspect-[4/3] lg:aspect-square overflow-hidden rounded-2xl bg-stone-100 border border-border/40">
                <img
                    src={getImageUrl(activeIndex)}
                    alt={`${productName} - View ${activeIndex + 1}`}
                    className="h-full w-full object-cover"
                />

                {/* Nav arrows */}
                <button
                    onClick={() => setActiveIndex((p) => (p > 0 ? p - 1 : totalImages - 1))}
                    className="absolute left-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md hover:bg-white transition-colors cursor-pointer"
                >
                    <ChevronLeft className="h-5 w-5 text-foreground/80" />
                </button>
                <button
                    onClick={() => setActiveIndex((p) => (p < totalImages - 1 ? p + 1 : 0))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md hover:bg-white transition-colors cursor-pointer"
                >
                    <ChevronRight className="h-5 w-5 text-foreground/80" />
                </button>

                {/* Dots */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 p-1 rounded-full bg-black/20 backdrop-blur-[2px]">
                    {Array.from({ length: totalImages }).map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveIndex(i)}
                            className={`h-1.5 rounded-full transition-all cursor-pointer ${i === activeIndex ? "w-6 bg-white" : "w-1.5 bg-white/50"}`}
                        />
                    ))}
                </div>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-3">
                {Array.from({ length: totalImages }).map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setActiveIndex(i)}
                        className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${i === activeIndex ? "border-primary ring-2 ring-primary/20 ring-offset-1" : "border-transparent hover:border-border/50"}`}
                    >
                        <img
                            src={getImageUrl(i)}
                            alt={`Thumbnail ${i + 1}`}
                            className="h-full w-full object-cover"
                        />
                        {/* Overlay for inactive */}
                        {i !== activeIndex && (
                            <div className="absolute inset-0 bg-black/5 hover:bg-transparent transition-colors" />
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}
