import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SITE_CONFIG } from "@/lib/constants";
import {
  BookOpenIcon,
  HeartPulseIcon,
  UsersGroupIcon,
  AwardMedalIcon,
} from "@/components/ui/Icons";

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative min-h-[90vh] flex items-center bg-gradient-to-r from-[#0B3025] via-[#174B38] to-[#205943] text-white overflow-hidden pt-28 pb-16 lg:pt-36 lg:pb-24"
    >
      {/* 1. Genuine Swadeep Field Project Photography as subtle background texture */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <Image
          src="/images/projects-hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105 opacity-[0.14] mix-blend-luminosity filter contrast-125"
        />

        {/* 2. Premium dark forest-green overlays ensuring optimal text readability */}
        {/* Horizontal transition: deeper green on the left for contrast, rich forest on the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B3025]/95 via-[#0B3025]/85 to-[#174B38]/85" />
        
        {/* Subtle top-to-bottom vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B3025]/50 via-transparent to-[#0B3025]/90" />
        
        {/* Soft ambient radial depth (organic lighting, no excessive patterns) */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(32,89,67,0.35),_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(11,48,37,0.7),_transparent_65%)]" />
      </div>

      {/* 3. Hero Content Container */}
      <div className="container-wide section-padding relative z-10 w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Heading, Gujarati Subtitle, Mission, CTAs, Trust Markers */}
          <div className="lg:col-span-7 text-left space-y-6">
            {/* Subtle top badge */}
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 text-xs sm:text-sm font-medium text-white/90 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#F47B2A] animate-pulse" />
              <span>{SITE_CONFIG.subtitle}</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-1">
              <span className="block font-heading text-base sm:text-lg lg:text-xl text-[#F47B2A] font-bold uppercase tracking-wider">
                Welcome to the
              </span>
              <h1
                id="hero-heading"
                className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-white"
              >
                Swadeep Shikshan Vikas Sanstha
              </h1>
            </div>

            {/* Gujarati Title */}
            <p className="font-gujarati text-lg sm:text-xl md:text-2xl text-white/90 font-medium tracking-wide">
              {SITE_CONFIG.nameGujarati}
            </p>

            {/* Mission Description copied directly from old website */}
            <p className="font-body text-white/90 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed">
              {SITE_CONFIG.description}
            </p>

            {/* Two Clear Call-to-Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              {/* Primary Action Button: Warm Orange with White Text */}
              <Link
                href="/programs"
                className="inline-flex items-center justify-center px-7 sm:px-8 py-3.5 sm:py-4 rounded-full text-sm sm:text-base font-bold text-white bg-[#F47B2A] hover:bg-[#E06A1B] shadow-lg shadow-[#F47B2A]/25 hover:shadow-[#F47B2A]/40 hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F47B2A]"
              >
                <span>Explore Our Work</span>
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

              {/* Secondary Action Button: Transparent with White Border */}
              <Link
                href="/donate"
                className="inline-flex items-center justify-center px-7 sm:px-8 py-3.5 sm:py-4 rounded-full text-sm sm:text-base font-bold text-white bg-transparent hover:bg-white/10 border-2 border-white/80 hover:border-white shadow-sm hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <span>Support Our Mission</span>
              </Link>
            </div>

            {/* Verified Trust Markers */}
            <div className="pt-6 border-t border-white/15 flex flex-wrap gap-4 sm:gap-6 text-xs sm:text-sm text-white/90 font-medium">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-[#F47B2A]" />
                <span>Tax Exemption Liable (80G)</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-[#F47B2A]" />
                <span>FCRA Reg: 041980081</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-[#F47B2A]" />
                <span>PAN: AAKTS6375E</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Information Panel */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            <div className="relative mx-auto max-w-md lg:max-w-none w-full">
              <div className="rounded-3xl bg-[#0B3025]/85 backdrop-blur-xl border border-white/20 p-5 sm:p-7 shadow-2xl space-y-5 text-white">
                {/* Top Image Showcase */}
                <div className="h-48 sm:h-56 rounded-2xl relative overflow-hidden flex flex-col justify-end p-5 border border-white/10 group">
                  <Image
                    src="/images/community.jpg"
                    alt="Swadeep Community & Anganwadi Field Work"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 420px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B3025]/95 via-[#0B3025]/50 to-transparent" />
                  <div className="relative z-10 space-y-1">
                    <span className="text-[11px] sm:text-xs uppercase tracking-wider font-bold text-white bg-[#F47B2A] px-3 py-1 rounded-full inline-block shadow-sm">
                      Founded in 2005
                    </span>
                    <h2 className="text-lg sm:text-xl font-bold font-heading text-white">
                      Swadeep Shikshan Vikas Sanstha
                    </h2>
                    <p className="text-xs sm:text-sm text-white/90">
                      Ahmedabad, Gujarat
                    </p>
                  </div>
                </div>

                {/* Quick Impact Snapshot List */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.06] border border-white/10">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                        <BookOpenIcon className="w-4 h-4 text-[#F47B2A]" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">Education</div>
                        <div className="text-xs text-white/80">60,000 Children • 200 Villages</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.06] border border-white/10">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                        <HeartPulseIcon className="w-4 h-4 text-[#F47B2A]" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">Health</div>
                        <div className="text-xs text-white/80">13,000 Dental • 100 Villages</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.06] border border-white/10">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                        <UsersGroupIcon className="w-4 h-4 text-[#F47B2A]" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">Livelihood &amp; Infrastructure</div>
                        <div className="text-xs text-white/80">500 Fishermen • 1,050 Solar Lights</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Securely Contained Award Badge (no overlap with text or buttons) */}
                <div className="pt-4 border-t border-white/10">
                  <div className="flex items-center space-x-3.5 p-3 rounded-2xl bg-white/[0.08] border border-white/15">
                    <div className="w-10 h-10 rounded-xl bg-[#F47B2A]/20 border border-[#F47B2A]/30 flex items-center justify-center shrink-0">
                      <AwardMedalIcon className="w-5 h-5 text-[#F47B2A]" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[11px] uppercase font-bold text-[#F47B2A] tracking-wider">
                        Recognition
                      </div>
                      <div className="text-sm font-bold text-white leading-tight">
                        CSR Conclave 2019 Award Winner
                      </div>
                    </div>
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
