import { redirect } from "next/navigation";
import { siteConfig } from "@/config/site-config";

export default function EducationPage() {
    // Özellik kapalıysa sayfaya erişimi engelle
    if (!siteConfig.features.hasLMS) {
        redirect("/");
    }

    return (
        <div className="container mx-auto px-4 py-16 max-w-5xl">
            <h1 className="text-4xl font-bold mb-4">Eğitim Akademisi</h1>
            <p className="text-muted-foreground mb-10 text-lg">Mistik dünyayı derinlemesine öğrenmek için hazırlanan eğitim setlerimiz.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Ücretsiz Eğitim Kartı */}
                <div className="border rounded-xl p-6 flex flex-col justify-between bg-card">
                    <div>
                        <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20 mb-3">Ücretsiz</span>
                        <h2 className="text-2xl font-bold mb-2">Temel Tarot Eğitimi</h2>
                        <p className="text-muted-foreground">Kartların anlamları ve temel açılım tekniklerine ücretsiz giriş yapın.</p>
                    </div>
                    <button className="mt-6 w-full py-2.5 rounded-md border text-sm font-medium hover:bg-muted transition-colors">İçeriğe Göz At</button>
                </div>

                {/* Ücretli Eğitim Kartı */}
                <div className="border rounded-xl p-6 flex flex-col justify-between bg-card">
                    <div>
                        <span className="inline-flex items-center rounded-full bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10 mb-3">Premium</span>
                        <h2 className="text-2xl font-bold mb-2">İleri Seviye Fal ve Sezgi Yönetimi</h2>
                        <p className="text-muted-foreground">Profesyonel yorumculuk, derin sembolizm ve müşteri yönetimi eğitimi.</p>
                    </div>
                    <button className="mt-6 w-full py-2.5 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">Eğitimi Satın Al (Yakında)</button>
                </div>
            </div>
        </div>
    );
}