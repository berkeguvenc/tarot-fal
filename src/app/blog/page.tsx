import Link from "next/link";
import { redirect } from "next/navigation";
import { siteConfig } from "@/config/site-config";

// Şablon olarak kullanabileceğin örnek mock blog verileri
const MOCK_POSTS = [
    {
        id: "1",
        title: "Sektörün Öncülerinden Bilmeniz Gereken 5 Temel İpucu",
        excerpt: "Bu rehberimizde süreçlerinizi daha verimli yönetebilmeniz için dikkat etmeniz gereken kritik noktaları derledik.",
        date: "12 Haziran 2026",
        category: "Rehber",
    },
    {
        id: "2",
        title: "Sıkça Yapılan Hatalar ve Bunlardan Kaçınma Yolları",
        excerpt: "Yeni başlayanların ve deneyimli profesyonellerin gözden kaçırdığı en yaygın 3 yanılgıyı inceliyoruz.",
        date: "05 Haziran 2026",
        category: "İpuçları",
    },
    {
        id: "3",
        title: "Gelecek Trendleri: Önümüzdeki Dönemde Bizleri Neler Bekliyor?",
        excerpt: "Teknolojik ve sektörel gelişmeler ışığında, markaların ve bireylerin alması gereken pozisyonlar.",
        date: "28 Mayıs 2026",
        category: "Trendler",
    },
];

export default function BlogPage() {
    // Eğer config dosyasında blog özelliği aktif edilmediyse erişimi engelle
    if (!(siteConfig.features as any).hasBlog) {
        redirect("/");
    }

    return (
        <div className="container mx-auto px-4 py-16 max-w-5xl">
            {/* BAŞLIK */}
            <div className="text-center md:text-left mb-12">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-3">Blog & Güncel İçerikler</h1>
                <p className="text-muted-foreground text-lg max-w-2xl">
                    Sizler için hazırladığımız güncel makaleler, rehberler ve sektörden en son haberler.
                </p>
            </div>

            {/* BLOG POSTS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {MOCK_POSTS.map((post) => (
                    <article
                        key={post.id}
                        className="flex flex-col justify-between p-6 rounded-2xl border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow"
                    >
                        <div>
                            {/* Kategori ve Tarih */}
                            <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                                <span className="font-semibold text-primary uppercase tracking-wider">{post.category}</span>
                                <span>•</span>
                                <span>{post.date}</span>
                            </div>

                            {/* Başlık */}
                            <h2 className="text-xl font-bold mb-2 line-clamp-2 text-primary hover:underline">
                                <Link href={`/blog/${post.id}`}>{post.title}</Link>
                            </h2>

                            {/* Özet Metin */}
                            <p className="text-muted-foreground text-sm line-clamp-3 mb-6">
                                {post.excerpt}
                            </p>
                        </div>

                        {/* Devamını Oku Linki */}
                        <Link
                            href={`/blog/${post.id}`}
                            className="inline-flex items-center text-sm font-semibold text-primary hover:opacity-80 transition-opacity mt-auto"
                        >
                            Devamını Oku &rarr;
                        </Link>
                    </article>
                ))}
            </div>
        </div>
    );
}