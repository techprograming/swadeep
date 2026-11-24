"use client";

import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import MediaSubNav from "@/components/ui/MediaSubNav";
import {
  SearchIcon,
  BookOpenIcon,
  YoutubeIcon,
  CameraIcon,
  HeartIcon,
  GraduationCapIcon,
  HeartPulseIcon,
  BriefcaseIcon,
  BuildingIcon,
  ShieldCheckIcon,
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

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

// ─── Program exploration sections (compact links, zero repeated photos) ──────
const PROGRAM_EXPLORATION = [
  {
    category: "Education" as GalleryCategory,
    titleEn: "Education",
    titleGu: "શિક્ષણ",
    slug: "education",
    descEn: "Supporting primary schooling, pre-primary ICDS centres, and learning aids across 200+ villages.",
    descGu: "૨૦૦+ ગામોમાં પ્રાથમિક શિક્ષણ, પૂર્વ-પ્રાથમિક આંગણવાડી કેન્દ્રો અને શિષ્યવૃત્તિ સહાય.",
    icon: GraduationCapIcon,
  },
  {
    category: "Health" as GalleryCategory,
    titleEn: "Health & Wellness",
    titleGu: "આરોગ્ય અને સુખાકારી",
    slug: "health",
    descEn: "School dental care, vision screenings, diagnostic health camps, and maternal nutrition drives.",
    descGu: "શાળા ડેન્ટલ કેમ્પ, આંખ તપાસ, રોગનિદાન શિબિર અને માતા-બાળ સ્વાસ્થ્ય કાર્યક્રમો.",
    icon: HeartPulseIcon,
  },
  {
    category: "Livelihood" as GalleryCategory,
    titleEn: "Coastal Livelihoods",
    titleGu: "દરિયાકાંઠા આજીવિકા",
    slug: "livelihood",
    descEn: "Empowering traditional fishing families with insulated ice boxes, solar equipment, and market access.",
    descGu: "પરંપરાગત માછીમારોને ઇન્સ્યુલેટેડ આઇસ બોક્સ, સુરક્ષા કીટ અને બજાર જોડાણ સહાય.",
    icon: BriefcaseIcon,
  },
  {
    category: "Infrastructure" as GalleryCategory,
    titleEn: "Rural Infrastructure",
    titleGu: "ગ્રામીણ માળખા",
    slug: "infrastructure",
    descEn: "Solar street lights, drinking water solutions, and BaLA school building improvements in 40+ villages.",
    descGu: "સોલાર લાઇટ્સ, પીવાના પાણીની સુવિધા અને ૪૦+ ગામોમાં શાળા બિલ્ડિંગ રિનોવેશન.",
    icon: BuildingIcon,
  },
  {
    category: "Relief" as GalleryCategory,
    titleEn: "Disaster",
    titleGu: "આપત્તિ રાહત",
    slug: "disaster",
    descEn: "Rapid emergency relief kits, flood rescue support, and rebuilding assistance for vulnerable rural families.",
    descGu: "ચક્રવાત, પૂર અને કટોકટીમાં તાત્કાલિક રાશન કીટ, પુનર્વસન અને રાહત કાર્ય.",
    icon: ShieldCheckIcon,
  },
];

const PAGE_SIZE = 18;

// ─── Professional Lightbox ───────────────────────────────────────────────────
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
        {/* Main Photograph Canvas — Uncropped full view with object-contain */}
        <div className="relative w-full lg:w-3/5 xl:w-2/3 min-h-[300px] sm:min-h-[420px] lg:min-h-[580px] bg-black/80 flex items-center justify-center p-2 sm:p-4 shrink-0">
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

          {/* Close button (top right of photo) */}
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

        {/* Editorial Metadata Sidebar */}
        <div className="flex flex-col p-5 sm:p-6 lg:p-8 bg-white text-charcoal overflow-y-auto lg:w-2/5 xl:w-1/3 justify-between">
          <div className="space-y-4">
            <div>
              <span className="text-[#F47B2A] text-xs font-bold uppercase tracking-wider block mb-1">
                {categoryLabel}
              </span>
              <h3
                id="lightbox-title"
                className="font-heading font-extrabold text-lg sm:text-xl text-[#0B3025] leading-snug"
              >
                {displayTitle}
              </h3>
              {isGujarati && item.title && item.title !== item.titleGu && (
                <p className="text-xs text-charcoal/60 font-body mt-0.5">{item.title}</p>
              )}
            </div>

            {/* Description */}
            <p className="font-body text-charcoal/80 text-xs sm:text-sm leading-relaxed">
              {item.description}
            </p>

            {/* Field Metadata items */}
            <div className="pt-3 border-t border-neutral-100 space-y-2 text-xs text-charcoal/70">
              <div className="flex items-center gap-2">
                <PinIcon className="w-4 h-4 text-[#F47B2A] shrink-0" />
                <span className="font-medium">{item.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-[#F47B2A] shrink-0" />
                <span className="font-medium">{item.date}</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-800 font-medium pt-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                <span>{isGujarati ? "સત્તાવાર ક્ષેત્રીય ફોટોગ્રાફી" : "Official Field Photography"}</span>
              </div>
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
              {isGujarati ? "ગેલેરી પર પાછા જાઓ (Esc)" : "Back to Gallery (Esc)"}
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
      aria-label={`View full photograph: ${displayTitle}`}
    >
      <Image
        src={item.image}
        alt={displayTitle}
        fill
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
        loading="lazy"
      />

      {/* Elegant dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/5 opacity-40 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Category pill on top-left */}
      <span className="absolute top-3 left-3 bg-[#0B3025]/85 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-white/15 shadow-sm">
        {categoryLabel}
      </span>

      {/* Center Zoom indicator on hover */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-white transform scale-90 group-hover:scale-100 transition-transform duration-300 shadow-lg">
          <CameraIcon size={22} className="text-white" />
        </div>
      </div>

      {/* Bottom Editorial Caption */}
      <div className="absolute bottom-0 left-0 right-0 p-3.5 sm:p-4 space-y-1">
        <p className="font-heading font-bold text-white text-xs sm:text-sm leading-snug line-clamp-2 drop-shadow-sm">
          {displayTitle}
        </p>
        <div className="flex items-center justify-between text-[11px] text-white/80">
          <span className="flex items-center gap-1 font-medium">
            <PinIcon className="w-3 h-3 text-[#F47B2A] shrink-0" />
            <span className="truncate max-w-[140px] sm:max-w-[180px]">{item.location}</span>
          </span>
          <span className="font-mono text-[10px] text-white/70">{item.date}</span>
        </div>
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

  // Reset limit when filter or search changes
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

  // Prev / Next Lightbox navigation
  const handleNext = useCallback(() => {
    if (!activeItem) return;
    const idx = filteredItems.findIndex((i) => i.id === activeItem.id);
    if (idx !== -1) {
      setActiveItem(filteredItems[(idx + 1) % filteredItems.length]);
    }
  }, [activeItem, filteredItems]);

  const handlePrev = useCallback(() => {
    if (!activeItem) return;
    const idx = filteredItems.findIndex((i) => i.id === activeItem.id);
    if (idx !== -1) {
      setActiveItem(filteredItems[(idx - 1 + filteredItems.length) % filteredItems.length]);
    }
  }, [activeItem, filteredItems]);

  // Smooth scroll to gallery grid
  const scrollToGallery = () => {
    document.getElementById("gallery-grid")?.scrollIntoView({ behavior: "smooth" });
  };

  // Quick program filter handler
  const handleFilterByProgram = (cat: GalleryCategory) => {
    setSelectedCategory(cat);
    scrollToGallery();
  };

  return (
    <main id="main-content" className="flex-1 bg-cream min-h-screen">
      {/* ════════════════════════════════════
          1. COMPACT EDITORIAL HERO
      ════════════════════════════════════ */}
      <section
        aria-labelledby="gallery-hero-heading"
        className="relative pt-24 sm:pt-28 pb-12 sm:pb-16 bg-[#0B3025] text-white overflow-hidden"
      >
        {/* Background authentic photograph with editorial gradient overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <Image
            src="/img/Education/Swadeep-Shikshan-Vikas-Sanstha-Education-1-700x525.jpg"
            alt="Swadeep Shikshan Vikas Sanstha on-ground education work"
            fill
            className="object-cover opacity-20"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#061F17]/95 via-[#0B3025]/85 to-[#061F17]/95" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container-wide section-padding max-w-6xl mx-auto space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#F47B2A]/15 border border-[#F47B2A]/30 text-[#F47B2A]">
              <CameraIcon size={14} />
              <span>{isGujarati ? "અધિકૃત ક્ષેત્રીય દસ્તાવેજીકરણ" : "Authentic Field Documentation"}</span>
            </span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/80 text-xs font-semibold font-mono">
              {GALLERY_ITEMS.length} {isGujarati ? "ક્ષેત્રીય તસ્વીરો" : "Field Photographs"}
            </span>
          </div>

          <div className="space-y-2 max-w-3xl">
            <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#F47B2A]">
              {isGujarati
                ? "સ્વદીપ શિક્ષણ વિકાસ સંસ્થા — ફોટો ગેલેરી"
                : "Swadeep Shikshan Vikas Sanstha — Photo Gallery"}
            </p>
            <h1
              id="gallery-hero-heading"
              className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight"
            >
              {isGujarati ? "ક્ષેત્ર કાર્ય — જીવંત સ્મૃતિઓ" : "Our Work in Action"}
            </h1>
            <p className="text-sm sm:text-base text-white/85 font-body leading-relaxed max-w-2xl">
              {isGujarati
                ? "ગુજરાતના ૨૦૦+ ગામોમાં શિક્ષણ, આરોગ્ય, આજીવિકા, ગ્રામ વિકાસ અને આપત્તિ રાહતના ક્ષેત્રીય કાર્યની અસ્સલ તસ્વીરો."
                : "Real moments captured from Swadeep's grassroots programs across 200+ villages in Gujarat — education, community health, coastal livelihoods, rural infrastructure, and emergency relief."}
            </p>
          </div>

          {/* Quick Hero Actions */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={scrollToGallery}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F47B2A] hover:bg-[#E06A1B] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all"
            >
              <span>{isGujarati ? "તસ્વીરો જુઓ ↓" : "Browse Photo Archive ↓"}</span>
            </button>
            <Link
              href="/videos"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold border border-white/20 transition-all"
            >
              <YoutubeIcon size={15} />
              <span>{isGujarati ? "૧૨ વિડીયો જુઓ →" : "Watch Videos →"}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Shared Media Sub-Navigation */}
      <MediaSubNav activeTab="gallery" />

      {/* ════════════════════════════════════
          3. CATEGORY FILTERS & SEARCH TOOLBAR
      ════════════════════════════════════ */}
      <div className="container-wide section-padding max-w-6xl mx-auto space-y-8 sm:space-y-10 mt-8 sm:mt-10">
        <section id="gallery-grid" className="scroll-mt-32 space-y-4" aria-label="Photo Archive Filters">
          {/* Section heading */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <div>
              <span className="text-[#F47B2A] font-bold text-xs uppercase tracking-widest block mb-1">
                {isGujarati ? "ફોટો ગ્રંથ" : "Photo Archive"}
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#0B3025]">
                {isGujarati ? "ચિત્ર ગ્રંથ — કાર્યક્ષેત્ર મુજબ" : "Browse by Program Area"}
              </h2>
            </div>
            <div className="text-xs text-charcoal/70 font-medium">
              <span>{isGujarati ? "દર્શાવેલ: " : "Showing: "}</span>
              <strong className="text-[#0B3025] font-bold">{filteredItems.length}</strong>
              <span> of {GALLERY_ITEMS.length} {isGujarati ? "તસ્વીરો" : "photos"}</span>
            </div>
          </div>

          {/* Search bar & Category Toolbar */}
          <div className="bg-white p-4 rounded-2xl border border-forest/10 shadow-xs space-y-3">
            {/* Search input */}
            <div className="relative">
              <SearchIcon
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal/40"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  isGujarati
                    ? "ફોટો, સ્થળ અથવા કાર્યક્રમ શોધો (દા.ત. Mundra, BaLA)..."
                    : "Search photos by title, location or tag (e.g. Mundra, BaLA)..."
                }
                className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-cream/40 border border-forest/15 text-xs sm:text-sm text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:ring-2 focus:ring-[#F47B2A]/40 focus:border-[#F47B2A] transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal/50 hover:text-charcoal text-xs"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
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
                    className={`snap-start shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                      isActive
                        ? "bg-[#0B3025] text-white shadow-sm"
                        : "bg-neutral-100 text-charcoal/70 hover:bg-neutral-200"
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
                  {isGujarati ? "ફિલ્ટર્સ સાફ કરો" : "Clear Filters"}
                </button>
              )}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════
            4. EDITORIAL PHOTO GRID
        ════════════════════════════════════ */}
        <section aria-label="Editorial Photo Gallery">
          {displayedItems.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-neutral-300 p-8 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto">
                <CameraIcon size={24} />
              </div>
              <h3 className="font-heading font-bold text-base text-[#0B3025]">
                {isGujarati ? "કોઈ ફોટો મળ્યો નથી" : "No Photos Found"}
              </h3>
              <p className="text-xs text-charcoal/70 max-w-sm mx-auto">
                {isGujarati
                  ? "પસંદ કરેલી શ્રેણી અથવા શોધ માટે કોઈ તસ્વીર ઉપલબ્ધ નથી."
                  : "No photographs match your search or filter criteria. Try resetting the filters."}
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="px-4 py-2 rounded-xl bg-[#0B3025] hover:bg-[#174B38] text-white text-xs font-bold transition-all shadow-sm"
              >
                {isGujarati ? "બધા ફોટો બતાવો" : "Show All Photos"}
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

              {/* Load More Button & Progress */}
              {hasMore && (
                <div className="text-center pt-10 sm:pt-12 space-y-3">
                  <p className="text-xs text-charcoal/60 font-medium">
                    {isGujarati
                      ? `${filteredItems.length} માંથી ${displayedItems.length} તસ્વીરો દર્શાવેલ છે`
                      : `Showing ${displayedItems.length} of ${filteredItems.length} photographs`}
                  </p>
                  <button
                    type="button"
                    onClick={() => setDisplayLimit((prev) => prev + PAGE_SIZE)}
                    className="inline-flex items-center gap-2 bg-[#0B3025] hover:bg-[#174B38] text-white font-bold px-8 py-3 rounded-full text-xs sm:text-sm transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#F47B2A]"
                  >
                    <span>{isGujarati ? "વધુ ફોટો જુઓ (Load More)" : "Load More Photos"}</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              )}

              {!hasMore && filteredItems.length > 0 && (
                <p className="text-center text-xs text-charcoal/60 font-medium pt-8">
                  {isGujarati
                    ? `તમે તમામ ${filteredItems.length} તસ્વીરો જોઈ લીધી છે.`
                    : `You have viewed all ${filteredItems.length} photographs.`}
                </p>
              )}
            </>
          )}
        </section>

        {/* ════════════════════════════════════
            5. PROGRAM EXPLORATION SECTION
            (Compact navigation — zero repeated photos)
        ════════════════════════════════════ */}
        <section aria-labelledby="program-exploration-heading" className="space-y-6 pt-4">
          <div className="text-center space-y-1">
            <span className="text-[#F47B2A] font-bold text-xs uppercase tracking-widest">
              {isGujarati ? "કાર્યક્ષેત્ર મુજબ અન્વેષણ" : "Explore by Program Area"}
            </span>
            <h2
              id="program-exploration-heading"
              className="font-heading text-2xl sm:text-3xl font-extrabold text-[#0B3025]"
            >
              {isGujarati ? "મુખ્ય કાર્યક્ષેત્રો અને કાર્યક્રમો" : "Discover Our Core Program Pillars"}
            </h2>
            <p className="text-xs sm:text-sm text-charcoal/70 max-w-xl mx-auto">
              {isGujarati
                ? "કાર્યક્રમ મુજબ ફોટો ફિલ્ટર કરો અથવા સમગ્ર કાર્યક્રમની વિગતો વાંચો."
                : "Filter gallery photos directly or explore in-depth program documentation and verified reports."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROGRAM_EXPLORATION.map((prog) => {
              const count = GALLERY_ITEMS.filter((i) => i.category === prog.category).length;
              const IconComponent = prog.icon;
              return (
                <div
                  key={prog.category}
                  className="bg-white rounded-2xl border border-forest/10 p-5 sm:p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-xl bg-[#0B3025]/5 border border-forest/10 text-[#0B3025] flex items-center justify-center">
                        <IconComponent size={24} className="text-[#0B3025]" />
                      </div>
                      <span className="bg-[#0B3025]/5 text-[#0B3025] text-xs font-mono font-bold px-2.5 py-1 rounded-full border border-forest/10">
                        {count} {isGujarati ? "તસ્વીરો" : "Photos"}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-heading font-bold text-base text-[#0B3025]">
                        {isGujarati ? prog.titleGu : prog.titleEn}
                      </h3>
                      <p className="text-xs text-charcoal/70 mt-1 leading-relaxed">
                        {isGujarati ? prog.descGu : prog.descEn}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-3 border-t border-neutral-100">
                    <button
                      type="button"
                      onClick={() => handleFilterByProgram(prog.category)}
                      className="flex-1 py-2 px-3 rounded-xl bg-cream hover:bg-forest-50 text-[#0B3025] border border-forest/15 text-xs font-bold transition-all text-center"
                    >
                      {isGujarati ? `ફોટો જુઓ (${count})` : `Filter Photos (${count})`}
                    </button>
                    <Link
                      href={`/programs/${prog.slug}`}
                      className="flex-1 py-2 px-3 rounded-xl bg-[#0B3025] hover:bg-[#174B38] text-white text-xs font-bold transition-all text-center shadow-xs"
                    >
                      {isGujarati ? "વિગતવાર →" : "Program Details →"}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ════════════════════════════════════
            6. VIDEO SPOTLIGHT SECTION
        ════════════════════════════════════ */}
        <section
          aria-labelledby="video-spotlight-heading"
          className="rounded-3xl bg-[#0B3025] text-white p-6 sm:p-8 md:p-10 shadow-lg border border-white/10"
        >
          <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8">
            {/* Video preview thumbnail with play button */}
            <div className="relative w-full md:w-1/2 rounded-2xl overflow-hidden aspect-video bg-black/60 shadow-md group shrink-0">
              <Image
                src="/img/Education/Swadeep-Shikshan-Vikas-Sanstha-Education-3-700x525.jpg"
                alt="Watch Swadeep videos on YouTube"
                fill
                className="object-cover opacity-75 group-hover:opacity-90 transition-opacity"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <Link
                href="/videos"
                className="absolute inset-0 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#F47B2A]"
                aria-label={isGujarati ? "૧૨ સત્તાવાર વિડીયો જુઓ" : "Watch all 12 activity videos on YouTube"}
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#F47B2A] hover:bg-[#E06A1B] flex items-center justify-center shadow-2xl transition-all group-hover:scale-110">
                  <PlayIcon className="w-7 h-7 sm:w-8 sm:h-8 text-white ml-1" />
                </div>
              </Link>
            </div>

            {/* Content & Links */}
            <div className="w-full md:w-1/2 space-y-4 text-left">
              <div className="space-y-1">
                <span className="text-[#F47B2A] font-bold text-xs uppercase tracking-wider">
                  {isGujarati ? "વિડીયો આર્કાઇવ" : "Video Archive"}
                </span>
                <h3 id="video-spotlight-heading" className="font-heading text-xl sm:text-2xl font-bold text-white">
                  {isGujarati ? "સ્વદીપને પ્રવૃત્તિમાં જુઓ" : "See Swadeep in Action"}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-body">
                {isGujarati
                  ? "શિક્ષણ વર્ગો, આરોગ્ય શિબિરો અને આજીવિકા વિતરણના ૧૨ સત્તાવાર કાર્યક્રમ વિડીયો YouTube પર જુઓ."
                  : "Watch community stories, school transformations, and livelihood distributions across Gujarat on our verified YouTube playlist."}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Link
                  href="/videos"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F47B2A] hover:bg-[#E06A1B] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all"
                >
                  <YoutubeIcon size={16} />
                  <span>{isGujarati ? "બધા ૧૨ વિડીયો જુઓ →" : "Watch All 12 Activity Videos →"}</span>
                </Link>
                <Link
                  href="/publications"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold border border-white/20 transition-all"
                >
                  <BookOpenIcon size={15} />
                  <span>{isGujarati ? "શૈક્ષણિક પ્રકાશનો" : "Field Publications"}</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════
            7. FINAL DONATION & PROGRAM CTA
        ════════════════════════════════════ */}
        <section
          aria-labelledby="gallery-cta-heading"
          className="rounded-3xl bg-gradient-to-r from-[#F47B2A] to-[#E06A1B] text-white p-8 sm:p-10 text-center space-y-5 shadow-lg"
        >
          <div className="max-w-2xl mx-auto space-y-2">
            <h2
              id="gallery-cta-heading"
              className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-white"
            >
              {isGujarati ? "વધુ ફેરફાર કરવામાં મદદ કરો" : "Help Us Create More Impact"}
            </h2>
            <p className="text-white/90 text-xs sm:text-sm leading-relaxed">
              {isGujarati
                ? "આ ગેલેરીની દરેક તસ્વીર ગ્રામીણ ગુજરાતમાં પરિવર્તિત થયેલા વાસ્તવિક જીવનનું પ્રતિબિંબ છે. તમારું દાન આ કાર્ય ચાલુ રાખવામાં મદદ કરે છે."
                : "Every photograph behind this gallery represents real lives transformed across 200+ villages. Your support empowers children, women, and fishing communities in rural Gujarat."}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 justify-center pt-2">
            <Link
              href="/donate"
              className="inline-flex items-center gap-2 bg-white text-[#0B3025] hover:bg-cream font-extrabold px-7 py-3 rounded-full text-xs sm:text-sm transition-all shadow-md hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white"
            >
              <HeartIcon size={16} className="text-[#F47B2A]" />
              <span>{isGujarati ? "દાન આપો (Donate Now) →" : "Donate Now →"}</span>
            </Link>
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 border-2 border-white/80 text-white hover:bg-white/10 font-bold px-7 py-3 rounded-full text-xs sm:text-sm transition-all focus:outline-none focus:ring-2 focus:ring-white"
            >
              <span>{isGujarati ? "બધા ૫ કાર્યક્રમો જુઓ" : "Explore All 5 Programs"}</span>
            </Link>
          </div>
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
