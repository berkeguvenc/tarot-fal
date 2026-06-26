"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter, useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { Menu, X, Sparkles, Globe, ChevronDown, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const currentPathname = usePathname();
  const router = useRouter();
  const params = useParams();
  
  const currentLocale = (params?.locale as string) || i18n.language || "tr";
  
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Monitor scroll for styling changes
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const changeLanguage = (newLocale: string) => {
    setLangDropdownOpen(false);
    if (newLocale === currentLocale) return;

    // Set cookie for next-i18n-router
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${date.toUTCString()};path=/`;

    // Calculate new path
    let newPath = currentPathname;
    if (newLocale === "tr") {
      newPath = currentPathname.replace(/^\/en(\/|$)/, "$1");
      if (newPath === "") newPath = "/";
    } else {
      if (!currentPathname.startsWith("/en")) {
        newPath = currentPathname === "/" ? "/en" : `/en${currentPathname}`;
      }
    }

    router.push(newPath);
    router.refresh();
  };

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
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border/60 shadow-lg shadow-primary/5"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo / Branding */}
          <Link
            href={getPath("/")}
            className="flex items-center gap-2 text-xl font-bold font-serif text-foreground group transition-colors"
          >
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20 group-hover:bg-primary/20 transition-all duration-300">
              <Sparkles className="h-5 w-5 fill-primary/10 animate-pulse" />
            </div>
            <span className="bg-gradient-to-r from-foreground via-foreground to-primary/80 bg-clip-text text-transparent group-hover:to-primary transition-all duration-300">
              {t("logo_title")}
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href={getHashPath("#hizmetler")}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("nav_services")}
            </Link>
            <Link
              href={getHashPath("#")}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("nav_why_us")}
            </Link>
            <Link
              href={getPath("/booking")}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("nav_booking")}
            </Link>
            <Link
              href={getPath("/admin")}
              className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md bg-secondary/60 text-secondary-foreground hover:bg-secondary border border-border/50 hover:border-border transition-colors"
            >
              <LayoutDashboard className="h-3.5 w-3.5" />
              {t("nav_admin")}
            </Link>
          </nav>

          {/* Desktop Action Buttons (Language Selector + CTA) */}
          <div className="hidden md:flex items-center gap-4">
            {/* Language Selector */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-xl border border-border/85 bg-secondary/30 text-foreground hover:bg-secondary/60 hover:border-primary/30 transition-all cursor-pointer"
              >
                <Globe className="h-4 w-4 text-muted-foreground" />
                <span className="uppercase text-xs font-bold">{currentLocale}</span>
                <ChevronDown
                  className={`h-3 w-3 text-muted-foreground transition-transform duration-200 ${
                    langDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 origin-top-right rounded-xl border border-border bg-card p-1 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
                  <button
                    onClick={() => changeLanguage("tr")}
                    className={`flex w-full items-center justify-between px-3 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                      currentLocale === "tr"
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                    }`}
                  >
                    {t("lang_tr")}
                    {currentLocale === "tr" && <span className="h-1.5 w-1.5 rounded-full bg-primary" />}
                  </button>
                  <button
                    onClick={() => changeLanguage("en")}
                    className={`flex w-full items-center justify-between px-3 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                      currentLocale === "en"
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                    }`}
                  >
                    {t("lang_en")}
                    {currentLocale === "en" && <span className="h-1.5 w-1.5 rounded-full bg-primary" />}
                  </button>
                </div>
              )}
            </div>

            {/* CTA Button */}
            <Link href={getPath("/booking")}>
              <Button size="sm" className="font-semibold shadow-md shadow-primary/15 cursor-pointer rounded-xl">
                {t("nav_cta")}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-3 md:hidden">
            {/* Simple Mobile Lang Trigger */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-border/80 bg-secondary/20 text-xs font-bold cursor-pointer"
              >
                <Globe className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="uppercase">{currentLocale}</span>
              </button>
              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-28 origin-top-right rounded-lg border border-border bg-card p-1 shadow-lg z-50">
                  <button
                    onClick={() => changeLanguage("tr")}
                    className="flex w-full px-2.5 py-1.5 text-xs font-semibold rounded hover:bg-secondary/50 text-foreground"
                  >
                    {t("lang_tr")}
                  </button>
                  <button
                    onClick={() => changeLanguage("en")}
                    className="flex w-full px-2.5 py-1.5 text-xs font-semibold rounded hover:bg-secondary/50 text-foreground"
                  >
                    {t("lang_en")}
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary/40 border border-transparent hover:border-border/60 transition-all cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-background/95 backdrop-blur-md animate-in slide-in-from-top duration-300">
          <div className="space-y-1.5 px-4 pt-2 pb-6">
            <Link
              href={getHashPath("#hizmetler")}
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-xl px-4 py-2.5 text-base font-semibold text-muted-foreground hover:bg-secondary/30 hover:text-foreground transition-all"
            >
              {t("nav_services")}
            </Link>
            <Link
              href={getHashPath("#")}
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-xl px-4 py-2.5 text-base font-semibold text-muted-foreground hover:bg-secondary/30 hover:text-foreground transition-all"
            >
              {t("nav_why_us")}
            </Link>
            <Link
              href={getPath("/booking")}
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-xl px-4 py-2.5 text-base font-semibold text-muted-foreground hover:bg-secondary/30 hover:text-foreground transition-all"
            >
              {t("nav_booking")}
            </Link>
            <Link
              href={getPath("/admin")}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-base font-semibold text-muted-foreground hover:bg-secondary/30 hover:text-foreground transition-all"
            >
              <LayoutDashboard className="h-4 w-4" />
              {t("nav_admin")}
            </Link>
            <div className="pt-4 px-4">
              <Link href={getPath("/booking")} onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full font-bold h-11 shadow-lg shadow-primary/20 rounded-xl">
                  {t("nav_cta")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
