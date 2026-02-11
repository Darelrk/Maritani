"use client";

import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  TrendingUp,
  Users,
  Gavel,
  Clock,
  CheckCircle2,
  ShieldCheck,
  Truck,
  Store,
  ChevronLeft,
  ChevronRight,
  Trophy,
  Info,
} from "lucide-react";
import { formatRupiah } from "@/lib/utils";
import Image from "next/image";

// =============================================================================
// DATA
// =============================================================================
interface Auction {
  id: string;
  name: string;
  image: string;
  category: string;
  categoryIcon: "water" | "leaf" | "meat";
  startingPrice: number;
  currentBid: number;
  bidCount: number;
  endTime: Date;
  status: "ACTIVE" | "UPCOMING" | "ENDED";
  seller: { name: string };
  bidIncrement: number;
  activity: string;
}

const AUCTIONS: Auction[] = [
  {
    id: "1",
    name: "Ikan Tuna Sirip Kuning Premium (5kg)",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA-AcbjulucycBhJoNQuMM3vA_8nsiAdb-9LN6jronViXfgEbvb4xtclR081c3GgPXggm0hSJyT2ezhy-pA-8VfwRSl8a7jctZCQs3onoVwFPDRL2BkNi8XITxe1cD5mQc6LFFVYLav0TPTIZyR2irVu-tktpSgSmS-66FiPm-ykbVd_afsIzV2TuJp1eug93PrIUiYudkzqm69xYbVlh4nI3zRVPS2feJPZ0zoyP6bNB062qtPF_-e_WTSi_KG9fs1mwBFPG1YwnJE",
    category: "Hasil Laut",
    categoryIcon: "water",
    startingPrice: 350000,
    currentBid: 425000,
    bidCount: 12,
    endTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
    status: "ACTIVE",
    seller: { name: "Nelayan Cilacap Jaya" },
    bidIncrement: 10000,
    activity: "3 penawaran baru dalam 1 jam terakhir",
  },
  {
    id: "2",
    name: "Udang Vaname Super Jumbo (2kg)",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDTZ9sRyYN9zIZOsuP37to94eOF9-vFQIuzSAzsMqwZqU87lZLXTFBlNy3nF5NRJaCDNrU0tBVS7iz1vzXSOD2goD5rHden4jqwgmXaHc1wdsZIZq-pFWZ4d1paedbYWLHFSF1NEo5gxaM_vbVEic_cwZA2gFaIL-zYTCs0-L-XV0P-UqyS76KE1hDsmGLzcS-Dkf-7wzyPfVk21SnX_96qPktmLYj_E5Et1g20Tq4IaQaY4wLvmXkYFBv935zZ8BqRvxTj1iSRgkg4",
    category: "Hasil Laut",
    categoryIcon: "water",
    startingPrice: 180000,
    currentBid: 220000,
    bidCount: 8,
    endTime: new Date(Date.now() + 5 * 60 * 60 * 1000),
    status: "ACTIVE",
    seller: { name: "Tambak Udang Banyuwangi" },
    bidIncrement: 5000,
    activity: "Terakhir dibid 5 menit lalu",
  },
  {
    id: "3",
    name: "Daging Sapi Wagyu Lokal (2kg)",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBosNehon-1OZ8Iw6bmUrpuqD-PfPTtmoeyzUTpe0orzIRRXNO5FcTqQAZgveMPvJU8UxH2FpS743wuBdtlZibEQVXcbrpRKXRmZ1gDNNlSnPP_yJcXe3UcOXfOV-zqLrQrNrT4LdWpCBZPxk9yMoLJflu3B5sdVC5iMLnZkxQzsg-NSdAg2vZKMMuxFrDnjwemn0uhcqNTzKUjbctbuBOo6UvTwrkl-IYSNPLfUMVYjxJ1XfnoRTsp-aoUlJyNipzW_uoURf0ARHdF",
    category: "Daging",
    categoryIcon: "meat",
    startingPrice: 280000,
    currentBid: 320000,
    bidCount: 6,
    endTime: new Date(Date.now() + 30 * 60 * 60 * 1000),
    status: "ACTIVE",
    seller: { name: "Peternakan Sapi Boyolali" },
    bidIncrement: 10000,
    activity: "Penawaran minimal tercapai",
  },
  {
    id: "4",
    name: "Paket Sayur Organik (10 jenis)",
    image:
      "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80&w=800",
    category: "Sayur & Buah",
    categoryIcon: "leaf",
    startingPrice: 95000,
    currentBid: 120000,
    bidCount: 15,
    endTime: new Date(Date.now() + 12 * 60 * 60 * 1000),
    status: "ACTIVE",
    seller: { name: "Kebun Hijau Lembang" },
    bidIncrement: 5000,
    activity: "5 penawaran baru dalam 30 menit terakhir",
  },
  {
    id: "5",
    name: "Kepiting Bakau Hidup (3 ekor)",
    image:
      "https://images.unsplash.com/photo-1559742811-822873691df8?auto=format&fit=crop&q=80&w=800",
    category: "Hasil Laut",
    categoryIcon: "water",
    startingPrice: 250000,
    currentBid: 250000,
    bidCount: 0,
    endTime: new Date(Date.now() + 8 * 60 * 60 * 1000),
    status: "ACTIVE",
    seller: { name: "Nelayan Mangrove" },
    bidIncrement: 15000,
    activity: "Belum ada penawaran",
  },
  {
    id: "6",
    name: "Alpukat Mentega Jumbo (10 buah)",
    image:
      "https://images.unsplash.com/photo-1601039641847-7857b994d704?auto=format&fit=crop&q=80&w=800",
    category: "Sayur & Buah",
    categoryIcon: "leaf",
    startingPrice: 75000,
    currentBid: 75000,
    bidCount: 0,
    endTime: new Date(Date.now() + 24 * 60 * 60 * 1000),
    status: "ACTIVE",
    seller: { name: "Kebun Alpukat Garut" },
    bidIncrement: 3000,
    activity: "Belum ada penawaran",
  },
];

