
import type { Metadata } from "next";
import { Geist, Geist_Mono, Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { auth } from "@/auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "Maritani — Marketplace Hasil Laut & Pertanian",
    template: "%s | Maritani",
  },
  description:
    "Platform e-commerce terpercaya untuk produk segar hasil laut dan pertanian langsung dari petani & nelayan Indonesia.",
  keywords: [
    "maritani",
    "marketplace",
    "hasil laut",
    "pertanian",
    "ikan segar",
    "sayur",
    "nelayan",
    "petani",
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="id">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${plusJakarta.variable} ${playfair.variable} antialiased flex flex-col min-h-screen`}
      >
        <Navbar session={session} />
        <main className="flex-1 pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
