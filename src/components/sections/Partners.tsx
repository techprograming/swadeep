"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { PARTNERS } from "@/lib/constants";
import { useLanguage } from "@/context/LanguageContext";
import { HandshakeIcon } from "@/components/ui/Icons";

export interface PartnerItem {
  id?: string;
  name: string;
  nameGu?: string;
  shortName?: string;
  category?: string;
  role: string;
  roleGu?: string;
  description?: string;
  descriptionGu?: string;
  logo?: string;
}

export default function Partners() {
  const { isGujarati } = useLanguage();
  const [partnersList, setPartnersList] = useState<PartnerItem[]>([...PARTNERS]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartXRef = useRef<number | null>(null);

  // Responsive itemsPerPage
  useEffect(() => {
    function updateItemsPerPage() {
      if (window.innerWidth < 640) {
        setItemsPerPage(2);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(3);
      } else {
        setItemsPerPage(4);
      }
    }
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  useEffect(() => {
    async function loadPartners() {
      try {
        const res = await fetch("/api/partners");
        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.partners) && data.partners.length > 0) {
            setPartnersList(data.partners);
          }
        }
      } catch (err) {
        console.warn("[Partners] Using static fallback:", err);
      }
    }
    loadPartners();
  }, []);

  const total = partnersList.length;
  const maxIndex = Math.max(0, total - itemsPerPage);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Autoplay
  useEffect(() => {
    if (isPaused || maxIndex <= 0) return;
    const interval = setInterval(() => {
      goToNext();
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused, maxIndex, goToNext]);

  // Touch Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    if (diff > 45) {
      goToNext();
    } else if (diff < -45) {
      goToPrev();
    }
    touchStartXRef.current = null;
  };

  return (
    <section
      id="partners"
      className="section-padding py-16 lg:py-24 bg-gradient-to-b from-cream via-[#FFFBF2] to-cream border-y border-forest/10 scroll-mt-20 relative overflow-hidden"
      aria-labelledby="partners-heading"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Decorative ambient subtle background glows */}
      <div
        className="absolute top-0 right-1/4 w-96 h-96 bg-forest-50/40 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-1/4 w-96 h-96 bg-saffron/5 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="container-wide relative z-10 max-w-7xl mx-auto">
        {/* Section Heading & Slider Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-saffron-50 text-saffron border border-saffron-200 text-xs font-bold uppercase tracking-wider shadow-xs">
              <HandshakeIcon size={16} />
              <span>SWADEEP SHIKSHAN VIKAS SANSTHA</span>
            </div>

            <h2
              id="partners-heading"
              className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-forest-dark tracking-tight"
            >
              {isGujarati ? "અમારા સહયોગીઓ અને પરોપકારી ભાગીદારો" : "Our Partners & Donors"}
            </h2>
            <p className="font-body text-xs sm:text-sm text-charcoal/70">
              {isGujarati
                ? "ટકાઉ સામાજિક પરિવર્તન અને ગ્રામીણ ઉત્થાન માટે સહયોગી સંસ્થાઓ"
                : "Collaborating with leading CSR corporations, foundations, and government departments across Gujarat"}
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3 shrink-0 self-start md:self-end">
            <button
              type="button"
              onClick={goToPrev}
              className="w-12 h-12 rounded-full bg-white border border-forest/15 hover:border-forest hover:bg-forest hover:text-white text-forest shadow-xs flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#F47B2A] cursor-pointer"
              aria-label="Previous partner slide"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={goToNext}
              className="w-12 h-12 rounded-full bg-white border border-forest/15 hover:border-forest hover:bg-forest hover:text-white text-forest shadow-xs flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#F47B2A] cursor-pointer"
              aria-label="Next partner slide"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Partners Carousel Track */}
        <div
          className="overflow-hidden -mx-2 sm:-mx-3 select-none"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
            }}
          >
            {partnersList.map((partner, index) => {
              const displayName = isGujarati && partner.nameGu ? partner.nameGu : partner.name;

              return (
                <div
                  key={partner.id || partner.name || index}
                  className="w-1/2 sm:w-1/3 lg:w-1/4 flex-shrink-0 px-2 sm:px-3"
                >
                  <div className="bg-white rounded-3xl p-5 shadow-xs hover:shadow-lg border border-forest/10 hover:border-forest/30 transition-all duration-300 flex flex-col justify-between h-full group hover:-translate-y-1">
                    <div>
                      {/* Logo Container */}
                      <div className="relative w-full h-24 sm:h-28 flex items-center justify-center p-3 mb-4 bg-white rounded-2xl border border-forest/5 shadow-inner overflow-hidden">
                        <Image
                          src={partner.logo || "/images/partners/icds-gujarat.png"}
                          alt={partner.name}
                          fill
                          sizes="(max-width: 640px) 180px, (max-width: 1024px) 240px, 280px"
                          className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      {/* Partner Name */}
                      <h3 className="font-heading font-extrabold text-xs sm:text-sm text-forest-dark line-clamp-2 leading-snug text-center group-hover:text-forest transition-colors">
                        {displayName}
                      </h3>

                      {isGujarati && partner.name && (
                        <span className="text-[11px] text-charcoal/50 block mt-1 truncate text-center">
                          {partner.name}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Carousel Pagination Dots */}
        {maxIndex > 0 && (
          <div className="mt-8 flex items-center justify-center gap-1.5 sm:gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrentIndex(i)}
                className={`transition-all duration-300 rounded-full h-2 ${
                  currentIndex === i
                    ? "w-7 sm:w-8 bg-forest"
                    : "w-2 sm:w-2.5 bg-forest/20 hover:bg-forest/50"
                }`}
                aria-label={`Go to partner slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
