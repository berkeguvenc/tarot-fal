export interface SiteConfig {
    name: string;
    title: string;
    description: string;
    logo: string;
    contact: {
        email: string;
        phone: string;
    };
    features: {
        hasBlog: boolean;             // Blog sayfası aktif mi?
        hasLMS: boolean;              // Eğitim sayfaları aktif mi?
        hasBookIntroduction: boolean; // Kitap sayfası aktif mi?
    };
}

export const siteConfig: SiteConfig = {
    name: "Mistik Tarot", // Evcil hayvan projesinde örn: "Pati Oteli"
    title: "Geleceğinize Işık Tutan Tarot ve Fal Deneyimi",
    description: "Uzman yorumcularımızla online tarot ve el falı randevusu oluşturun.",
    logo: "/logo.svg",
    contact: {
        email: "info@marka.com",
        phone: "+90 555 000 00 00",
    },
    features: {
        hasBlog: true,              // Evcil hayvan projesinde 'false' yapılacak
        hasLMS: true,               // Evcil hayvan projesinde 'false' yapılacak
        hasBookIntroduction: true,  // Evcil hayvan projesinde 'false' yapılacak
    },
};