"use client";

import Link from "next/link";
import {
  Mail,
  MapPin,
  MessageCircle,
  Instagram,
  Facebook,
  Twitter,
  ArrowRight,
} from "lucide-react";
import { MaritaniLogo } from "@/components/maritani-logo";

const footerLinks = {
  Produk: [
    { label: "Hasil Laut", href: "/katalog" },
    { label: "Sayur & Buah", href: "/katalog" },
    { label: "Daging & Ternak", href: "/katalog" },
    { label: "Olahan Pangan", href: "/katalog" },
  ],
  Perusahaan: [
    { label: "Tentang Kami", href: "/tentang" },
    { label: "Mitra Petani", href: "/tentang" },
    { label: "Karir", href: "#" },
    { label: "Blog", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-card border-t border-border pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand + Email subscription */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground">
                <MaritaniLogo size={18} />
              </div>
              <span className="font-bold text-xl text-foreground">
                Mari<span className="text-primary">tani</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Platform marketplace yang menghubungkan Anda langsung
              dengan ribuan nelayan dan petani lokal Indonesia.
            </p>
            <div className="flex flex-col space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Berlangganan Info Promo
              </p>
              <form className="flex gap-2">
                <input
                  className="w-full px-4 py-2 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:border-primary transition-colors"
                  placeholder="Email Anda"
                  type="email"
                />
                <button
                  type="button"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg px-3 py-2 flex items-center justify-center transition-colors"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-bold uppercase tracking-wider text-foreground mb-6">
                {title}
              </h4>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      className="text-sm text-muted-foreground hover:text-primary transition"
                      href={link.href}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-foreground mb-6">
              Hubungi Kami
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  className="flex items-center text-sm text-muted-foreground hover:text-primary transition"
                  href="#"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  className="flex items-center text-sm text-muted-foreground hover:text-primary transition"
                  href="mailto:halo@maritani.id"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  halo@maritani.id
                </a>
              </li>
              <li>
                <span className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2" />
                  Jakarta, Indonesia
                </span>
              </li>
            </ul>
            <div className="mt-6 flex space-x-4">
              {[
                { icon: Instagram, label: "Instagram" },
                { icon: Facebook, label: "Facebook" },
                { icon: Twitter, label: "Twitter" },
              ].map((social) => (
                <a
                  key={social.label}
                  className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                  href="#"
                >
                  <social.icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © 2024 Maritani. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link
              className="text-xs text-muted-foreground hover:text-primary transition"
              href="#"
            >
              Privasi
            </Link>
            <Link
              className="text-xs text-muted-foreground hover:text-primary transition"
              href="#"
            >
              Syarat
            </Link>
            <span className="text-xs text-border">|</span>
            <span className="text-xs text-muted-foreground">
              BCA Mandiri Gopay
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
