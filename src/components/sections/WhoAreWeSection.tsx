import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SITE_CONFIG } from "@/lib/constants";
import { AwardMedalIcon, CheckCircleIcon } from "@/components/ui/Icons";

export default function WhoAreWeSection() {
  return (
    <section className="section-padding py-20 lg:py-24 bg-white border-b border-forest/10" aria-labelledby="who-are-we-heading">
      <div className="container-wide max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-saffron bg-saffron-50 px-3.5 py-1.5 rounded-full border border-saffron-200">
              SWADEEP SHIKSHAN VIKAS SANSTHA
            </span>

            <h2
              id="who-are-we-heading"
              className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-forest-dark tracking-tight"
            >
              Who Are We?
            </h2>

            <p className="font-gujarati text-lg text-saffron-dark font-medium">
              સ્વદીપ શિક્ષણ વિકાસ સંસ્થા — ૨૦૦૫ થી અવિરત સમાજ સેવા
            </p>

            <div className="space-y-4 font-body text-charcoal/85 text-base sm:text-lg leading-relaxed">
              <p>{SITE_CONFIG.whoAreWe1}</p>
              <p>{SITE_CONFIG.whoAreWe2}</p>
            </div>

            <div className="pt-2 flex flex-wrap gap-4 items-center">
              <Link
                href="/about"
                className="inline-flex items-center justify-center px-7 py-3 rounded-full text-sm font-bold text-white bg-forest hover:bg-forest-light transition-all duration-200 shadow-md"
              >
                <span>Read More</span>
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

              {/* Award Callout */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200 text-xs sm:text-sm font-bold text-amber-900">
                <AwardMedalIcon className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Award: CSR Conclave 2019</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative h-96 sm:h-[450px] rounded-3xl overflow-hidden shadow-xl border-4 border-white">
              <Image
                src="/images/projects-hero.jpg"
                alt="Swadeep Field Work"
                fill
                sizes="(max-width: 768px) 100vw, 450px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="text-xs uppercase tracking-wider font-semibold text-saffron bg-forest-dark/90 px-3 py-1 rounded-full inline-block">
                  Field Leadership
                </span>
                <h3 className="font-heading font-bold text-xl">
                  Swadeep Shikshan Vikas Sanstha
                </h3>
                <p className="text-sm text-cream/95">
                  Ahmedabad, Gujarat – Serving Communities Since 2005
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
