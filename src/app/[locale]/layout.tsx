import "@/app/globals.css";
import { ReactNode } from "react";
import { i18nConfig } from "../../../i18nConfig";

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

// 1. Fonksiyonu async yapıyoruz
export default async function RootLayout({
  children,
  params
}: {
  children: ReactNode;
  // 2. params'ı Promise olarak tanımlıyoruz
  params: Promise<{ locale: string }>;
}) {
  // 3. locale bilgisini await ile alıyoruz
  const { locale } = await params;

  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}