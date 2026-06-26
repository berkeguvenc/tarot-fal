import React from "react";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import initTranslations from "@/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";

// MUTLAKA "export default" olmalı
export default async function LandingLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const { resources } = await initTranslations(locale, ["common"]);

    return (
        <TranslationsProvider locale={locale} namespaces={["common"]} resources={resources}>
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-1">{children}</main>
                <Footer />
            </div>
        </TranslationsProvider>
    );
}