"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FOCUS_AREAS } from "@/lib/constants";
import { useLanguage } from "@/context/LanguageContext";
import {
  BookOpenIcon,
  HeartPulseIcon,
  BriefcaseIcon,
  BuildingIcon,
  ShieldCheckIcon,
} from "@/components/ui/Icons";

export default function FocusAreas() {
  const { isGujarati } = useLanguage();

  const education = FOCUS_AREAS.find((a) => a.id === "education") || FOCUS_AREAS[0];
  const otherPrograms = FOCUS_AREAS.filter((a) => a.id !== "education");

  const getProgramIcon = (id: string) => {
    switch (id) {
      case "health":
        return <HeartPulseIcon className="w-5 h-5 text-forest" />;
      case "livelihood":
        return <BriefcaseIcon className="w-5 h-5 text-forest" />;
      case "infrastructure":
        return <BuildingIcon className="w-5 h-5 text-forest" />;
      case "disaster":
        return <ShieldCheckIcon className="w-5 h-5 text-forest" />;
      default:
        return <BookOpenIcon className="w-5 h-5 text-forest" />;
    }
  };

  const getNumberBadge = (id: string) => {
    switch (id) {
      case "health":
        return "02 • HEALTH";
      case "livelihood":
        return "03 • LIVELIHOOD";
      case "infrastructure":
        return "04 • RURAL INFRASTRUCTURE";
      case "disaster":
        return "05 • DISASTER MANAGEMENT";
      default:
        return "01 • EDUCATION";
    }
  };

  return (
    <section
      id="focus-areas"
      className="section-padding py-20 lg:py-24 bg-cream border-b border-forest/10"
      aria-labelledby="what-we-do-heading"
    >
      <div className="container-wide max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center space-x-2 bg-forest-100 text-forest-dark px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <span>SWADEEP SHIKSHAN VIKAS SANSTHA</span>
          </div>

          <h2
            id="what-we-do-heading"
            className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-forest-dark tracking-tight"
          >
            {"What We Do"}
          </h2>

          

          <p className="font-body text-charcoal/85 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            {"Swadeep concentrates its grassroots interventions on five thematic areas of rural development across Gujarat."}
          </p>
        </div>

        {/* Bento Grid: Featured Education Card + Balanced 4-Program Grid */}
        <div className="space-y-6">
          {/* 1. FEATURED CARD: Education */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-forest/15 transition-all duration-300 group">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              {/* Image Side */}
              <div className="lg:col-span-7 relative min-h-[300px] sm:min-h-[380px] lg:min-h-full overflow-hidden">
                <Image
                  src={education.image}
                  alt={education.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/85 via-forest-dark/30 to-transparent" />

                {/* Badge on Image */}
                <div className="absolute top-5 left-5 z-10 flex flex-wrap gap-2">
                  <span className="bg-[#F47B2A] text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-md">
                    ★ {"01 • FEATURED PROGRAM"}
                  </span>
                  <span className="bg-forest-dark/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/20">
                    {education.stats}
                  </span>
                </div>

                {/* Bottom Overlay on Image */}
                <div className="absolute bottom-5 left-5 right-5 z-10 text-white">
                  
                  <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
                    {education.title}
                  </h3>
                </div>
              </div>

              {/* Content Side */}
              <div className="lg:col-span-5 p-7 sm:p-9 lg:p-10 flex flex-col justify-between space-y-6 bg-white">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-forest">
                    <BookOpenIcon className="w-5 h-5 text-[#F47B2A]" />
                    <span>FOUNDATIONAL &amp; SCHOOL EDUCATION</span>
                  </div>

                  <p className="font-body text-charcoal/80 text-sm sm:text-base leading-relaxed">
                    {education.description}
                  </p>

                  {/* Highlights Grid */}
                  <div className="pt-2 grid grid-cols-2 gap-2.5">
                    {education.highlights?.map((h, idx) => (
                      <div
                        key={idx}
                        className="bg-cream/60 p-2.5 rounded-xl border border-forest/10 text-xs font-semibold text-forest-dark flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F47B2A] shrink-0" />
                        <span className="line-clamp-2">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action CTA */}
                <div className="pt-4 border-t border-forest/10 flex items-center justify-between">
                  <Link
                    href={`/programs/${education.id}`}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-white bg-forest hover:bg-forest-light transition-all shadow-md hover:shadow-lg group-hover:scale-102 focus:outline-none focus-visible:ring-2 focus-visible:ring-forest"
                  >
                    <span>{"Explore Education Program"}</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>

                  <span className="text-xs text-charcoal/50 font-bold uppercase hidden sm:inline">
                    200+ Villages
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 2. BALANCED 4-CARD GRID: Health, Livelihood, Rural Infrastructure, Disaster Management */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {otherPrograms.map((area) => (
              <div
                key={area.id}
                className="bg-white rounded-3xl overflow-hidden shadow-xs hover:shadow-xl border border-forest/10 hover:border-forest/30 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  {/* Card Image */}
                  <div className="relative w-full h-48 overflow-hidden">
                    <Image
                      src={area.image}
                      alt={area.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/80 via-transparent to-transparent" />

                    {/* Number Badge */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="bg-forest-dark/85 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-white/20">
                        {getNumberBadge(area.id)}
                      </span>
                    </div>

                    {/* Stat Pill on Image */}
                    <div className="absolute bottom-3 left-3 right-3 z-10">
                      <span className="inline-block bg-white/95 text-forest-dark text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-xs truncate max-w-full">
                        {area.stats}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 space-y-2.5">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-forest/10 flex items-center justify-center shrink-0">
                        {getProgramIcon(area.id)}
                      </div>
                      <div>
                        
                        <h4 className="font-heading font-extrabold text-lg text-forest-dark group-hover:text-forest transition-colors leading-snug">
                          {area.title}
                        </h4>
                      </div>
                    </div>

                    <p className="font-body text-xs text-charcoal/70 leading-relaxed line-clamp-3">
                      {area.description}
                    </p>
                  </div>
                </div>

                {/* Card Action Link */}
                <div className="p-5 pt-0">
                  <Link
                    href={`/programs/${area.id}`}
                    className="w-full inline-flex items-center justify-between text-xs font-bold text-forest group-hover:text-[#F47B2A] py-2 border-t border-forest/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-forest rounded-lg px-1"
                  >
                    <span>{"Explore Program"}</span>
                    <span className="text-base font-bold transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom All Programs Callout */}
        <div className="mt-12 text-center">
          <Link
            href="/programs"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full text-sm font-bold text-white bg-forest hover:bg-forest-light shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-forest"
          >
            <span>{"Explore All Five Core Programs"}</span>
            <svg
              className="w-4 h-4 ml-2"
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
        </div>
      </div>
    </section>
  );
}
