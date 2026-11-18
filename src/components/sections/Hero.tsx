"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { SITE_CONFIG } from "@/lib/constants";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";
import {
  BookOpenIcon,
  HeartPulseIcon,
  UsersGroupIcon,
  AwardMedalIcon,
} from "@/components/ui/Icons";

// Real Grassroots Photographs from Swadeep's field interventions (from img folder)
const HERO_BACKGROUND_IMAGES = [
  {
    src: "/img/466662985_9406865389340993_2185090257753639784_n.jpg",
    alt: "Swadeep community mobilization and social development in rural Gujarat",
    caption: "Grassroots Community Mobilization",
    captionGu: "સમુદાય સંગઠન અને સહભાગી વિકાસ",
  },
  {
    src: "/img/466678542_9406865382674327_1595720136936869927_n.jpg",
    alt: "Swadeep educational empowerment and children's classroom initiative",
    caption: "Children's Improved Education & Life Skills",
    captionGu: "બાળ શિક્ષણ અને સર્વાંગી ક્ષમતાવર્ધન",
  },
  {
    src: "/img/475792725_1034820738680952_9169000876501581246_n.jpg",
    alt: "Swadeep health and community welfare program in Bhavnagar district",
    caption: "Health Awareness & Medical Camps",
    captionGu: "આરોગ્ય જાગૃતિ અને તબીબી સેવા શિબિરો",
  },
  {
    src: "/img/476239017_1038367758326250_9107735841149966113_n.jpg",
    alt: "Swadeep women empowerment and livelihood self-reliance program",
    caption: "Livelihood & Women Self-Reliance",
    captionGu: "આજીવિકા પ્રોત્સાહન અને મહિલા સશક્તિકરણ",
  },
] as const;

