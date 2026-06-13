import prisma from "@/lib/prisma";

export default async function TestPage() {
    // Veritabanından saat dilimlerini çekiyoruz (Server Component)
    const slots = await prisma.timeSlot.findMany();

    return (
        <div className="p-8 max-w-xl mx-auto space-y-6">
            <div className="border-b pb-4">
                <h1 className="text-2xl font-bold text-primary">🏗️ Boilerplate Test Sayfası</h1>
                <p className="text-muted-foreground text-sm">Prisma, Zod ve Tailwind bağlantı kontrolü</p>
            </div>

            {/* Veritabanı Bağlantı Testi */}
            <div className="space-y-3">
                <h2 className="text-lg font-semibold">1. Veritabanından Gelen Saat Dilimleri:</h2>
                <div className="grid grid-cols-2 gap-2">
                    {slots.length === 0 ? (
                        <p className="text-destructive text-sm">Veritabanında slot bulunamadı veya bağlantı hatası!</p>
                    ) : (
                        slots.map((slot) => (
                            <div
                                key={slot.id}
                                className={`p-3 border rounded-lg flex justify-between items-center ${slot.isAvailable ? "bg-emerald-50 border-emerald-200" : "bg-red-50 border-red-200"
                                    }`}
                            >
                                <span className="font-medium text-sm">
                                    {slot.startTime} - {slot.endTime}
                                </span>
                                <span className={`text-xs px-2 py-0.5 rounded-full ${slot.isAvailable ? "bg-emerald-200 text-emerald-800" : "bg-red-200 text-red-800"
                                    }`}>
                                    {slot.isAvailable ? "Müsait" : "Dolu"}
                                </span>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Tailwind ve Shadcn Theme Testi */}
            <div className="p-4 bg-muted rounded-lg border space-y-2">
                <h2 className="text-sm font-semibold">2. Renk ve Tema Kontrolü</h2>
                <p className="text-xs text-muted-foreground">
                    Bu buton rengi globals.css içerisindeki <code className="bg-white px-1 py-0.5 rounded border">--primary</code> değerinden beslenir.
                </p>
                <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:opacity-90 transition-opacity">
                    CSS Test Butonu
                </button>
            </div>
        </div>
    );
}