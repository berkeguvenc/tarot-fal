import initTranslations from "@/i18n";

export default async function LandingPage({
    params
}: {
    params: Promise<{ locale: string }>;
}) {
    // locale bilgisini Promise'den çıkartıyoruz
    const { locale } = await params;

    // Çeviri fonksiyonuna locale bilgisini gönderiyoruz
    const { t } = await initTranslations(locale, ['common']);

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold">{t('greeting')}</h1>
            <button className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md">
                {t('book_button')}
            </button>
        </div>
    );
}