export default function Hero() {
  const { t, isGujarati } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Autoplay timer: advances slide every 5 seconds
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % HERO_BACKGROUND_IMAGES.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative min-h-[92vh] flex items-center bg-[#071F17] text-white overflow-hidden pt-28 pb-16 sm:pt-32 lg:pt-36 lg:pb-20"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 1. Enhanced Autoplaying Background Image Carousel (Full Clarity, Rich Colors & Cinematic Ken Burns) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {HERO_BACKGROUND_IMAGES.map((img, idx) => {
          const isActive = idx === currentSlide;
          return (
            <div
              key={img.src}
              className={cn(
                "absolute inset-0 transform-gpu transition-all duration-1000 ease-in-out will-change-transform motion-reduce:transition-none motion-reduce:transform-none",
                isActive
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-105 pointer-events-none"
              )}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                priority={idx === 0}
                sizes="100vw"
                className="object-cover object-center filter contrast-[1.08] saturate-[1.18] brightness-[1.04]"
              />
            </div>
          );
        })}

        {/* 2. Light Non-Destructive Directional Gradient (Keeps images vivid while text stays legible) */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/75 via-black/45 sm:via-black/35 to-black/15 pointer-events-none" />

        {/* Top-to-bottom subtle vignette for clean navbar and section transition */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/50 via-transparent to-black/70 pointer-events-none" />
      </div>

      {/* 3. Hero Content Container */}
      <div className="container-wide section-padding relative z-20 w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Eyebrow, Heading, Description, Action Buttons, Trust Markers */}
          <div className="lg:col-span-7 text-left space-y-6">
            {/* Top Introductory Badge */}
            <div className="inline-flex items-center space-x-2 bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 text-xs sm:text-sm font-medium text-white shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#F47B2A] shrink-0" />
              <span>{isGujarati ? SITE_CONFIG.subtitle : "Non-profit organization in Ahmedabad, Gujarat"}</span>
            </div>

            {/* Eyebrow & Main Headings */}
            <div className="space-y-1.5">
              <span className="block font-heading text-base sm:text-lg lg:text-xl text-[#F47B2A] font-bold uppercase tracking-wider drop-shadow-sm">
                {t("heroEyebrow")}
              </span>
              <h1
                id="hero-heading"
                className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-white drop-shadow-md"
              >
                Swadeep Shikshan Vikas Sanstha
              </h1>
            </div>

            {/* Gujarati Subheading */}
            <p className="font-gujarati text-lg sm:text-xl md:text-2xl text-white font-medium tracking-wide drop-shadow-sm">
              {SITE_CONFIG.nameGujarati}
            </p>

            {/* Professional Mission Statement */}
            <p className="font-body text-white/95 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed drop-shadow-sm">
              {t("heroDesc")}
            </p>

            {/* Two Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              {/* Primary Button: Explore Our Work */}
              <Link
                href="/programs"
                className="inline-flex items-center justify-center px-7 sm:px-8 py-3.5 sm:py-4 rounded-full text-sm sm:text-base font-bold text-white bg-gradient-to-r from-[#F47B2A] to-[#E06A1B] hover:from-[#E06A1B] hover:to-[#C8590F] shadow-lg shadow-[#F47B2A]/30 hover:shadow-[#F47B2A]/50 hover:-translate-y-0.5 active:translate-y-0 active:scale-98 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F47B2A]"
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

              {/* Secondary Button: Donate Now (Prompt Step 4) */}
              <Link
                href="/donate"
                className="inline-flex items-center justify-center px-7 sm:px-8 py-3.5 sm:py-4 rounded-full text-sm sm:text-base font-bold text-white bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/40 hover:border-white shadow-sm hover:-translate-y-0.5 active:translate-y-0 active:scale-98 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <span>{t("donateNow")}</span>
              </Link>
            </div>

            {/* Autoplay Slide Indicator Dots & Pause Button */}
            <div className="pt-2 flex items-center">
              <div className="flex items-center space-x-2 bg-black/45 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 shadow-md">
                {HERO_BACKGROUND_IMAGES.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentSlide(idx)}
                    className={cn(
                      "h-2 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F47B2A]",
                      idx === currentSlide
                        ? "w-6 bg-[#F47B2A]"
                        : "w-2 bg-white/50 hover:bg-white/90"
                    )}
                    aria-label={`Go to slide ${idx + 1}`}
                    aria-current={idx === currentSlide ? "true" : undefined}
                  />
                ))}

                <button
                  type="button"
                  onClick={() => setIsPaused(!isPaused)}
                  className="ml-1.5 p-1 text-white/80 hover:text-white transition-colors"
                  aria-label={isPaused ? "Play background slideshow" : "Pause background slideshow"}
                  title={isPaused ? "Play" : "Pause"}
                >
                  {isPaused ? (
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  ) : (
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Glass Information Panel */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            <div className="relative mx-auto max-w-md lg:max-w-none w-full">
              {/* Semi-transparent Glass Panel letting background photo shine through */}
              <div className="relative rounded-3xl bg-black/40 backdrop-blur-xl border border-white/25 p-5 sm:p-6 shadow-2xl space-y-4 text-white">
                {/* Header Information */}
                <div className="space-y-1 border-b border-white/15 pb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-wider font-extrabold text-[#F47B2A] bg-white/10 px-3 py-1 rounded-full border border-white/15 inline-block">
                      {isGujarati ? "સ્થાપના ૨૦૦૫" : "ESTABLISHED 2005"}
                    </span>
                    <span className="text-xs text-white/70 font-semibold">
                      Ahmedabad, Gujarat
                    </span>
                  </div>
                  <h2 className="text-base sm:text-lg font-bold font-heading text-white pt-1">
                    Grassroots Development Impact
                  </h2>
                  <p className="text-xs text-white/80">
                    {t("heroDesc")}
                  </p>
                </div>

                {/* 3 Compact Program Cards linking to corresponding pages */}
                <div className="space-y-2.5">
                  {/* Program 1: Education */}
                  <Link
                    href="/programs/education"
                    className="group/item flex items-center justify-between p-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 hover:border-white/30 transition-all duration-200"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center shrink-0 group-hover/item:bg-[#F47B2A] transition-colors">
                        <BookOpenIcon className="w-4 h-4 text-white" />
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
                      className="w-4 h-4 text-white/50 group-hover/item:text-white group-hover/item:translate-x-1 transition-all"
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
                    className="group/item flex items-center justify-between p-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 hover:border-white/30 transition-all duration-200"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center shrink-0 group-hover/item:bg-[#F47B2A] transition-colors">
                        <HeartPulseIcon className="w-4 h-4 text-white" />
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
                      className="w-4 h-4 text-white/50 group-hover/item:text-white group-hover/item:translate-x-1 transition-all"
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
                    className="group/item flex items-center justify-between p-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 hover:border-white/30 transition-all duration-200"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center shrink-0 group-hover/item:bg-[#F47B2A] transition-colors">
                        <UsersGroupIcon className="w-4 h-4 text-white" />
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
                      className="w-4 h-4 text-white/50 group-hover/item:text-white group-hover/item:translate-x-1 transition-all"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Floating Award Badge at Bottom Right */}
              <div className="absolute -bottom-4 right-2 sm:-right-3 z-20 shadow-2xl">
                <div className="flex items-center space-x-3 bg-white text-charcoal px-3.5 py-2 rounded-2xl shadow-xl border border-gray-100 ring-1 ring-black/5">
                  <div className="w-7 h-7 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
                    <AwardMedalIcon className="w-4 h-4 text-[#F47B2A]" />
                  </div>
                  <div className="leading-tight">
                    <span className="block text-[9px] font-bold text-[#F47B2A] uppercase tracking-wider">
                      {isGujarati ? "સન્માન એવોર્ડ" : "AWARD"}
                    </span>
                    <span className="block text-xs font-extrabold text-[#0B3025]">
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
