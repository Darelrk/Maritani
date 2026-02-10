"use client";

import Link from "next/link";
import {
  Fish,
  Mail,
  MapPin,
  Phone,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  ArrowRight,
  ExternalLink,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const footerLinks = {
  Produk: [
    { label: "Hasil Laut", href: "/katalog?kategori=hasil-laut" },
    { label: "Sayur & Buah", href: "/katalog?kategori=sayur-buah" },
    { label: "Daging & Ternak", href: "/katalog?kategori=daging-ternak" },
    { label: "Olahan Pangan", href: "/katalog?kategori=olahan-pangan" },
  ],
  Perusahaan: [
    { label: "Tentang Kami", href: "/tentang" },
    { label: "Mitra Petani", href: "/mitra" },
    { label: "Karir", href: "/karir" },
    { label: "Blog", href: "/blog" },
  ],
  Bantuan: [
    { label: "Pusat Bantuan", href: "/bantuan" },
    { label: "Cara Belanja", href: "/cara-belanja" },
    { label: "Pengiriman", href: "/pengiriman" },
    { label: "Kontak", href: "/kontak" },
  ],
};

// Animated Wave SVG Component
function AnimatedWave() {
  return (
    <div className="absolute top-0 left-0 w-full overflow-hidden leading-none -translate-y-[95%] pointer-events-none z-0">
      <svg
        className="relative block w-[200%] h-8 md:h-12 animate-wave-flow"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,60 C150,90 350,30 600,60 C850,90 1050,30 1200,60 L1200,120 L0,120 Z"
          fill="url(#waveGradient)"
          opacity="0.9"
        />
        <path
          d="M0,40 C200,70 400,10 600,40 C800,70 1000,10 1200,40 L1200,120 L0,120 Z"
          fill="url(#waveGradient2)"
          opacity="0.6"
        />
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0d9488" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#f5f5f4" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#f5f5f4" />
          </linearGradient>
          <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.1" />
            <stop offset="60%" stopColor="#e7e5e4" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#f5f5f4" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="relative bg-stone-100 pt-4 pb-6 mt-8">
      {/* Animated Wave Divider */}
      <AnimatedWave />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content - Compact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-start">
          
          {/* Brand Section - 5 cols */}
          <div className="lg:col-span-5 space-y-4">
            {/* Logo */}
            <Link href="/" className="inline-flex items-center gap-2 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-transform group-hover:scale-110">
                <Fish className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                Mari<span className="text-primary">tani</span>
              </span>
            </Link>
            
            <p className="text-sm text-stone-600 leading-relaxed max-w-xs">
              Platform marketplace yang menghubungkan Anda langsung dengan ribuan nelayan dan petani lokal Indonesia.
            </p>

            {/* Newsletter - Compact */}
            <div className="space-y-2">
              <p className="text-xs font-medium text-stone-500">Berlangganan info promo</p>
              <div className="flex gap-2 max-w-xs">
                <Input
                  type="email"
                  placeholder="Email Anda"
                  className="h-9 text-sm bg-white/80 border-stone-200 focus:border-primary"
                />
                <Button size="sm" className="h-9 px-3 bg-primary hover:bg-primary/90">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Links Sections - 4 cols */}
          <div className="lg:col-span-4 grid grid-cols-3 gap-4">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h4 className="text-xs font-semibold text-stone-900 mb-3 uppercase tracking-wider">
                  {title}
                </h4>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-xs text-stone-600 hover:text-primary transition-colors inline-flex items-center gap-1 group"
                      >
                        {link.label}
                        <ExternalLink className="w-0 h-3 opacity-0 group-hover:w-3 group-hover:opacity-100 transition-all" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact & Social - 3 cols */}
          <div className="lg:col-span-3 space-y-4">
            {/* Contact Info */}
            <div className="space-y-2">
              <h4 className="text-xs font-semibold text-stone-900 mb-3 uppercase tracking-wider">
                Hubungi Kami
              </h4>
              <div className="space-y-2">
                <a 
                  href="https://wa.me/622155667788" 
                  className="flex items-center gap-2 text-xs text-stone-600 hover:text-primary transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <MessageCircle className="h-3 w-3 text-primary" />
                  </div>
                  <span>WhatsApp</span>
                </a>
                <a 
                  href="mailto:halo@maritani.id" 
                  className="flex items-center gap-2 text-xs text-stone-600 hover:text-primary transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <Mail className="h-3 w-3 text-primary" />
                  </div>
                  <span>halo@maritani.id</span>
                </a>
                <div className="flex items-center gap-2 text-xs text-stone-600">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <MapPin className="h-3 w-3 text-primary" />
                  </div>
                  <span>Jakarta, Indonesia</span>
                </div>
              </div>
            </div>

            {/* Social Icons - Compact */}
            <div className="flex gap-2">
              {[
                { icon: Instagram, href: "#", label: "Instagram" },
                { icon: Facebook, href: "#", label: "Facebook" },
                { icon: Twitter, href: "#", label: "Twitter" },
                { icon: Youtube, href: "#", label: "Youtube" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded-full bg-white/80 border border-stone-200 flex items-center justify-center text-stone-500 hover:bg-primary hover:text-white hover:border-primary transition-all"
                >
                  <Icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar - Minimal */}
        <div className="mt-8 pt-4 border-t border-stone-200">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-stone-500">
              © 2026 Maritani. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link href="/privasi" className="text-xs text-stone-500 hover:text-primary transition-colors">
                Privasi
              </Link>
              <Link href="/syarat" className="text-xs text-stone-500 hover:text-primary transition-colors">
                Syarat
              </Link>
              <div className="flex items-center gap-2 text-[10px] text-stone-400">
                <span className="font-medium">BCA</span>
                <span className="font-medium">Mandiri</span>
                <span className="font-medium">Gopay</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
