"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { TRUSTEES, TrusteeMember } from "@/lib/constants";
import { useLanguage } from "@/context/LanguageContext";
import SectionHeading from "@/components/ui/SectionHeading";

export default function OurTrustees() {
  const { isGujarati } = useLanguage();
  const [trusteesList, setTrusteesList] = useState<TrusteeMember[]>([...TRUSTEES]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartXRef = useRef<number | null>(null);

  // Responsive itemsPerPage
  useEffect(() => {
    function updateItemsPerPage() {
      if (window.innerWidth < 640) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    }
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  // Fetch updated trustees if available
  useEffect(() => {
    async function loadTrustees() {
      try {
        const res = await fetch("/api/trustees");
        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.trustees) && data.trustees.length > 0) {
            setTrusteesList(data.trustees);
          }
        }
      } catch (err) {
        console.warn("[OurTrustees] Using static trustees fallback:", err);
      }
    }
    loadTrustees();
  }, []);

  const total = trusteesList.length;
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
    }, 4500);
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

  const getInitials = (name: string) => {
    return name
      .replace(/^(Shri|Smt|Dr)\s+/i, "")
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <section
      id="our-trustees"
      className="section-padding py-20 lg:py-24 bg-cream relative overflow-hidden border-t border-forest/10 scroll-mt-20"
      aria-labelledby="trustees-heading"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Decorative ambient subtle background elements */}
      <div
        className="absolute top-0 right-1/4 w-96 h-96 bg-forest-50/50 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-1/4 w-96 h-96 bg-saffron/5 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="container-wide relative z-10 max-w-6xl mx-auto">
        {/* Header with Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <SectionHeading
              badge="SWADEEP SHIKSHAN VIKAS SANSTHA"
              gujaratiText="અમારા ટ્રસ્ટીઓ"
              title="Our Trustees"
              subtitle="We are a professionally managed organisation with decisions taken with utmost care and for the interest of people we strive to serve."
              align="left"
            />
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3 shrink-0 self-start md:self-end">
            <button
              type="button"
              onClick={goToPrev}
              className="w-12 h-12 rounded-full bg-white border border-forest/15 hover:border-forest hover:bg-forest hover:text-white text-forest shadow-xs flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#F47B2A] cursor-pointer"
              aria-label="Previous trustee slide"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={goToNext}
              className="w-12 h-12 rounded-full bg-white border border-forest/15 hover:border-forest hover:bg-forest hover:text-white text-forest shadow-xs flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#F47B2A] cursor-pointer"
              aria-label="Next trustee slide"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Carousel Slider Track */}
        <div
          className="overflow-hidden -mx-3 select-none"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
            }}
          >
            {trusteesList.map((trustee, index) => {
              const displayName = isGujarati && trustee.nameGu ? trustee.nameGu : trustee.name;
              const displayRole = isGujarati && trustee.roleGu ? trustee.roleGu : trustee.role;

              return (
                <div
                  key={trustee.name || index}
                  className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 px-3"
                >
                  <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-xs hover:shadow-xl border border-forest/10 hover:border-forest/30 transition-all duration-300 flex flex-col justify-between h-full group hover:-translate-y-1">
                    <div>
                      {/* Top Bar: Category pill & index */}
                      <div className="flex items-center justify-between mb-5">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                            trustee.category === "Chairman"
                              ? "bg-amber-100 text-amber-900 border border-amber-300"
                              : trustee.category === "CEO"
                              ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                              : "bg-forest/10 text-forest border border-forest/20"
                          }`}
                        >
                          {displayRole}
                        </span>
                        <span className="text-forest/30 group-hover:text-[#F47B2A] transition-colors text-xs font-mono font-bold">
                          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                        </span>
                      </div>

                      {/* Avatar & Name */}
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0B3025] to-[#174B38] text-cream font-heading font-extrabold text-lg flex items-center justify-center shadow-md border-2 border-white/20 shrink-0 group-hover:scale-105 transition-transform overflow-hidden relative">
                          {trustee.image ? (
                            <Image
                              src={trustee.image}
                              alt={trustee.name}
                              fill
                              sizes="64px"
                              className="object-cover"
                            />
                          ) : (
                            <span>{getInitials(trustee.name)}</span>
                          )}
                        </div>
                        <div>
                          <h3 className="font-heading font-extrabold text-base sm:text-lg text-forest-dark group-hover:text-forest transition-colors leading-snug">
                            {displayName}
                          </h3>
                          {isGujarati && trustee.name && (
                            <span className="text-xs text-charcoal/50 block mt-0.5">
                              {trustee.name}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Description */}
                      {trustee.description && (
                        <p className="font-body text-xs sm:text-sm text-charcoal/70 leading-relaxed line-clamp-3 mt-3">
                          {trustee.description}
                        </p>
                      )}
                    </div>

                    {/* Bottom Status */}
                    <div className="mt-6 pt-4 border-t border-forest/5 flex items-center justify-between text-[11px] text-charcoal/50 font-medium">
                      <span className="inline-flex items-center gap-1.5 text-forest font-semibold">
                        <svg className="w-3.5 h-3.5 text-[#F47B2A]" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Swadeep Board
                      </span>
                      <span>Trustee Governance</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Carousel Pagination Dots */}
        {maxIndex > 0 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrentIndex(i)}
                className={`transition-all duration-300 rounded-full h-2.5 ${
                  currentIndex === i
                    ? "w-8 bg-forest"
                    : "w-2.5 bg-forest/20 hover:bg-forest/50"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
