"use client";

import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import MediaSubNav from "@/components/ui/MediaSubNav";
import {
  SearchIcon,
  YoutubeIcon,
  CameraIcon,
  HeartIcon,
} from "@/components/ui/Icons";

import {
  GALLERY_ITEMS,
  CATEGORIES,
  CATEGORY_LABELS,
  GalleryCategory,
  GalleryItem,
} from "@/lib/galleryData";

// ─── Icons ────────────────────────────────────────────────────────────────────
function ChevronLeft({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
    </svg>
  );
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function PinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" strokeWidth={2} />
      <line x1="16" x2="16" y1="2" y2="6" strokeWidth={2} strokeLinecap="round" />
      <line x1="8" x2="8" y1="2" y2="6" strokeWidth={2} strokeLinecap="round" />
      <line x1="3" x2="21" y1="10" y2="10" strokeWidth={2} />
    </svg>
  );
}

const PAGE_SIZE = 18;

// ─── Lightbox Image Viewer ────────────────────────────────────────────────────
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
  const currentIndex = items.findIndex((i) => i.id === item.id);

  // Focus management & keyboard shortcuts
  useEffect(() => {
    closeRef.current?.focus();
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();

      // Accessibility focus trap
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

  // Touch swipe support for mobile
  const touchStartX = useRef<number | null>(null);
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

  const categoryLabel = isGujarati
    ? CATEGORY_LABELS[item.category as GalleryCategory]?.gu ?? item.category
    : CATEGORY_LABELS[item.category as GalleryCategory]?.en ?? item.category;

  const displayTitle = isGujarati && item.titleGu ? item.titleGu : item.title;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-3 sm:p-5 md:p-8 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-title"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        ref={dialogRef}
        className="relative w-full max-w-6xl max-h-[94vh] bg-[#0B3025] border border-white/10 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Main Photograph Canvas — Uncropped full view */}
        <div className="relative w-full lg:w-3/5 xl:w-2/3 min-h-[300px] sm:min-h-[420px] lg:min-h-[580px] bg-black/85 flex items-center justify-center p-2 sm:p-4 shrink-0">
          <div className="relative w-full h-full min-h-[280px] sm:min-h-[400px] lg:min-h-[540px]">
            <Image
              src={item.image}
              alt={displayTitle}
              fill
              className="object-contain"
              sizes="(max-width: 1024px) 100vw, 70vw"
              priority
            />
          </div>

          {/* Close button */}
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 z-30 w-10 h-10 rounded-full bg-black/70 hover:bg-[#F47B2A] text-white flex items-center justify-center transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-[#F47B2A]"
            aria-label={isGujarati ? "ફોટો બંધ કરો (Esc)" : "Close photo viewer (Esc)"}
          >
            <XIcon className="w-5 h-5" />
          </button>

          {/* Category pill on image */}
          <span className="absolute top-3 left-3 z-20 bg-[#0B3025]/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-white border border-white/20">
            {categoryLabel}
          </span>

          {/* Previous Arrow button */}
          <button
            type="button"
            onClick={onPrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/60 hover:bg-[#F47B2A] text-white flex items-center justify-center transition-all shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#F47B2A]"
            aria-label={isGujarati ? "પાછલો ફોટો" : "Previous photo"}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Arrow button */}
          <button
            type="button"
            onClick={onNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/60 hover:bg-[#F47B2A] text-white flex items-center justify-center transition-all shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#F47B2A]"
            aria-label={isGujarati ? "આગલો ફોટો" : "Next photo"}
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image index counter */}
          <div className="absolute bottom-3 left-3 z-20 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full text-white/90 text-xs font-mono font-semibold border border-white/10">
            {currentIndex + 1} / {items.length}
          </div>
        </div>

        {/* Verified Metadata Sidebar */}
        <div className="flex flex-col p-5 sm:p-6 lg:p-8 bg-white text-charcoal overflow-y-auto lg:w-2/5 xl:w-1/3 justify-between">
          <div className="space-y-4">
            <div>
              <span className="text-[#F47B2A] text-xs font-bold uppercase tracking-wider block mb-1">
                {categoryLabel}
              </span>
              <h2
                id="lightbox-title"
                className="font-heading font-extrabold text-lg sm:text-xl text-[#0B3025] leading-snug"
              >
                {displayTitle}
              </h2>
              {isGujarati && item.title && item.title !== item.titleGu && (
                <p className="text-xs text-charcoal/60 font-body mt-0.5">{item.title}</p>
              )}
            </div>

            {item.description && (
              <p className="font-body text-charcoal/80 text-xs sm:text-sm leading-relaxed">
                {item.description}
              </p>
            )}

            <div className="pt-3 border-t border-neutral-100 space-y-2 text-xs text-charcoal/70">
              {item.location && (
                <div className="flex items-center gap-2">
                  <PinIcon className="w-4 h-4 text-[#F47B2A] shrink-0" />
                  <span className="font-medium">{item.location}</span>
                </div>
              )}
              {item.date && (
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-[#F47B2A] shrink-0" />
                  <span className="font-medium">{item.date}</span>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Controls in Sidebar */}
          <div className="pt-6 mt-6 border-t border-neutral-100 space-y-3">
            <div className="flex gap-2.5">
              <button
                type="button"
                onClick={onPrev}
                className="flex-1 py-2.5 rounded-xl border border-neutral-200 hover:bg-[#0B3025] hover:text-white hover:border-[#0B3025] font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#F47B2A]"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>{isGujarati ? "પાછલો ફોટો" : "Previous"}</span>
              </button>
              <button
                type="button"
                onClick={onNext}
                className="flex-1 py-2.5 rounded-xl bg-[#0B3025] text-white hover:bg-[#174B38] font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#F47B2A]"
              >
                <span>{isGujarati ? "આગલો ફોટો" : "Next"}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-2 text-center text-xs text-charcoal/60 hover:text-charcoal font-medium transition-colors"
            >
              {isGujarati ? "ફોટો ગેલેરી પર પાછા જાઓ (Esc)" : "Photo Gallery (Esc)"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Editorial Gallery Card ──────────────────────────────────────────────────
function GalleryCard({
  item,
  index,
  onClick,
  isGujarati,
}: {
  item: GalleryItem;
  index: number;
  onClick: () => void;
  isGujarati: boolean;
}) {
  const categoryLabel = isGujarati
    ? CATEGORY_LABELS[item.category as GalleryCategory]?.gu ?? item.category
    : CATEGORY_LABELS[item.category as GalleryCategory]?.en ?? item.category;

  const displayTitle = isGujarati && item.titleGu ? item.titleGu : item.title;

  // Varied aspect ratio for organic editorial rhythm
  const aspectClass =
    index % 7 === 0
      ? "aspect-[4/3]"
      : index % 5 === 0
      ? "aspect-[16/10]"
      : index % 3 === 0
      ? "aspect-[3/2]"
      : "aspect-[4/3]";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative w-full ${aspectClass} overflow-hidden rounded-2xl bg-neutral-100 block cursor-pointer border border-neutral-200/70 shadow-xs hover:shadow-xl hover:border-neutral-300 transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#F47B2A] text-left`}
      aria-label={`View full photograph: ${displayTitle} — ${categoryLabel}`}
    >
      <Image
        src={item.image}
        alt={displayTitle}
        fill
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
        loading="lazy"
      />

      {/* Subtle dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent opacity-35 group-hover:opacity-95 transition-opacity duration-300" />

      {/* Category pill on top-left */}
      <span className="absolute top-3 left-3 bg-[#0B3025]/85 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-white/15 shadow-sm">
        {categoryLabel}
      </span>

      {/* Center Zoom indicator on hover */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-white transform scale-90 group-hover:scale-100 transition-transform duration-300 shadow-lg">
          <CameraIcon size={20} className="text-white" />
        </div>
      </div>

      {/* Bottom Editorial Caption */}
      <div className="absolute bottom-0 left-0 right-0 p-3.5 sm:p-4 space-y-1">
        <p className="font-heading font-bold text-white text-xs sm:text-sm leading-snug line-clamp-2 drop-shadow-sm">
          {displayTitle}
        </p>
        {item.location && (
          <div className="flex items-center justify-between text-[11px] text-white/80">
            <span className="flex items-center gap-1 font-medium">
              <PinIcon className="w-3 h-3 text-[#F47B2A] shrink-0" />
              <span className="truncate max-w-[160px]">{item.location}</span>
            </span>
          </div>
        )}
      </div>
    </button>
  );
}

// ─── Main Gallery Page ────────────────────────────────────────────────────────
export default function GalleryPage() {
  const { isGujarati } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);
  const [displayLimit, setDisplayLimit] = useState(PAGE_SIZE);

  // Reset pagination limit when filter or search changes
  useEffect(() => {
    setDisplayLimit(PAGE_SIZE);
  }, [selectedCategory, searchQuery]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (activeItem) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [activeItem]);

  // Filtered collection
  const filteredItems = useMemo(() => {
    return GALLERY_ITEMS.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const catEn = CATEGORY_LABELS[item.category as GalleryCategory]?.en.toLowerCase() ?? "";
      const catGu = CATEGORY_LABELS[item.category as GalleryCategory]?.gu.toLowerCase() ?? "";
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        (item.titleGu && item.titleGu.toLowerCase().includes(q)) ||
        (item.location && item.location.toLowerCase().includes(q)) ||
        (item.category && item.category.toLowerCase().includes(q)) ||
        catEn.includes(q) ||
        catGu.includes(q) ||
        (item.description && item.description.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const displayedItems = filteredItems.slice(0, displayLimit);
  const hasMore = displayLimit < filteredItems.length;

  // Prev / Next Lightbox navigation
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
    <main id="main-content" className="flex-1 bg-cream min-h-screen pb-16">
      {/* ════════════════════════════════════
          1. COMPACT EDITORIAL HEADER (ORIGINAL CONTENT ONLY)
      ════════════════════════════════════ */}
      <section
        aria-labelledby="gallery-hero-heading"
        className="relative pt-32 sm:pt-36 lg:pt-40 pb-12 sm:pb-14 bg-[#0B3025] text-white overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none">
          <Image
            src="/img/Education/Swadeep-Shikshan-Vikas-Sanstha-Education-1-700x525.jpg"
            alt="Swadeep Shikshan Vikas Sanstha"
            fill
            className="object-cover opacity-20"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#061F17]/95 via-[#0B3025]/85 to-[#061F17]/95" />
        </div>

        <div className="relative z-10 container-wide section-padding max-w-6xl mx-auto space-y-2">
          <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#F47B2A]">
            {isGujarati ? "સ્વદીપ શિક્ષણ વિકાસ સંસ્થા" : "Swadeep Shikshan Vikas Sanstha"}
          </p>
          <h1
            id="gallery-hero-heading"
            className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight"
          >
            {isGujarati ? "ફોટો ગેલેરી" : "Photo Gallery"}
          </h1>
        </div>
      </section>

      {/* Shared Media Sub-Navigation */}
      <MediaSubNav activeTab="gallery" />

      {/* ════════════════════════════════════
          2. SEARCH & 6 ORIGINAL CATEGORY FILTERS
      ════════════════════════════════════ */}
      <div className="container-wide section-padding max-w-6xl mx-auto space-y-8 mt-8 sm:mt-10">
        <section id="gallery-grid" className="scroll-mt-32" aria-label="Search and filter photographs">
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-forest/10 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              {/* Search input */}
              <div className="relative flex-1">
                <SearchIcon
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal/40"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label={isGujarati ? "ફોટો શોધો" : "Search photos"}
                  placeholder={
                    isGujarati
                      ? "ફોટો શોધો..."
                      : "Search..."
                  }
                  className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-cream/40 border border-forest/15 text-xs sm:text-sm text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:ring-2 focus:ring-[#F47B2A]/40 focus:border-[#F47B2A] transition-all"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal/50 hover:text-charcoal text-xs p-1"
                    aria-label="Clear search"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Count indicator */}
              <div className="text-xs text-charcoal/70 font-medium shrink-0 px-1">
                <strong className="text-[#0B3025] font-bold">{filteredItems.length}</strong>
                <span> / {GALLERY_ITEMS.length}</span>
              </div>
            </div>

            {/* Category Filter Pills — Exact 6 Original Categories */}
            <div
              role="group"
              aria-label="Filter gallery by category"
              className="flex gap-2 overflow-x-auto pb-1 scrollbar-none snap-x snap-mandatory flex-nowrap"
            >
              {CATEGORIES.map((cat) => {
                const label = CATEGORY_LABELS[cat];
                const isActive = selectedCategory === cat;
                const count =
                  cat === "All"
                    ? GALLERY_ITEMS.length
                    : GALLERY_ITEMS.filter((i) => i.category === cat).length;

                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    aria-pressed={isActive}
                    className={`snap-start shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-[#F47B2A] ${
                      isActive
                        ? "bg-[#0B3025] text-white shadow-sm"
                        : "bg-neutral-100 text-charcoal/75 hover:bg-neutral-200"
                    }`}
                  >
                    <span>{isGujarati ? label.gu : label.en}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                        isActive ? "bg-white/20 text-white" : "bg-white text-charcoal/60"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}

              {(selectedCategory !== "All" || searchQuery) && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory("All");
                    setSearchQuery("");
                  }}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold text-[#F47B2A] hover:bg-amber-50 transition-colors shrink-0"
                >
                  {isGujarati ? "ફિલ્ટર્સ સાફ કરો" : "Reset"}
                </button>
              )}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════
            3. EDITORIAL PHOTO GRID
        ════════════════════════════════════ */}
        <section aria-label="Photo Gallery Grid">
          {displayedItems.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-neutral-300 p-8 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto">
                <CameraIcon size={24} />
              </div>
              <p className="font-heading font-bold text-base text-[#0B3025]">
                {isGujarati ? "કોઈ ફોટો મળ્યો નથી" : "No photos found"}
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="px-4 py-2 rounded-xl bg-[#0B3025] hover:bg-[#174B38] text-white text-xs font-bold transition-all shadow-sm"
              >
                {isGujarati ? "બધા ફોટો બતાવો" : "All Photos"}
              </button>
            </div>
          ) : (
            <>
              {/* Responsive multi-column editorial masonry grid */}
              <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 sm:gap-5 space-y-4 sm:space-y-5">
                {displayedItems.map((item, index) => (
                  <div key={item.id} className="break-inside-avoid">
                    <GalleryCard
                      item={item}
                      index={index}
                      onClick={() => setActiveItem(item)}
                      isGujarati={isGujarati}
                    />
                  </div>
                ))}
              </div>

              {/* Load More Button */}
              {hasMore && (
                <div className="text-center pt-10 sm:pt-12 space-y-3">
                  <p className="text-xs text-charcoal/60 font-medium font-mono">
                    {displayedItems.length} / {filteredItems.length}
                  </p>
                  <button
                    type="button"
                    onClick={() => setDisplayLimit((prev) => prev + PAGE_SIZE)}
                    className="inline-flex items-center gap-2 bg-[#0B3025] hover:bg-[#174B38] text-white font-bold px-8 py-3 rounded-full text-xs sm:text-sm transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#F47B2A]"
                  >
                    <span>{isGujarati ? "વધુ જુઓ" : "Load More"}</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              )}
            </>
          )}
        </section>

        {/* ════════════════════════════════════
            4. CLEAN APPROVED NAVIGATION LINKS
        ════════════════════════════════════ */}
        <section
          aria-label="Related Navigation"
          className="pt-6 border-t border-forest/10 flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            href="/videos"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-forest-50 text-[#0B3025] border border-forest/15 text-xs sm:text-sm font-bold transition-all shadow-xs"
          >
            <YoutubeIcon size={16} className="text-[#FF0000]" />
            <span>{isGujarati ? "વીડિયો" : "Videos"}</span>
          </Link>
          <Link
            href="/programs"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-forest-50 text-[#0B3025] border border-forest/15 text-xs sm:text-sm font-bold transition-all shadow-xs"
          >
            <span>{isGujarati ? "અમારી કામગીરી" : "What We Do"}</span>
          </Link>
          <Link
            href="/donate"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F47B2A] hover:bg-[#E06A1B] text-white text-xs sm:text-sm font-bold transition-all shadow-sm"
          >
            <HeartIcon size={15} />
            <span>{isGujarati ? "દાન કરો" : "Donate Now"}</span>
          </Link>
        </section>
      </div>

      {/* ════════════════════════════════════
          LIGHTBOX MODAL
      ════════════════════════════════════ */}
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
