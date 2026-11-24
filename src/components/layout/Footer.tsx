"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SITE_CONFIG, NAV_LINKS, FOCUS_AREAS, OFFICE_LOCATIONS } from "@/lib/constants";
import { useLanguage } from "@/context/LanguageContext";
import { DynamicIcon } from "@/components/ui/Icons";

export default function Footer() {
  const { isGujarati, t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#08241C] text-cream border-t border-[#133F31]" role="contentinfo">
      {/* Main Footer Content */}
      <div className="container-wide section-padding py-16 lg:py-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Column 1: Organization Branding & Mission (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-4">
            <Link
              href="/"
              className="inline-flex items-center space-x-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-saffron rounded"
              aria-label={`${SITE_CONFIG.name} Home`}
            >
              <div className="relative w-11 h-11 rounded-xl overflow-hidden shadow-md border border-white/20 bg-white p-1 shrink-0">
                <Image
                  src="/images/favicon.png"
                  alt="Swadeep Emblem"
                  fill
                  sizes="44px"
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-2xl font-extrabold tracking-tight text-white leading-none">
                  <span className="text-[#F47B2A]">S</span>wadeep
                </span>
                <span className="font-gujarati text-xs sm:text-sm text-cream/90 font-medium mt-1 leading-none">
                  {SITE_CONFIG.nameGujarati}
                </span>
              </div>
            </Link>

            <p className="font-body text-cream/85 text-xs sm:text-sm leading-relaxed max-w-sm pt-2">
              {t("footerMission")}
            </p>

            {/* Verified Transparency Badges */}
            <div className="pt-2 flex flex-wrap gap-2 text-[11px] text-cream/80">
              <span className="px-2.5 py-1 rounded-full bg-white/10 border border-white/15">
                80G Tax Exemption
              </span>
              <span className="px-2.5 py-1 rounded-full bg-white/10 border border-white/15">
                FCRA: 041980081
              </span>
              <span className="px-2.5 py-1 rounded-full bg-white/10 border border-white/15">
                PAN: AAKTS6375E
              </span>
            </div>

            {/* Social Media Links */}
            <div className="pt-3">
              <span className="block text-xs font-semibold uppercase tracking-wider text-cream/60 mb-2.5">
                {isGujarati ? "સોશિયલ મીડિયા પર જોડાઓ" : "Official Channels"}
              </span>
              <div className="flex items-center space-x-3">
                {/* Facebook */}
                <a
                  href={SITE_CONFIG.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#F47B2A] text-cream hover:text-white flex items-center justify-center transition-all duration-200 border border-white/15 hover:border-[#F47B2A]"
                  aria-label="Visit Swadeep on Facebook"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href={SITE_CONFIG.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-red-600 text-cream hover:text-white flex items-center justify-center transition-all duration-200 border border-white/15 hover:border-red-600"
                  aria-label="Visit Swadeep on YouTube"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href={SITE_CONFIG.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] text-cream hover:text-white flex items-center justify-center transition-all duration-200 border border-white/15 hover:border-transparent"
                  aria-label="Visit Swadeep on Instagram"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-heading text-sm font-bold text-white tracking-wide uppercase">
              {t("footerQuickLinks")}
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm" role="list">
              {NAV_LINKS.map((link) => {
                const label = isGujarati ? link.labelGu : link.label;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-cream/80 hover:text-[#F47B2A] transition-colors inline-flex items-center group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F47B2A]/60 group-hover:bg-[#F47B2A] mr-2 transition-colors" />
                      <span>{label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 3: Thematic Focus Areas (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-heading text-sm font-bold text-white tracking-wide uppercase">
              {t("footerPrograms")}
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm" role="list">
              {FOCUS_AREAS.map((area) => (
                <li key={area.id}>
                  <Link
                    href={`/programs/${area.id}`}
                    className="text-cream/80 hover:text-[#F47B2A] transition-colors flex items-center justify-between group"
                  >
                    <span className="flex items-center">
                      <DynamicIcon name={area.icon} size={14} className="mr-2 text-[#F47B2A] shrink-0" />
                      <span>{isGujarati ? area.titleGu : area.title}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Office (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-heading text-sm font-bold text-white tracking-wide uppercase">
              {t("footerContactHeading")}
            </h3>
            <address className="not-italic space-y-3 text-xs text-cream/80">
              <div>
                <span className="block font-bold text-white text-[11px] uppercase text-[#F47B2A]">
                  {isGujarati ? OFFICE_LOCATIONS.operating.labelGu : "Headquarters & Office"}
                </span>
                <p className="mt-0.5 leading-relaxed">{OFFICE_LOCATIONS.operating.fullAddress}</p>
              </div>

              <div className="pt-1 space-y-1">
                <p>
                  <span className="font-semibold text-white">{isGujarati ? "ફોન:" : "Phone:"}</span>{" "}
                  <a href={`tel:${SITE_CONFIG.phone}`} className="hover:text-[#F47B2A] transition-colors">
                    {SITE_CONFIG.phone}
                  </a>
                </p>
                <p>
                  <span className="font-semibold text-white">{isGujarati ? "ઈમેલ:" : "Email:"}</span>{" "}
                  <a href={`mailto:${SITE_CONFIG.email}`} className="hover:text-[#F47B2A] transition-colors">
                    {SITE_CONFIG.email}
                  </a>
                </p>
              </div>
            </address>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#133F31] bg-[#051812] py-5">
        <div className="container-wide section-padding max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-xs text-cream/75 gap-3">
          <p>
            &copy; {currentYear} {SITE_CONFIG.name}. {t("footerRights")}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
            <Link href="/privacy" className="hover:text-[#F47B2A] transition-colors">
              Privacy Policy
            </Link>
            <span className="text-cream/40">•</span>
            <Link href="/donate" className="hover:text-[#F47B2A] transition-colors">
              80G Exemption
            </Link>
            <span className="text-cream/40">•</span>
            <Link href="/resources" className="hover:text-[#F47B2A] transition-colors">
              Official Reports
            </Link>
            <span className="text-cream/40">•</span>
            <Link href="/publications" className="hover:text-[#F47B2A] transition-colors">
              Publications
            </Link>
            <span className="text-cream/40">•</span>
            <Link href="/admin" className="hover:text-[#F47B2A] transition-colors opacity-60 hover:opacity-100">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
