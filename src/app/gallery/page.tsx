"use client";

import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import MediaSubNav from "@/components/ui/MediaSubNav";
import { SearchIcon, YoutubeIcon, HeartIcon } from "@/components/ui/Icons";
import {
  GALLERY_ITEMS,
  CATEGORIES,
  CATEGORY_LABELS,
  GalleryCategory,
  GalleryItem,
} from "@/lib/galleryData";

const PAGE_SIZE = 18;

// ─── Minimal UI Icons ─────────────────────────────────────────────────────────
function ChevronLeft({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15 19l-7-7 7-7" />
    </svg>
  );
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 5l7 7-7 7" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function getCategoryLabel(category: GalleryCategory, isGujarati: boolean): string {
  const entry = CATEGORY_LABELS[category];
  if (!entry) return category;
  return isGujarati ? entry.gu : entry.en;
}

function getPhotoAltText(item: GalleryItem, index: number, isGujarati: boolean): string {
  const categoryLabel = getCategoryLabel(item.category, isGujarati);
  const org = isGujarati ? "સ્વદીપ શિક્ષણ વિકાસ સંસ્થા" : "Swadeep Shikshan Vikas Sanstha";
  return `${categoryLabel} — ${org} (${index + 1})`;
}

// ─── Full-Screen Editorial Lightbox ───────────────────────────────────────────
function Lightbox({
  item,
  items,
  onClose,
  onPrev,
  onNext,
  isGujarati,
}: {
  item: GalleryItem;
  items: GalleryItem[];
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  isGujarati: boolean;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const currentIndex = items.findIndex((i) => i.id === item.id);

  useEffect(() => {
    closeRef.current?.focus();
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();

      if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length > 0) {
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (e.shiftKey ? document.activeElement === first : document.activeElement === last) {
            e.preventDefault();
            (e.shiftKey ? last : first).focus();
          }
        }
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, onNext, onPrev]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) onNext();
      else onPrev();
    }
    touchStartX.current = null;
  };

  const categoryLabel = getCategoryLabel(item.category, isGujarati);
  const altText = getPhotoAltText(item, Math.max(0, currentIndex), isGujarati);

  return (
    <div
      ref={dialogRef}
      className="fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={altText}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Top minimal bar */}
      <div className="flex items-center justify-between px-4 sm:px-8 py-4 text-white/90 shrink-0">
        <div className="flex items-center gap-4 text-xs sm:text-sm">
          <span className="font-medium tracking-wide text-white">{categoryLabel}</span>
          <span className="text-white/40 font-mono text-xs">
            {currentIndex + 1} / {items.length}
          </span>
        </div>

        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F47B2A]"
          aria-label={isGujarati ? "ફોટો બંધ કરો (Esc)" : "Close photo viewer (Esc)"}
        >
          <XIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Main uncropped photograph */}
      <div
        className="relative flex-1 flex items-center justify-center px-4 sm:px-16 pb-8 min-h-0"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <div className="relative w-full h-full max-w-6xl max-h-[82vh]">
          <Image
            src={item.image}
            alt={altText}
            fill
            className="object-contain"
            sizes="100vw"
            priority
          />
        </div>

        {/* Previous button */}
        <button
          type="button"
          onClick={onPrev}
          className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 hover:bg-white/20 text-white flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F47B2A]"
          aria-label={isGujarati ? "પાછલો ફોટો" : "Previous photo"}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Next button */}
        <button
          type="button"
          onClick={onNext}
          className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 hover:bg-white/20 text-white flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F47B2A]"
          aria-label={isGujarati ? "આગલો ફોટો" : "Next photo"}
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}