// =============================================================================
// COUNTDOWN TIMER — Premium dark overlay style (Stitch)
// =============================================================================
function CountdownTimer({ endTime }: { endTime: Date }) {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calc = () => {
      const diff = endTime.getTime() - Date.now();
      if (diff > 0) {
        return {
          hours: Math.floor(diff / (1000 * 60 * 60)),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        };
      }
      return { hours: 0, minutes: 0, seconds: 0 };
    };
    setTimeLeft(calc());
    const timer = setInterval(() => setTimeLeft(calc()), 1000);
    return () => clearInterval(timer);
  }, [endTime]);

  return (
    <div className="bg-black/60 backdrop-blur-md rounded-lg px-3 py-1.5 flex gap-2 text-white border border-white/10">
      <div className="flex flex-col items-center">
        <span className="text-xs font-mono font-bold text-amber-400">
          {String(timeLeft.hours).padStart(2, "0")}
        </span>
        <span className="text-[10px] uppercase tracking-wider opacity-70">Jam</span>
      </div>
      <span className="text-xs font-bold text-white/40">:</span>
      <div className="flex flex-col items-center">
        <span className="text-xs font-mono font-bold">
          {String(timeLeft.minutes).padStart(2, "0")}
        </span>
        <span className="text-[10px] uppercase tracking-wider opacity-70">Mnt</span>
      </div>
      <span className="text-xs font-bold text-white/40">:</span>
      <div className="flex flex-col items-center">
        <span className="text-xs font-mono font-bold">
          {String(timeLeft.seconds).padStart(2, "0")}
        </span>
        <span className="text-[10px] uppercase tracking-wider opacity-70">Dtk</span>
      </div>
    </div>
  );
}

// =============================================================================
// CATEGORY ICON HELPER
// =============================================================================
function CategoryBadge({ icon, label }: { icon: string; label: string }) {
  const emojis: Record<string, string> = { water: "💧", leaf: "🌿", meat: "🥩" };
  return (
    <span className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-semibold px-2 py-1 rounded">
      <span className="text-sm">{emojis[icon] || "📦"}</span> {label}
    </span>
  );
}

