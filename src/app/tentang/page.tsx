"use client";

import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Fish, 
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
  CheckCircle2
} from "lucide-react";
import Image from "next/image";
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
      
      // Easing function
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

// Stats Component
function StatsSection() {
  const stats = [
    { value: 2500, suffix: "+", label: "Produk Segar", icon: Fish },
    { value: 800, suffix: "+", label: "Mitra Petani & Nelayan", icon: Sprout },
    { value: 50, suffix: "+", label: "Kota Terjangkau", icon: MapPin },
    { value: 99, suffix: "%", label: "Tingkat Kepuasan", icon: Heart },
  ];

  return (
    <section className="py-16 bg-stone-50/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => {
            const { count, ref } = useCountUp(stat.value);
            return (
              <div key={stat.label} ref={ref} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4">
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-foreground">
                  {count}{stat.suffix}
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

// Vision & Mission
function VisionMission() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            <Sprout className="mr-1 h-3 w-3" />
            Visi & Misi
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Mengapa <span className="text-primary">Maritani</span> Ada?
          </h2>
        </div>

        {/* Vision */}
        <Card className="mb-8 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          <CardContent className="p-8 text-center">
            <h3 className="text-xl font-bold text-primary mb-4">Visi Kami</h3>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Menjadi marketplace hasil laut dan pertanian terbesar di Indonesia yang 
              memberdayakan petani dan nelayan lokal, serta menyediakan produk segar 
              berkualitas tinggi untuk seluruh masyarakat Indonesia.
            </p>
          </CardContent>
        </Card>

        {/* Mission */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: Heart,
              title: "Fair Trade",
              description: "Memastikan harga adil untuk petani dan nelayan, serta produk berkualitas untuk konsumen.",
              color: "bg-rose/10 text-rose",
            },
            {
              icon: ShieldCheck,
              title: "Fresh Delivery",
              description: "Pengiriman dalam 24 jam dengan sistem cold chain untuk menjaga kesegaran optimal.",
              color: "bg-emerald/10 text-emerald",
            },
            {
              icon: Users,
              title: "Community",
              description: "Membangun ekosistem yang saling menguntungkan antara produsen, konsumen, dan lingkungan.",
              color: "bg-ocean/10 text-ocean",
            },
          ].map((item) => (
            <Card key={item.title} className="border-border/40 card-hover-lift">
              <CardContent className="p-6">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${item.color} mb-4`}>
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// Timeline/Milestone
function Timeline() {
  const milestones = [
    { year: "2024", title: "Lahirnya Ide", description: "Maritani dimulai dari keresahan akan kesenjangan harga antara petani/nelayan dan konsumen." },
    { year: "2025", title: "Beta Launch", description: "Platform beta diluncurkan dengan 100 mitra petani dan nelayan pertama." },
    { year: "2026", title: "Ekosistem Berkembang", description: "800+ mitra bergabung dan ekspansi ke 50+ kota di Indonesia." },
    { year: "2027", title: "Visi Masa Depan", description: "Target: 10,000+ mitra, seluruh Indonesia, dan ekspor internasional." },
  ];

  return (
    <section className="py-16 bg-stone-50/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-emerald/10 text-emerald border-emerald/20">
            <TrendingUp className="mr-1 h-3 w-3" />
            Perjalanan Kami
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight">
            Milestone <span className="text-primary">Maritani</span>
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          {milestones.map((milestone, index) => (
            <div key={milestone.year} className="relative flex gap-6 pb-8 last:pb-0">
              {/* Timeline Line */}
              {index < milestones.length - 1 && (
                <div className="absolute left-[19px] top-10 bottom-0 w-0.5 bg-gradient-to-b from-primary to-primary/20" />
              )}
              
              {/* Year Badge */}
              <div className="relative shrink-0">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                  {milestone.year.slice(-2)}
                </div>
              </div>

              {/* Content */}
              <div className="pb-4">
                <div className="text-sm font-bold text-primary mb-1">{milestone.year}</div>
                <h3 className="text-lg font-semibold mb-1">{milestone.title}</h3>
                <p className="text-sm text-muted-foreground">{milestone.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Team Section
function TeamSection() {
  const team = [
    {
      name: "Ahmad Rizky",
      role: "CEO & Founder",
      description: "Former management consultant dengan passion di agribusiness.",
      color: "bg-primary",
    },
    {
      name: "Siti Nurhaliza",
      role: "CTO & Co-Founder",
      description: "Tech lead dengan pengalaman 10+ tahun di e-commerce.",
      color: "bg-emerald",
    },
    {
      name: "Budi Santoso",
      role: "Head of Operations",
      description: "Supply chain expert dengan jaringan luas di seluruh Indonesia.",
      color: "bg-ocean",
    },
  ];

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-ocean/10 text-ocean border-ocean/20">
            <Users className="mr-1 h-3 w-3" />
            Tim Kami
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight">
            Di Balik <span className="text-primary">Maritani</span>
          </h2>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
            Tim yang berdedikasi untuk menghubungkan petani, nelayan, dan konsumen Indonesia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {team.map((member) => (
            <Card key={member.name} className="border-border/40 overflow-hidden">
              <div className={`h-24 ${member.color}`} />
              <CardContent className="p-6 text-center -mt-12">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-stone-200 border-4 border-white overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-stone-400">
                    {member.name.charAt(0)}
                  </div>
                </div>
                <h3 className="text-lg font-bold">{member.name}</h3>
                <p className="text-sm text-primary font-medium mb-2">{member.role}</p>
                <p className="text-xs text-muted-foreground">{member.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// Partners Section
function PartnersSection() {
  const partners = ["BCA", "Mandiri", "JNE", "GoSend", "GrabExpress"];
  const certifications = [
    { name: "UMKM Certified", icon: Award },
    { name: "Halal Certified", icon: CheckCircle2 },
    { name: "ISO 22000", icon: ShieldCheck },
  ];

  return (
    <section className="py-16 bg-stone-50/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-3">Partner & Sertifikasi</h2>
          <p className="text-muted-foreground">Bermitra dengan yang terbaik untuk kualitas terbaik</p>
        </div>

        {/* Partners */}
        <div className="flex flex-wrap justify-center items-center gap-8 mb-12">
          {partners.map((partner) => (
            <div key={partner} className="text-xl font-bold text-stone-400 hover:text-primary transition-colors cursor-default">
              {partner}
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="flex flex-wrap justify-center gap-4">
          {certifications.map((cert) => (
            <div key={cert.name} className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-border/40">
              <cert.icon className="h-4 w-4 text-emerald" />
              <span className="text-sm font-medium">{cert.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Contact CTA
function ContactCTA() {
  return (
    <section className="py-16 bg-gradient-to-b from-background to-stone-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary/90 to-ocean p-10 md:p-16 text-center shadow-2xl shadow-primary/20">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Mari Berkolaborasi
          </h2>
          <p className="text-lg text-white/80 max-w-xl mx-auto mb-8">
            Tertarik menjadi mitra atau memiliki pertanyaan? Tim kami siap membantu Anda.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 px-8">
              <Mail className="mr-2 h-4 w-4" />
              Email Kami
            </Button>
            <Button size="lg" variant="outline" className="border-white/50 text-white hover:bg-white/10 bg-transparent px-8">
              <Phone className="mr-2 h-4 w-4" />
              WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

// Main Page
export default function TentangPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-stone-50 to-ocean/5 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
              <Fish className="mr-1.5 h-3.5 w-3.5" />
              Tentang Kami
            </Badge>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              Menghubungkan <span className="text-primary">Laut</span> dan <span className="text-emerald">Darat</span>
            </h1>

            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              Maritani lahir dari keresahan akan kesenjangan harga dan akses antara 
              petani, nelayan, dan konsumen. Kami hadir untuk menciptakan ekosistem 
              yang adil dan saling menguntungkan.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <StatsSection />

      {/* Vision & Mission */}
      <VisionMission />

      {/* Timeline */}
      <Timeline />

      {/* Team */}
      <TeamSection />

      {/* Partners */}
      <PartnersSection />

      {/* Contact CTA */}
      <ContactCTA />
    </div>
  );
}
