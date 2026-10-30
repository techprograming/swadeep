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

  // Close menus on navigation
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

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

  // Hover handlers with debounced closing
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

  const toggleMobileAccordion = (index: number) => {
    setMobileExpandedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <>
      {/* Main Sticky Navbar */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
          isScrolled
            ? "bg-white/95 backdrop-blur-xl shadow-lg py-2.5 sm:py-3 border-b border-forest/10"
            : "bg-cream/90 backdrop-blur-md py-3.5 sm:py-4 border-b border-transparent"
        )}
      >
        <nav
          className="container-wide section-padding flex items-center justify-between"
          aria-label="Main Navigation"
        >
          {/* Logo & Branding */}
          <Link
            href="/"
            className="group flex items-center space-x-2.5 sm:space-x-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-saffron rounded-xl p-1 transition-transform duration-200 hover:scale-[1.01]"
            aria-label={`${SITE_CONFIG.name} Home`}
          >
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden shadow-xs border border-forest/15 bg-white p-0.5 shrink-0 group-hover:shadow-md transition-shadow">
              <Image
                src="/images/favicon.png"
                alt="Swadeep Emblem"
                fill
                sizes="44px"
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-xl sm:text-2xl font-extrabold tracking-tight text-forest-dark transition-colors group-hover:text-forest leading-none">
                <span className="text-saffron font-black">S</span>wadeep
              </span>
              <span className="font-gujarati text-xs sm:text-[13px] text-charcoal/80 font-semibold tracking-wide mt-1 leading-none">
                {SITE_CONFIG.nameGujarati}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links with Animated Dropdowns */}
          <div className="hidden xl:flex items-center space-x-1">
            {NAV_LINKS.map((link) => {
              const hasDropdown = link.dropdown && link.dropdown.length > 0;
              const isDropdownOpen = activeDropdown === link.label;
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname?.startsWith(link.href));
              const displayLabel = isGujarati ? link.labelGu : link.label;

              return (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(link.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "group inline-flex items-center px-3 py-2 rounded-full text-[13.5px] font-bold transition-all duration-200",
                      isActive
                        ? "text-saffron-dark font-extrabold bg-saffron-50 shadow-xs"
                        : "text-charcoal hover:text-forest-dark hover:bg-forest-50/70",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-forest"
                    )}
                    aria-expanded={isDropdownOpen}
                  >
                    <span>{displayLabel}</span>
                    {hasDropdown && (
                      <svg
                        className={cn(
                          "w-3 h-3 ml-1 transition-transform duration-300 text-charcoal/50 group-hover:text-forest",
                          isDropdownOpen ? "rotate-180 text-saffron" : "rotate-0"
                        )}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </Link>

                  {/* Dropdown Menu Container */}
                  {hasDropdown && isDropdownOpen && (
                    <div
                      className="absolute left-0 top-full pt-2 w-72 z-50 animate-in fade-in zoom-in-95 duration-200"
                      role="menu"
                    >
                      <div className="bg-white/98 backdrop-blur-xl rounded-2xl p-2.5 shadow-2xl border border-forest/10 ring-1 ring-black/5 space-y-1">
                        {link.dropdown.map((item) => {
                          const itemLabel = isGujarati ? item.labelGu : item.label;
                          const itemDesc = isGujarati ? item.descriptionGu : item.description;

                          return (
                            <Link
                              key={item.href}
                              href={item.href}
                              role="menuitem"
                              className="group/item flex flex-col p-2.5 rounded-xl hover:bg-forest-50/80 transition-all duration-200 hover:translate-x-1"
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-heading font-bold text-sm text-forest-dark group-hover/item:text-forest transition-colors">
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
                                <span className="font-body text-xs text-charcoal/70 line-clamp-1 mt-0.5">
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
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Language Selector Button */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-bold border border-forest/20 text-forest-dark bg-white/80 hover:bg-forest/10 hover:border-forest/40 transition-colors shadow-2xs focus:outline-none focus-visible:ring-2 focus-visible:ring-saffron"
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
                <circle cx="12" cy="12" r="10" strokeWidth="2" />
                <path strokeWidth="2" d="M12 2a14.5 14.5 0 0 0 0 20M12 2a14.5 14.5 0 0 1 0 20M2 12h20" />
              </svg>
              <span className={cn(isGujarati ? "font-body" : "font-gujarati")}>
                {language === "en" ? "ગુજરાતી" : "English"}
              </span>
            </button>

            {/* Distinct Donate Now Button */}
            <Link
              href="/donate"
              className="inline-flex items-center justify-center px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-extrabold text-white bg-[#F47B2A] hover:bg-[#E06A1B] shadow-md shadow-[#F47B2A]/20 hover:shadow-lg hover:shadow-[#F47B2A]/35 hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F47B2A]"
            >
              <svg
                className="w-3.5 h-3.5 mr-1.5 text-white/90"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span>{t("donateNow")}</span>
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              ref={toggleButtonRef}
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-charcoal hover:text-forest hover:bg-forest-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-saffron transition-colors xl:hidden"
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
            >
              <svg
                className="w-6 h-6 transition-transform duration-300"
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
      </header>

      {/* Mobile Drawer Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-charcoal/60 backdrop-blur-sm z-50 xl:hidden transition-opacity duration-300",
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Slide-in Drawer with Accordions */}
      <div
        id="mobile-navigation-drawer"
        ref={drawerRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Site Navigation"
        className={cn(
          "fixed top-0 right-0 bottom-0 w-[88%] max-w-sm bg-cream z-50 xl:hidden flex flex-col justify-between shadow-2xl transition-transform duration-300 ease-in-out outline-none",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Drawer Header */}
        <div className="p-4 border-b border-cream-dark flex items-center justify-between bg-white">
          <div className="flex items-center space-x-2.5">
            <div className="relative w-8 h-8 rounded-lg overflow-hidden shadow-xs border border-forest/15">
              <Image src="/images/favicon.png" alt="Emblem" fill className="object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-lg font-bold text-forest-dark leading-none">
                <span className="text-saffron">S</span>wadeep
              </span>
              <span className="font-gujarati text-xs text-charcoal/80 mt-0.5">
                {SITE_CONFIG.nameGujarati}
              </span>
            </div>
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
              className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#F47B2A] text-white shadow-xs"
            >
              <span>{language === "en" ? "ગુજરાતી માં જુઓ" : "View in English"}</span>
            </button>
          </div>

          {NAV_LINKS.map((link, idx) => {
            const isExpanded = mobileExpandedIndex === idx;
            const hasDropdown = link.dropdown && link.dropdown.length > 0;
            const displayLabel = isGujarati ? link.labelGu : link.label;

            return (
              <div key={link.label} className="rounded-xl overflow-hidden border border-forest/5 bg-white/70">
                <div className="flex items-center justify-between p-3">
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="font-heading font-bold text-base text-forest-dark hover:text-saffron transition-colors flex-1"
                  >
                    {displayLabel}
                  </Link>

                  {hasDropdown && (
                    <button
                      type="button"
                      onClick={() => toggleMobileAccordion(idx)}
                      className="p-1.5 rounded-lg hover:bg-forest-50 text-forest/70 transition-colors"
                      aria-label={`Toggle ${displayLabel} menu`}
                    >
                      <svg
                        className={cn(
                          "w-4 h-4 transition-transform duration-300",
                          isExpanded ? "rotate-180 text-saffron" : "rotate-0"
                        )}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  )}
                </div>

                {/* Animated Accordion Content */}
                {hasDropdown && (
                  <div
                    className={cn(
                      "grid transition-all duration-300 ease-in-out px-3",
                      isExpanded ? "grid-rows-[1fr] pb-3 opacity-100" : "grid-rows-[0fr] opacity-0"
                    )}
                  >
                    <div className="overflow-hidden space-y-1 border-t border-cream-dark/60 pt-2">
                      {link.dropdown.map((subItem) => {
                        const itemLabel = isGujarati ? subItem.labelGu : subItem.label;
                        const itemDesc = isGujarati ? subItem.descriptionGu : subItem.description;

                        return (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block px-3 py-2 rounded-lg text-sm text-charcoal/85 hover:bg-forest-50 hover:text-forest transition-colors font-medium"
                          >
                            <div className="font-heading font-semibold text-xs sm:text-sm text-forest-dark">
                              {itemLabel}
                            </div>
                            {itemDesc && (
                              <div className="text-[11px] text-charcoal/60 truncate mt-0.5">
                                {itemDesc}
                              </div>
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

          {/* Donate CTA inside drawer */}
          <div className="pt-2">
            <Link
              href="/donate"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center w-full px-6 py-3 rounded-full text-base font-bold text-white bg-[#F47B2A] hover:bg-[#E06A1B] shadow-md transition-colors"
            >
              <span>{t("donateNow")}</span>
            </Link>
          </div>
        </div>

        {/* Drawer Footer Contact details */}
        <div className="p-4 border-t border-cream-dark bg-cream-100/60 space-y-2 text-xs text-charcoal/80">
          <p className="font-bold text-forest-dark">{SITE_CONFIG.name}</p>
          <p className="truncate">
            <span className="font-semibold text-forest">Email:</span> {SITE_CONFIG.email}
          </p>
          <p>
            <span className="font-semibold text-forest">Phone:</span> {SITE_CONFIG.phone}
          </p>
        </div>
      </div>
    </>
  );
}
