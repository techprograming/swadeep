"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const { language, toggleLanguage, t, isGujarati } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpandedIndex, setMobileExpandedIndex] = useState<number | null>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const drawerRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  // Click outside to close desktop dropdowns
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navContainerRef.current && !navContainerRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle keyboard events (ESC to close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (activeDropdown) {
          setActiveDropdown(null);
        }
        if (isMobileMenuOpen) {
          setIsMobileMenuOpen(false);
          toggleButtonRef.current?.focus();
        }
      }
    };

    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      drawerRef.current?.focus();
    } else {
      document.body.style.overflow = "";
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileMenuOpen, activeDropdown]);

  // Hover handlers with debounce for desktop dropdowns
  const handleMouseEnter = (label: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  const handleToggleDesktopDropdown = (label: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveDropdown((prev) => (prev === label ? null : label));
  };

  const toggleMobileAccordion = (index: number) => {
    setMobileExpandedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <>
      {/* Top Header Wrapper — Solid, Opaque Header */}
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        {/* 1. Solid Top Utility Strip (Condenses on scroll) */}
        <div
          className={cn(
            "bg-[#061F17] text-cream/90 transition-all duration-300 overflow-hidden border-b border-white/10 hidden md:block",
            isScrolled ? "max-h-0 opacity-0 py-0" : "max-h-12 opacity-100 py-1.5"
          )}
        >
          <div className="container-wide section-padding flex items-center justify-between text-[11px] sm:text-xs">
            {/* Direct Helpline & Email */}
            <div className="flex items-center space-x-4">
              <a
                href={`tel:${SITE_CONFIG.phoneRaw}`}
                className="inline-flex items-center gap-1.5 text-cream/90 hover:text-saffron transition-colors"
                title="Direct Helpline"
              >
                <svg className="w-3.5 h-3.5 text-saffron shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span className="font-semibold">{SITE_CONFIG.phone}</span>
              </a>

              <span className="text-white/30 hidden sm:inline">•</span>

              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="hidden sm:inline-flex items-center gap-1 text-cream/90 hover:text-saffron transition-colors"
              >
                <span>{SITE_CONFIG.email}</span>
              </a>
            </div>

            {/* Official Social Channels */}
            <div className="flex items-center space-x-2 pl-2 border-l border-white/15">
              <a
                href={SITE_CONFIG.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-5 h-5 rounded-full bg-white/10 hover:bg-[#F47B2A] text-white flex items-center justify-center transition-colors"
                aria-label="Facebook Page"
              >
                <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href={SITE_CONFIG.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-5 h-5 rounded-full bg-white/10 hover:bg-red-600 text-white flex items-center justify-center transition-colors"
                aria-label="YouTube Channel"
              >
                <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a
                href={SITE_CONFIG.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-5 h-5 rounded-full bg-white/10 hover:bg-[#E1306C] text-white flex items-center justify-center transition-colors"
                aria-label="Instagram Profile"
              >
                <svg className="w-2.5 h-2.5 fill-current text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* 2. Main Solid White Navbar (NOT Transparent) */}
        <div
          className={cn(
            "bg-white transition-all duration-300 ease-in-out border-b border-gray-200/90 shadow-sm",
            isScrolled ? "py-2 sm:py-2.5 shadow-md" : "py-2.5 sm:py-3"
          )}
        >
          <nav
            className="container-wide section-padding flex items-center justify-between gap-1.5 sm:gap-4"
            aria-label="Main Navigation"
          >
            {/* Logo & Professional Branding */}
            <Link
              href="/"
              className="group flex items-center space-x-1.5 xs:space-x-2.5 sm:space-x-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-saffron rounded-2xl p-0.5 sm:p-1 transition-transform duration-200 hover:scale-[1.01] shrink-0"
              aria-label={`${SITE_CONFIG.name} Home`}
            >
              <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-xl overflow-hidden shadow-xs border border-forest/20 bg-white p-0.5 shrink-0 group-hover:shadow-md group-hover:border-forest/40 transition-all">
                <Image
                  src="/images/favicon.png"
                  alt="Swadeep Emblem"
                  fill
                  sizes="40px"
                  className="object-contain"
                  priority
                />
              </div>
              <span className="font-heading text-lg sm:text-2xl font-black tracking-tight text-forest-dark group-hover:text-forest transition-colors leading-none">
                <span className="text-[#F47B2A]">S</span>wadeep
              </span>
            </Link>

            {/* Desktop Navigation Links with Solid Dropdown Menus */}
            <div ref={navContainerRef} className="hidden lg:flex items-center space-x-1 xl:space-x-1.5">
              {NAV_LINKS.map((link) => {
                const hasDropdown = Boolean(link.dropdown && link.dropdown.length > 0);
                const isDropdownOpen = activeDropdown === link.label;
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/" && pathname?.startsWith(link.href));
                const displayLabel = isGujarati ? link.labelGu : link.label;

                return (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => (hasDropdown ? handleMouseEnter(link.label) : undefined)}
                    onMouseLeave={() => (hasDropdown ? handleMouseLeave() : undefined)}
                  >
                    {hasDropdown ? (
                      <button
                        type="button"
                        onClick={(e) => handleToggleDesktopDropdown(link.label, e)}
                        className={cn(
                          "group inline-flex items-center whitespace-nowrap px-3 py-2 rounded-xl text-[13px] xl:text-[13.5px] font-semibold transition-all duration-150 cursor-pointer",
                          isActive || isDropdownOpen
                            ? "text-forest bg-forest-50/90 font-bold border border-forest/15 shadow-2xs"
                            : "text-charcoal/85 hover:text-forest hover:bg-forest-50/60",
                          "focus:outline-none focus-visible:ring-2 focus-visible:ring-saffron"
                        )}
                        aria-expanded={isDropdownOpen}
                        aria-haspopup="true"
                      >
                        <span>{displayLabel}</span>
                        <svg
                          className={cn(
                            "w-3 h-3 ml-1.5 transition-transform duration-200 text-charcoal/40 group-hover:text-forest shrink-0",
                            isDropdownOpen ? "rotate-180 text-saffron" : "rotate-0"
                          )}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    ) : (
                      <Link
                        href={link.href}
                        className={cn(
                          "group inline-flex items-center whitespace-nowrap px-3 py-2 rounded-xl text-[13px] xl:text-[13.5px] font-semibold transition-all duration-150",
                          isActive
                            ? "text-forest bg-forest-50/90 font-bold border border-forest/15 shadow-2xs"
                            : "text-charcoal/85 hover:text-forest hover:bg-forest-50/60",
                          "focus:outline-none focus-visible:ring-2 focus-visible:ring-saffron"
                        )}
                      >
                        <span>{displayLabel}</span>
                      </Link>
                    )}

                    {/* Desktop Dropdown Card — 100% Solid White with Subtle Minimalist Shadows */}
                    {hasDropdown && isDropdownOpen && (
                      <div
                        className="absolute left-0 top-full pt-2 w-72 xl:w-80 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                        role="menu"
                      >
                        <div className="bg-white rounded-2xl p-2.5 shadow-2xl border border-gray-200/90 ring-1 ring-black/5 space-y-1">
                          {link.dropdown?.map((item) => {
                            const itemLabel = isGujarati ? item.labelGu : item.label;
                            const itemDesc = isGujarati ? item.descriptionGu : item.description;

                            return (
                              <Link
                                key={item.href}
                                href={item.href}
                                role="menuitem"
                                onClick={() => setActiveDropdown(null)}
                                className="group/item flex flex-col p-2.5 rounded-xl hover:bg-forest-50 transition-all duration-150 hover:translate-x-1"
                              >
                                <div className="flex items-center justify-between">
                                  <span className="font-heading font-bold text-xs sm:text-sm text-forest-dark group-hover/item:text-forest transition-colors">
                                    {itemLabel}
                                  </span>
                                  <svg
                                    className="w-3.5 h-3.5 text-forest/40 opacity-0 group-hover/item:opacity-100 transition-opacity"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                  >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                  </svg>
                                </div>
                                {itemDesc && (
                                  <span className="font-body text-[11px] sm:text-xs text-charcoal/70 line-clamp-1 mt-0.5">
                                    {itemDesc}
                                  </span>
                                )}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right Action Area: Language Switcher + Distinct Donate Now Button */}
            <div className="flex items-center space-x-1 xs:space-x-1.5 sm:space-x-2.5 shrink-0">
              {/* Solid Language Selector Pill */}
              <button
                type="button"
                onClick={toggleLanguage}
                className="inline-flex items-center whitespace-nowrap space-x-1 sm:space-x-1.5 px-2 xs:px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full text-xs font-bold border border-forest/20 text-forest-dark bg-white hover:bg-forest-50 hover:border-forest/40 transition-all shadow-2xs focus:outline-none focus-visible:ring-2 focus-visible:ring-saffron active:scale-95"
                aria-label={`Switch language to ${language === "en" ? "Gujarati" : "English"}`}
                title={`Switch language to ${language === "en" ? "Gujarati" : "English"}`}
              >
                <svg
                  className="w-3.5 h-3.5 text-forest"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" strokeWidth={2} />
                  <path strokeWidth={2} d="M12 2a14.5 14.5 0 0 0 0 20M12 2a14.5 14.5 0 0 1 0 20M2 12h20" />
                </svg>
                <span className={cn("font-medium", isGujarati ? "font-body" : "font-gujarati")}>
                  {language === "en" ? "ગુજરાતી" : "English"}
                </span>
              </button>

              {/* Distinctive, Radiant Donate Now Button */}
              <Link
                href="/donate"
                className="inline-flex items-center justify-center whitespace-nowrap px-2.5 xs:px-3.5 sm:px-5 py-1.5 sm:py-2.5 rounded-full text-xs sm:text-sm font-extrabold text-white bg-gradient-to-r from-[#F47B2A] to-[#E06A1B] hover:from-[#E06A1B] hover:to-[#C8590F] shadow-md shadow-[#F47B2A]/25 hover:shadow-lg hover:shadow-[#F47B2A]/40 hover:-translate-y-0.5 active:translate-y-0 active:scale-98 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F47B2A]"
              >
                <svg
                  className="w-3.5 h-3.5 xs:mr-1.5 text-white/95 shrink-0"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                <span className="hidden xs:inline">{t("donateNow")}</span>
              </Link>

              {/* Mobile Menu Toggle Button (Visible on screens < lg) */}
              <button
                ref={toggleButtonRef}
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-1.5 sm:p-2 rounded-xl text-charcoal hover:text-forest hover:bg-forest-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-saffron transition-colors lg:hidden"
                aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-navigation-drawer"
              >
                <svg
                  className="w-6 h-6 transition-transform duration-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Drawer Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-charcoal/60 backdrop-blur-sm z-50 lg:hidden transition-opacity duration-300",
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Slide-in Drawer (Solid, Opaque Background) */}
      <div
        id="mobile-navigation-drawer"
        ref={drawerRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Site Navigation"
        className={cn(
          "fixed top-0 right-0 bottom-0 w-[88%] max-w-sm bg-cream z-50 lg:hidden flex flex-col justify-between shadow-2xl transition-transform duration-300 ease-in-out outline-none",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Drawer Header */}
        <div className="p-4 border-b border-cream-dark flex items-center justify-between bg-white">
          <div className="flex items-center space-x-2.5">
            <div className="relative w-8 h-8 rounded-lg overflow-hidden shadow-xs border border-forest/15">
              <Image src="/images/favicon.png" alt="Emblem" fill className="object-contain" />
            </div>
            <span className="font-heading text-lg font-bold text-forest-dark leading-none">
              <span className="text-[#F47B2A]">S</span>wadeep
            </span>
          </div>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 rounded-lg text-charcoal/70 hover:text-forest hover:bg-forest-50 transition-colors"
            aria-label="Close navigation menu"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Drawer Navigation List with Accordion Dropdowns */}
        <div className="px-4 py-4 flex-1 overflow-y-auto space-y-2">
          {/* Mobile Language Switcher Bar */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-white/80 border border-forest/10 mb-2">
            <span className="text-xs font-semibold text-charcoal/70">Language / ભાષા:</span>
            <button
              type="button"
              onClick={toggleLanguage}
              className="px-3 py-1.5 rounded-lg bg-forest-50 text-forest-dark font-bold text-xs border border-forest/20 hover:bg-forest-100 transition-colors"
            >
              {language === "en" ? "ગુજરાતી માં જુઓ" : "Switch to English"}
            </button>
          </div>

          {NAV_LINKS.map((link, idx) => {
            const hasDropdown = Boolean(link.dropdown && link.dropdown.length > 0);
            const isExpanded = mobileExpandedIndex === idx;
            const displayLabel = isGujarati ? link.labelGu : link.label;

            return (
              <div key={link.label} className="border-b border-forest/10 pb-2">
                {hasDropdown ? (
                  <button
                    type="button"
                    onClick={() => toggleMobileAccordion(idx)}
                    className="w-full flex items-center justify-between py-2.5 px-2 text-left font-heading font-bold text-base text-forest-dark hover:text-saffron rounded-xl transition-colors cursor-pointer"
                    aria-expanded={isExpanded}
                  >
                    <span>{displayLabel}</span>
                    <div
                      className={cn(
                        "w-7 h-7 rounded-lg flex items-center justify-center transition-all",
                        isExpanded ? "bg-[#F47B2A] text-white rotate-180" : "bg-forest-50 text-forest"
                      )}
                    >
                      <svg
                        className="w-4 h-4 transition-transform duration-200"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-2.5 px-2 font-heading font-bold text-base text-forest-dark hover:text-saffron transition-colors"
                  >
                    {displayLabel}
                  </Link>
                )}

                {/* Accordion Content */}
                {hasDropdown && isExpanded && (
                  <div className="pl-2 pr-1 py-1.5 space-y-1 bg-white rounded-2xl my-1 border border-forest/10 shadow-xs animate-in fade-in duration-200">
                    {/* Main Overview Link */}
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-forest-50/70 hover:bg-forest-50 text-xs font-bold text-forest-dark transition-colors"
                    >
                      <span>{isGujarati ? `તમામ ${displayLabel} જુઓ (Overview)` : `Explore All ${displayLabel} →`}</span>
                      <svg className="w-3.5 h-3.5 text-[#F47B2A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>

                    {link.dropdown?.map((subItem) => {
                      const subLabel = isGujarati ? subItem.labelGu : subItem.label;
                      const subDesc = isGujarati ? subItem.descriptionGu : subItem.description;
                      return (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block p-2.5 rounded-xl hover:bg-forest-50/80 transition-all border-b border-gray-50 last:border-0"
                        >
                          <div className="font-heading font-bold text-xs sm:text-sm text-forest-dark">
                            {subLabel}
                          </div>
                          {subDesc && (
                            <div className="font-body text-[11px] text-charcoal/65 line-clamp-1 mt-0.5">
                              {subDesc}
                            </div>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Drawer Bottom Action Area */}
        <div className="p-4 bg-white border-t border-cream-dark space-y-3">
          <Link
            href="/donate"
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-full flex items-center justify-center py-3 rounded-full bg-gradient-to-r from-[#F47B2A] to-[#E06A1B] text-white font-bold text-sm shadow-md transition-colors"
          >
            <span>{t("donateNow")}</span>
          </Link>

          {/* Social Channels in Mobile Drawer */}
          <div className="flex items-center justify-center space-x-3 pt-1">
            <a
              href={SITE_CONFIG.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-forest-50 hover:bg-[#F47B2A] text-forest hover:text-white flex items-center justify-center transition-colors border border-forest/15"
              aria-label="Facebook"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a
              href={SITE_CONFIG.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-forest-50 hover:bg-red-600 text-forest hover:text-white flex items-center justify-center transition-colors border border-forest/15"
              aria-label="YouTube"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
            <a
              href={SITE_CONFIG.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-forest-50 hover:bg-[#E1306C] text-forest hover:text-white flex items-center justify-center transition-colors border border-forest/15"
              aria-label="Instagram"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
          </div>

          <div className="text-center text-[11px] text-charcoal/60 space-y-0.5 pt-1">
            <div>
              Helpline:{" "}
              <a href={`tel:${SITE_CONFIG.phoneRaw}`} className="font-bold text-forest">
                {SITE_CONFIG.phone}
              </a>
            </div>
            <div>80G Tax Exemption • FCRA Registered</div>
          </div>
        </div>
      </div>
    </>
  );
}
