// src/app/admin/layout.tsx
import React from "react";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-slate-100">
            {/* İleride buraya Admin Sidebar gelecek */}
            <main className="flex-1 p-6">{children}</main>
        </div>
    );
}