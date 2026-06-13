import Link from "next/link";
import { siteConfig } from "@/config/site-config";

export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-6xl">
                {/* LOGO / MARKA ADI */}
                <Link href="/" className="flex items-center space-x-2 font-bold text-xl tracking-tight text-primary">
                    <span>{siteConfig.name}</span>
                </Link>

                {/* DINAMIK MENÜ LINCOKLERI */}
                <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
                    <Link href="/" className="transition-colors hover:text-primary">Anasayfa</Link>
                    <Link href="/randevu" className="transition-colors hover:text-primary">Randevu Al</Link>

                    {/* Kullanıcının eklediği blog kontrolü (Örn: hasBlog) */}
                    {(siteConfig.features as any).hasBlog && (
                        <Link href="/blog" className="transition-colors hover:text-primary">Blog</Link>
                    )}

                    {siteConfig.features.hasLMS && (
                        <Link href="/egitim" className="transition-colors hover:text-primary">Eğitimler</Link>
                    )}

                    {siteConfig.features.hasBookIntroduction && (
                        <Link href="/kitap" className="transition-colors hover:text-primary">Kitap</Link>
                    )}
                </nav>

                {/* CTA (Eylem) BUTONU */}
                <div className="flex items-center gap-4">
                    <Link
                        href="/randevu"
                        className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
                    >
                        Rezervasyon
                    </Link>
                </div>
            </div>
        </header>
    );
}