// ─── Main Gallery Page ────────────────────────────────────────────────────────
export default function GalleryPage() {
  const { isGujarati } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);
  const [displayLimit, setDisplayLimit] = useState(PAGE_SIZE);

  useEffect(() => {
    setDisplayLimit(PAGE_SIZE);
  }, [selectedCategory, searchQuery]);

  useEffect(() => {
    if (!activeItem) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [activeItem]);

  const filteredItems = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return GALLERY_ITEMS.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      if (!matchesCategory) return false;
      if (!q) return true;

      const catEn = CATEGORY_LABELS[item.category]?.en.toLowerCase() ?? "";
      const catGu = CATEGORY_LABELS[item.category]?.gu.toLowerCase() ?? "";
      return (
        item.title.toLowerCase().includes(q) ||
        (item.titleGu && item.titleGu.toLowerCase().includes(q)) ||
        (item.location && item.location.toLowerCase().includes(q)) ||
        item.category.toLowerCase().includes(q) ||
        catEn.includes(q) ||
        catGu.includes(q) ||
        (item.description && item.description.toLowerCase().includes(q))
      );
    });
  }, [selectedCategory, searchQuery]);

  const displayedItems = filteredItems.slice(0, displayLimit);
  const hasMore = displayLimit < filteredItems.length;

  const handleNext = useCallback(() => {
    if (!activeItem || filteredItems.length === 0) return;
    const idx = filteredItems.findIndex((i) => i.id === activeItem.id);
    if (idx !== -1) {
      setActiveItem(filteredItems[(idx + 1) % filteredItems.length]);
    }
  }, [activeItem, filteredItems]);

  const handlePrev = useCallback(() => {
    if (!activeItem || filteredItems.length === 0) return;
    const idx = filteredItems.findIndex((i) => i.id === activeItem.id);
    if (idx !== -1) {
      setActiveItem(filteredItems[(idx - 1 + filteredItems.length) % filteredItems.length]);
    }
  }, [activeItem, filteredItems]);

  return (
    <main id="main-content" className="flex-1 bg-[#FAF9F6] min-h-screen pb-20">
      {/* Minimal Editorial Heading */}
      <header
        aria-labelledby="gallery-hero-heading"
        className="pt-28 sm:pt-32 lg:pt-36 pb-8 sm:pb-10 bg-white border-b border-forest/10"
      >
        <div className="container-wide max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#F47B2A] mb-2">
            {isGujarati ? "સ્વદીપ શિક્ષણ વિકાસ સંસ્થા" : "Swadeep Shikshan Vikas Sanstha"}
          </p>
          <h1
            id="gallery-hero-heading"
            className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0B3025] leading-tight"
          >
            {isGujarati ? "ફોટો ગેલેરી" : "Photo Gallery"}
          </h1>
        </div>
      </header>

      {/* Shared Media Sub-Navigation */}
      <MediaSubNav activeTab="gallery" />

      <div className="container-wide max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 space-y-8 sm:space-y-10">
        {/* Horizontal Category Navigation & Minimal Search */}
        <section
          id="gallery-grid"
          className="scroll-mt-32 border-b border-forest/10 pb-3"
          aria-label="Filter photographs"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <nav
              aria-label="Photo categories"
              className="flex items-center gap-6 overflow-x-auto scrollbar-none flex-nowrap pb-1 lg:pb-0"
            >
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                const label = getCategoryLabel(cat, isGujarati);

                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    aria-pressed={isActive}
                    className={`shrink-0 py-2 text-xs sm:text-sm whitespace-nowrap transition-colors border-b-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F47B2A] ${
                      isActive
                        ? "border-[#0B3025] text-[#0B3025] font-bold"
                        : "border-transparent text-charcoal/60 hover:text-[#0B3025] font-medium"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </nav>

            <div className="flex items-center gap-4 shrink-0">
              <div className="relative w-full sm:w-56">
                <SearchIcon
                  size={15}
                  className="absolute left-0 top-1/2 -translate-y-1/2 text-charcoal/40 pointer-events-none"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label={isGujarati ? "ફોટો શોધો" : "Search photos"}
                  placeholder={isGujarati ? "ફોટો શોધો..." : "Search..."}
                  className="w-full pl-6 pr-6 py-1.5 bg-transparent border-b border-forest/15 focus:border-[#0B3025] text-xs sm:text-sm text-[#0B3025] placeholder:text-charcoal/40 focus:outline-none transition-colors"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-charcoal/50 hover:text-charcoal text-xs p-1"
                    aria-label="Clear search"
                  >
                    ✕
                  </button>
                )}
              </div>

              <span className="text-xs font-mono text-charcoal/50 shrink-0">
                {filteredItems.length}
              </span>
            </div>
          </div>
        </section>

        {/* Photography-First Editorial Masonry Grid */}
        <section aria-label="Photo Gallery Grid">
          {displayedItems.length === 0 ? (
            <div className="text-center py-20 space-y-4">
              <p className="font-heading font-semibold text-base text-[#0B3025]">
                {isGujarati ? "કોઈ ફોટો મળ્યો નથી" : "No photos found"}
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="px-5 py-2 rounded-full border border-[#0B3025]/25 text-[#0B3025] hover:bg-[#0B3025] hover:text-white text-xs font-semibold transition-colors"
              >
                {isGujarati ? "બધા ફોટો બતાવો" : "All Photos"}
              </button>
            </div>
          ) : (
            <>
              <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 sm:gap-5">
                {displayedItems.map((item, index) => {
                  const altText = getPhotoAltText(item, index, isGujarati);

                  return (
                    <div key={item.id} className="break-inside-avoid mb-4 sm:mb-5">
                      <button
                        type="button"
                        onClick={() => setActiveItem(item)}
                        aria-label={altText}
                        className="group relative w-full overflow-hidden rounded-lg bg-neutral-100 block cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F47B2A]"
                      >
                        <Image
                          src={item.image}
                          alt={altText}
                          width={800}
                          height={600}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                          style={{ width: "100%", height: "auto" }}
                          className="block transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none" />
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Load More */}
              {hasMore && (
                <div className="text-center pt-10 sm:pt-12 space-y-3">
                  <p className="text-xs text-charcoal/50 font-mono">
                    {displayedItems.length} / {filteredItems.length}
                  </p>
                  <button
                    type="button"
                    onClick={() => setDisplayLimit((prev) => prev + PAGE_SIZE)}
                    className="inline-flex items-center gap-2 border border-[#0B3025] text-[#0B3025] hover:bg-[#0B3025] hover:text-white font-semibold px-8 py-2.5 rounded-full text-xs sm:text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F47B2A]"
                  >
                    <span>{isGujarati ? "વધુ જુઓ" : "Load More"}</span>
                  </button>
                </div>
              )}
            </>
          )}
        </section>

        {/* Minimal Footer Links */}
        <section
          aria-label="Related Navigation"
          className="pt-8 border-t border-forest/10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/videos"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white hover:bg-neutral-50 text-[#0B3025] border border-forest/15 text-xs sm:text-sm font-semibold transition-colors"
          >
            <YoutubeIcon size={16} className="text-[#FF0000]" />
            <span>{isGujarati ? "વીડિયો" : "Videos"}</span>
          </Link>
          <Link
            href="/donate"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#F47B2A] hover:bg-[#E06A1B] text-white text-xs sm:text-sm font-semibold transition-colors"
          >
            <HeartIcon size={15} />
            <span>{isGujarati ? "દાન કરો" : "Donate Now"}</span>
          </Link>
        </section>
      </div>

      {/* Full-Screen Lightbox */}
      {activeItem && (
        <Lightbox
          item={activeItem}
          items={filteredItems}
          onClose={() => setActiveItem(null)}
          onPrev={handlePrev}
          onNext={handleNext}
          isGujarati={isGujarati}
        />
      )}
    </main>
  );
}