// =============================================================================
// AUCTION CARD — Stitch Premium Design
// =============================================================================
function AuctionCard({ auction }: { auction: Auction }) {
  const [bidAmount, setBidAmount] = useState(
    formatBidValue(auction.currentBid + auction.bidIncrement)
  );

  return (
    <article className="group bg-card rounded-2xl shadow-lg overflow-hidden border border-border/40 hover:shadow-2xl transition-all duration-300 flex flex-col h-full">
      {/* Image with gradient overlay */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={auction.image}
          alt={auction.name}
          fill
          className="object-cover transform group-hover:scale-105 transition duration-700"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

        {/* Category badge — top left */}
        <div className="absolute top-4 left-4">
          <CategoryBadge icon={auction.categoryIcon} label={auction.category} />
        </div>

        {/* Countdown — top right */}
        <div className="absolute top-4 right-4">
          <CountdownTimer endTime={auction.endTime} />
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Title */}
        <h3 className="font-bold text-xl leading-tight text-foreground group-hover:text-primary transition-colors mb-2 font-heading">
          {auction.name}
        </h3>

        {/* Seller */}
        <div className="flex items-center gap-2 mb-4 text-xs text-muted-foreground border-b border-border/40 pb-4">
          <Store className="h-3.5 w-3.5" />
          <span>
            Oleh:{" "}
            <span className="font-medium text-foreground">{auction.seller.name}</span>
          </span>
        </div>

        {/* Price row */}
        <div className="flex justify-between items-end mb-6">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Bid Tertinggi Saat Ini</p>
            <p className="text-2xl font-bold text-primary font-mono">
              {formatRupiah(auction.currentBid)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground line-through">
              {formatRupiah(auction.startingPrice)}
            </p>
            <div
              className={`flex items-center gap-1 text-xs font-medium mt-1 px-1.5 py-0.5 rounded ${auction.bidCount > 0
                ? "text-emerald bg-emerald/10"
                : "text-muted-foreground"
                }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${auction.bidCount > 0
                  ? "bg-emerald animate-pulse"
                  : "bg-muted-foreground/40"
                  }`}
              />
              {auction.bidCount > 0
                ? `${auction.bidCount} penawar`
                : "Belum ada penawar"}
            </div>
          </div>
        </div>

        {/* Activity + Bid Input */}
        <div className="mt-auto space-y-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            {auction.bidCount > 0 ? (
              <TrendingUp className="h-3.5 w-3.5 text-amber-500" />
            ) : (
              <Info className="h-3.5 w-3.5" />
            )}
            <span>{auction.activity}</span>
          </div>

          {/* Bid input row */}
          <div className="flex gap-2">
            <div className="relative flex-grow">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">
                Rp
              </span>
              <input
                className="w-full pl-9 pr-16 py-2.5 bg-muted/50 border border-border rounded-lg text-foreground text-sm font-medium focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                type="text"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground bg-muted px-1 rounded">
                Min +{formatBidValue(auction.bidIncrement)}
              </span>
            </div>
            <button className="bg-primary hover:bg-primary/90 text-white font-medium px-6 py-2.5 rounded-lg shadow-lg hover:shadow-primary/30 transition-all flex items-center justify-center">
              Bid
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

function formatBidValue(value: number): string {
  return value.toLocaleString("id-ID");
}

// =============================================================================
// PANDUAN LELANG — 4-column timeline (Stitch)
// =============================================================================
function HowAuctionWorks() {
  const steps = [
    {
      icon: Search,
      title: "1. Pilih Produk",
      description:
        "Jelajahi katalog lelang eksklusif kami dan temukan produk segar yang sesuai keinginan Anda.",
      active: true,
    },
    {
      icon: Gavel,
      title: "2. Place Your Bid",
      description:
        "Masukkan penawaran harga. Sistem real-time kami akan memperbarui posisi Anda secara instan.",
      active: false,
    },
    {
      icon: Trophy,
      title: "3. Menangkan",
      description:
        "Jadilah penawar tertinggi saat waktu habis. Notifikasi kemenangan akan dikirim ke email & WhatsApp.",
      active: false,
    },
    {
      icon: Truck,
      title: "4. Terima Produk",
      description:
        "Produk segera dikemas dengan standar premium dan dikirim langsung ke pintu rumah Anda.",
      active: false,
    },
  ];

  return (
    <section className="py-24 bg-card relative overflow-hidden">
      {/* Decorative skew */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 skew-x-12 transform origin-top-right" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 inline-block">
            Panduan Lelang
          </span>
          <h2 className="text-4xl font-bold text-foreground mb-4 font-heading">
            Perjalanan <span className="text-primary">Lelang</span> Anda
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Sistem sederhana namun canggih untuk memastikan Anda mendapatkan produk
            terbaik dengan harga yang adil.
          </p>
        </div>

        {/* Steps — 4 columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.title} className="relative group">
              <div className="flex flex-col items-center text-center">
                {/* Circle icon */}
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg z-10 mb-6 group-hover:scale-110 transition duration-300 ${step.active
                    ? "bg-card border-4 border-primary text-primary"
                    : "bg-card border-4 border-border text-muted-foreground group-hover:border-primary group-hover:text-primary"
                    }`}
                >
                  <step.icon className="h-7 w-7" />
                </div>

                {/* Card */}
                <div className="bg-background p-6 rounded-xl border border-border shadow-sm w-full h-full transform transition duration-300 group-hover:-translate-y-2">
                  <h3 className="text-lg font-bold text-foreground mb-2 font-heading">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="mt-20 flex flex-wrap justify-center gap-6 md:gap-12 opacity-80 border-t border-border pt-10">
          {[
            { icon: ShieldCheck, text: "Garansi Uang Kembali" },
            { icon: Clock, text: "Pengiriman 24 Jam" },
            { icon: TrendingUp, text: "Bid Real-time" },
            { icon: CheckCircle2, text: "Produk Segar" },
          ].map((item) => (
            <div
              key={item.text}
              className="flex items-center gap-2 text-muted-foreground text-sm font-medium"
            >
              <item.icon className="h-5 w-5 text-primary" />
              {item.text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// MAIN PAGE — Stitch Layout
// =============================================================================
export default function LelangPage() {
  const [activeTab, setActiveTab] = useState("active");

  const filteredAuctions = useMemo(() => {
    switch (activeTab) {
      case "active":
        return AUCTIONS.filter((a) => a.status === "ACTIVE");
      case "ending-soon":
        return AUCTIONS.filter((a) => {
          const hoursLeft =
            (a.endTime.getTime() - Date.now()) / (1000 * 60 * 60);
          return a.status === "ACTIVE" && hoursLeft <= 12;
        });
      case "new":
        return AUCTIONS.filter((a) => a.bidCount === 0);
      default:
        return AUCTIONS;
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-background">
      {/* ============================
          HERO — Background image + glass stats (Stitch)
          ============================ */}
      <header className="relative pt-32 pb-24 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsrZaMoZ9UL-jxB1jBwieXXM3UAcV30ysAcAgeoiWG3ptPAq-XAlQpw0yPPXEUemMr7M5mW9AuQct3eLDwDavO1JfzqZpISo8ic9TTsCWBDjhZLtsf7UbygaARTMbN104OE8y2KA3dl17aI1IKhqpkiK0mvRJIYkXAZeJKxbMQjqFc1-PX8viwafo_twEVUWObjOQlntJpUfURruOvfcLO7f9rrLFhcLwH73JOBmfXtSGekL5vEIY2PIBbFKe52e0riTT3sJ8zgM-O"
            alt="Fresh market produce"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/40 to-background" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 backdrop-blur-sm mb-6">
            <Gavel className="h-3.5 w-3.5" />
            <span className="text-xs font-semibold uppercase tracking-wider">
              Sistem Lelang Eksklusif
            </span>
          </div>

          {/* Heading */}
          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight font-heading"
          >
            Lelang <span className="text-primary italic">Produk Segar</span>
            <br />
            Premium
          </h1>

          <p className="text-lg md:text-xl text-foreground max-w-2xl mx-auto mb-12 font-medium leading-relaxed drop-shadow-sm">
            Dapatkan akses langsung ke hasil panen terbaik dan tangkapan laut
            segar melalui sistem penawaran transparan. Langsung dari produsen ke
            dapur Anda.
          </p>

          {/* Glass stat cards */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-12">
            {[
              { value: "6", label: "Lelang Aktif" },
              { value: "50+", label: "Petani & Nelayan" },
              { value: "40%", label: "Potensi Hemat" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white/70 backdrop-blur-xl border border-white/30 px-8 py-5 rounded-2xl flex flex-col items-center min-w-[140px] shadow-lg hover:-translate-y-1 transition duration-300"
              >
                <span className="text-4xl font-bold text-primary mb-1 font-heading">
                  {stat.value}
                </span>
                <span className="text-sm text-muted-foreground font-medium tracking-wide uppercase">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* ============================
          AUCTIONS GRID (Stitch)
          ============================ */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header + Filter tabs */}
          <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-10 pb-6 border-b border-border">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2 font-heading">
                Lelang Tersedia
              </h2>
              <p className="text-muted-foreground text-sm">
                Penawaran berakhir dalam waktu dekat.
              </p>
            </div>

            {/* Segmented control tabs */}
            <div className="flex gap-1 mt-4 md:mt-0 bg-muted p-1 rounded-lg border border-border shadow-sm">
              {[
                { value: "active", label: "Aktif" },
                { value: "ending-soon", label: "Segera Berakhir" },
                { value: "new", label: "Baru" },
              ].map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setActiveTab(tab.value)}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${activeTab === tab.value
                    ? "bg-primary text-white shadow-sm"
                    : "text-muted-foreground hover:bg-card"
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Auction cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAuctions.map((auction) => (
              <AuctionCard key={auction.id} auction={auction} />
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-12 flex justify-center">
            <nav className="flex items-center space-x-2">
              <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-muted disabled:opacity-50 transition">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-medium shadow-md">
                1
              </button>
              <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-muted transition">
                2
              </button>
              <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-muted transition">
                3
              </button>
              <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-muted transition">
                <ChevronRight className="h-4 w-4" />
              </button>
            </nav>
          </div>
        </div>
      </section>

      {/* ============================
          PANDUAN LELANG (Stitch)
          ============================ */}
      <HowAuctionWorks />
    </div>
  );
}
