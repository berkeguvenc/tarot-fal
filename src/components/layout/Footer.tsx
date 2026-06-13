import Link from "next/link";
import { siteConfig } from "@/config/site-config";

export default function Footer() {
    // Dinamik olarak 2026 yılını basıyoruz
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t bg-muted/40 text-muted-foreground">
            <div className="container mx-auto px-4 py-12 max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* SOL: Marka Bilgisi */}
                <div className="flex flex-col gap-3">
                    <span className="font-bold text-lg text-primary">{siteConfig.name}</span>
                    <p className="text-sm max-w-xs">{siteConfig.description}</p>
                </div>

                {/* ORTA: Hızlı Linkler */}
                <div className="flex flex-col gap-2 text-sm">
                    <span className="font-semibold text-primary mb-1">Hızlı Bağlantılar</span>
                    <Link href="/" className="hover:text-primary transition-colors">Anasayfa</Link>
                    <Link href="/randevu" className="hover:text-primary transition-colors">Randevu Sistemi</Link>
                    {(siteConfig.features as any).hasBlog && (
                        <Link href="/blog" className="hover:text-primary transition-colors">Blog / Rehber</Link>
                    )}
                </div>

                {/* SAĞ: İletişim */}
                <div className="flex flex-col gap-2 text-sm">
                    <span className="font-semibold text-primary mb-1">İletişim</span>
                    <p>E-posta: <a href={`mailto:${siteConfig.contact.email}`} className="text-primary hover:underline">{siteConfig.contact.email}</a></p>
                    <p>Telefon: <span className="text-primary">{siteConfig.contact.phone}</span></p>
                </div>
            </div>

            <div className="border-t py-6 text-center text-xs">
                <p>&copy; {currentYear} {siteConfig.name}. Tüm Hakları Saklıdır.</p>
            </div>
        </footer>
    );
}