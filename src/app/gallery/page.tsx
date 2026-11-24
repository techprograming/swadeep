"use client";

import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import MediaSubNav from "@/components/ui/MediaSubNav";
import { SearchIcon, ReceiptTextIcon, BookOpenIcon, YoutubeIcon } from "@/components/ui/Icons";

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
function PlayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

// ─── Impact stats ──────────────────────────────────────────────────────────────
const IMPACT_STATS = [
  { value: "60,000+", label: "Children Reached", labelGu: "બાળકો સ્પર્શ્યા" },
  { value: "200+",    label: "Villages Covered", labelGu: "ગામો આવ્યા" },
  { value: "500+",    label: "Fishermen Supported", labelGu: "માછીમારો" },
  { value: "20+",     label: "Years of Impact", labelGu: "વર્ષ સેવા" },
];

// ─── Program sections ─────────────────────────────────────────────────────────
const PROGRAM_SECTIONS = [
  {
    category: "Education" as GalleryCategory,
    title: "Education",
    titleGu: "શિક્ষણ",
    desc: "Empowering children and communities through quality education across 200+ villages.",
    link: "/programs/education",
  },
  {
    category: "Health" as GalleryCategory,
    title: "Health",
    titleGu: "આરોગ્ય",
    desc: "Health camps, eye care, dental drives, and community wellness reaching thousands.",
    link: "/programs/health",
  },
  {
    category: "Livelihood" as GalleryCategory,
    title: "Livelihood",
    titleGu: "આજીવિકા",
    desc: "Supporting coastal fishing communities with tools, training, and sustainable resources.",
    link: "/programs/livelihood",
  },
  {
    category: "Infrastructure" as GalleryCategory,
    title: "Rural Development",
    titleGu: "ગ્રામ વિકાસ",
    desc: "Solar street lights, rural infrastructure, and community development across 40 villages.",
    link: "/programs/infrastructure",
  },
  {
    category: "Relief" as GalleryCategory,
    title: "Disaster Response",
    titleGu: "આપત્તિ રાહત",
    desc: "Emergency relief operations helping communities recover from floods, cyclones, and crises.",
    link: "/programs/disaster",
  },
];

const PAGE_SIZE = 18;

