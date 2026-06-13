export const siteConfig = {
    name: "Giriş Seviyesi Marka",
    description: "Bu alan SEO description alanıdır.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    ogImage: "/og-image.png",
    links: {
        instagram: "https://instagram.com/...",
    },
    contact: {
        email: "info@marka.com",
        phone: "+90 555 555 55 55",
    }
};
export type SiteConfig = typeof siteConfig;