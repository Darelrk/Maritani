"use client";

import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { 
  Fish, 
  Timer, 
  TrendingUp, 
  Users, 
  Gavel, 
  ArrowRight,
  Clock,
  CheckCircle2,
  ShieldCheck,
  Truck
} from "lucide-react";
import { formatRupiah } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

// Dummy Auction Data
interface Auction {
  id: string;
  name: string;
  image: string;
  category: string;
  startingPrice: number;
  currentBid: number;
  bidCount: number;
  endTime: Date;
  status: "ACTIVE" | "UPCOMING" | "ENDED";
  seller: {
    name: string;
    location: string;
  };
  bidIncrement: number;
}

const AUCTIONS: Auction[] = [
  {
    id: "1",
    name: "Ikan Tuna Sirip Kuning Premium (5kg)",
    image: "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?auto=format&fit=crop&q=80&w=800",
    category: "Hasil Laut",
    startingPrice: 350000,
    currentBid: 425000,
    bidCount: 12,
    endTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
    status: "ACTIVE",
    seller: { name: "Nelayan Cilacap Jaya", location: "Cilacap, Jawa Tengah" },
    bidIncrement: 10000,
  },
  {
    id: "2",
    name: "Udang Vaname Super Jumbo (2kg)",
    image: "https://images.unsplash.com/photo-1565680018446-7e8ee99eb654?auto=format&fit=crop&q=80&w=800",
    category: "Hasil Laut",
    startingPrice: 180000,
    currentBid: 220000,
    bidCount: 8,
    endTime: new Date(Date.now() + 5 * 60 * 60 * 1000), // 5 hours from now
    status: "ACTIVE",
    seller: { name: "Tambak Udang Banyuwangi", location: "Banyuwangi, Jawa Timur" },
    bidIncrement: 5000,
  },
  {
    id: "3",
    name: "Kepiting Bakau Hidup (3 ekor)",
    image: "https://images.unsplash.com/photo-1559742811-822873691df8?auto=format&fit=crop&q=80&w=800",
    category: "Hasil Laut",
    startingPrice: 250000,
    currentBid: 250000,
    bidCount: 0,
    endTime: new Date(Date.now() + 8 * 60 * 60 * 1000), // 8 hours from now
    status: "ACTIVE",
    seller: { name: "Nelayan Mangrove", location: "Balikpapan, Kalimantan Timur" },
    bidIncrement: 15000,
  },
  {
    id: "4",
    name: "Paket Sayur Organik (10 jenis)",
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80&w=800",
    category: "Sayur & Buah",
    startingPrice: 95000,
    currentBid: 120000,
    bidCount: 15,
    endTime: new Date(Date.now() + 12 * 60 * 60 * 1000), // 12 hours from now
    status: "ACTIVE",
    seller: { name: "Kebun Hijau Lembang", location: "Bandung, Jawa Barat" },
    bidIncrement: 5000,
  },
  {
    id: "5",
    name: "Alpukat Mentega Jumbo (10 buah)",
    image: "https://images.unsplash.com/photo-1523049673856-382a62v97529q?auto=format&fit=crop&q=80&w=800",
    category: "Sayur & Buah",
    startingPrice: 75000,
    currentBid: 75000,
    bidCount: 0,
    endTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
    status: "ACTIVE",
    seller: { name: "Kebun Alpukat Garut", location: "Garut, Jawa Barat" },
    bidIncrement: 3000,
  },
  {
    id: "6",
    name: "Daging Sapi Wagyu Lokal (2kg)",
    image: "https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1?auto=format&fit=crop&q=80&w=800",
    category: "Daging",
    startingPrice: 280000,
    currentBid: 320000,
    bidCount: 6,
    endTime: new Date(Date.now() + 30 * 60 * 60 * 1000), // 30 hours from now
    status: "ACTIVE",
    seller: { name: "Peternakan Sapi Boyolali", location: "Boyolali, Jawa Tengah" },
    bidIncrement: 10000,
  },
];

