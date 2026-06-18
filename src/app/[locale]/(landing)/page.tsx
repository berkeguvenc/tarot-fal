import initTranslations from "@/i18n";
import BookingForm from "@/components/booking/booking-form";
import TranslationsProvider from "@/components/TranslationsProvider";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  ShieldCheck,
  Clock,
  Heart,
  CheckCircle,
  Eye,
  Star,
  Moon
} from "lucide-react";
import Link from "next/link";

export default async function LandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { resources, t } = await initTranslations(locale, ["common"]);

  return (
    <TranslationsProvider locale={locale} namespaces={["common"]} resources={resources}>
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-secondary/30 via-background to-background py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary animate-in fade-in slide-in-from-bottom-3 duration-500">
                <Sparkles className="h-3.5 w-3.5 fill-primary" /> {t("hero_tag")}
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1] font-serif animate-in fade-in slide-in-from-bottom-4 duration-600">
                {t("hero_title_1")} <br />
                <span className="text-primary bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {t("hero_title_highlight")}
                </span> <br />
                {t("hero_title_2")}
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium animate-in fade-in slide-in-from-bottom-5 duration-700">
                {t("hero_desc")}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-2 animate-in fade-in slide-in-from-bottom-6 duration-800">
                <Link href="#randevu">
                  <Button size="lg" className="w-full sm:w-auto text-base font-bold shadow-lg shadow-primary/25 h-11 px-8 rounded-xl cursor-pointer">
                    {t("hero_cta_book")}
                  </Button>
                </Link>
                <Link href="#hizmetler">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto text-base font-semibold h-11 px-8 rounded-xl cursor-pointer">
                    {t("hero_cta_services")}
                  </Button>
                </Link>
              </div>
            </div>

            {/* Visual Hero Card */}
            <div className="lg:col-span-5 flex justify-center animate-in fade-in zoom-in-95 duration-500">
              <div className="relative w-full max-w-sm rounded-[2rem] border border-border/80 bg-card/60 backdrop-blur-md p-6 shadow-xl shadow-secondary/15">
                <div className="absolute -top-3 -right-3 h-12 w-12 rounded-2xl bg-accent text-accent-foreground flex items-center justify-center shadow-md rotate-12">
                  <Moon className="h-6 w-6 fill-accent-foreground" />
                </div>
                <div className="space-y-4">
                  <div className="aspect-video w-full rounded-2xl bg-secondary/30 flex items-center justify-center text-primary text-3xl font-serif">
                    🔮
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold font-serif">Mistik Rehberlik</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Sezgisel yorumcularımız ve kadim öğretilerle hayat yolunuza ışık tutun.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 pt-2 border-t border-border/40 text-xs text-muted-foreground font-medium">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>24/7 Güvenli Online Danışmanlık</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Background Decorative Blur (Tailwind v4 style) */}
        <div className="absolute top-0 right-0 -z-10 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 -z-10 h-80 w-80 rounded-full bg-secondary/20 blur-3xl" />
      </section>

      {/* 2. Services Section */}
      <section id="hizmetler" className="py-20 bg-background border-t border-border/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16 animate-in fade-in duration-500">
            <h2 className="text-3xl font-extrabold text-foreground tracking-tight sm:text-4xl font-serif">
              {t("services_title") || "Mistik Hizmetlerimiz"}
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground font-medium">
              Geleceğinizi aydınlatacak ve size rehberlik edecek fal türlerimiz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="group border border-border/80 rounded-3xl p-6 bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary/30">
              <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground font-serif">{t("service_tarot_name")}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t("service_tarot_desc")}
              </p>
            </div>

            {/* Service 2 */}
            <div className="group border border-border/80 rounded-3xl p-6 bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary/30">
              <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Star className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground font-serif">{t("service_astrology_name")}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t("service_astrology_desc")}
              </p>
            </div>

            {/* Service 3 */}
            <div className="group border border-border/80 rounded-3xl p-6 bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary/30">
              <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Eye className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground font-serif">{t("service_palm_name")}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t("service_palm_desc")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Booking Section */}
      <section id="randevu" className="py-20 bg-background border-t border-border/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12 animate-in fade-in duration-500">
            <h2 className="text-3xl font-extrabold text-foreground tracking-tight sm:text-4xl font-serif">
              {t("booking_title")}
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground font-medium">
              {t("booking_subtitle")}
            </p>
          </div>

          <BookingForm />
        </div>
      </section>
    </TranslationsProvider>
  );
}