"use client";

import React, { useState } from "react";
import { ACHIEVEMENTS } from "@/lib/constants";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

type CategoryKey = keyof typeof ACHIEVEMENTS;

export default function ImpactStats() {
  const { isGujarati } = useLanguage();
  const [activeTab, setActiveTab] = useState<CategoryKey>("education");

  const categories: { key: CategoryKey; label: string; labelGu: string }[] = [
    { key: "education", label: "Education", labelGu: "શિક્ષણ" },
    { key: "health", label: "Health", labelGu: "આરોગ્ય" },
    { key: "livelihood", label: "Livelihood", labelGu: "આજીવિકા" },
    { key: "infrastructure", label: "Rural Infrastructure", labelGu: "ગ્રામીણ માળખાકીય વિકાસ" },
    { key: "disaster", label: "Disaster Management", labelGu: "આપત્તિ વ્યવસ્થાપન" },
  ];

  const currentCategory = ACHIEVEMENTS[activeTab];

  return (
    <section
      aria-labelledby="impact-stats-heading"
      className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-forest-dark via-forest to-forest-900 text-cream overflow-hidden border-y border-forest-800"
    >
      {/* Decorative ambient background glows */}
      <div
        className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-64 sm:w-96 h-64 sm:h-96 bg-forest-light/30 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 right-1/4 -translate-y-1/2 translate-x-1/2 w-60 sm:w-80 h-60 sm:h-80 bg-saffron/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: `radial-gradient(circle at 20px 20px, white 2px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container-wide section-padding relative z-10 max-w-6xl mx-auto space-y-6 sm:space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2 sm:space-y-3">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3 py-1 sm:px-4 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold tracking-wider uppercase text-saffron-light border border-white/15">
            <span>SWADEEP SHIKSHAN VIKAS SANSTHA</span>
          </div>

          <h2
            id="impact-stats-heading"
            className="font-heading text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight"
          >
            {isGujarati ? "અમારી સિદ્ધિઓ" : "Our Achievements"}
          </h2>

          <p className="font-gujarati text-xs sm:text-base md:text-lg text-cream/80 max-w-xl mx-auto leading-relaxed">
            {isGujarati
              ? "પાયાના સ્તરે નોંધાયેલ વાસ્તવિક અને પ્રમાણિત વિકાસ પરિણામો"
              : "અમારી સિદ્ધિઓ — શિક્ષણ, આરોગ્ય, આજીવિકા અને રાહત કાર્ય"}
          </p>
        </div>

        {/* 4 Verified High-Level Headline Impact Metrics (Prompt Step 4 Specification) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 max-w-5xl mx-auto pt-2">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 text-center border border-white/15">
            <div className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-saffron tracking-tight">
              60K+
            </div>
            <div className="font-body text-xs sm:text-sm font-semibold text-white mt-1">
              {isGujarati ? "બાળકો સુધી પહોંચ" : "Children Reached"}
            </div>
            <div className="text-[11px] text-cream/70 mt-0.5">
              {isGujarati ? "૨૭૭ આંગણવાડી અને શાળાઓ" : "Across 200+ Villages"}
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 text-center border border-white/15">
            <div className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-saffron tracking-tight">
              200+
            </div>
            <div className="font-body text-xs sm:text-sm font-semibold text-white mt-1">
              {isGujarati ? "ગામોમાં કાર્યક્ષેત્ર" : "Villages Covered"}
            </div>
            <div className="text-[11px] text-cream/70 mt-0.5">
              {isGujarati ? "ગુજરાતના વિવિધ જિલ્લાઓ" : "Gujarat Rural Footprint"}
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 text-center border border-white/15">
            <div className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-saffron tracking-tight">
              500+
            </div>
            <div className="font-body text-xs sm:text-sm font-semibold text-white mt-1">
              {isGujarati ? "સમુદાય / આજીવિકા લાભાર્થી" : "Community Beneficiaries"}
            </div>
            <div className="text-[11px] text-cream/70 mt-0.5">
              {isGujarati ? "માછીમારો અને મહિલા SHG" : "Fishermen & Women SHGs"}
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 text-center border border-white/15">
            <div className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-saffron tracking-tight">
              20+
            </div>
            <div className="font-body text-xs sm:text-sm font-semibold text-white mt-1">
              {isGujarati ? "વર્ષોની અવિરત સેવા" : "Years of Grassroots Work"}
            </div>
            <div className="text-[11px] text-cream/70 mt-0.5">
              {isGujarati ? "૨૦૦૫ થી સતત સમર્પણ" : "Serving Since 2005"}
            </div>
          </div>
        </div>

        {/* Tab Buttons — Smooth touch scroll on mobile, flex-wrap centered on desktop */}
        <div className="w-full overflow-x-auto scrollbar-none py-1 -mx-4 px-4 sm:mx-0 sm:px-0">
          <div
            className="flex sm:flex-wrap items-center justify-start sm:justify-center gap-1.5 sm:gap-2.5 min-w-max sm:min-w-0 mx-auto"
            role="tablist"
            aria-label="Achievement Categories"
          >
            {categories.map((cat) => (
              <button
                key={cat.key}
                id={`tab-${cat.key}`}
                role="tab"
                aria-controls="panel-achievements"
                aria-selected={activeTab === cat.key}
                onClick={() => setActiveTab(cat.key)}
                className={`whitespace-nowrap px-3 py-1.5 xs:px-3.5 xs:py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-saffron shrink-0 ${
                  activeTab === cat.key
                    ? "bg-saffron text-white shadow-lg shadow-saffron/30 scale-105"
                    : "bg-white/10 text-cream/90 hover:bg-white/20 border border-white/15"
                }`}
              >
                {isGujarati ? cat.labelGu : cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Achievements Counter Grid */}
        <div
          id="panel-achievements"
          role="tabpanel"
          aria-labelledby={`tab-${activeTab}`}
          className="bg-white/5 backdrop-blur-md rounded-2xl sm:rounded-3xl p-3 xs:p-4 sm:p-7 md:p-8 lg:p-10 border border-white/15 shadow-2xl"
        >
          <div className="text-center mb-4 xs:mb-5 sm:mb-8">
            <h3 className="font-heading text-base xs:text-lg sm:text-2xl md:text-3xl font-extrabold text-saffron-light">
              {isGujarati ? currentCategory.titleGu : currentCategory.title}
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 xs:gap-2.5 sm:gap-3.5 lg:gap-4 xl:gap-5">
            {currentCategory.items.map((item, idx) => {
              const countLength = item.count.length;
              const isVeryLong = countLength >= 7; // e.g. "1,00,000"
              const isMedium = countLength >= 5;   // e.g. "60,000", "14,000"
              const isLastOddItem = idx === currentCategory.items.length - 1 && currentCategory.items.length % 2 !== 0;

              return (
                <div
                  key={idx}
                  className={cn(
                    "bg-white/10 rounded-xl sm:rounded-2xl p-2.5 xs:p-3 sm:p-4 xl:p-5 text-center border border-white/10 hover:border-saffron/50 transition-all duration-200 flex flex-col items-center justify-center min-w-0 overflow-hidden shadow-sm hover:scale-[1.02] hover:bg-white/[0.14] min-h-[82px] xs:min-h-[92px] sm:min-h-[110px] xl:min-h-[120px]",
                    isLastOddItem ? "col-span-2 sm:col-span-1" : "col-span-1"
                  )}
                >
                  <div
                    className={cn(
                      "w-full font-heading font-black text-white tabular-nums tracking-tight leading-none text-center",
                      isVeryLong
                        ? "text-base xs:text-lg sm:text-2xl md:text-xl lg:text-2xl xl:text-3xl"
                        : isMedium
                        ? "text-lg xs:text-xl sm:text-3xl md:text-2xl lg:text-3xl xl:text-4xl"
                        : "text-xl xs:text-2xl sm:text-4xl md:text-3xl lg:text-4xl xl:text-5xl"
                    )}
                    title={item.count}
                  >
                    {item.count}
                  </div>
                  <div className="w-full font-body text-[10.5px] xs:text-[11.5px] sm:text-sm text-cream/85 font-medium leading-snug line-clamp-2 mt-1 sm:mt-2 text-center break-words">
                    {isGujarati ? item.labelGu : item.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
