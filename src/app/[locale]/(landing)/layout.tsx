// src/app/(landing)/layout.tsx
import React from "react";

// MUTLAKA "export default" olmalı
export default function LandingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex flex-col">
            {/* İleride buraya ortak Navbar gelecek */}
            <main className="flex-1">{children}</main>
            {/* İleride buraya ortak Footer gelecek */}
        </div>
    );
}