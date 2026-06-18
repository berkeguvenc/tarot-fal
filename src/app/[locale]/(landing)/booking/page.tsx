import initTranslations from "@/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";
import BookingForm from "@/components/booking/booking-form";

export default async function BookingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { resources, t } = await initTranslations(locale, ["common"]);

  return (
    <TranslationsProvider locale={locale} namespaces={["common"]} resources={resources}>
      <section className="relative overflow-hidden min-h-screen py-12 bg-gradient-to-b from-secondary/30 via-background to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12 animate-in fade-in duration-500">
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground font-serif sm:text-5xl">
              {t("booking_title")}
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground font-medium">
              {t("booking_subtitle")}
            </p>
          </div>

          <BookingForm />
        </div>

        {/* Mistik Arka Plan Işıkları (Tailwind v4 blur) */}
        <div className="absolute top-0 right-1/4 -z-10 h-96 w-96 rounded-full bg-primary/10 blur-3xl opacity-50" />
        <div className="absolute bottom-10 left-1/4 -z-10 h-96 w-96 rounded-full bg-accent/5 blur-3xl opacity-30" />
      </section>
    </TranslationsProvider>
  );
}
