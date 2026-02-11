"use client";

import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MaritaniLogoMark } from "@/components/maritani-logo";
import {
  Waves,
  Sprout,
  Heart,
  ShieldCheck,
  Users,
  TrendingUp,
  MapPin,
  Award,
  ArrowRight,
  Mail,
  Phone,
  Linkedin,
  CheckCircle2,
  Leaf,
  Recycle,
  HandHeart,
  Rocket,
} from "lucide-react";
import Link from "next/link";

// Counter Animation Hook
function useCountUp(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return { count, ref };
}

// =============================================
// HERO SECTION — Full-screen with gradient (Stitch)
// =============================================
function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-gradient-to-br from-primary/5 via-background to-emerald/5">
      {/* Decorative blurbs */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-56 h-56 bg-emerald/15 rounded-full blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
            <MaritaniLogoMark size={14} className="mr-1.5" />
            Tentang Kami
          </Badge>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight">
            Menghubungkan{" "}
            <span className="text-primary italic">Laut</span> dan{" "}
            <span className="text-emerald italic">Darat</span>
          </h1>

          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Maritani lahir dari keresahan akan kesenjangan harga dan akses antara
            petani, nelayan, dan konsumen. Kami hadir untuk menciptakan ekosistem
            yang adil dan saling menguntungkan.
          </p>
        </div>
      </div>
    </section>
  );
}

