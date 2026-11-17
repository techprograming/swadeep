"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { MapPinIcon, CalendarIcon, SearchIcon, YoutubeIcon } from "@/components/ui/Icons";

import {
  GALLERY_ITEMS,
  CATEGORIES,
  GalleryCategory,
  GalleryItem,
} from "@/lib/galleryData";

export default function GalleryPage() {
  const { isGujarati } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>("All");
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);
  const [displayLimit, setDisplayLimit] = useState<number>(24);

  useEffect(() => {
    setDisplayLimit(24);
  }, [selectedCategory]);

  const filteredItems =
    selectedCategory === "All"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  const displayedItems = filteredItems.slice(0, displayLimit);

  const handleNext = useCallback(() => {
    if (!activeItem) return;
    const currentIndex = filteredItems.findIndex((item) => item.id === activeItem.id);
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setActiveItem(filteredItems[nextIndex]);
  }, [activeItem, filteredItems]);

  const handlePrev = useCallback(() => {
    if (!activeItem) return;
    const currentIndex = filteredItems.findIndex((item) => item.id === activeItem.id);
    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setActiveItem(filteredItems[prevIndex]);
  }, [activeItem, filteredItems]);

  // Lightbox keyboard navigation (Escape, ArrowLeft, ArrowRight)
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!activeItem) return;

      if (e.key === "Escape") {
        setActiveItem(null);
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      }
    },
    [activeItem, handleNext, handlePrev]
  );

  useEffect(() => {
    if (activeItem) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeItem, handleKeyDown]);

  return (
    <main id="main-content" className="flex-1 bg-cream">
      {/* 1. Hero Banner */}
      <section
        aria-labelledby="gallery-hero-heading"
        className="relative py-20 lg:py-28 bg-gradient-to-br from-[#061F17] via-[#0B3025] to-[#041610] text-cream overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage: `radial-gradient(circle at 20px 20px, white 2px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
        <div
          className="absolute -top-32 -right-32 w-96 h-96 bg-[#F47B2A]/20 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 left-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="container-wide section-padding relative z-10 text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-[#F47B2A] border border-white/15">
            <span>Swadeep Shikshan Vikas Sanstha</span>
          </div>

          <h1
            id="gallery-hero-heading"
            className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight"
          >
            {isGujarati ? "ફોટો ગેલેરી" : "Photo Gallery"}
          </h1>

          <p className="font-gujarati text-lg sm:text-2xl text-cream/90 font-medium">
            {isGujarati
              ? "૨૦૦૫ થી અવિરત ગ્રામીણ ઉત્થાનની પ્રમાણિત ઝલક"
              : "Authentic glimpses of two decades of grassroots transformation"}
          </p>

          <p className="font-body text-cream/80 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            {isGujarati
              ? "ગુજરાતના ૨૦૦+ ગામોમાં શિક્ષણ, આરોગ્ય, આજીવિકા અને સમુદાય સશક્તિકરણની પ્રત્યક્ષ તસવીરો."
              : "Every photograph represents genuine lives touched, schools transformed, and sustainable livelihoods built across Gujarat."}
          </p>

          {/* Quick Stats Ribbon */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs text-cream/80">
            <span className="px-3 py-1 rounded-full bg-white/10 border border-white/15">
              200+ Villages Documented
            </span>
            <span className="px-3 py-1 rounded-full bg-white/10 border border-white/15">
              60,000+ Beneficiaries
            </span>
            <span className="px-3 py-1 rounded-full bg-white/10 border border-white/15">
              20+ Years of Dedication
            </span>
          </div>

          <div className="pt-2 flex items-center justify-center gap-3">
            <Link
              href="/videos"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-semibold shadow-md hover:shadow-lg transition-all"
            >
              <YoutubeIcon size={16} />
              <span>Watch Video Documentation (@swadeepindia2543)</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Filter Bar & Gallery Grid */}
      <section className="section-padding py-12 lg:py-20">
        <div className="container-wide max-w-7xl mx-auto">
          {/* Category Filter Pills */}
          <div
            className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10 lg:mb-14"
            role="toolbar"
            aria-label="Filter gallery by category"
          >
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              const count =
                cat === "All"
                  ? GALLERY_ITEMS.length
                  : GALLERY_ITEMS.filter((it) => it.category === cat).length;

              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F47B2A] ${
                    isSelected
                      ? "bg-[#0B3025] text-white shadow-md scale-105"
                      : "bg-white text-charcoal/80 hover:bg-forest-50 hover:text-[#0B3025] border border-charcoal/10"
                  }`}
                  aria-pressed={isSelected}
                >
                  <span>{cat}</span>
                  <span className={`ml-1.5 text-[11px] px-1.5 py-0.2 rounded-full ${isSelected ? "bg-white/20 text-white" : "bg-gray-100 text-charcoal/60"}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Minimalist Professional Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {displayedItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveItem(item)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveItem(item);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`View photo: ${item.title}`}
                className="group cursor-pointer bg-white rounded-3xl overflow-hidden shadow-xs hover:shadow-xl border border-forest/10 hover:border-[#F47B2A]/40 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F47B2A] flex flex-col justify-between hover:-translate-y-1.5"
              >
                {/* Photo Container */}
                <div className="relative w-full h-64 sm:h-72 overflow-hidden bg-forest-900">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                  {/* Top Category Badge */}
                  <div className="absolute top-3.5 left-3.5 z-10">
                    <span className="bg-[#0B3025]/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-white border border-white/20 shadow-xs">
                      {item.category}
                    </span>
                  </div>

                  {/* Bottom Meta */}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 z-10 flex items-center justify-between text-[11px] text-white">
                    <span className="truncate max-w-[65%] font-medium inline-flex items-center gap-1">
                      <MapPinIcon className="w-3.5 h-3.5 shrink-0 text-[#F47B2A]" />
                      <span className="truncate">{item.location}</span>
                    </span>
                    <span className="bg-black/50 backdrop-blur-sm px-2.5 py-0.5 rounded-full text-[10.5px]">
                      {item.date}
                    </span>
                  </div>
                </div>

                {/* Card Caption Body */}
                <div className="p-5 sm:p-6 space-y-2.5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="font-gujarati text-xs text-[#F47B2A] font-semibold block">
                      {item.titleGu}
                    </span>
                    <h3 className="font-heading font-bold text-base sm:text-lg text-forest-dark group-hover:text-forest transition-colors line-clamp-2 mt-0.5 leading-snug">
                      {item.title}
                    </h3>
                  </div>

                  <p className="font-body text-xs sm:text-sm text-charcoal/70 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="pt-3 border-t border-cream-dark flex items-center justify-between text-xs font-bold text-[#F47B2A] group-hover:text-[#E06A1B]">
                    <span>{isGujarati ? "મોટી તસવીર જુઓ" : "View Photo & Details"}</span>
                    <svg
                      className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
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
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {displayLimit < filteredItems.length && (
            <div className="text-center pt-10">
              <button
                type="button"
                onClick={() => setDisplayLimit((prev) => prev + 24)}
                className="px-8 py-3 rounded-full bg-[#0B3025] hover:bg-[#174B38] text-white text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <span>{isGujarati ? "વધુ તસવીરો જુઓ" : "Load More Photos"}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-white/20 text-white font-mono">
                  +{Math.min(24, filteredItems.length - displayLimit)} ({filteredItems.length - displayLimit} remaining)
                </span>
              </button>
            </div>
          )}

          {/* Empty state if filtered item count is zero */}
          {filteredItems.length === 0 && (
            <div className="text-center py-16 bg-white rounded-3xl border border-forest/10 p-8">
              <div className="w-12 h-12 mx-auto rounded-full bg-forest-50 text-forest flex items-center justify-center mb-3">
                <SearchIcon className="w-6 h-6 text-forest" />
              </div>
              <h3 className="font-heading text-xl font-bold text-forest">
                No items found in this category
              </h3>
              <p className="text-sm text-charcoal/70 mt-1">
                Please select another filter or choose &quot;All&quot;.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 3. Lightbox Modal */}
      {activeItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-8 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActiveItem(null)}
        >
          {/* Modal Container */}
          <div
            className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-3xl w-full border border-white/20 relative animate-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image with Controls */}
            <div className="relative w-full h-64 sm:h-96 bg-black shrink-0 group">
              <Image
                src={activeItem.image}
                alt={activeItem.title}
                fill
                sizes="(max-width: 1024px) 100vw, 800px"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

              {/* Previous Button Overlay */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-[#0B3025] text-white flex items-center justify-center transition-all shadow-lg focus:outline-none focus:ring-2 focus:ring-[#F47B2A]"
                aria-label="Previous photograph"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Next Button Overlay */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-[#0B3025] text-white flex items-center justify-center transition-all shadow-lg focus:outline-none focus:ring-2 focus:ring-[#F47B2A]"
                aria-label="Next photograph"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveItem(null)}
                className="absolute top-3.5 right-3.5 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-[#F47B2A]"
                aria-label="Close dialog"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Category Pill */}
              <div className="absolute top-3.5 left-3.5 z-10">
                <span className="bg-[#0B3025]/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white border border-white/30">
                  {activeItem.category}
                </span>
              </div>

              {/* Location & Date Footer */}
              <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between text-xs text-white bg-black/50 backdrop-blur-sm px-3.5 py-1.5 rounded-xl border border-white/15">
                <span className="font-medium inline-flex items-center gap-1.5 truncate max-w-[65%]">
                  <MapPinIcon className="w-3.5 h-3.5 text-[#F47B2A] shrink-0" />
                  <span className="truncate">{activeItem.location}</span>
                </span>
                <span className="font-medium inline-flex items-center gap-1.5">
                  <CalendarIcon className="w-3.5 h-3.5 text-[#F47B2A] shrink-0" />
                  <span>{activeItem.date}</span>
                </span>
              </div>
            </div>

            {/* Modal Content Body */}
            <div className="p-6 sm:p-8 space-y-3 overflow-y-auto">
              <div>
                <span className="font-gujarati text-[#F47B2A] text-xs sm:text-sm font-semibold block">
                  {activeItem.titleGu}
                </span>
                <h3
                  id="lightbox-title"
                  className="font-heading font-extrabold text-xl sm:text-2xl text-forest-dark mt-0.5 leading-snug"
                >
                  {activeItem.title}
                </h3>
              </div>

              <p className="font-body text-charcoal/80 text-xs sm:text-sm leading-relaxed">
                {activeItem.description}
              </p>

              {/* Modal Navigation Footer */}
              <div className="pt-3 border-t border-cream-dark flex flex-wrap items-center justify-between gap-3 text-xs text-charcoal/70">
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-[#0B3025] hover:text-white font-bold transition-colors inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>← Previous</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-[#0B3025] hover:text-white font-bold transition-colors inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>Next →</span>
                  </button>
                  <span className="text-charcoal/60 ml-2 text-[11px] hidden sm:inline">
                    Photo {filteredItems.findIndex((it) => it.id === activeItem.id) + 1} of {filteredItems.length}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-charcoal/50 hidden md:inline">ESC to close</span>
                  <button
                    type="button"
                    onClick={() => setActiveItem(null)}
                    className="px-4 py-1.5 rounded-lg bg-[#0B3025] text-white hover:bg-forest font-bold transition-colors shadow-xs cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
