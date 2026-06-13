// src/app/layout.tsx
import "@/app/globals.css";

export const metadata = {
  title: "Master Boilerplate",
  description: "Dinamik Randevu Sistemi Şablonu",
};

// MUTLAKA "export default" olmalı ve bir fonksiyon dönmeli
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}