// ─── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({
  item,
  items,
  onClose,
  onPrev,
  onNext,
}: {
  item: GalleryItem;
  items: GalleryItem[];
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const currentIndex = items.findIndex((i) => i.id === item.id);

  // Focus trap + keyboard
  useEffect(() => {
    closeRef.current?.focus();
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
      // Basic focus trap
      if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey ? document.activeElement === first : document.activeElement === last) {
          e.preventDefault();
          (e.shiftKey ? last : first).focus();
        }
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, onNext, onPrev]);

  // Touch swipe
  const touchStartX = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? onNext() : onPrev();
    touchStartX.current = null;
  };

  const categoryLabel = CATEGORY_LABELS[item.category as GalleryCategory]?.en ?? item.category;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-title"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        ref={dialogRef}
        className="relative w-full max-w-5xl max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col lg:flex-row"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Image panel */}
        <div className="relative w-full lg:w-3/5 aspect-[4/3] lg:aspect-auto lg:min-h-[480px] bg-black flex-shrink-0">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 60vw"
            priority
          />
          {/* Close */}
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-[#F47B2A]"
            aria-label="Close photo viewer"
          >
            <XIcon className="w-5 h-5" />
          </button>
          {/* Category pill */}
          <span className="absolute top-3 left-3 z-10 bg-[#0B3025]/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-white">
            {categoryLabel}
          </span>
          {/* Prev arrow */}
          <button
            type="button"
            onClick={onPrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-[#F47B2A]"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          {/* Next arrow */}
          <button
            type="button"
            onClick={onNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-[#F47B2A]"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          {/* Counter */}
          <div className="absolute bottom-3 left-3 z-10 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-lg text-white text-xs font-medium">
            {currentIndex + 1} / {items.length}
          </div>
        </div>

        {/* Info panel */}
        <div className="flex flex-col p-6 lg:p-8 gap-4 overflow-y-auto lg:w-2/5">
          <div>
            <span className="text-[#F47B2A] text-xs font-bold uppercase tracking-wider font-gujarati block mb-1">
              {item.titleGu}
            </span>
            <h3 id="lightbox-title" className="font-heading font-extrabold text-xl text-[#0B3025] leading-snug">
              {item.title}
            </h3>
          </div>
          <p className="font-body text-gray-600 text-sm leading-relaxed flex-1">
            {item.description}
          </p>
          <div className="pt-4 border-t border-gray-100 space-y-2 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <PinIcon className="w-4 h-4 text-[#F47B2A] shrink-0" />
              <span>{item.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 text-[#F47B2A] shrink-0 text-center text-xs">📅</span>
              <span>{item.date}</span>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onPrev}
              className="flex-1 py-2 rounded-xl border border-gray-200 hover:bg-[#0B3025] hover:text-white hover:border-[#0B3025] font-semibold text-sm transition-colors flex items-center justify-center gap-1 focus:outline-none focus:ring-2 focus:ring-[#F47B2A]"
            >
              <ChevronLeft className="w-4 h-4" /> Prev
            </button>
            <button
              type="button"
              onClick={onNext}
              className="flex-1 py-2 rounded-xl bg-[#0B3025] text-white hover:bg-[#174B38] font-semibold text-sm transition-colors flex items-center justify-center gap-1 focus:outline-none focus:ring-2 focus:ring-[#F47B2A]"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Gallery Card ──────────────────────────────────────────────────────────────
function GalleryCard({
  item,
  size,
  onClick,
}: {
  item: GalleryItem;
  size: "large" | "medium" | "small";
  onClick: () => void;
}) {
  const categoryLabel = CATEGORY_LABELS[item.category as GalleryCategory]?.en ?? item.category;
  const aspectClass = size === "large" ? "aspect-[4/3]" : size === "medium" ? "aspect-[3/2]" : "aspect-square";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative w-full ${aspectClass} overflow-hidden rounded-2xl bg-gray-100 block cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#F47B2A] focus:ring-offset-2`}
      aria-label={`View photo: ${item.title}`}
    >
      <Image
        src={item.image}
        alt={item.title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        loading="lazy"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      {/* Category pill */}
      <span className="absolute top-3 left-3 bg-[#0B3025]/80 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
        {categoryLabel}
      </span>
      {/* Info on hover */}
      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <p className="font-heading font-bold text-white text-sm leading-snug line-clamp-2">{item.title}</p>
        <span className="text-white/70 text-[11px] mt-1 flex items-center gap-1">
          <PinIcon className="w-3 h-3" /> {item.location}
        </span>
      </div>
      {/* View indicator */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
          </svg>
        </div>
      </div>
    </button>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function GalleryPage() {
  const { isGujarati } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);
  const [displayLimit, setDisplayLimit] = useState(PAGE_SIZE);
  const filterBarRef = useRef<HTMLDivElement>(null);

  // Reset limit when category or search changes
  useEffect(() => {
    setDisplayLimit(PAGE_SIZE);
  }, [selectedCategory, searchQuery]);

  // Lock body scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = activeItem ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [activeItem]);

  const filteredItems = useMemo(() => {
    return GALLERY_ITEMS.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        (item.titleGu && item.titleGu.toLowerCase().includes(q)) ||
        (item.location && item.location.toLowerCase().includes(q)) ||
        (item.category && item.category.toLowerCase().includes(q)) ||
        (item.description && item.description.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const displayedItems = filteredItems.slice(0, displayLimit);
  const hasMore = displayLimit < filteredItems.length;

  const currentIndex = activeItem ? filteredItems.findIndex((i) => i.id === activeItem.id) : -1;

  const handleNext = useCallback(() => {
    if (!activeItem) return;
    const idx = filteredItems.findIndex((i) => i.id === activeItem.id);
    setActiveItem(filteredItems[(idx + 1) % filteredItems.length]);
  }, [activeItem, filteredItems]);

  const handlePrev = useCallback(() => {
    if (!activeItem) return;
    const idx = filteredItems.findIndex((i) => i.id === activeItem.id);
    setActiveItem(filteredItems[(idx - 1 + filteredItems.length) % filteredItems.length]);
  }, [activeItem, filteredItems]);

  // Scroll to gallery grid
  const scrollToGallery = () => {
    document.getElementById("gallery-grid")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main id="main-content" className="flex-1 bg-[#FAFAF7]">

      {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
      <section
        aria-labelledby="gallery-hero-heading"
        className="relative min-h-[480px] lg:min-h-[580px] flex items-center justify-center overflow-hidden bg-[#061F17]"
      >
        {/* Background photo */}
        <div className="absolute inset-0">
          <Image
            src="/img/Education/Swadeep-Shikshan-Vikas-Sanstha-Education-1-700x525.jpg"
            alt="Swadeep field work in education"
            fill
            className="object-cover opacity-35"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#061F17]/70 via-[#0B3025]/60 to-[#061F17]/90" />
        </div>

        {/* Decorative dot grid */}
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          aria-hidden="true"
          style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "32px 32px" }}
        />
        {/* Glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#F47B2A]/15 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

        {/* Content */}
        <div className="relative z-10 text-center px-4 py-20 max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-[#F47B2A] border border-white/15">
            <span>{isGujarati ? "અધિકૃત ક્ષેત્રીય દસ્તાવેજીકરણ" : "Authentic Field Documentation"}</span>
          </div>
          <h1 id="gallery-hero-heading" className="font-heading text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white tracking-tight">
            {isGujarati ? "ક્ષેત્ર કાર્ય — જીવંત સ્મૃતિઓ" : "Our Work in Action"}
          </h1>
          <p className="text-xl sm:text-2xl font-semibold text-white/90 font-heading">
            {isGujarati ? "સ્વદીપ શિક્ષણ વિકાસ સંસ્થા — ફોટો ગેલેરી" : "Swadeep Shikshan Vikas Sanstha — Photo Gallery"}
          </p>
          <p className="text-cream/80 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-body">
            {isGujarati
              ? "ગ્રામ ઉત્થાન, શિક્ષણ, આરોગ્ય, આજીવિકા અને આપત્તિ ના ક્ષેત્રોમાં Swadeep ના કાર્યની અસ્સલ ઝલક."
              : "Real moments captured from Swadeep's on-ground programs across 200+ villages in Gujarat."}
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={scrollToGallery}
              className="inline-flex items-center gap-2 bg-[#F47B2A] hover:bg-[#e36a1a] text-white font-bold px-8 py-3.5 rounded-full text-base transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-[#F47B2A] focus:ring-offset-2 focus:ring-offset-[#061F17]"
            >
              <span>{isGujarati ? "ફોટો સંગ્રહ જુઓ ↓" : "View Photo Gallery ↓"}</span>
            </button>
            <Link
              href="/videos"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-7 py-3.5 rounded-full text-base transition-colors border border-white/20"
            >
              <YoutubeIcon size={18} />
              <span>{isGujarati ? "વિડીયો જુઓ →" : "Watch Videos →"}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 2. IMPACT STATS BAR ──────────────────────────────────────────── */}
      <section className="bg-[#0B3025] py-10" aria-label="Impact statistics">
        <div className="container-wide section-padding">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
            {IMPACT_STATS.map((s) => (
              <div key={s.label} className="space-y-1">
                <div className="font-heading text-3xl sm:text-4xl font-extrabold text-[#F47B2A]">{s.value}</div>
                <div className="text-cream/90 text-sm font-semibold uppercase tracking-wide">
                  {isGujarati ? s.labelGu : s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shared Media Sub-Navigation */}
      <MediaSubNav activeTab="gallery" />

      {/* ── 3. CATEGORY FILTERS & SEARCH TOOLBAR ──────────────────────── */}
      <section id="gallery-grid" className="pt-14 pb-6 bg-[#FAFAF7]">
        <div className="container-wide section-padding max-w-6xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <span className="text-[#F47B2A] font-bold text-xs uppercase tracking-widest">
              {isGujarati ? "ફોટો ગ્રંથ" : "Photo Archive"}
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#0B3025]">
              {isGujarati ? "ચિત્ર ગ્રંથ — કાર્યક્ષેત્ર મુજબ" : "Browse by Program Area"}
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto text-sm">
              {isGujarati
                ? "૮૬ ખરી ક્ષેત્ર તસ્વીરો — ૫ કાર્યક્ષેત્રો — ક્લિક કરીને પૂર્ણ કદમાં જુઓ."
                : "86 authentic field photographs across 5 program areas — click any photo for high-res view."}
            </p>
          </div>

          {/* Search bar & Live Count */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-3xl border border-forest/10 shadow-xs">
            <div className="relative flex-1">
              <SearchIcon
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/40"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isGujarati ? "ફોટો, સ્થળ અથવા કાર્યક્રમ શોધો (દા.ત. Mundra, BaLA)..." : "Search photos by title, location or tag (e.g. Mundra, BaLA)..."}
                className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-cream/50 border border-forest/15 text-xs sm:text-sm text-charcoal placeholder:text-charcoal/45 focus:outline-none focus:ring-2 focus:ring-[#F47B2A] transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-charcoal/50 hover:text-charcoal"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="text-xs text-charcoal/70 font-medium px-2 shrink-0 flex items-center justify-between md:justify-end gap-2">
              <span>{isGujarati ? "પરિણામો: " : "Showing: "}</span>
              <strong className="text-[#0B3025] font-bold">{filteredItems.length}</strong>
              <span> of {GALLERY_ITEMS.length} photos</span>
            </div>
          </div>

          {/* Filter bar */}
          <div
            ref={filterBarRef}
            role="group"
            aria-label="Filter gallery by program category"
            className="flex gap-2 overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory justify-start sm:justify-center flex-nowrap"
          >
            {CATEGORIES.map((cat) => {
              const label = CATEGORY_LABELS[cat];
              const isActive = selectedCategory === cat;
              const count = cat === "All" ? GALLERY_ITEMS.length : GALLERY_ITEMS.filter((i) => i.category === cat).length;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(cat);
                  }}
                  aria-pressed={isActive}
                  className={`snap-start shrink-0 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-[#F47B2A] focus:ring-offset-1 whitespace-nowrap flex items-center gap-1.5 ${
                    isActive
                      ? "bg-[#0B3025] text-white shadow-md"
                      : "bg-white text-gray-700 border border-gray-200 hover:border-[#0B3025] hover:text-[#0B3025]"
                  }`}
                >
                  <span>{isGujarati ? label.gu : label.en}</span>
                  <span className={`text-[11px] rounded-full px-1.5 py-0.5 font-bold ${isActive ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"}`}>
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
                className="px-3.5 py-2 rounded-full text-xs font-semibold text-[#F47B2A] hover:bg-amber-50 transition-colors shrink-0"
              >
                {isGujarati ? "ફિલ્ટર્સ સાફ કરો" : "Reset Filters"}
              </button>
            )}
          </div>
        </div>
      </section>

{/* ── 5. MASONRY / BENTO GRID ──────────────────────────────────────── */}
      <section className="py-8 bg-[#FAFAF7]" aria-label="Photo gallery grid">
        <div className="container-wide section-padding">
          {displayedItems.length === 0 ? (
            <div className="text-center py-24 text-gray-400">
              <div className="text-5xl mb-4">📷</div>
              <p className="font-heading font-bold text-xl">{isGujarati ? "કોઈ ફોટો નથી" : "No photos in this category"}</p>
            </div>
          ) : (
            <>
              {/* Bento grid — CSS columns for masonry effect */}
              <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
                {displayedItems.map((item, index) => {
                  // Vary sizes: every 7th is large, every 3rd is medium, rest small
                  const size = index % 7 === 0 ? "large" : index % 3 === 0 ? "medium" : "small";
                  return (
                    <div key={item.id} className="break-inside-avoid">
                      <GalleryCard
                        item={item}
                        size={size}
                        onClick={() => setActiveItem(item)}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Load More */}
              {hasMore && (
                <div className="text-center mt-12">
                  <p className="text-gray-400 text-sm mb-4">
                    Showing {displayedItems.length} of {filteredItems.length} photos
                  </p>
                  <button
                    type="button"
                    onClick={() => setDisplayLimit((prev) => prev + PAGE_SIZE)}
                    className="inline-flex items-center gap-2 bg-white border border-[#0B3025] text-[#0B3025] hover:bg-[#0B3025] hover:text-white font-bold px-8 py-3.5 rounded-full text-sm transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-[#F47B2A]"
                  >
                    {isGujarati ? "વધુ ફોટો જુઓ" : "Load More Photos"}
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              )}

              {!hasMore && filteredItems.length > 0 && (
                <p className="text-center text-gray-400 text-sm mt-10">
                  All {filteredItems.length} photos shown
                </p>
              )}
            </>
          )}
        </div>
      </section>

      {/* ── 6. PROGRAM SECTIONS ──────────────────────────────────────────── */}
      <section className="py-16 bg-white" aria-labelledby="program-sections-heading">
        <div className="container-wide section-padding">
          <div className="text-center mb-12 space-y-2">
            <span className="text-[#F47B2A] font-bold text-xs uppercase tracking-widest">
              {isGujarati ? "કાર્યક્ષેત્ર" : "By Program"}
            </span>
            <h2 id="program-sections-heading" className="font-heading text-3xl font-extrabold text-[#0B3025]">
              {isGujarati ? "પ્રોગ્રામ પ્રમાણે ફોટો" : "Explore by Program Area"}
            </h2>
          </div>

          <div className="space-y-16">
            {PROGRAM_SECTIONS.map((prog) => {
              const progItems = GALLERY_ITEMS.filter((i) => i.category === prog.category).slice(0, 6);
              if (progItems.length === 0) return null;
              return (
                <div key={prog.category}>
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <h3 className="font-heading text-xl font-extrabold text-[#0B3025]">
                        {isGujarati ? prog.titleGu : prog.title}
                      </h3>
                      <p className="text-gray-500 text-sm mt-0.5">{prog.desc}</p>
                    </div>
                    <Link
                      href={prog.link}
                      className="shrink-0 ml-4 inline-flex items-center gap-1 text-[#0B3025] hover:text-[#F47B2A] font-bold text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#F47B2A] rounded"
                    >
                      Explore {prog.title} →
                    </Link>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {progItems.map((item) => (
                      <GalleryCard key={item.id} item={item} size="small" onClick={() => { setSelectedCategory(prog.category); setActiveItem(item); }} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 7. VIDEO SECTION ─────────────────────────────────────────────── */}
      <section className="py-16 bg-[#061F17]" aria-labelledby="video-section-heading">
        <div className="container-wide section-padding text-center space-y-6">
          <span className="text-[#F47B2A] font-bold text-xs uppercase tracking-widest">
            {isGujarati ? "વિડિઓ" : "Video"}
          </span>
          <h2 id="video-section-heading" className="font-heading text-3xl font-extrabold text-white">
            {isGujarati ? "Swadeep ને ક્રિયામાં જુઓ" : "See Swadeep in Action"}
          </h2>
          <p className="text-cream/70 max-w-xl mx-auto text-sm">
            {isGujarati
              ? "ક્ષેત્ર ફૂટેજ, ઈન્ટરવ્યૂ અને સ્ટોરી — YouTube ચૅનલ"
              : "Watch field footage, community stories, and program highlights on our YouTube channel."}
          </p>
          {/* Thumbnail placeholder */}
          <div className="relative max-w-2xl mx-auto rounded-2xl overflow-hidden aspect-video bg-[#0B3025] shadow-xl border border-white/10 group">
            <Image
              src="/img/Education/Swadeep-Shikshan-Vikas-Sanstha-Education-3-700x525.jpg"
              alt="Watch Swadeep videos on YouTube"
              fill
              className="object-cover opacity-60 group-hover:opacity-80 transition-opacity"
              sizes="(max-width: 768px) 100vw, 672px"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-[#F47B2A]/90 hover:bg-[#F47B2A] flex items-center justify-center shadow-xl transition-all group-hover:scale-110">
                <PlayIcon className="w-8 h-8 text-white ml-1" />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/videos"
              className="inline-flex items-center gap-2 bg-[#F47B2A] hover:bg-[#E06A1B] text-white font-bold px-7 py-3 rounded-full text-sm transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-[#F47B2A]"
            >
              <YoutubeIcon size={18} />
              <span>{isGujarati ? "બધા ૧૨ વિડીયો જુઓ →" : "Watch All 12 Activity Videos →"}</span>
            </Link>
            <Link
              href="/publications"
              className="inline-flex items-center gap-2 border border-white/30 hover:bg-white/10 text-white font-bold px-6 py-3 rounded-full text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#F47B2A]"
            >
              <BookOpenIcon size={16} />
              <span>{isGujarati ? "શૈક્ષણિક સાહિત્ય જુઓ →" : "Explore Field Publications →"}</span>
            </Link>
            <Link
              href="/resources"
              className="inline-flex items-center gap-2 border border-white/30 hover:bg-white/10 text-white font-bold px-6 py-3 rounded-full text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#F47B2A]"
            >
              <ReceiptTextIcon size={16} />
              <span>{isGujarati ? "ઓડિટ અહેવાલો →" : "Statutory Reports →"}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 8. DONATION CTA ──────────────────────────────────────────────── */}
      <section className="py-16 bg-[#F47B2A]" aria-labelledby="gallery-cta-heading">
        <div className="container-wide section-padding text-center space-y-6">
          <h2 id="gallery-cta-heading" className="font-heading text-3xl sm:text-4xl font-extrabold text-white">
            {isGujarati ? "વધુ ફેરફાર કરવામાં મદદ કરો" : "Help Us Create More Impact"}
          </h2>
          <p className="text-white/90 max-w-xl mx-auto leading-relaxed">
            {isGujarati
              ? "ગ્રામ ઉત્થાન, શિક્ષણ અને આજીવિકા — Swadeep ના કાર્ય સ્તંભ. આ ફોટો પ્રત્યેક ફ્રૅમ પાછળ, જ્ઞાન, ઉદ્ભવ ક્ષણ"
              : "Every photograph behind this gallery represents real lives transformed. Your donation helps Swadeep continue this vital work across Gujarat."}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/donate"
              className="inline-flex items-center gap-2 bg-white text-[#F47B2A] hover:bg-[#FFF5ED] font-extrabold px-8 py-3.5 rounded-full text-base transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-white"
            >
              Donate Now →
            </Link>
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 border-2 border-white text-white hover:bg-white/10 font-bold px-8 py-3.5 rounded-full text-base transition-colors focus:outline-none focus:ring-2 focus:ring-white"
            >
              Explore Our Programs
            </Link>
          </div>
        </div>
      </section>

      {/* ── LIGHTBOX ─────────────────────────────────────────────────────── */}
      {activeItem && (
        <Lightbox
          item={activeItem}
          items={filteredItems}
          onClose={() => setActiveItem(null)}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </main>
  );
}
