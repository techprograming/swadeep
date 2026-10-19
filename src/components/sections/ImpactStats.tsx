"use client";

import React, { useState } from "react";
import { ACHIEVEMENTS } from "@/lib/constants";

type CategoryKey = keyof typeof ACHIEVEMENTS;

export default function ImpactStats() {
  const [activeTab, setActiveTab] = useState<CategoryKey>("education");

  const categories: { key: CategoryKey; label: string }[] = [
    { key: "education", label: "Education" },
    { key: "health", label: "Health" },
    { key: "livelihood", label: "Livelihood" },
    { key: "infrastructure", label: "Rural Infrastructure Development" },
    { key: "disaster", label: "Disaster Management" },
  ];

  const currentCategory = ACHIEVEMENTS[activeTab];

  return (
    <section
      aria-labelledby="impact-stats-heading"
      className="relative py-20 lg:py-28 bg-gradient-to-br from-forest-dark via-forest to-forest-900 text-cream overflow-hidden border-y border-forest-800"
    >
      {/* Decorative ambient background glows */}
      <div
        className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-forest-light/30 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 right-1/4 -translate-y-1/2 translate-x-1/2 w-80 h-80 bg-saffron/10 rounded-full blur-3xl pointer-events-none"
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

      <div className="container-wide section-padding relative z-10 max-w-5xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-1 rounded-full text-xs font-bold tracking-wider uppercase text-saffron-light border border-white/15">
            <span>SWADEEP SHIKSHAN VIKAS SANSTHA</span>
          </div>

          <h2
            id="impact-stats-heading"
            className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight"
          >
            Our Achievements
          </h2>

          <p className="font-gujarati text-base sm:text-lg text-cream/80">
            અમારી સિદ્ધિઓ — શિક્ષણ, આરોગ્ય, આજીવિકા અને રાહત કાર્ય
          </p>
        </div>

        {/* Tab Buttons matching old site */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveTab(cat.key)}
              className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 ${
                activeTab === cat.key
                  ? "bg-saffron text-white shadow-lg shadow-saffron/30 scale-105"
                  : "bg-white/10 text-cream/90 hover:bg-white/20 border border-white/15"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Achievements Counter Grid */}
        <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 sm:p-12 border border-white/15 shadow-2xl">
          <div className="text-center mb-8">
            <h3 className="font-heading text-2xl font-extrabold text-saffron-light">
              {currentCategory.title}
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {currentCategory.items.map((item, idx) => (
              <div
                key={idx}
                className="bg-white/10 rounded-2xl p-6 text-center border border-white/10 hover:border-saffron/50 transition-colors space-y-2"
              >
                <div className="font-heading text-3xl sm:text-4xl font-black text-white">
                  {item.count}
                </div>
                <div className="font-body text-sm sm:text-base text-cream/85 font-medium">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
