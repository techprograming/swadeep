import React from "react";
import Image from "next/image";
import { PARTNERS } from "@/lib/constants";

export default function Partners() {
  return (
    <section className="section-padding py-16 lg:py-20 bg-cream-dark/60 border-y border-forest/10">
      <div className="container-wide">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-saffron bg-saffron-50 px-3.5 py-1 rounded-full border border-saffron-200">
            SWADEEP SHIKSHAN VIKAS SANSTHA
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-forest-dark">
            Our Partners
          </h2>
          <p className="font-gujarati text-base sm:text-lg text-forest-light font-medium">
            અમારા સહયોગીઓ અને પરોપકારી ભાગીદારો
          </p>
          <p className="font-body text-charcoal/85 text-base sm:text-lg">
            We work with prominent donors from various industries.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 items-stretch">
          {PARTNERS.map((partner) => (
            <div
              key={partner.name}
              className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md border border-forest/10 flex flex-col items-center justify-between text-center transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="relative w-full h-24 flex items-center justify-center p-3 mb-3 bg-white rounded-xl">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  sizes="(max-width: 768px) 150px, 200px"
                  className="object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="w-full pt-3 border-t border-cream-dark">
                <h3 className="font-heading font-bold text-sm sm:text-base text-forest-dark line-clamp-2">
                  {partner.name}
                </h3>
                <p className="font-body text-xs sm:text-sm text-charcoal/80 mt-1 line-clamp-2">
                  {partner.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