// Countdown Timer Component
function CountdownTimer({ endTime }: { endTime: Date }) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = endTime.getTime() - new Date().getTime();
      
      if (difference > 0) {
        return {
          hours: Math.floor(difference / (1000 * 60 * 60)),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      
      return { hours: 0, minutes: 0, seconds: 0 };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  return (
    <div className="flex items-center gap-1 text-sm font-mono">
      <span className="bg-primary/10 text-primary px-2 py-1 rounded">
        {String(timeLeft.hours).padStart(2, "0")}
      </span>
      <span className="text-muted-foreground">:</span>
      <span className="bg-primary/10 text-primary px-2 py-1 rounded">
        {String(timeLeft.minutes).padStart(2, "0")}
      </span>
      <span className="text-muted-foreground">:</span>
      <span className="bg-primary/10 text-primary px-2 py-1 rounded">
        {String(timeLeft.seconds).padStart(2, "0")}
      </span>
    </div>
  );
}

// Auction Card Component
function AuctionCard({ auction }: { auction: Auction }) {
  const [bidAmount, setBidAmount] = useState(auction.currentBid + auction.bidIncrement);

  return (
    <Card className="card-hover-lift overflow-hidden border-border/40">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <Image
          src={auction.image}
          alt={auction.name}
          fill
          className="object-cover"
        />
        <Badge className="absolute top-3 left-3 bg-primary text-white border-none">
          <Gavel className="mr-1 h-3 w-3" />
          Lelang
        </Badge>
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-xs font-medium">
          <CountdownTimer endTime={auction.endTime} />
        </div>
      </div>

      <CardContent className="p-4 space-y-3">
        {/* Category & Bid Count */}
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-[10px] border-primary/20 text-primary">
            {auction.category}
          </Badge>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Users className="h-3 w-3" />
            <span>{auction.bidCount} bid</span>
          </div>
        </div>

        {/* Product Name */}
        <h3 className="font-semibold text-sm leading-snug line-clamp-2">
          {auction.name}
        </h3>

        {/* Seller */}
        <p className="text-xs text-muted-foreground">
          Oleh: <span className="font-medium text-foreground">{auction.seller.name}</span>
        </p>

        {/* Price Info */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Harga Awal</span>
            <span className="text-xs line-through text-muted-foreground">
              {formatRupiah(auction.startingPrice)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-primary">Bid Tertinggi</span>
            <span className="text-lg font-bold text-primary">
              {formatRupiah(auction.currentBid)}
            </span>
          </div>
        </div>

        {/* Bid Input & Button */}
        <div className="pt-2 border-t border-border/40 space-y-2">
          <div className="flex gap-2">
            <Input
              type="number"
              value={bidAmount}
              onChange={(e) => {
                const value = Number(e.target.value);
                const minBid = auction.currentBid + auction.bidIncrement;
                const maxBid = auction.currentBid + (auction.bidIncrement * 100); // Reasonable max
                if (value < minBid) {
                  setBidAmount(minBid);
                } else if (value > maxBid) {
                  setBidAmount(maxBid);
                } else {
                  setBidAmount(value);
                }
              }}
              className="h-9 text-sm"
              min={auction.currentBid + auction.bidIncrement}
              step={auction.bidIncrement}
            />
            <Button 
              size="sm" 
              className="h-9 px-4 bg-primary hover:bg-primary/90"
              disabled={bidAmount < auction.currentBid + auction.bidIncrement}
            >
              Bid
            </Button>
          </div>
          <p className="text-[10px] text-muted-foreground text-center">
            Min. bid: +{formatRupiah(auction.bidIncrement)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

// Interactive Auction Journey Section
function HowAuctionWorks() {
  const [activeStep, setActiveStep] = useState(0);

  const journeySteps = [
    {
      icon: Gavel,
      title: "Pilih Produk",
      description: "Jelajahi katalog lelang dan pilih produk segar yang Anda inginkan",
      tip: "Min. bid: Rp 1.000 - Rp 15.000",
      duration: "Waktu: 2 - 72 jam",
    },
    {
      icon: TrendingUp,
      title: "Place Your Bid",
      description: "Masukkan harga tertinggi Anda untuk memenangkan lelang",
      tip: "Bid harus kelipatan min. increment",
      duration: "Realtime bidding",
    },
    {
      icon: CheckCircle2,
      title: "Menangkan",
      description: "Jadilah bidder dengan harga tertinggi saat waktu lelang habis",
      tip: "Notifikasi langsung ke email & WhatsApp",
      duration: "Bayar dalam 24 jam",
    },
    {
      icon: Truck,
      title: "Terima Produk",
      description: "Produk segar dikemas dan dikirim langsung ke rumah Anda",
      tip: "Garansi uang kembali 100%",
      duration: "Pengiriman 24 jam",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-background via-primary/5 to-background">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <Badge className="mb-3 bg-primary text-white border-primary hover:bg-primary/90">
            <Clock className="mr-1 h-3 w-3" />
            Panduan Lelang
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight mb-2">
            Perjalanan <span className="text-primary">Lelang</span> Anda
          </h2>
          <p className="text-muted-foreground">
            Klik setiap langkah untuk melihat detail
          </p>
        </div>

        {/* Interactive Journey Cards */}
        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary/20 via-primary to-primary/20 -translate-y-1/2 rounded-full" />
          
          {/* Steps Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative">
            {journeySteps.map((step, index) => (
              <button
                key={step.title}
                onClick={() => setActiveStep(index)}
                className={`relative group text-left transition-all duration-300 ${
                  activeStep === index ? "scale-105 z-10" : "hover:scale-102"
                }`}
              >
                <Card 
                  className={`h-full transition-all duration-300 overflow-hidden ${
                    activeStep === index 
                      ? "border-primary shadow-lg shadow-primary/20 bg-white" 
                      : "border-border/40 bg-white/80 hover:bg-white hover:border-primary/30"
                  }`}
                >
                  {/* Step Number Badge */}
                  <div className={`absolute top-0 right-0 w-8 h-8 flex items-center justify-center text-xs font-bold rounded-bl-xl transition-colors ${
                    activeStep === index 
                      ? "bg-primary text-white" 
                      : "bg-muted text-muted-foreground"
                  }`}>
                    {index + 1}
                  </div>

                  <CardContent className="p-5">
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-all duration-300 ${
                      activeStep === index 
                        ? "bg-primary text-white scale-110" 
                        : "bg-primary/10 text-primary group-hover:bg-primary/20"
                    }`}>
                      <step.icon className="h-6 w-6" />
                    </div>

                    {/* Content */}
                    <h3 className={`font-bold mb-1 transition-colors ${
                      activeStep === index ? "text-primary" : "text-foreground"
                    }`}>
                      {step.title}
                    </h3>
                    
                    <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Interactive Details - Always visible but highlighted when active */}
                    <div className={`space-y-1.5 pt-3 border-t border-dashed transition-opacity ${
                      activeStep === index ? "opacity-100" : "opacity-60"
                    }`}>
                      <div className="flex items-center gap-1.5 text-[10px]">
                        <ShieldCheck className={`h-3 w-3 ${activeStep === index ? "text-emerald" : "text-muted-foreground"}`} />
                        <span className="text-muted-foreground">{step.tip}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px]">
                        <Timer className={`h-3 w-3 ${activeStep === index ? "text-amber" : "text-muted-foreground"}`} />
                        <span className="text-muted-foreground">{step.duration}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Active Indicator */}
                {activeStep === index && (
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rounded-full animate-bounce" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Summary - Shows all rules in a unified way */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {[
            { icon: ShieldCheck, text: "Garansi Uang Kembali" },
            { icon: Timer, text: "Pengiriman 24 Jam" },
            { icon: TrendingUp, text: "Bid Real-time" },
            { icon: CheckCircle2, text: "Produk Segar" },
          ].map((item) => (
            <div 
              key={item.text}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full border border-border/40 text-xs text-muted-foreground hover:border-primary/30 hover:text-primary transition-colors cursor-default"
            >
              <item.icon className="h-3.5 w-3.5" />
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Main Page Component
export default function LelangPage() {
  const [activeTab, setActiveTab] = useState("active");

  const filteredAuctions = useMemo(() => {
    switch (activeTab) {
      case "active":
        return AUCTIONS.filter((a) => a.status === "ACTIVE");
      case "ending-soon":
        return AUCTIONS.filter((a) => {
          const hoursLeft = (a.endTime.getTime() - Date.now()) / (1000 * 60 * 60);
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
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-stone-50 to-ocean/5 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
              <Gavel className="mr-1.5 h-3.5 w-3.5" />
              Sistem Lelang Produk Segar
            </Badge>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              Lelang <span className="text-primary">Produk Segar</span>
            </h1>

            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              Dapatkan produk segar berkualitas dengan harga terbaik melalui sistem lelang kami. 
              Langsung dari petani & nelayan ke meja makan Anda.
            </p>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-3 gap-6 max-w-xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">6</div>
                <div className="text-sm text-muted-foreground">Lelang Aktif</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">Petani & Nelayan</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">40%</div>
                <div className="text-sm text-muted-foreground">Potensi Hemat</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Auctions Grid */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            <h2 className="text-2xl font-bold">Lelang Tersedia</h2>
            <div className="flex gap-2">
              {[
                { value: "active", label: "Aktif" },
                { value: "ending-soon", label: "Segera Berakhir" },
                { value: "new", label: "Baru" },
              ].map((tab) => (
                <Button
                  key={tab.value}
                  variant={activeTab === tab.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveTab(tab.value)}
                  className={activeTab === tab.value ? "bg-primary" : ""}
                >
                  {tab.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAuctions.map((auction) => (
              <AuctionCard key={auction.id} auction={auction} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works & Rules */}
      <HowAuctionWorks />
    </div>
  );
}
