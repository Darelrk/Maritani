import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Fish,
    Sprout,
    Truck,
    ShieldCheck,
    ArrowRight,
    Waves,
    Wheat,
    ChefHat,
    Beef,
} from "lucide-react";

/* =============================================
   HERO SECTION
   ============================================= */
export function HeroSection() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-stone-50 to-ocean/5">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03]">
                <div className="absolute top-20 left-10 text-primary">
                    <Waves className="h-32 w-32" />
                </div>
                <div className="absolute bottom-20 right-10 text-emerald">
                    <Sprout className="h-28 w-28" />
                </div>
            </div>

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-32">
                <div className="text-center max-w-4xl mx-auto">
                    <Badge
                        variant="secondary"
                        className="mb-6 px-4 py-1.5 text-sm font-medium bg-primary/10 text-primary border-primary/20 hover:bg-primary/15"
                    >
                        <Fish className="mr-1.5 h-3.5 w-3.5" />
                        Fresh from the Sea & Farm 🌊🌾
                    </Badge>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground">
                        Segar dari{" "}
                        <span className="text-primary relative">
                            Laut
                            <svg
                                className="absolute -bottom-2 left-0 w-full"
                                viewBox="0 0 200 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M2 8C30 2 60 2 100 6C140 10 170 4 198 2"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    opacity="0.4"
                                />
                            </svg>
                        </span>{" "}
                        &{" "}
                        <span className="text-emerald">Bumi</span>
                    </h1>

                    <p className="mt-6 md:mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Platform marketplace terpercaya untuk produk segar hasil laut dan
                        pertanian. Langsung dari{" "}
                        <strong className="text-foreground">nelayan</strong> &{" "}
                        <strong className="text-foreground">petani</strong> Indonesia ke
                        meja makan Anda.
                    </p>

                    <div className="mt-8 md:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button
                            asChild
                            size="lg"
                            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 h-12 text-base shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
                        >
                            <Link href="/katalog">
                                Jelajahi Produk
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                        <Button
                            asChild
                            variant="outline"
                            size="lg"
                            className="px-8 h-12 text-base border-primary/30 text-primary hover:bg-primary/5"
                        >
                            <Link href="/login">
                                <Sprout className="mr-2 h-4 w-4" />
                                Mulai Berjualan
                            </Link>
                        </Button>
                    </div>

                    {/* Stats */}
                    <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-3xl mx-auto">
                        {[
                            { value: "2,500+", label: "Produk Segar", icon: Fish },
                            { value: "800+", label: "Petani & Nelayan", icon: Sprout },
                            { value: "50+", label: "Kota Terjangkau", icon: Truck },
                            { value: "99%", label: "Lolos Kualitas", icon: ShieldCheck },
                        ].map((stat) => (
                            <div key={stat.label} className="text-center group">
                                <div className="flex items-center justify-center mb-2">
                                    <stat.icon className="h-5 w-5 text-primary/60 group-hover:text-primary transition-colors" />
                                </div>
                                <div className="text-2xl md:text-3xl font-bold text-foreground">
                                    {stat.value}
                                </div>
                                <div className="text-xs md:text-sm text-muted-foreground mt-0.5">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

/* =============================================
   CATEGORIES SECTION
   ============================================= */
const categories = [
    {
        title: "Hasil Laut",
        description: "Ikan, udang, cumi, kerang langsung dari nelayan",
        icon: Fish,
        color: "bg-ocean/10 text-ocean hover:bg-ocean/20",
        count: "850+ produk",
    },
    {
        title: "Sayur & Buah",
        description: "Sayuran segar dan buah-buahan organik pilihan",
        icon: Sprout,
        color: "bg-emerald/10 text-emerald hover:bg-emerald/20",
        count: "620+ produk",
    },
    {
        title: "Daging & Ternak",
        description: "Daging sapi, ayam, dan hasil peternakan berkualitas",
        icon: Beef,
        color: "bg-amber/10 text-amber hover:bg-amber/20",
        count: "340+ produk",
    },
    {
        title: "Olahan Pangan",
        description: "Produk olahan UMKM: ikan asin, kerupuk, sambal",
        icon: ChefHat,
        color: "bg-primary/10 text-primary hover:bg-primary/20",
        count: "480+ produk",
    },
];

export function CategoriesSection() {
    return (
        <section className="py-16 md:py-24 bg-stone-50/50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <Badge
                        variant="secondary"
                        className="mb-4 bg-emerald/10 text-emerald border-emerald/20"
                    >
                        <Wheat className="mr-1.5 h-3.5 w-3.5" />
                        Kategori Pilihan
                    </Badge>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                        Temukan Produk <span className="text-primary">Segar</span> Anda
                    </h2>
                    <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
                        Dari laut dalam hingga kebun hijau, semua tersedia dengan jaminan
                        kualitas.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {categories.map((cat) => (
                        <Link
                            key={cat.title}
                            href={`/katalog?kategori=${cat.title.toLowerCase().replace(/ & /g, "-")}`}
                            className="card-hover-lift group relative rounded-xl border border-border/40 bg-card p-6 hover:border-primary/30"
                        >
                            <div
                                className={`inline-flex items-center justify-center h-12 w-12 rounded-lg ${cat.color} transition-colors mb-4`}
                            >
                                <cat.icon className="h-6 w-6" />
                            </div>
                            <h3 className="font-semibold text-lg text-card-foreground group-hover:text-primary transition-colors">
                                {cat.title}
                            </h3>
                            <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                                {cat.description}
                            </p>
                            <div className="mt-3 text-xs font-medium text-primary/70">
                                {cat.count}
                            </div>
                            <ArrowRight className="absolute top-6 right-6 h-4 w-4 text-muted-foreground/30 group-hover:text-primary transition-all group-hover:translate-x-1" />
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* =============================================
   HOW IT WORKS SECTION
   ============================================= */
const steps = [
    {
        step: "01",
        title: "Pilih Produk",
        description: "Jelajahi katalog produk segar dari petani dan nelayan lokal.",
        icon: Fish,
    },
    {
        step: "02",
        title: "Pesan & Bayar",
        description:
            "Checkout aman dengan sistem escrow — dana Anda terlindungi.",
        icon: ShieldCheck,
    },
    {
        step: "03",
        title: "Quality Check",
        description:
            "Tim Hub kami memastikan setiap produk lolos standar kesegaran.",
        icon: Sprout,
    },
    {
        step: "04",
        title: "Terima di Rumah",
        description:
            "Produk diantar dalam box pendingin untuk menjaga kesegaran.",
        icon: Truck,
    },
];

export function HowItWorksSection() {
    return (
        <section className="py-16 md:py-24 bg-background">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <Badge
                        variant="secondary"
                        className="mb-4 bg-primary/10 text-primary border-primary/20"
                    >
                        <ShieldCheck className="mr-1.5 h-3.5 w-3.5" />
                        Proses Terjamin
                    </Badge>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                        Bagaimana <span className="text-primary">Maritani</span> Bekerja
                    </h2>
                    <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
                        Dari laut ke meja makan Anda — setiap langkah kami jaga kualitasnya.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {steps.map((item, i) => (
                        <div key={item.step} className="relative text-center group">
                            {/* Connector Line */}
                            {i < steps.length - 1 && (
                                <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary/30 to-primary/10" />
                            )}

                            <div className="relative mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/25">
                                <item.icon className="h-7 w-7" />
                            </div>
                            <div className="text-xs font-bold text-primary/50 uppercase tracking-widest mb-1">
                                Langkah {item.step}
                            </div>
                            <h3 className="font-semibold text-lg">{item.title}</h3>
                            <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* =============================================
   CTA SECTION
   ============================================= */
export function CTASection() {
    return (
        <section className="py-16 md:py-24 bg-gradient-to-b from-background via-stone-50/50 to-stone-100">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary/90 to-ocean p-10 md:p-16 text-center shadow-2xl shadow-primary/20">
                    {/* Background decorations */}
                    <div className="absolute top-0 right-0 opacity-10">
                        <Waves className="h-48 w-48" />
                    </div>
                    <div className="absolute bottom-0 left-0 opacity-10">
                        <Sprout className="h-40 w-40" />
                    </div>

                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground">
                            Siap Belanja Segar?
                        </h2>
                        <p className="mt-4 text-lg text-primary-foreground/80 max-w-xl mx-auto">
                            Bergabung dengan ribuan keluarga Indonesia yang sudah menikmati
                            produk segar langsung dari sumber.
                        </p>
                        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Button
                                asChild
                                size="lg"
                                className="bg-white text-primary hover:bg-white/90 px-8 h-12 text-base font-semibold shadow-lg"
                            >
                                <Link href="/katalog">
                                    Mulai Belanja
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                            <Button
                                asChild
                                variant="outline"
                                size="lg"
                                className="bg-transparent border-white/50 text-white hover:bg-white/10 hover:text-white px-8 h-12 text-base shadow-sm"
                            >
                                <Link href="/login">
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
