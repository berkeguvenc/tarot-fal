"use client";

import React from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import { Sparkles, MapPin, Mail, Phone } from "lucide-react";

export default function Footer() {
  const { t, i18n } = useTranslation();
  const params = useParams();
  const currentPathname = usePathname();
  
  const currentLocale = (params?.locale as string) || i18n.language || "tr";

  // Helper to construct link paths with current locale
  const getPath = (path: string) => {
    if (currentLocale === "tr") {
      return path;
    }
    return `/en${path === "/" ? "" : path}`;
  };

  // Helper for homepage hash sections
  const getHashPath = (hash: string) => {
    const isHome = currentPathname === "/" || currentPathname === "/en";
    if (isHome) {
      return hash;
    }
    return `${currentLocale === "tr" ? "/" : "/en"}${hash}`;
  };

  return (
    <footer className="w-full bg-secondary/20 border-t border-border/40 text-muted-foreground pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          {/* Column 1: Brand Info */}
          <div className="md:col-span-6 space-y-4">
            <Link
              href={getPath("/")}
              className="flex items-center gap-2 text-xl font-bold font-serif text-foreground group w-fit"
            >
              <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20 group-hover:bg-primary/20 transition-all duration-300">
                <Sparkles className="h-4.5 w-4.5 fill-primary/10" />
              </div>
              <span className="bg-gradient-to-r from-foreground via-foreground to-primary/80 bg-clip-text text-transparent">
                {t("logo_title")}
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md font-medium">
              {t("footer_desc")}
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-sm font-semibold tracking-wider text-foreground uppercase">
              {t("footer_quick_links")}
            </h4>
            <ul className="space-y-2.5 text-sm font-medium">
              <li>
                <Link href={getPath("/")} className="hover:text-primary transition-colors">
                  {t("nav_home")}
                </Link>
              </li>
              <li>
                <Link href={getHashPath("#hizmetler")} className="hover:text-primary transition-colors">
                  {t("nav_services")}
                </Link>
              </li>
              <li>
                <Link href={getHashPath("#")} className="hover:text-primary transition-colors">
                  {t("nav_why_us")}
                </Link>
              </li>
              <li>
                <Link href={getPath("/booking")} className="hover:text-primary transition-colors">
                  {t("nav_booking")}
                </Link>
              </li>
              <li>
                <Link href={getPath("/admin")} className="hover:text-primary transition-colors">
                  {t("nav_admin")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-sm font-semibold tracking-wider text-foreground uppercase">
              {t("footer_contact")}
            </h4>
            <ul className="space-y-3 text-sm font-medium">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-5 w-5 text-primary/85 shrink-0" />
                <span className="text-muted-foreground leading-snug">
                  {t("footer_location")}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4.5 w-4.5 text-primary/85 shrink-0" />
                <a href="mailto:info@mistiktarot.com" className="hover:text-primary transition-colors">
                  info@mistiktarot.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4.5 w-4.5 text-primary/85 shrink-0" />
                <a href="tel:+905551234567" className="hover:text-primary transition-colors">
                  +90 (555) 123 45 67
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium">
          <p>
            &copy; {new Date().getFullYear()} Mistik Tarot. {t("footer_rights")}
          </p>
          <p className="flex items-center gap-1">
            <span>{t("footer_made_with")}</span>
            <span className="text-red-500 animate-pulse">❤️</span>
            <span>{t("footer_made_end")}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
