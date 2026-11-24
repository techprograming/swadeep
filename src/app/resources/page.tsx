"use client";

import React, { useEffect, useMemo, useState, useCallback } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import {
  BookOpenIcon,
  DownloadIcon,
  ExternalLinkIcon,
  SearchIcon,
  ShieldCheckIcon,
  CameraIcon,
  YoutubeIcon,
  CalendarIcon,
} from "@/components/ui/Icons";
import DocumentPreviewModal, { PreviewDocument } from "@/components/ui/DocumentPreviewModal";
import MediaSubNav from "@/components/ui/MediaSubNav";
import {
  OFFICIAL_BROCHURE,
  VERIFIED_REPORTS,
} from "@/lib/reportsData";

/* ─── Category Config ─── */
const CATEGORY_CONFIG = {
  "Annual Report": {
    iconBg: "bg-emerald-600",
    cardBg: "bg-gradient-to-br from-emerald-50 to-emerald-100/60",
    border: "border-emerald-200",
    accent: "text-emerald-700",
    badge: "bg-emerald-100 text-emerald-800 border-emerald-200",
    coverBg: "from-emerald-700 via-emerald-800 to-emerald-900",
    coverAccent: "text-emerald-300",
    labelEn: "Annual Reports",
    labelGu: "વાર્ષિક અહેવાલો",
    descEn: "Comprehensive yearly activity and impact reports documenting Swadeep's grassroots programs.",
    descGu: "સ્વદીપના ક્ષેત્રીય કાર્યક્રમોની વિગતવાર વાર્ષિક પ્રવૃત્તિ અને પ્રભાવ અહેવાલો.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
  "Audit Report": {
    iconBg: "bg-blue-600",
    cardBg: "bg-gradient-to-br from-blue-50 to-blue-100/60",
    border: "border-blue-200",
    accent: "text-blue-700",
    badge: "bg-blue-100 text-blue-800 border-blue-200",
    coverBg: "from-blue-700 via-blue-800 to-blue-900",
    coverAccent: "text-blue-300",
    labelEn: "Audit Reports",
    labelGu: "ઓડિટ અહેવાલો",
    descEn: "Chartered accountant verified balance sheets and financial audit statements.",
    descGu: "ચાર્ટર્ડ એકાઉન્ટન્ટ દ્વારા ચકાસણી થયેલ બેલેન્સ શીટ અને નાણાકીય ઓડિટ.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
      </svg>
    ),
  },
  "FC Accounts": {
    iconBg: "bg-violet-600",
    cardBg: "bg-gradient-to-br from-violet-50 to-violet-100/60",
    border: "border-violet-200",
    accent: "text-violet-700",
    badge: "bg-violet-100 text-violet-800 border-violet-200",
    coverBg: "from-violet-700 via-violet-800 to-violet-900",
    coverAccent: "text-violet-300",
    labelEn: "FCRA Accounts",
    labelGu: "એફસીઆરએ હિસાબ",
    descEn: "Foreign Contribution Regulation Act accounts filed with the Ministry of Home Affairs.",
    descGu: "ગૃહ મંત્રાલય સમક્ષ દાખલ કરાયેલ વિદેશી અનુદાન નિયમન અધિનિયમ હિસાબ.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
} as const;

type CategoryKey = keyof typeof CATEGORY_CONFIG;

/* ─── Premium Document Card ─── */
function PremiumDocumentCard({
  document: doc,
  onPreview,
  isGujarati,
}: {
  document: PreviewDocument;
  onPreview: (doc: PreviewDocument) => void;
  isGujarati: boolean;
}) {
  const displayTitle = isGujarati && doc.titleGu ? doc.titleGu : doc.title;
  const config = CATEGORY_CONFIG[doc.category as CategoryKey];

  // Extract short year for the cover display
  const shortYear = doc.year || "";

  return (
    <div className="group relative flex flex-col bg-white rounded-2xl border border-neutral-200/80 shadow-sm hover:shadow-xl hover:border-neutral-300 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      {/* PDF Cover Placeholder — category color-coded visual */}
      <div className={`relative h-44 sm:h-48 bg-gradient-to-br ${config?.coverBg || "from-neutral-700 via-neutral-800 to-neutral-900"} flex flex-col items-center justify-center p-6 overflow-hidden`}>
        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-[0.07]">
          <div className="absolute top-4 left-4 w-16 h-16 border-2 border-white rounded-lg" />
          <div className="absolute top-6 left-6 w-16 h-16 border-2 border-white rounded-lg" />
          <div className="absolute bottom-4 right-4 w-24 h-1 bg-white rounded" />
          <div className="absolute bottom-8 right-4 w-16 h-1 bg-white rounded" />
          <div className="absolute bottom-12 right-4 w-20 h-1 bg-white rounded" />
        </div>

        {/* PDF icon */}
        <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center mb-3 border border-white/15">
          <svg className="w-6 h-6 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
        </div>

        {/* Year prominently displayed */}
        <span className="text-white/90 font-heading font-bold text-xl sm:text-2xl tracking-tight">
          {shortYear}
        </span>
        <span className={`text-xs font-medium mt-1 ${config?.coverAccent || "text-neutral-400"}`}>
          {isGujarati && doc.categoryGu ? doc.categoryGu : doc.category}
        </span>

        {/* Top-right PDF badge */}
        <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
          PDF
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <button
            type="button"
            onClick={() => onPreview(doc)}
            className="px-5 py-2.5 rounded-full bg-white text-[#0B3025] text-xs font-bold shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300"
          >
            <span className="flex items-center gap-1.5">
              <ExternalLinkIcon size={13} />
              {isGujarati ? "પ્રીવ્યૂ જુઓ" : "Quick Preview"}
            </span>
          </button>
        </div>
      </div>

      {/* Card Content */}
      <div className="flex flex-col flex-1 p-5 sm:p-6">
        {/* Category Badge & File Size */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${config?.badge || "bg-neutral-100 text-neutral-700 border-neutral-200"}`}>
            {isGujarati && doc.categoryGu ? doc.categoryGu : doc.category}
          </span>
          <span className="text-[11px] text-neutral-500 font-mono">
            {doc.size || "PDF"}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-heading font-bold text-sm sm:text-base text-[#0B3025] leading-snug mb-2 line-clamp-2 group-hover:text-[#F47B2A] transition-colors duration-200">
          {displayTitle}
        </h3>

        {/* Verified Status */}
        <div className="flex items-center gap-1.5 mb-4 mt-auto">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
          <span className="text-[11px] text-emerald-700 font-medium">
            {isGujarati ? "પ્રમાણિત સત્તાવાર દસ્તાવેજ" : "Verified Official Document"}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-3 border-t border-neutral-100">
          <button
            type="button"
            onClick={() => onPreview(doc)}
            className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-neutral-50 hover:bg-neutral-100 text-[#0B3025] border border-neutral-200 hover:border-neutral-300 text-xs font-semibold transition-all"
          >
            <ExternalLinkIcon size={12} />
            <span>{isGujarati ? "જુઓ" : "Preview"}</span>
          </button>
          <a
            href={doc.fileUrl}
            download
            className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#0B3025] hover:bg-[#174B38] text-white text-xs font-semibold transition-all shadow-sm"
          >
            <DownloadIcon size={12} />
            <span>{isGujarati ? "ડાઉનલોડ" : "Download"}</span>
          </a>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Page Component ─── */
export default function ResourcesPage() {
  const { isGujarati } = useLanguage();
  const [reports, setReports] = useState<PreviewDocument[]>(VERIFIED_REPORTS);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedYear, setSelectedYear] = useState<string>("All");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [previewDoc, setPreviewDoc] = useState<PreviewDocument | null>(null);

  // Background revalidation from API
  useEffect(() => {
    let isMounted = true;
    async function revalidateReports() {
      try {
        const res = await fetch("/api/reports");
        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.reports) && data.reports.length > 0 && isMounted) {
            const mapped: PreviewDocument[] = data.reports.map((r: any) => ({
              id: r.id,
              title: r.title,
              titleGu: r.titleGu,
              category: r.category,
              categoryGu:
                r.category === "Annual Report"
                  ? "વાર્ષિક અહેવાલ"
                  : r.category === "Audit Report"
                  ? "ઓડિટ અહેવાલ"
                  : r.category === "FC Accounts"
                  ? "એફસીઆરએ હિસાબ"
                  : r.category,
              year: r.year,
              size: r.size,
              fileUrl: r.fileUrl,
              description: r.description,
              descriptionGu: r.descriptionGu,
            }));
            setReports(mapped);
          }
        }
      } catch (err) {
        console.warn("Could not revalidate reports API:", err);
      }
    }
    revalidateReports();
    return () => { isMounted = false; };
  }, []);

  // Combine brochure with verified statutory reports
  const allResources: PreviewDocument[] = useMemo(() => {
    return [OFFICIAL_BROCHURE, ...reports];
  }, [reports]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: allResources.length };
    allResources.forEach((r) => {
      counts[r.category] = (counts[r.category] || 0) + 1;
    });
    return counts;
  }, [allResources]);

  // Available fiscal years sorted descending
  const availableYears = useMemo(() => {
    const yearSet = new Set<string>();
    reports.forEach((r) => {
      if (r.year && r.year.trim()) yearSet.add(r.year.trim());
    });
    return Array.from(yearSet).sort().reverse();
  }, [reports]);

  // Filtered and sorted collection (excluding brochure from grid — shown separately)
  const filteredResources = useMemo(() => {
    const list = reports.filter((item) => {
      const matchesCategory =
        activeCategory === "All" || item.category === activeCategory;
      const matchesYear =
        selectedYear === "All" || item.year === selectedYear;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        (item.titleGu && item.titleGu.toLowerCase().includes(q)) ||
        (item.year && item.year.toLowerCase().includes(q)) ||
        item.category.toLowerCase().includes(q) ||
        (item.description && item.description.toLowerCase().includes(q)) ||
        (item.descriptionGu && item.descriptionGu.toLowerCase().includes(q));

      return matchesCategory && matchesYear && matchesSearch;
    });

    return list.sort((a, b) => {
      const yearA = a.year || "";
      const yearB = b.year || "";
      return sortOrder === "newest"
        ? yearB.localeCompare(yearA, undefined, { numeric: true })
        : yearA.localeCompare(yearB, undefined, { numeric: true });
    });
  }, [reports, activeCategory, selectedYear, searchQuery, sortOrder]);

  const hasActiveFilters =
    activeCategory !== "All" || selectedYear !== "All" || searchQuery.trim().length > 0;

  const handleResetFilters = useCallback(() => {
    setActiveCategory("All");
    setSelectedYear("All");
    setSearchQuery("");
  }, []);

  const handleCategoryClick = useCallback((key: string) => {
    setActiveCategory(key);
    // Scroll to the documents grid
    const grid = document.getElementById("documents-grid");
    if (grid) {
      grid.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <main id="main-content" className="pt-24 sm:pt-28 pb-20 bg-cream min-h-screen">
      {/* ════════════════════════════════════
          1. COMPACT HERO SECTION
      ════════════════════════════════════ */}
      <section className="relative bg-[#0B3025] text-white overflow-hidden">
        {/* Subtle geometric background */}
        <div className="absolute inset-0 opacity-[0.04]">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-white -translate-x-1/4 translate-y-1/4" />
        </div>

        <div className="relative z-10 container-wide section-padding max-w-6xl mx-auto py-12 sm:py-16 space-y-5">
          {/* Badge row */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#F47B2A]/15 border border-[#F47B2A]/30 text-[#F47B2A]">
              <ShieldCheckIcon className="w-3.5 h-3.5" />
              <span>{isGujarati ? "વૈધાનિક પારદર્શિતા" : "STATUTORY TRANSPARENCY"}</span>
            </span>
            <span className="text-white/50 text-xs">•</span>
            <span className="text-white/80 text-xs font-semibold font-mono">
              {allResources.length} {isGujarati ? "પ્રમાણિત દસ્તાવેજો" : "Verified Documents"}
            </span>
          </div>

          {/* Headline & description */}
          <div className="max-w-2xl space-y-3">
            <h1 className="font-heading text-3xl sm:text-4xl md:text-[2.75rem] font-extrabold tracking-tight leading-[1.15]">
              {isGujarati ? "સત્તાવાર અહેવાલો, ઓડિટ અને સંસાધનો" : "Official Reports, Audits & Resources"}
            </h1>
            <p className="font-body text-sm sm:text-base text-white/80 leading-relaxed max-w-xl">
              {isGujarati
                ? "૧૩+ વર્ષના પ્રમાણિત વાર્ષિક અહેવાલો, ઓડિટ રિપોર્ટ્સ, FCRA ખાતાઓ અને સંસ્થાકીય બ્રોશર."
                : "13+ years of audited annual reports, chartered accountant balance sheets, FCRA accounts, and our verified organization brochure."}
            </p>
          </div>

          {/* Credential pills */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.07] border border-white/[0.12] text-[11px] text-white/90">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
              <span>{isGujarati ? "કલમ ૮૦G & ૧૨A પ્રમાણિત" : "Section 80G & 12A Certified"}</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.07] border border-white/[0.12] text-[11px] text-white/90">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
              <span>{isGujarati ? "FCRA માન્ય (ગૃહ મંત્રાલય)" : "MHA FCRA Registered"}</span>
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
            2. CATEGORY OVERVIEW CARDS
        ════════════════════════════════════ */}
        <section aria-label="Document Categories">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
            {(Object.entries(CATEGORY_CONFIG) as [CategoryKey, typeof CATEGORY_CONFIG[CategoryKey]][]).map(
              ([key, cfg]) => {
                const count = categoryCounts[key] || 0;
                const isActive = activeCategory === key;

                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleCategoryClick(key)}
                    className={`group/card relative text-left p-5 sm:p-6 rounded-2xl border transition-all duration-300 ${
                      isActive
                        ? `${cfg.cardBg} ${cfg.border} shadow-md ring-2 ring-offset-1 ring-${key === "Annual Report" ? "emerald" : key === "Audit Report" ? "blue" : "violet"}-400/40`
                        : `bg-white ${cfg.border} border-opacity-60 shadow-sm hover:shadow-md hover:border-opacity-100`
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-11 h-11 rounded-xl ${cfg.iconBg} text-white flex items-center justify-center shrink-0 shadow-sm`}>
                        {cfg.icon}
                      </div>
                      <div className="min-w-0 space-y-1">
                        <h3 className={`font-heading font-bold text-base ${cfg.accent}`}>
                          {isGujarati ? cfg.labelGu : cfg.labelEn}
                        </h3>
                        <p className="text-xs text-neutral-600 leading-relaxed line-clamp-2">
                          {isGujarati ? cfg.descGu : cfg.descEn}
                        </p>
                      </div>
                    </div>
                    {/* Count badge */}
                    <div className={`mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                      isActive ? cfg.badge : "bg-neutral-100 text-neutral-600"
                    }`}>
                      <span className="font-mono">{count}</span>
                      <span>{isGujarati ? "દસ્તાવેજો" : "Documents"}</span>
                    </div>
                  </button>
                );
              }
            )}
          </div>
        </section>

        {/* ════════════════════════════════════
            3. FEATURED BROCHURE SHOWCASE
        ════════════════════════════════════ */}
        <section aria-label="Official Organization Brochure">
          <div className="relative overflow-hidden rounded-2xl bg-white border border-neutral-200 shadow-sm hover:shadow-lg transition-shadow duration-300">
            <div className="flex flex-col md:flex-row">
              {/* Brochure visual cover */}
              <div className="relative md:w-72 lg:w-80 shrink-0 bg-gradient-to-br from-[#0B3025] via-[#174B38] to-[#1D5A42] flex flex-col items-center justify-center p-8 sm:p-10 text-center">
                {/* Decorative corners */}
                <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-white/20 rounded-tl-lg" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-white/20 rounded-br-lg" />

                <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mb-4 border border-white/15">
                  <BookOpenIcon className="w-7 h-7 text-white/90" />
                </div>
                <span className="text-[#F47B2A] text-[10px] font-bold uppercase tracking-widest mb-2">
                  {isGujarati ? "સત્તાવાર બ્રોશર" : "Official Brochure"}
                </span>
                <span className="text-white/60 text-[11px] font-mono">
                  {OFFICIAL_BROCHURE.size} • PDF
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 p-6 sm:p-8 flex flex-col justify-center">
                <div className="space-y-1 mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#F47B2A]">
                    {isGujarati ? "સંસ્થાકીય પરિચય" : "Institutional Presentation"}
                  </span>
                  <h2 className="font-heading text-lg sm:text-xl md:text-2xl font-extrabold text-[#0B3025] leading-snug">
                    {isGujarati ? OFFICIAL_BROCHURE.titleGu : OFFICIAL_BROCHURE.title}
                  </h2>
                </div>

                <p className="font-body text-sm text-neutral-600 leading-relaxed mb-5 line-clamp-3">
                  {isGujarati ? OFFICIAL_BROCHURE.descriptionGu : OFFICIAL_BROCHURE.description}
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setPreviewDoc(OFFICIAL_BROCHURE)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0B3025] hover:bg-[#174B38] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all"
                  >
                    <ExternalLinkIcon size={14} />
                    <span>{isGujarati ? "બ્રોશર વાંચો" : "Read Brochure"}</span>
                  </button>

                  <a
                    href={OFFICIAL_BROCHURE.fileUrl}
                    download
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#F47B2A] hover:bg-[#E06A1B] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all"
                  >
                    <DownloadIcon size={14} />
                    <span>{isGujarati ? "ડાઉનલોડ PDF" : "Download PDF"}</span>
                  </a>

                  <span className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                    {isGujarati ? "પ્રમાણિત" : "Verified"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════
            4. SEARCH & FILTER TOOLBAR
        ════════════════════════════════════ */}
        <section id="documents-grid" className="scroll-mt-32 space-y-4" aria-label="Document Library">
          {/* Section heading */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-2">
            <div>
              <h2 className="font-heading text-xl sm:text-2xl font-extrabold text-[#0B3025]">
                {isGujarati ? "દસ્તાવેજ ભંડાર" : "Document Repository"}
              </h2>
              <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
                {isGujarati
                  ? `${reports.length} પ્રમાણિત વૈધાનિક અહેવાલો બ્રાઉઝ કરો`
                  : `Browse ${reports.length} verified statutory reports`}
              </p>
            </div>
            {/* Quick publications link */}
            <Link
              href="/publications"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F47B2A] hover:text-[#E06A1B] transition-colors shrink-0"
            >
              <BookOpenIcon size={14} />
              <span>{isGujarati ? "શૈક્ષણિક પ્રકાશનો →" : "Field Publications →"}</span>
            </Link>
          </div>

          {/* Filter bar */}
          <div className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-sm space-y-3">
            {/* Top row: Search + controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Search */}
              <div className="relative flex-1">
                <SearchIcon
                  size={15}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={isGujarati ? "અહેવાલ, વર્ષ અથવા પ્રકાર શોધો..." : "Search by title, year, or type..."}
                  className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs sm:text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#F47B2A]/40 focus:border-[#F47B2A] transition-all"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 text-xs"
                    aria-label="Clear search"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Year filter */}
              <div className="flex items-center gap-2 shrink-0">
                <CalendarIcon size={14} className="text-neutral-400 hidden sm:block" />
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="px-3 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs font-medium text-neutral-700 focus:outline-none focus:ring-2 focus:ring-[#F47B2A]/40 cursor-pointer"
                  aria-label="Filter by Year"
                >
                  <option value="All">{isGujarati ? "તમામ વર્ષો" : "All Years"}</option>
                  {availableYears.map((yr) => (
                    <option key={yr} value={yr}>{yr}</option>
                  ))}
                </select>

                {/* Sort */}
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as "newest" | "oldest")}
                  className="px-3 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs font-medium text-neutral-700 focus:outline-none focus:ring-2 focus:ring-[#F47B2A]/40 cursor-pointer"
                  aria-label="Sort order"
                >
                  <option value="newest">{isGujarati ? "નવા પ્રથમ" : "Newest First"}</option>
                  <option value="oldest">{isGujarati ? "જૂના પ્રથમ" : "Oldest First"}</option>
                </select>
              </div>
            </div>

            {/* Category pills */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-1.5">
                {/* All button */}
                <button
                  type="button"
                  onClick={() => setActiveCategory("All")}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                    activeCategory === "All"
                      ? "bg-[#0B3025] text-white shadow-sm"
                      : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                  }`}
                >
                  <span>{isGujarati ? "તમામ" : "All"}</span>
                  <span className={`ml-1.5 text-[10px] ${activeCategory === "All" ? "text-white/70" : "text-neutral-400"}`}>
                    {categoryCounts["All"]}
                  </span>
                </button>

                {(Object.entries(CATEGORY_CONFIG) as [CategoryKey, typeof CATEGORY_CONFIG[CategoryKey]][]).map(
                  ([key, cfg]) => {
                    const isActive = activeCategory === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setActiveCategory(key)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                          isActive
                            ? "bg-[#0B3025] text-white shadow-sm"
                            : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                        }`}
                      >
                        <span>{isGujarati ? cfg.labelGu : cfg.labelEn}</span>
                        <span className={`ml-1.5 text-[10px] ${isActive ? "text-white/70" : "text-neutral-400"}`}>
                          {categoryCounts[key] || 0}
                        </span>
                      </button>
                    );
                  }
                )}

                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="px-3 py-1.5 rounded-full text-xs font-semibold text-[#F47B2A] hover:bg-orange-50 transition-colors"
                  >
                    {isGujarati ? "ફિલ્ટર્સ સાફ કરો" : "Clear Filters"}
                  </button>
                )}
              </div>

              {/* Results count */}
              <span className="text-xs text-neutral-500 font-medium">
                {isGujarati ? "દર્શાવેલ: " : "Showing: "}
                <strong className="text-[#0B3025]">{filteredResources.length}</strong>
                <span> / {reports.length}</span>
              </span>
            </div>
          </div>

          {/* ════════════════════════════════════
              5. DOCUMENT CARDS GRID
          ════════════════════════════════════ */}
          {filteredResources.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 pt-2">
              {filteredResources.map((doc) => (
                <PremiumDocumentCard
                  key={doc.id}
                  document={doc}
                  onPreview={(d) => setPreviewDoc(d)}
                  isGujarati={isGujarati}
                />
              ))}
            </div>
          ) : (
            <div className="p-12 sm:p-16 rounded-2xl bg-white border border-dashed border-neutral-300 text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
                <SearchIcon size={24} />
              </div>
              <div className="space-y-1 max-w-sm mx-auto">
                <h3 className="font-heading font-bold text-base text-[#0B3025]">
                  {isGujarati ? "કોઈ અહેવાલ મળ્યો નથી" : "No Reports Found"}
                </h3>
                <p className="text-xs text-neutral-500">
                  {isGujarati
                    ? "પસંદ કરેલા ફિલ્ટર્સ માટે કોઈ દસ્તાવેજ ઉપલબ્ધ નથી. કૃપા કરીને અન્ય વર્ષ અથવા શ્રેણી પસંદ કરો."
                    : "No documents match your selected filters. Please adjust the year, category, or search keywords."}
                </p>
              </div>
              <button
                type="button"
                onClick={handleResetFilters}
                className="px-5 py-2 rounded-xl bg-[#0B3025] hover:bg-[#174B38] text-white text-xs font-bold transition-all shadow-sm"
              >
                {isGujarati ? "તમામ દસ્તાવેજો બતાવો" : "Reset & Show All"}
              </button>
            </div>
          )}
        </section>

        {/* ════════════════════════════════════
            6. CROSS-MEDIA DISCOVERY BANNER
        ════════════════════════════════════ */}
        <section className="p-7 sm:p-9 rounded-2xl bg-[#0B3025] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg border border-white/[0.06]">
          <div className="space-y-2 max-w-lg">
            <span className="text-[11px] uppercase tracking-wider text-[#F47B2A] font-bold">
              {isGujarati ? "સ્વદીપ ડિજિટલ જ્ઞાન કેન્દ્ર" : "Swadeep Digital Knowledge Center"}
            </span>
            <h3 className="font-heading text-lg sm:text-xl font-bold text-white">
              {isGujarati ? "શૈક્ષણિક સાહિત્ય, ક્ષેત્રીય તસ્વીરો અને વિડીયો" : "Looking for Publications, Photos or Videos?"}
            </h3>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-body">
              {isGujarati
                ? "બાળકો માટે ડેન્ટલ હાઇજીન વાર્તાપુસ્તકો, ૮૬+ ક્ષેત્રીય તસ્વીરો અને ૧૨ YouTube વિડીયો ઉપલબ્ધ છે."
                : "Explore illustrated children's storybooks, 86+ field photographs, and 12 YouTube activity videos."}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <Link
              href="/publications"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#F47B2A] hover:bg-[#E06A1B] text-white text-xs font-bold shadow-md transition-all"
            >
              <BookOpenIcon size={14} />
              <span>{isGujarati ? "પ્રકાશનો" : "Publications"}</span>
            </Link>
            <Link
              href="/gallery"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold border border-white/15 transition-all"
            >
              <CameraIcon size={14} />
              <span>{isGujarati ? "ફોટો ગેલેરી" : "Photo Gallery"}</span>
            </Link>
            <Link
              href="/videos"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold border border-white/15 transition-all"
            >
              <YoutubeIcon size={14} />
              <span>{isGujarati ? "વિડીયો" : "Videos"}</span>
            </Link>
          </div>
        </section>
      </div>

      {/* Reusable Document Preview Modal */}
      <DocumentPreviewModal
        document={previewDoc}
        isOpen={Boolean(previewDoc)}
        onClose={() => setPreviewDoc(null)}
        isGujarati={isGujarati}
      />
    </main>
  );
}
