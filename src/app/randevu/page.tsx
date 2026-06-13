export default function BookingPage() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Randevu Oluştur</h1>
                <p className="mt-2 text-lg text-muted-foreground">
                    Lütfen size uygun bir gün ve saat dilimi seçerek bilgilerinizi giriniz.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 border rounded-2xl p-6 md:p-10 bg-card shadow-sm">
                {/* SOL TARAF: Takvim ve Saat Slotları (Faz 2'de kodlanacak) */}
                <div className="flex flex-col gap-4">
                    <h2 className="text-lg font-semibold">1. Tarih ve Saat Seçimi</h2>
                    <div className="p-4 border rounded-md bg-muted/50 text-center text-muted-foreground">
                        [Takvim ve Saat Seçim Alanı Bileşeni]
                    </div>
                </div>

                {/* SAĞ TARAF: Kullanıcı Bilgi Formu */}
                <div className="flex flex-col gap-4">
                    <h2 className="text-lg font-semibold">2. İletişim Bilgileri</h2>
                    <div className="p-4 border rounded-md bg-muted/50 text-center text-muted-foreground">
                        [Müşteri Bilgi Formu]
                    </div>
                </div>
            </div>
        </div>
    );
}