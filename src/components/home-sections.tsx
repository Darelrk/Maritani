import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    ArrowRight,
    Search,
    Wallet,
    ShieldCheck,
    Truck,
} from "lucide-react";

/* =============================================
   HERO SECTION — Stitch Design
   ============================================= */
export function HeroSection() {
    return (
        <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
            {/* Optimized background - reduced blur intensity */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary/5 rounded-full" style={{ filter: 'blur(60px)' }} />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-emerald/10 rounded-full" style={{ filter: 'blur(60px)' }} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                {/* Badge pill */}
                <div className="inline-flex items-center px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold mb-8 backdrop-blur-sm">
                    <span className="bg-primary text-white rounded-full p-0.5 mr-2 inline-flex items-center justify-center w-4 h-4">
                        ✓
                    </span>
                    Fresh from the Sea & Farm 🌊🌾
                </div>

                {/* Main heading — Playfair Display serif italic */}
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6 leading-tight">
                    Segar dari{" "}
                    <span className="text-primary italic">Laut</span> &{" "}
                    <span className="text-emerald italic">Bumi</span>
                </h1>

                <p className="mt-4 max-w-2xl mx-auto text-xl text-muted-foreground font-light leading-relaxed">
                    Platform marketplace terpercaya untuk produk segar hasil laut
                    dan pertanian. Langsung dari{" "}
                    <strong className="text-foreground font-semibold">nelayan</strong> &{" "}
                    <strong className="text-foreground font-semibold">petani</strong>{" "}
                    Indonesia ke meja makan Anda.
                </p>

                {/* CTA Buttons */}
                <div className="mt-10 flex justify-center gap-4 flex-wrap">
                    <Button
                        size="lg"
                        className="rounded-full px-8 py-6 text-base shadow-lg hover:-translate-y-1 transition-all"
                        asChild
                    >
                        <Link href="/katalog">
                            Jelajahi Produk
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                    <Button
                        size="lg"
                        variant="outline"
                        className="rounded-full px-8 py-6 text-base hover:-translate-y-1 transition-all"
                        asChild
                    >
                        <Link href="/register">
                            🏪 Mulai Berjualan
                        </Link>
                    </Button>
                </div>

                {/* Stats counter - Optimized for LCP */}
                <div className="mt-20 grid grid-cols-2 gap-8 md:grid-cols-4 border-t border-border pt-10 will-change-transform">
                    {[
                        { value: "2,500+", label: "Produk Segar" },
                        { value: "800+", label: "Petani & Nelayan" },
                        { value: "50+", label: "Kota Terjangkau" },
                        { value: "99%", label: "Lolos Kualitas" },
                    ].map((stat, index) => (
                        <div key={stat.label} className="flex flex-col items-center" style={{ contentVisibility: 'auto' }}>
                            <span className="text-3xl font-bold text-foreground tabular-nums">
                                {stat.value}
                            </span>
                            <span className="text-sm text-muted-foreground mt-1">
                                {stat.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* =============================================
   CATEGORIES SECTION — Full-bleed Image Cards (Stitch)
   ============================================= */
const categories = [
    {
        title: "Hasil Laut",
        description: "Ikan, udang, cumi, kerang langsung dari nelayan.",
        count: "850+",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBZXMyiAb61aKRn8Jg-b8HgZMKYkuis44GtaCgu0uy4gCeLBSzKZ82jACxr29ih5N_us7x1ZYCAU0VxKMaC35tEZKcuNbgRn6sEHkBnWlB3R1IEss-LyWGkPHS0YNmnODVxOSJLDW4eaa1cAqciT6ts9una15iLUC8sCUDQXfT4hS7XC9qLAi8egt9iVfo7ySjHOkR9V_IgJYnieoaGSve8W4ByscdeFg1-dzCm36Dkeqsf-Q9AZUsapU2gWVedZSohBZ-3N4df4LTX",
    },
    {
        title: "Sayur & Buah",
        description: "Sayuran segar dan buah-buahan organik pilihan.",
        count: "620+",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBA6UleljayojIxVAVEvCr6uE1cnWHZTGjVZWgQWCpXweI2dMbK2qas__t9tQcDdgKlzQwzhozfYseVPqcO4FEA3r-KzrYjXQFS-yZn73sA8NqqZKJfbhjBf6bZuqnCoFLgyyK-i4zuYsoveXQ1p12nU-15IWji7QuZsjqAwiSqD2VcswEbniCN9gE9VvadBgkq9wp7qkwqxCB4Mn43CxgnCgLGTRbVeAiYa6kmH_BqstxFZf-2HvacWj8IHMm4dyDl0yP6PIJvxLs4",
    },
    {
        title: "Daging & Ternak",
        description: "Daging sapi, ayam, dan hasil peternakan berkualitas.",
        count: "340+",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCMxTHtUINu2HcCcQsIgGVTnaSkctpf1G2jxUdpm-Ba4eotXJPPtfAZDic-OUokW7UBJ9SgrvpCTqQ57DBeM9ivVpIvQ-XdERbTmzLuNzqFB1odlAW1l7MKC1TjcD4jt1idctbdRm70-x_8aQ39wyrWUPciRGobuhVKYlcA0hD-qJ28hrHGVbZ46w_7l8dhnBq2eUhAbsp5PqTiD9yXoIZyjKbKsEO5VEItmd1uiiawee8skEZHTPDypUk4-kk2zJtVc-hxdkfe9s1Y",
    },
    {
        title: "Olahan Pangan",
        description: "Produk olahan UMKM: ikan asin, kerupuk, sambal.",
        count: "480+",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAP88qJlvOcUl9_RxeUK8HyaaA-JkBDQS_HBS7ggyTuMM1j8TWQESDunCtqjzey1oazZSrQgavhyjy6-4GHRqECe8465thCGvvvTA1l23xXcDruA6Iz4llBIafHzyhvSpNBMnS8aFVpCyoN0VsfA5vTru7CUCXxhSn7ccyCLux8G2a12y847N81lIKpTffYUxetTJnzZvE4pvafNOyg9rhPSi_Cf6lAU6V1dphYCqUP5Lx4YrzkB_fW1I-S5Oo7Y2vGhSUoQExKat4u",
    },
];

export function CategoriesSection() {
    return (
        <section className="py-20 bg-card relative">
            {/* Dot pattern bg */}
            <div
                className="absolute inset-0 opacity-5"
                style={{
                    backgroundImage: "radial-gradient(currentColor 0.5px, transparent 0.5px)",
                    backgroundSize: "20px 20px",
                }}
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <span className="text-primary font-semibold tracking-wider uppercase text-sm">
                        Kategori Pilihan
                    </span>
                    <h2 className="mt-2 text-3xl md:text-4xl font-bold text-foreground">
                        Temukan Produk{" "}
                        <span className="text-gradient">Segar</span> Anda
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                        Dari laut dalam hingga kebun hijau, semua tersedia dengan
                        jaminan kualitas terbaik.
                    </p>
                </div>

                {/* Image cards grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((cat) => (
                        <Link
                            key={cat.title}
                            href="/katalog"
                            className="group relative rounded-2xl overflow-hidden aspect-[4/5] cursor-pointer"
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                alt={cat.title}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                src={cat.image}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                            <div className="absolute bottom-0 left-0 p-6 w-full">
                                <h3 className="text-xl font-bold text-white mb-1">
                                    {cat.title}
                                </h3>
                                <p className="text-white/70 text-sm mb-4 line-clamp-2">
                                    {cat.description}
                                </p>
                                <span className="text-emerald text-xs font-semibold flex items-center group-hover:translate-x-2 transition-transform">
                                    {cat.count} Produk
                                    <ArrowRight className="ml-1 h-3 w-3" />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* =============================================
   HOW IT WORKS — Zigzag Timeline (Stitch)
   ============================================= */
const steps = [
    {
        title: "Pilih Produk",
        description:
            "Jelajahi katalog produk segar dari petani dan nelayan lokal dengan informasi transparan.",
        icon: Search,
        position: "left" as const,
    },
    {
        title: "Pesan & Bayar",
        description:
            "Checkout aman dengan sistem escrow — dana Anda terlindungi sampai barang diterima.",
        icon: Wallet,
        position: "right" as const,
    },
    {
        title: "Quality Check",
        description:
            "Tim Hub kami memastikan setiap produk lolos standar kesegaran sebelum dikirim.",
        icon: ShieldCheck,
        position: "left" as const,
    },
    {
        title: "Terima di Rumah",
        description:
            "Produk diantar dalam box pendingin khusus untuk menjaga kesegaran maksimal.",
        icon: Truck,
        position: "right" as const,
    },
];

export function HowItWorksSection() {
    return (
        <section className="py-24 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-20">
                    <div className="inline-flex items-center px-3 py-1 rounded-full border border-emerald/30 bg-emerald/5 text-primary text-xs font-semibold mb-4">
                        🔒 Proses Terjamin
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                        Bagaimana <span className="text-primary">Maritani</span>{" "}
                        Bekerja
                    </h2>
                    <p className="mt-4 text-muted-foreground">
                        Dari laut ke meja makan Anda — setiap langkah kami jaga
                        kualitasnya.
                    </p>
                </div>

                {/* Zigzag timeline */}
                <div className="relative">
                    {/* Center line */}
                    <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-border" />

                    <div className="space-y-16 md:space-y-24">
                        {steps.map((step, idx) => {
                            const isLeft = step.position === "left";
                            const Icon = step.icon;

                            return (
                                <div key={step.title} className="relative">
                                    <div className="flex flex-col md:flex-row items-center justify-between w-full">
                                        {/* Text content */}
                                        <div
                                            className={`w-full md:w-5/12 text-center px-4 ${isLeft
                                                ? "order-1 md:text-right"
                                                : "order-1 md:order-3 md:text-left"
                                                }`}
                                        >
                                            <h3 className="text-2xl font-bold text-foreground mb-2">
                                                {step.title}
                                            </h3>
                                            <p className="text-muted-foreground leading-relaxed">
                                                {step.description}
                                            </p>
                                        </div>

                                        {/* Center icon */}
                                        <div className="order-2 z-10 flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-card border-4 border-primary rounded-full shadow-lg my-6 md:my-0">
                                            <Icon className="text-primary h-5 w-5 md:h-6 md:w-6" />
                                        </div>

                                        {/* Decorative card */}
                                        <div
                                            className={`w-full md:w-5/12 px-4 ${isLeft
                                                ? "order-3"
                                                : "order-3 md:order-1"
                                                }`}
                                        >
                                            <div
                                                className={`hidden md:block rounded-2xl p-6 ${isLeft
                                                    ? "bg-gradient-to-br from-primary/10 to-emerald/10 transform rotate-2"
                                                    : "bg-gradient-to-bl from-emerald/10 to-primary/10 transform -rotate-2"
                                                    }`}
                                            >
                                                {/* Step 1: Product catalog grid */}
                                                {idx === 0 && (
                                                    <div className="space-y-3">
                                                        <div className="flex items-center gap-2 mb-3">
                                                            <Search className="h-4 w-4 text-primary/50" />
                                                            <div className="flex-1 h-7 bg-muted rounded-full px-3 flex items-center">
                                                                <span className="text-[10px] text-muted-foreground">Cari ikan segar, sayur...</span>
                                                            </div>
                                                        </div>
                                                        <div className="grid grid-cols-3 gap-2">
                                                            {["🐟", "🦐", "🥬"].map((emoji) => (
                                                                <div key={emoji} className="bg-card rounded-lg p-2 text-center shadow-sm">
                                                                    <div className="text-2xl mb-1">{emoji}</div>
                                                                    <div className="h-1.5 w-full bg-muted rounded mb-1" />
                                                                    <div className="text-xs font-bold text-primary">Rp 45k</div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                                {/* Step 2: Payment checkout */}
                                                {idx === 1 && (
                                                    <div className="space-y-3">
                                                        <div className="flex items-center justify-between mb-2">
                                                            <span className="text-xs font-bold text-foreground/70">Checkout</span>
                                                            <span className="text-[10px] bg-emerald/20 text-emerald px-2 py-0.5 rounded-full font-semibold">🔒 Escrow</span>
                                                        </div>
                                                        <div className="bg-card rounded-lg p-3 shadow-sm space-y-2">
                                                            <div className="flex justify-between text-[10px]">
                                                                <span className="text-muted-foreground">2x Ikan Kakap</span>
                                                                <span className="font-medium">Rp 90k</span>
                                                            </div>
                                                            <div className="flex justify-between text-[10px]">
                                                                <span className="text-muted-foreground">1x Udang Windu</span>
                                                                <span className="font-medium">Rp 65k</span>
                                                            </div>
                                                            <div className="border-t border-border pt-1 flex justify-between text-[10px]">
                                                                <span className="font-bold">Total</span>
                                                                <span className="font-bold text-primary">Rp 155k</span>
                                                            </div>
                                                        </div>
                                                        <div className="h-8 bg-primary rounded-lg flex items-center justify-center">
                                                            <span className="text-[10px] font-bold text-white">Bayar Sekarang</span>
                                                        </div>
                                                    </div>
                                                )}
                                                {/* Step 3: Quality checklist */}
                                                {idx === 2 && (
                                                    <div className="space-y-3">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <ShieldCheck className="h-4 w-4 text-emerald" />
                                                            <span className="text-xs font-bold text-foreground/70">Quality Control</span>
                                                        </div>
                                                        {[
                                                            { label: "Kesegaran produk", checked: true },
                                                            { label: "Berat sesuai pesanan", checked: true },
                                                            { label: "Pengemasan standar", checked: true },
                                                            { label: "Suhu penyimpanan", checked: false },
                                                        ].map((item) => (
                                                            <div key={item.label} className="flex items-center gap-2 bg-card rounded-lg px-3 py-2 shadow-sm">
                                                                <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${item.checked ? "bg-emerald text-white" : "bg-muted"}`}>
                                                                    {item.checked && "✓"}
                                                                </div>
                                                                <span className={`text-[10px] ${item.checked ? "text-foreground" : "text-muted-foreground"}`}>
                                                                    {item.label}
                                                                </span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                                {/* Step 4: Delivery tracker */}
                                                {idx === 3 && (
                                                    <div className="space-y-3">
                                                        <div className="flex items-center justify-between mb-2">
                                                            <span className="text-xs font-bold text-foreground/70">Tracking</span>
                                                            <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-semibold">Dalam Perjalanan</span>
                                                        </div>
                                                        <div className="bg-card rounded-lg p-3 shadow-sm">
                                                            <div className="flex items-center gap-2 mb-3">
                                                                <div className="text-lg">📦</div>
                                                                <div>
                                                                    <div className="text-[10px] font-bold">MRT-20260211</div>
                                                                    <div className="text-xs text-muted-foreground">Cold-box • Est. 2 jam lagi</div>
                                                                </div>
                                                            </div>
                                                            {/* Progress bar */}
                                                            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                                                                <div className="h-full w-3/4 bg-gradient-to-r from-primary to-emerald rounded-full" />
                                                            </div>
                                                            <div className="flex justify-between mt-1 text-[10px] text-muted-foreground">
                                                                <span>Hub</span>
                                                                <span>Sorting</span>
                                                                <span>Delivery</span>
                                                                <span className="text-primary font-bold">🏠</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}

/* =============================================
   CTA SECTION — Rounded-3xl with Decorations (Stitch)
   ============================================= */
export function CTASection() {
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="relative rounded-3xl overflow-hidden bg-primary shadow-2xl">
                    {/* SVG decoration */}
                    <div className="absolute inset-0">
                        <svg
                            className="absolute right-0 top-0 h-full w-full opacity-10 transform translate-x-1/2"
                            preserveAspectRatio="none"
                            viewBox="0 0 100 100"
                        >
                            <path d="M0 0 L50 100 L100 0 Z" fill="white" />
                        </svg>
                        <div className="absolute left-0 bottom-0 h-64 w-64 bg-emerald opacity-20 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
                    </div>

                    <div className="relative z-10 py-16 px-6 sm:py-24 sm:px-12 text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            Siap Belanja Segar?
                        </h2>
                        <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/80">
                            Bergabung dengan ribuan keluarga Indonesia yang sudah
                            menikmati produk segar langsung dari sumber. Tanpa
                            perantara berlebih, lebih hemat dan segar.
                        </p>
                        <div className="mt-10 flex justify-center gap-4 flex-col sm:flex-row">
                            <Button
                                size="lg"
                                variant="secondary"
                                className="rounded-full px-8 shadow-lg text-primary font-medium"
                                asChild
                            >
                                <Link href="/katalog">
                                    Mulai Belanja
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="rounded-full px-8 bg-transparent border-white text-white hover:bg-white hover:text-primary transition-colors"
                                asChild
                            >
                                <Link href="/register">
                                    Daftar Sebagai Penjual
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
