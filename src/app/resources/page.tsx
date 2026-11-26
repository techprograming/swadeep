"use client";

import React, { useEffect, useMemo, useState, useCallback, useRef } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import {
  BookOpenIcon,
  DownloadIcon,
  ExternalLinkIcon,
  ShieldCheckIcon,
  CameraIcon,
  YoutubeIcon,
  ReceiptTextIcon,
} from "@/components/ui/Icons";
import DocumentPreviewModal, { PreviewDocument } from "@/components/ui/DocumentPreviewModal";
import MediaSubNav from "@/components/ui/MediaSubNav";
import {
  OFFICIAL_BROCHURE,
  VERIFIED_REPORTS,
} from "@/lib/reportsData";

/* ─── Category Configuration & Styling ─── */
const CATEGORY_CONFIG = {
  "Annual Report": {
    key: "Annual Report",
    labelEn: "Annual Reports",
    
    subtitleEn: "13 Published Editions (2012–2025)",
    
    descEn: "Comprehensive yearly activity and impact reports documenting Swadeep's grassroots interventions across 200+ villages.",
    
    badgeClass: "bg-emerald-100 text-emerald-800 border-emerald-300",
    pillClass: "border-emerald-500/30 text-emerald-700 bg-emerald-50",
    coverGradient: "from-[#0d4533] via-[#0B3025] to-[#062018]",
    spineColor: "#052219",
    accentColor: "#34d399",
    borderAccent: "border-emerald-500/25",
    iconBg: "bg-emerald-600",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
  "Audit Report": {
    key: "Audit Report",
    labelEn: "Audit Reports",
    
    subtitleEn: "9 Verified Statements (2015–2024)",
    
    descEn: "Independent chartered accountant balance sheets, income statements, and statutory financial disclosures.",
    
    badgeClass: "bg-blue-100 text-blue-800 border-blue-300",
    pillClass: "border-blue-500/30 text-blue-700 bg-blue-50",
    coverGradient: "from-[#103a60] via-[#0c2c4d] to-[#071d34]",
    spineColor: "#061a2e",
    accentColor: "#60a5fa",
    borderAccent: "border-blue-500/25",
    iconBg: "bg-blue-600",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
      </svg>
    ),
  },
  "FC Accounts": {
    key: "FC Accounts",
    labelEn: "FCRA Accounts",
    
    subtitleEn: "10 Annual Submissions (2015–2024)",
    
    descEn: "Foreign Contribution Regulation Act returns and dedicated foreign contribution bank statements filed with MHA.",
    
    badgeClass: "bg-purple-100 text-purple-800 border-purple-300",
    pillClass: "border-purple-500/30 text-purple-700 bg-purple-50",
    coverGradient: "from-[#3b1d5a] via-[#2d1445] to-[#1c0c2c]",
    spineColor: "#170825",
    accentColor: "#c084fc",
    borderAccent: "border-purple-500/25",
    iconBg: "bg-purple-600",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
} as const;

type CategoryKey = keyof typeof CATEGORY_CONFIG;

/* ─── Realistic Tactile Publication Cover Card ─── */
function EditorialDocumentCard({
  document: doc,
  onPreview,
  isGujarati,
}: {
  document: PreviewDocument;
  onPreview: (doc: PreviewDocument) => void;
  isGujarati: boolean;
}) {
  const displayTitle = doc.title;
  const config = CATEGORY_CONFIG[doc.category as CategoryKey];

  return (
    <div className="group relative flex flex-col bg-white rounded-2xl border border-neutral-200/90 shadow-xs hover:shadow-xl hover:border-neutral-300 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      {/* ── Document Cover Visual (Tactile Publication Aesthetic) ── */}
      <div
        className={`relative h-48 sm:h-52 bg-gradient-to-br ${config?.coverGradient || "from-neutral-800 to-neutral-950"} p-5 flex flex-col justify-between overflow-hidden select-none border-b border-black/10`}
      >
        {/* Realistic Book Spine Effect on Left */}
        <div
          className="absolute left-0 top-0 bottom-0 w-3 shadow-r-md z-10 opacity-75"
          style={{ backgroundColor: config?.spineColor || "#111" }}
        />
        <div className="absolute left-3 top-0 bottom-0 w-[1px] bg-white/15 z-10" />

        {/* Paper page layers on right edge */}
        <div className="absolute right-0 top-3 bottom-3 w-1.5 flex flex-col justify-between">
          <div className="w-full h-full bg-cream/90 rounded-r-xs shadow-xs" />
        </div>

        {/* Subtle geometric watermark */}
        <div className="absolute -right-8 -bottom-8 w-36 h-36 rounded-full border border-white/[0.07] pointer-events-none" />
        <div className="absolute -right-4 -bottom-4 w-28 h-28 rounded-full border border-white/[0.06] pointer-events-none" />

        {/* Top Header of the Cover */}
        <div className="relative pl-3 flex items-start justify-between z-10">
          <div className="space-y-0.5">
            <span className="text-[10px] uppercase font-mono tracking-wider text-white/60 font-semibold block">
              SWADEEP TRUST ARCHIVE
            </span>
            <span
              className="text-[11px] font-bold uppercase tracking-wider block"
              style={{ color: config?.accentColor || "#F47B2A" }}
            >
              {doc.category}
            </span>
          </div>

          <span className="px-2 py-0.5 rounded bg-red-600 text-white font-mono text-[10px] font-bold uppercase tracking-wider shadow-xs">
            PDF
          </span>
        </div>

        {/* Center: Fiscal Year Prominently Embossed */}
        <div className="relative pl-3 my-auto z-10 text-center py-2">
          <div className="text-white font-heading font-extrabold text-2xl sm:text-3xl tracking-tight drop-shadow-sm">
            {doc.year || "Report"}
          </div>
          <div className="text-[11px] text-white/70 font-mono tracking-wide mt-0.5">
            {doc.size || "Verified Document"}
          </div>
        </div>

        {/* Bottom of the Cover: Trust Identification */}
        <div className="relative pl-3 flex items-center justify-between text-[10px] text-white/60 border-t border-white/10 pt-2 z-10 font-mono">
          <span className="truncate max-w-[170px]">SWADEEP SHIKSHAN VIKAS</span>
          <span className="text-emerald-400 font-bold flex items-center gap-1 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
            Verified
          </span>
        </div>

        {/* Hover Overlay with Quick Preview Action */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
          <button
            type="button"
            onClick={() => onPreview(doc)}
            className="px-4 py-2 rounded-full bg-white text-[#0B3025] hover:bg-[#F47B2A] hover:text-white text-xs font-bold shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-1.5"
          >
            <ExternalLinkIcon size={13} />
            <span>{"Quick Preview"}</span>
          </button>
        </div>
      </div>

      {/* ── Document Details & Action Bar ── */}
      <div className="flex flex-col flex-1 p-4 sm:p-5 justify-between space-y-3">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between gap-2 text-xs">
            <span
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                config?.badgeClass || "bg-neutral-100 text-neutral-700 border-neutral-200"
              }`}
            >
              {doc.category}
            </span>
            <span className="text-[11px] text-neutral-500 font-mono">{doc.year}</span>
          </div>

          <h3
            className="font-heading font-bold text-sm sm:text-base text-[#0B3025] leading-snug group-hover:text-[#F47B2A] transition-colors line-clamp-2"
            title={displayTitle}
          >
            {displayTitle}
          </h3>

          {doc.description && (
            <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed font-body">
              {doc.description}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="pt-2 border-t border-neutral-100 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => onPreview(doc)}
            className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-neutral-50 hover:bg-neutral-100 text-[#0B3025] border border-neutral-200 hover:border-neutral-300 text-xs font-semibold transition-all"
          >
            <ExternalLinkIcon size={12} />
            <span>{"Preview"}</span>
          </button>

          <a
            href={doc.fileUrl}
            download
            className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#0B3025] hover:bg-[#174B38] text-white text-xs font-semibold transition-all shadow-xs"
          >
            <DownloadIcon size={12} />
            <span>{"Download"}</span>
          </a>
        </div>
      </div>
    </div>
  );
}

/* ─── Interactive Report Row Slider ─── */
function ReportRowSlider({
  categoryKey,
  config,
  documents,
  onPreview,
  isGujarati,
}: {
  categoryKey: CategoryKey;
  config: (typeof CATEGORY_CONFIG)[CategoryKey];
  documents: PreviewDocument[];
  onPreview: (doc: PreviewDocument) => void;
  isGujarati: boolean;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  }, []);

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll, documents]);

  const slideLeft = () => {
    scrollRef.current?.scrollBy({ left: -340, behavior: "smooth" });
  };

  const slideRight = () => {
    scrollRef.current?.scrollBy({ left: 340, behavior: "smooth" });
  };

  if (documents.length === 0) return null;

  return (
    <section className="space-y-4 py-2" aria-label={config.labelEn}>
      {/* Row Header with Category Title, Count & Slide Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl ${config.iconBg} text-white flex items-center justify-center shadow-sm shrink-0`}>
            {config.icon}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-[#0B3025]">
                {config.labelEn}
              </h3>
              <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-full bg-neutral-100 text-[#0B3025] border border-neutral-200">
                {documents.length} {"Reports"}
              </span>
            </div>
            <p className="font-mono text-xs text-neutral-500 font-semibold hidden sm:block">
              {config.subtitleEn}
            </p>
          </div>
        </div>

        {/* Slide Controls (Prev / Next Buttons) */}
        <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
          <span className="text-[11px] font-mono text-neutral-400 mr-1 hidden md:inline">
            Slide to view
          </span>
          <button
            type="button"
            onClick={slideLeft}
            disabled={!canScrollLeft}
            className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-200 ${
              canScrollLeft
                ? "bg-white border-[#0B3025]/20 text-[#0B3025] hover:bg-[#0B3025] hover:text-white shadow-xs cursor-pointer"
                : "bg-neutral-100 border-neutral-200 text-neutral-300 cursor-not-allowed opacity-40"
            }`}
            aria-label={`Slide left ${config.labelEn}`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={slideRight}
            disabled={!canScrollRight}
            className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-200 ${
              canScrollRight
                ? "bg-white border-[#0B3025]/20 text-[#0B3025] hover:bg-[#0B3025] hover:text-white shadow-xs cursor-pointer"
                : "bg-neutral-100 border-neutral-200 text-neutral-300 cursor-not-allowed opacity-40"
            }`}
            aria-label={`Slide right ${config.labelEn}`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Horizontal Scroll / Slide Track with Slide Bar */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto scroll-smooth pb-4 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#CBD5E1 #F1F5F9",
        }}
      >
        {documents.map((doc) => (
          <div key={doc.id} className="w-[280px] sm:w-[320px] md:w-[340px] shrink-0 snap-start">
            <EditorialDocumentCard
              document={doc}
              onPreview={onPreview}
              isGujarati={isGujarati}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Main Resources Page Component ─── */
export default function ResourcesPage() {
  const { isGujarati } = useLanguage();
  // Static initialization guaranteeing instant 32 reports render without waiting for API
  const [reports, setReports] = useState<PreviewDocument[]>(VERIFIED_REPORTS);
  const [previewDoc, setPreviewDoc] = useState<PreviewDocument | null>(null);

  // Background revalidation
  useEffect(() => {
    let isMounted = true;
    async function revalidate() {
      try {
        const res = await fetch("/api/reports");
        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.reports) && data.reports.length > 0 && isMounted) {
            const mapped: PreviewDocument[] = data.reports.map((r: any) => ({
              id: r.id,
              title: r.title,
              
              category: r.category,
              
              year: r.year,
              size: r.size,
              fileUrl: r.fileUrl,
              description: r.description,
              
            }));
            setReports(mapped);
          }
        }
      } catch (err) {
        console.warn("API revalidation fallback to static reports:", err);
      }
    }
    revalidate();
    return () => {
      isMounted = false;
    };
  }, []);

  // Segment reports into the 3 main rows sorted newest first
  const annualReports = useMemo(() => {
    return reports
      .filter((d) => d.category === "Annual Report")
      .sort((a, b) => (b.year || "").localeCompare(a.year || "", undefined, { numeric: true }));
  }, [reports]);

  const auditReports = useMemo(() => {
    return reports
      .filter((d) => d.category === "Audit Report")
      .sort((a, b) => (b.year || "").localeCompare(a.year || "", undefined, { numeric: true }));
  }, [reports]);

  const fcraReports = useMemo(() => {
    return reports
      .filter((d) => d.category === "FC Accounts")
      .sort((a, b) => (b.year || "").localeCompare(a.year || "", undefined, { numeric: true }));
  }, [reports]);

  // Previous and Next document navigation for in-page modal
  const handleNextDoc = useCallback(() => {
    if (!previewDoc) return;
    const idx = reports.findIndex((d) => d.id === previewDoc.id);
    if (idx !== -1) {
      setPreviewDoc(reports[(idx + 1) % reports.length]);
    }
  }, [previewDoc, reports]);

  const handlePrevDoc = useCallback(() => {
    if (!previewDoc) return;
    const idx = reports.findIndex((d) => d.id === previewDoc.id);
    if (idx !== -1) {
      setPreviewDoc(reports[(idx - 1 + reports.length) % reports.length]);
    }
  }, [previewDoc, reports]);

  return (
    <main id="main-content" className="pt-32 sm:pt-36 lg:pt-40 pb-20 bg-cream min-h-screen">
      {/* ════════════════════════════════════
          1. COMPACT EDITORIAL HEADER
      ════════════════════════════════════ */}
      <section className="relative bg-[#0B3025] text-white overflow-hidden py-12 sm:py-16">
        {/* Subtle geometric pattern */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
          <div className="absolute -top-12 -right-12 w-96 h-96 rounded-full border-2 border-white" />
          <div className="absolute top-1/2 left-0 w-64 h-64 rounded-full border border-white" />
        </div>

        <div className="relative z-10 container-wide section-padding max-w-6xl mx-auto space-y-4">
          <div className="max-w-3xl space-y-2">
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white">
              Reports
            </h1>
            <p className="font-body text-xs sm:text-sm text-white/85 leading-relaxed max-w-2xl">
              {"Explore audited statutory annual reports, chartered accountant balance sheets, foreign contribution (FCRA) accounts, and brochure."}
            </p>
          </div>

          {/* Statutory Credentials */}
          <div className="flex flex-wrap items-center gap-2.5 pt-1 text-xs">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.08] border border-white/[0.12] text-white">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
              <span>Section 80G & 12A Certified</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.08] border border-white/[0.12] text-white">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
              <span>MHA FCRA Registered</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.08] border border-white/[0.12] text-white font-mono">
              <span>32 Verified Reports</span>
            </div>
          </div>
        </div>
      </section>

      {/* Shared Media Sub-Navigation */}
      <MediaSubNav activeTab="resources" />

      {/* ════════════════════════════════════
          MAIN CONTENT AREA
      ════════════════════════════════════ */}
      <div className="container-wide section-padding max-w-6xl mx-auto space-y-10 sm:space-y-14 mt-8 sm:mt-10">

        {/* ════════════════════════════════════
            3. FEATURED ORGANIZATION BROCHURE CARD
        ════════════════════════════════════ */}
        <section aria-label="Brochure">
          <div className="relative overflow-hidden rounded-2xl bg-white border border-neutral-200 shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="flex flex-col md:flex-row items-stretch">
              {/* Tactile Brochure Visual Cover */}
              <div className="md:w-72 lg:w-80 shrink-0 bg-gradient-to-br from-[#0B3025] via-[#174B38] to-[#123E2E] p-8 flex flex-col items-center justify-center text-center relative border-r border-black/10">
                {/* Book spine on left */}
                <div className="absolute left-0 top-0 bottom-0 w-3 bg-[#061F17] shadow-r-md" />
                <div className="absolute left-3 top-0 bottom-0 w-[1px] bg-white/15" />

                <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mb-3 border border-white/20 shadow-md">
                  <BookOpenIcon className="w-7 h-7 text-white" />
                </div>

                <span className="text-[#F47B2A] text-[11px] font-bold uppercase tracking-widest mb-1">
                  {"Brochure"}
                </span>

                <span className="text-white font-heading font-extrabold text-lg sm:text-xl leading-tight text-center">
                  Swadeep Profile
                </span>

                <span className="text-white/60 font-mono text-xs mt-2">
                  {OFFICIAL_BROCHURE.size} • Verified PDF
                </span>
              </div>

              {/* Brochure Content */}
              <div className="flex-1 p-6 sm:p-8 flex flex-col justify-center space-y-4">
                <div className="space-y-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#F47B2A]">
                    {"Institutional Presentation"}
                  </span>
                  <h2 className="font-heading text-lg sm:text-xl md:text-2xl font-extrabold text-[#0B3025] leading-snug">
                    {OFFICIAL_BROCHURE.title}
                  </h2>
                </div>

                <p className="font-body text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  {OFFICIAL_BROCHURE.description}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setPreviewDoc(OFFICIAL_BROCHURE)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0B3025] hover:bg-[#174B38] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all"
                  >
                    <ExternalLinkIcon size={14} />
                    <span>{"Read Brochure (Preview)"}</span>
                  </button>

                  <a
                    href={OFFICIAL_BROCHURE.fileUrl}
                    download
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#F47B2A] hover:bg-[#E06A1B] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all"
                  >
                    <DownloadIcon size={14} />
                    <span>{"Download PDF"}</span>
                  </a>

                  <span className="text-xs text-emerald-700 font-medium flex items-center gap-1.5 font-mono">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                    {"Verified Official Publication"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════
            4. MAIN 3 ROWS: ANNUAL REPORT, AUDIT REPORT, FCRA ACCOUNTS (WITH SLIDE BARS)
        ════════════════════════════════════ */}
        <section aria-label="Official Reports by Category" className="space-y-12 sm:space-y-14">
          <ReportRowSlider
            categoryKey="Annual Report"
            config={CATEGORY_CONFIG["Annual Report"]}
            documents={annualReports}
            onPreview={(d) => setPreviewDoc(d)}
            isGujarati={isGujarati}
          />

          <ReportRowSlider
            categoryKey="Audit Report"
            config={CATEGORY_CONFIG["Audit Report"]}
            documents={auditReports}
            onPreview={(d) => setPreviewDoc(d)}
            isGujarati={isGujarati}
          />

          <ReportRowSlider
            categoryKey="FC Accounts"
            config={CATEGORY_CONFIG["FC Accounts"]}
            documents={fcraReports}
            onPreview={(d) => setPreviewDoc(d)}
            isGujarati={isGujarati}
          />
        </section>

        {/* ════════════════════════════════════
            6. CROSS-MEDIA DISCOVERY BANNER
        ════════════════════════════════════ */}
        <section className="p-7 sm:p-9 rounded-2xl bg-[#0B3025] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg border border-white/10">
          <div className="space-y-2 max-w-lg">
            <span className="text-[11px] uppercase tracking-wider text-[#F47B2A] font-bold">
              {"Swadeep Digital Knowledge Center"}
            </span>
            <h3 className="font-heading text-lg sm:text-xl font-bold text-white">
              {"Looking for Publications, Photos or Videos?"}
            </h3>
            <p className="text-xs sm:text-sm text-white/75 leading-relaxed font-body">
              {"Explore illustrated children's storybooks, 86+ high-resolution field photographs, and 12 YouTube activity videos."}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <Link
              href="/publications"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#F47B2A] hover:bg-[#E06A1B] text-white text-xs font-bold shadow-md transition-all"
            >
              <BookOpenIcon size={14} />
              <span>{"Publications"}</span>
            </Link>
            <Link
              href="/gallery"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold border border-white/15 transition-all"
            >
              <CameraIcon size={14} />
              <span>{"Photo Gallery"}</span>
            </Link>
            <Link
              href="/videos"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold border border-white/15 transition-all"
            >
              <YoutubeIcon size={14} />
              <span>{"Video Gallery"}</span>
            </Link>
          </div>
        </section>
      </div>

      {/* ════════════════════════════════════
          IN-PAGE PDF PREVIEW MODAL
      ════════════════════════════════════ */}
      <DocumentPreviewModal
        document={previewDoc}
        isOpen={Boolean(previewDoc)}
        onClose={() => setPreviewDoc(null)}
        onPrev={handlePrevDoc}
        onNext={handleNextDoc}
        isGujarati={isGujarati}
      />
    </main>
  );
}
