import Link from "next/link";
import { siteConfig } from "@/config/site-config";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* HERO SECTION */}
      <section className="container mx-auto px-4 pt-24 text-center max-w-4xl flex flex-col items-center gap-6">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl text-primary">
          {siteConfig.title}
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          {siteConfig.description}
        </p>
        <div className="pt-4">
          <Link
            href="/randevu"
            className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
          >
            Hemen Randevu Al
          </Link>
        </div>
      </section>

      {/* ÖZELLİKLER / HİZMETLER GRID */}
      <section className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-3xl font-bold text-center mb-12">Neler Sunuyoruz?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Bu kartların içerikleri projenin kendine göre statik veya dinamik doldurulur */}
          <div className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm">
            <h3 className="text-xl font-bold mb-2">Premium Hizmet</h3>
            <p className="text-muted-foreground">Alanında uzman kadromuzla tamamen size özel süreç yönetimi.</p>
          </div>
          <div className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm">
            <h3 className="text-xl font-bold mb-2">Kolay Rezervasyon</h3>
            <p className="text-muted-foreground">Saniyeler içinde takvimden size uygun günü ve saati seçin.</p>
          </div>
          <div className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm">
            <h3 className="text-xl font-bold mb-2">Güvenilir Altyapı</h3>
            <p className="text-muted-foreground">Tüm süreçleriniz uçtan uca koruma altında ve şeffaf yürütülür.</p>
          </div>
        </div>
      </section>
    </div>
  );
}