"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SITE_CONFIG } from "@/lib/constants";
import { useLanguage } from "@/context/LanguageContext";
import {
  BookOpenIcon,
  HeartPulseIcon,
  UsersGroupIcon,
  AwardMedalIcon,
} from "@/components/ui/Icons";

export default function Hero() {
  const { t, isGujarati } = useLanguage();

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative min-h-[90vh] flex items-center bg-gradient-to-r from-[#0B3025] via-[#174B38] to-[#205943] text-white overflow-hidden pt-28 pb-16 lg:pt-36 lg:pb-24"
    >
      {/* 1. Subtle genuine photography background texture */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <Image
          src="/images/projects-hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105 opacity-[0.12] mix-blend-luminosity filter contrast-125"
        />

        {/* 2. Deep Forest Green Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B3025]/95 via-[#0B3025]/85 to-[#174B38]/85" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B3025]/50 via-transparent to-[#0B3025]/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(32,89,67,0.4),_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(11,48,37,0.75),_transparent_65%)]" />
      </div>

      {/* 3. Hero Content Container */}
      <div className="container-wide section-padding relative z-10 w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Eyebrow, Heading, Description, Action Buttons, Trust Markers */}
          <div className="lg:col-span-7 text-left space-y-6">
            {/* Top Introductory Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 text-xs sm:text-sm font-medium text-white/95 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#F47B2A] shrink-0" />
              <span>{isGujarati ? SITE_CONFIG.subtitle : "Non-profit organization in Ahmedabad, Gujarat"}</span>
            </div>

            {/* Eyebrow & Main Headings */}
            <div className="space-y-1.5">
              <span className="block font-heading text-base sm:text-lg lg:text-xl text-[#F47B2A] font-bold uppercase tracking-wider">
                {t("heroEyebrow")}
              </span>
              <h1
                id="hero-heading"
                className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-white"
              >
                Swadeep Shikshan Vikas Sanstha
              </h1>
            </div>

            {/* Gujarati Subheading */}
            <p className="font-gujarati text-lg sm:text-xl md:text-2xl text-white/95 font-medium tracking-wide">
              {SITE_CONFIG.nameGujarati}
            </p>

            {/* Professional Mission Statement */}
            <p className="font-body text-white/90 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed">
              {t("heroDesc")}
            </p>

            {/* Two Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              {/* Primary Button: Explore Our Work */}
              <Link
                href="/programs"
                className="inline-flex items-center justify-center px-7 sm:px-8 py-3.5 sm:py-4 rounded-full text-sm sm:text-base font-bold text-white bg-[#F47B2A] hover:bg-[#E06A1B] shadow-lg shadow-[#F47B2A]/25 hover:shadow-[#F47B2A]/40 hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F47B2A]"
              >
                <span>{t("exploreOurWork")}</span>
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>

              {/* Secondary Button: Support Our Mission */}
              <Link
                href="/donate"
                className="inline-flex items-center justify-center px-7 sm:px-8 py-3.5 sm:py-4 rounded-full text-sm sm:text-base font-bold text-white bg-[#133E30]/70 hover:bg-[#1A4E3D] border border-white/40 hover:border-white shadow-sm hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <span>{t("supportOurMission")}</span>
              </Link>
            </div>

            {/* Verified Transparency Trust Markers */}
            <div className="pt-6 border-t border-white/15 flex flex-wrap gap-4 sm:gap-6 text-xs sm:text-sm text-white/95 font-medium">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-[#F47B2A] shrink-0" />
                <span>Tax Exemption Liable</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-[#F47B2A] shrink-0" />
                <span>FCRA Reg: 041980081</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-[#F47B2A] shrink-0" />
                <span>PAN: AAKTS6375E</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Information Panel Matching Second Screenshot */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            <div className="relative mx-auto max-w-md lg:max-w-none w-full">
              {/* Outer Dark Green Container */}
              <div className="relative rounded-3xl bg-[#0F3528]/90 backdrop-blur-xl border border-white/15 p-5 sm:p-6 shadow-2xl space-y-4 text-white">
                {/* Top Image Card */}
                <div className="h-44 sm:h-52 rounded-2xl relative overflow-hidden flex flex-col justify-end p-4 border border-white/10 group">
                  <Image
                    src="/images/community.jpg"
                    alt="Swadeep Community & Anganwadi Field Work"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 420px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#09281E]/95 via-[#09281E]/50 to-transparent" />
                  
                  <div className="relative z-10 space-y-1">
                    <span className="text-[11px] uppercase tracking-wider font-bold text-white bg-[#0B3025]/80 border border-white/20 px-3 py-1 rounded-full inline-block shadow-xs">
                      {isGujarati ? "સ્થાપના ૨૦૦૫" : "FOUNDED IN 2005"}
                    </span>
                    <h2 className="text-base sm:text-lg font-bold font-heading text-white">
                      Swadeep Shikshan Vikas Sanstha
                    </h2>
                    <p className="text-xs text-white/85">
                      {t("ahmedabadGujarat")}
                    </p>
                  </div>
                </div>

                {/* 3 Compact Program Summary Cards linking to corresponding program pages */}
                <div className="space-y-2.5">
                  {/* Program 1: Education */}
                  <Link
                    href="/programs/education"
                    className="group/item flex items-center justify-between p-3 rounded-2xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 hover:border-white/25 transition-all duration-200"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center shrink-0 group-hover/item:bg-[#F47B2A]/20 transition-colors">
                        <BookOpenIcon className="w-4 h-4 text-[#F47B2A]" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white group-hover/item:text-[#F47B2A] transition-colors">
                          {isGujarati ? "શિક્ષણ" : "Education"}
                        </div>
                        <div className="text-xs text-white/75">
                          {t("heroEduStats")}
                        </div>
                      </div>
                    </div>
                    <svg
                      className="w-4 h-4 text-white/40 group-hover/item:text-white group-hover/item:translate-x-1 transition-all"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>

                  {/* Program 2: Health */}
                  <Link
                    href="/programs/health"
                    className="group/item flex items-center justify-between p-3 rounded-2xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 hover:border-white/25 transition-all duration-200"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center shrink-0 group-hover/item:bg-[#F47B2A]/20 transition-colors">
                        <HeartPulseIcon className="w-4 h-4 text-[#F47B2A]" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white group-hover/item:text-[#F47B2A] transition-colors">
                          {isGujarati ? "આરોગ્ય" : "Health"}
                        </div>
                        <div className="text-xs text-white/75">
                          {t("heroHealthStats")}
                        </div>
                      </div>
                    </div>
                    <svg
                      className="w-4 h-4 text-white/40 group-hover/item:text-white group-hover/item:translate-x-1 transition-all"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>

                  {/* Program 3: Livelihood & Infrastructure */}
                  <Link
                    href="/programs/livelihood"
                    className="group/item flex items-center justify-between p-3 rounded-2xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 hover:border-white/25 transition-all duration-200"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center shrink-0 group-hover/item:bg-[#F47B2A]/20 transition-colors">
                        <UsersGroupIcon className="w-4 h-4 text-[#F47B2A]" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white group-hover/item:text-[#F47B2A] transition-colors">
                          {isGujarati ? "આજીવિકા અને માળખું" : "Livelihood & Infrastructure"}
                        </div>
                        <div className="text-xs text-white/75">
                          {t("heroLivelihoodStats")}
                        </div>
                      </div>
                    </div>
                    <svg
                      className="w-4 h-4 text-white/40 group-hover/item:text-white group-hover/item:translate-x-1 transition-all"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Floating Award Badge at Bottom Right — Exact Match with Screenshot 2 */}
              <div className="absolute -bottom-5 right-2 sm:-right-4 z-20 shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex items-center space-x-3 bg-white text-charcoal px-4 py-2.5 rounded-2xl shadow-xl border border-gray-100 ring-1 ring-black/5">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
                    <AwardMedalIcon className="w-5 h-5 text-[#F47B2A]" />
                  </div>
                  <div className="leading-tight">
                    <span className="block text-[10px] font-bold text-[#F47B2A] uppercase tracking-wider">
                      {isGujarati ? "સન્માન એવોર્ડ" : "AWARD"}
                    </span>
                    <span className="block text-xs sm:text-sm font-extrabold text-[#0B3025]">
                      CSR Conclave 2019
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