// =============================================
// STATS — Glassmorphism Cards (Stitch)
// =============================================
function StatsSection() {
  const stats = [
    { value: 2500, suffix: "+", label: "Produk Segar", icon: Waves },
    { value: 800, suffix: "+", label: "Mitra Petani & Nelayan", icon: Sprout },
    { value: 50, suffix: "+", label: "Kota Terjangkau", icon: MapPin },
    { value: 99, suffix: "%", label: "Tingkat Kepuasan", icon: Heart },
  ];

  return (
    <section className="relative -mt-10 pb-16 z-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const { count, ref } = useCountUp(stat.value);
            return (
              <div
                key={stat.label}
                ref={ref}
                className="glass-card rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-3">
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-foreground">
                  {count}
                  {stat.suffix}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// =============================================
// VISION & MISSION — Gradient Card (Stitch)
// =============================================
function VisionMission() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            <Rocket className="mr-1 h-3 w-3" />
            Visi & Misi
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Mengapa <span className="text-primary italic">Maritani</span> Ada?
          </h2>
        </div>

        {/* Vision — Gradient Card */}
        <div className="mb-8 rounded-3xl overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-emerald p-10 md:p-14 text-center shadow-2xl shadow-primary/20">
          <Rocket className="h-10 w-10 text-white/80 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-4">Visi Kami</h3>
          <p className="text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">
            Menjadi marketplace hasil laut dan pertanian terbesar di Indonesia yang
            memberdayakan petani dan nelayan lokal, serta menyediakan produk segar
            berkualitas tinggi untuk seluruh masyarakat Indonesia.
          </p>
        </div>

        {/* Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: Heart,
              title: "Fair Trade",
              description:
                "Memastikan harga adil untuk petani dan nelayan, serta produk berkualitas untuk konsumen.",
              color: "bg-rose-50 text-rose-500",
              iconBg: "bg-rose-100",
            },
            {
              icon: ShieldCheck,
              title: "Fresh Delivery",
              description:
                "Pengiriman dalam 24 jam dengan sistem cold chain untuk menjaga kesegaran optimal.",
              color: "bg-emerald-50 text-emerald",
              iconBg: "bg-emerald/10",
            },
            {
              icon: Users,
              title: "Community",
              description:
                "Membangun ekosistem yang saling menguntungkan antara produsen, konsumen, dan lingkungan.",
              color: "bg-sky-50 text-ocean",
              iconBg: "bg-ocean/10",
            },
          ].map((item) => (
            <Card key={item.title} className="border-border/40 card-hover-lift">
              <CardContent className="p-6">
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${item.iconBg} ${item.color} mb-4`}
                >
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// =============================================
// SUSTAINABILITY — 2-Column Layout (Stitch)
// =============================================
function SustainabilitySection() {
  const commitments = [
    {
      icon: Leaf,
      title: "Eco-friendly Packaging",
      description:
        "Kemasan ramah lingkungan yang dapat didaur ulang dan terurai secara alami.",
    },
    {
      icon: Recycle,
      title: "Zero Waste Initiative",
      description:
        "Program pengelolaan limbah melalui kemitraan dengan food bank lokal.",
    },
    {
      icon: HandHeart,
      title: "Direct Sourcing",
      description:
        "Pengadaan langsung dari petani dan nelayan tanpa perantara berlebih.",
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Leaf pattern background */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald/5 to-transparent" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'80\' height=\'80\' viewBox=\'0 0 80 80\'%3E%3Cpath d=\'M40 20 Q60 20 60 40 Q60 60 40 60 Q20 60 20 40 Q20 20 40 20\' fill=\'none\' stroke=\'%2310B981\' stroke-width=\'1\'/%3E%3C/svg%3E")',
          backgroundSize: "80px 80px",
        }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text content */}
          <div>
            <Badge className="mb-4 bg-emerald/10 text-emerald border-emerald/20">
              <Leaf className="mr-1 h-3 w-3" />
              Keberlanjutan
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Komitmen <span className="text-emerald italic">Keberlanjutan</span>{" "}
              Kami
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Di Maritani, kami percaya bahwa masa depan pangan berkaitan erat
              dengan kesehatan bumi. Setiap langkah operasional kami dirancang
              untuk dampak positif.
            </p>

            <div className="space-y-6">
              {commitments.map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-emerald/10 flex items-center justify-center text-emerald">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Decorative illustration card */}
          <div className="relative">
            <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-emerald/20 to-primary/10 p-8 aspect-square flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-24 h-24 mx-auto rounded-full bg-emerald/20 flex items-center justify-center">
                  <Leaf className="h-12 w-12 text-emerald" />
                </div>
                <p className="text-lg font-bold text-foreground">
                  100% Kemasan Daur Ulang
                </p>
                <p className="text-sm text-muted-foreground">
                  Target tercapai 2026
                </p>
                {/* Progress ring */}
                <div className="flex justify-center gap-3 pt-4">
                  {[
                    { label: "CO₂ Reduced", value: "45%" },
                    { label: "Waste Free", value: "82%" },
                    { label: "Green Tech", value: "100%" },
                  ].map((metric) => (
                    <div
                      key={metric.label}
                      className="bg-card rounded-xl p-3 shadow-sm"
                    >
                      <div className="text-lg font-bold text-emerald">
                        {metric.value}
                      </div>
                      <div className="text-[10px] text-muted-foreground">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -right-4 bg-card rounded-2xl shadow-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald/20 flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-emerald" />
              </div>
              <div>
                <div className="text-sm font-bold">Eco-Certified</div>
                <div className="text-xs text-muted-foreground">ISO 14001</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// =============================================
// TIMELINE — Zigzag Alternating (Stitch)
// =============================================
function Timeline() {
  const milestones = [
    {
      year: "2024",
      title: "Lahirnya Ide",
      description:
        "Maritani dimulai dari keresahan akan kesenjangan harga antara petani/nelayan dan konsumen.",
    },
    {
      year: "2025",
      title: "Beta Launch",
      description:
        "Platform beta diluncurkan dengan 100 mitra petani dan nelayan pertama.",
    },
    {
      year: "2026",
      title: "Ekosistem Berkembang",
      description:
        "800+ mitra bergabung dan ekspansi ke 50+ kota di Indonesia.",
    },
    {
      year: "2027",
      title: "Visi Masa Depan",
      description:
        "Target: 10,000+ mitra, seluruh Indonesia, dan ekspor internasional.",
    },
  ];

  return (
    <section className="py-20 bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-emerald/10 text-emerald border-emerald/20">
            <TrendingUp className="mr-1 h-3 w-3" />
            Perjalanan Kami
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Milestone <span className="text-primary italic">Maritani</span>
          </h2>
        </div>

        {/* Zigzag timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Center line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-border" />

          <div className="space-y-12">
            {milestones.map((milestone, index) => {
              const isLeft = index % 2 === 0;
              return (
                <div key={milestone.year} className="relative">
                  <div className="flex flex-col md:flex-row items-center">
                    {/* Left content */}
                    <div
                      className={`w-full md:w-5/12 px-4 ${isLeft ? "text-center md:text-right" : "md:order-3 text-center md:text-left"
                        }`}
                    >
                      <div className="text-sm font-bold text-primary mb-1">
                        {milestone.year}
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>

                    {/* Center dot */}
                    <div className="z-10 flex items-center justify-center w-10 h-10 bg-card border-4 border-primary rounded-full shadow-lg my-4 md:my-0 md:order-2">
                      <span className="text-xs font-bold text-primary">
                        {milestone.year.slice(-2)}
                      </span>
                    </div>

                    {/* Right spacer */}
                    <div
                      className={`hidden md:block w-5/12 px-4 ${isLeft ? "" : "md:order-1"
                        }`}
                    />
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

// =============================================
// TEAM SECTION — Cards with colored header (Stitch)
// =============================================
function TeamSection() {
  const team = [
    {
      name: "Ahmad Rizky",
      role: "CEO & Founder",
      description:
        "Former management consultant dengan passion di agribusiness dan teknologi berkelanjutan.",
      color: "bg-primary",
    },
    {
      name: "Siti Nurhaliza",
      role: "CTO & Co-Founder",
      description:
        "Tech lead berpengalaman 10+ tahun di e-commerce unicorn, spesialis arsitektur sistem skala besar.",
      color: "bg-emerald",
    },
    {
      name: "Budi Santoso",
      role: "Head of Operations",
      description:
        "Supply chain expert dengan jaringan luas di sentra produksi pertanian seluruh Indonesia.",
      color: "bg-ocean",
    },
  ];

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-ocean/10 text-ocean border-ocean/20">
            <Users className="mr-1 h-3 w-3" />
            Tim Kami
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Di Balik <span className="text-primary italic">Maritani</span>
          </h2>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
            Tim yang berdedikasi untuk menghubungkan petani, nelayan, dan
            konsumen Indonesia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {team.map((member) => (
            <Card
              key={member.name}
              className="border-border/40 overflow-hidden card-hover-lift"
            >
              <div className={`h-28 ${member.color} relative`}>
                <div className="absolute inset-0 opacity-20">
                  <svg
                    className="w-full h-full"
                    viewBox="0 0 200 100"
                    preserveAspectRatio="none"
                  >
                    <path d="M0 100 Q50 0 100 50 Q150 100 200 0 L200 100 Z" fill="white" />
                  </svg>
                </div>
              </div>
              <CardContent className="p-6 text-center -mt-14">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-muted border-4 border-card overflow-hidden shadow-lg">
                  <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-muted-foreground">
                    {member.name.charAt(0)}
                  </div>
                </div>
                <h3 className="text-lg font-bold">{member.name}</h3>
                <p className="text-sm text-primary font-medium mb-2">
                  {member.role}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {member.description}
                </p>
                <div className="flex justify-center gap-2 mt-4">
                  <a
                    href="#"
                    className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Linkedin className="h-3.5 w-3.5" />
                  </a>
                  <a
                    href="#"
                    className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Mail className="h-3.5 w-3.5" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// =============================================
// PARTNERS SECTION
// =============================================
function PartnersSection() {
  const partners = ["BCA", "Mandiri", "JNE", "GoSend", "GrabExpress"];
  const certifications = [
    { name: "UMKM Certified", icon: Award },
    { name: "Halal Certified", icon: CheckCircle2 },
    { name: "ISO 22000", icon: ShieldCheck },
  ];

  return (
    <section className="py-16 bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-3">Partner & Sertifikasi</h2>
          <p className="text-muted-foreground">
            Bermitra dengan yang terbaik untuk kualitas terbaik
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-10 mb-12">
          {partners.map((partner) => (
            <div
              key={partner}
              className="text-xl font-bold text-muted-foreground/40 hover:text-primary transition-colors cursor-default"
            >
              {partner}
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {certifications.map((cert) => (
            <div
              key={cert.name}
              className="flex items-center gap-2 px-5 py-2.5 bg-background rounded-full border border-border/40 shadow-sm"
            >
              <cert.icon className="h-4 w-4 text-emerald" />
              <span className="text-sm font-medium">{cert.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// =============================================
// CONTACT CTA — Background gradient (Stitch)
// =============================================
function ContactCTA() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary/90 to-ocean p-10 md:p-16 text-center shadow-2xl shadow-primary/20">
          {/* SVG decoration */}
          <div className="absolute inset-0">
            <svg
              className="absolute right-0 top-0 h-full w-1/2 opacity-10"
              preserveAspectRatio="none"
              viewBox="0 0 100 100"
            >
              <path d="M0 0 L50 100 L100 0 Z" fill="white" />
            </svg>
            <div className="absolute left-0 bottom-0 h-64 w-64 bg-emerald opacity-20 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
          </div>

          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Mari Berkolaborasi
            </h2>
            <p className="text-lg text-white/80 max-w-xl mx-auto mb-8">
              Tertarik menjadi mitra atau memiliki pertanyaan? Tim kami siap
              membantu Anda membangun masa depan pangan Indonesia.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="rounded-full bg-white text-primary hover:bg-white/90 px-8 shadow-lg"
              >
                <Mail className="mr-2 h-4 w-4" />
                Email Kami
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-white/50 text-white hover:bg-white/10 bg-transparent px-8"
              >
                <Phone className="mr-2 h-4 w-4" />
                WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// =============================================
// MAIN PAGE
// =============================================
export default function TentangPage() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <StatsSection />
      <VisionMission />
      <SustainabilitySection />
      <Timeline />
      <TeamSection />
      <PartnersSection />
      <ContactCTA />
    </div>
  );
}
