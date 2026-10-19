import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FOCUS_AREAS } from "@/lib/constants";
import { BentoGrid, BentoGridItem } from "@/components/ui/BentoGrid";
import { DynamicIcon } from "@/components/ui/Icons";

export default function FocusAreas() {
  const getBentoSpan = (index: number) => {
    switch (index) {
      case 0: // Education
        return "md:col-span-2 lg:col-span-2";
      case 1: // Health
        return "md:col-span-1 lg:col-span-1";
      case 2: // Livelihood
        return "md:col-span-1 lg:col-span-1";
      case 3: // Infrastructure
        return "md:col-span-1 lg:col-span-2";
      case 4: // Disaster Management
        return "md:col-span-2 lg:col-span-1";
      default:
        return "col-span-1";
    }
  };

  return (
    <section
      id="focus-areas"
      className="section-padding py-20 lg:py-24 bg-cream"
      aria-labelledby="focus-areas-heading"
    >
      <div className="container-wide">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-forest-100 text-forest-dark px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <span>SWADEEP SHIKSHAN VIKAS SANSTHA</span>
          </div>

          <h2
            id="focus-areas-heading"
            className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-forest-dark tracking-tight"
          >
            What We Do?
          </h2>

          <p className="font-gujarati text-lg sm:text-xl text-saffron-dark font-medium">
            અમારા મુખ્ય કાર્યક્ષેત્રો — શિક્ષણ, આરોગ્ય અને સ્વાવલંબન
          </p>

          <p className="font-body text-charcoal/85 text-base sm:text-lg leading-relaxed">
            At Swadeep, we concentrate our efforts on deprived communities by working on thematic areas of Development.
          </p>
        </div>

        {/* Bento Grid */}
        <BentoGrid autoAsymmetricSpans={false}>
          {FOCUS_AREAS.map((area, index) => (
            <BentoGridItem
              key={area.id}
              className={getBentoSpan(index)}
              title={area.title}
              titleGu={area.titleGu}
              description={area.description}
              icon={<DynamicIcon name={area.icon} size={22} className="text-forest" />}
              stat={area.stats}
              href={`/programs#${area.id}`}
              header={
                <div className="relative w-full h-44 sm:h-48 overflow-hidden rounded-xl">
                  <Image
                    src={area.image}
                    alt={area.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/70 via-transparent to-transparent" />
                </div>
              }
            />
          ))}
        </BentoGrid>

        {/* Bottom Explorer Callout */}
        <div className="mt-14 text-center">
          <Link
            href="/programs"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full text-sm font-bold text-white bg-forest hover:bg-forest-light shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-forest"
          >
            <span>Explore All Thematic Areas</span>
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
