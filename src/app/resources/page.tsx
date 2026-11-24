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
    labelGu: "વાર્ષિક અહેવાલો",
    subtitleEn: "13 Published Editions (2012–2025)",
    subtitleGu: "૧૩ પ્રકાશિત આવૃત્તિઓ (૨૦૧૨–૨૦૨૫)",
    descEn: "Comprehensive yearly activity and impact reports documenting Swadeep's grassroots interventions across 200+ villages.",
    descGu: "ગુજરાતના ૨૦૦+ ગામોમાં શિક્ષણ, આરોગ્ય, આજીવિકા અને ગ્રામ વિકાસ કાર્યક્રમોની વાર્ષિક પ્રગતિ અને પ્રભાવ અહેવાલો.",
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
    labelGu: "ઓડિટ અહેવાલો",
    subtitleEn: "9 Verified Statements (2015–2024)",
    subtitleGu: "૯ ચકાસાયેલ હિસાબો (૨૦૧૫–૨૦૨૪)",
    descEn: "Independent chartered accountant balance sheets, income statements, and statutory financial disclosures.",
    descGu: "સનદી હિસાબી (ચાર્ટર્ડ એકાઉન્ટન્ટ) દ્વારા સ્વતંત્ર રીતે પ્રમાણિત વાર્ષિક બેલેન્સ શીટ અને વૈધાનિક હિસાબો.",
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
    labelGu: "એફસીઆરએ હિસાબ",
    subtitleEn: "10 Annual Submissions (2015–2024)",
    subtitleGu: "૧૦ વાર્ષિક રજૂઆતો (૨૦૧૫–૨૦૨૪)",
    descEn: "Foreign Contribution Regulation Act returns and dedicated foreign contribution bank statements filed with MHA.",
    descGu: "ભારત સરકારના ગૃહ મંત્રાલય (MHA) સમક્ષ દર વર્ષે રજૂ કરાતા વિદેશી અનુદાન નિયમન અધિનિયમ હિસાબો.",
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
  const displayTitle = isGujarati && doc.titleGu ? doc.titleGu : doc.title;
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
              {isGujarati && doc.categoryGu ? doc.categoryGu : doc.category}
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
            <span>{isGujarati ? "વાંચો / પ્રીવ્યૂ" : "Quick Preview"}</span>
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
              {isGujarati && doc.categoryGu ? doc.categoryGu : doc.category}
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
              {isGujarati && doc.descriptionGu ? doc.descriptionGu : doc.description}
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
            <span>{isGujarati ? "વાંચો" : "Preview"}</span>
          </button>

          <a
            href={doc.fileUrl}
            download
            className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#0B3025] hover:bg-[#174B38] text-white text-xs font-semibold transition-all shadow-xs"
          >
            <DownloadIcon size={12} />
            <span>{isGujarati ? "ડાઉનલોડ" : "Download"}</span>
          </a>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Resources Page Component ─── */
export default function ResourcesPage() {
  const { isGujarati } = useLanguage();
  // Static initialization guaranteeing instant 32 reports render without waiting for API
  const [reports, setReports] = useState<PreviewDocument[]>(VERIFIED_REPORTS);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedYear, setSelectedYear] = useState<string>("All");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [searchQuery, setSearchQuery] = useState<string>("");
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
        console.warn("API revalidation fallback to static reports:", err);
      }
    }
    revalidate();
    return () => {
      isMounted = false;
    };
  }, []);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      All: reports.length,
      "Annual Report": 0,
      "Audit Report": 0,
      "FC Accounts": 0,
    };
    reports.forEach((r) => {
      counts[r.category] = (counts[r.category] || 0) + 1;
    });
    return counts;
  }, [reports]);

  // Available fiscal years sorted descending
  const availableYears = useMemo(() => {
    const yearSet = new Set<string>();
    reports.forEach((r) => {
      if (r.year && r.year.trim()) yearSet.add(r.year.trim());
    });
    return Array.from(yearSet).sort().reverse();
  }, [reports]);

  // Filtered and sorted collection
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

  const handleCategorySelect = useCallback((key: string) => {
    setActiveCategory(key);
    const target = document.getElementById("document-library-section");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  // Previous and Next document navigation for in-page modal
  const handleNextDoc = useCallback(() => {
    if (!previewDoc) return;
    const idx = filteredResources.findIndex((d) => d.id === previewDoc.id);
    if (idx !== -1) {
      setPreviewDoc(filteredResources[(idx + 1) % filteredResources.length]);
    }
  }, [previewDoc, filteredResources]);

  const handlePrevDoc = useCallback(() => {
    if (!previewDoc) return;
    const idx = filteredResources.findIndex((d) => d.id === previewDoc.id);
    if (idx !== -1) {
      setPreviewDoc(filteredResources[(idx - 1 + filteredResources.length) % filteredResources.length]);
    }
  }, [previewDoc, filteredResources]);

  return (
    <main id="main-content" className="pt-24 sm:pt-28 pb-20 bg-cream min-h-screen">
      {/* ════════════════════════════════════
          1. COMPACT EDITORIAL HEADER
      ════════════════════════════════════ */}
      <section className="relative bg-[#0B3025] text-white overflow-hidden py-12 sm:py-16">
        {/* Subtle geometric pattern */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
          <div className="absolute -top-12 -right-12 w-96 h-96 rounded-full border-2 border-white" />
          <div className="absolute top-1/2 left-0 w-64 h-64 rounded-full border border-white" />
        </div>

        <div className="relative z-10 container-wide section-padding max-w-6xl mx-auto space-y-5">
          {/* Badge row */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#F47B2A]/15 border border-[#F47B2A]/30 text-[#F47B2A]">
              <ShieldCheckIcon className="w-3.5 h-3.5" />
              <span>{isGujarati ? "વૈધાનિક પારદર્શિતા અને શાસન" : "STATUTORY TRANSPARENCY & GOVERNANCE"}</span>
            </span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/80 text-xs font-semibold font-mono">
              32 {isGujarati ? "પ્રમાણિત અહેવાલો + ૧ બ્રોશર" : "Verified Reports + 1 Brochure"}
            </span>
          </div>

          {/* Heading & description */}
          <div className="max-w-3xl space-y-2.5">
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white">
              {isGujarati ? "સત્તાવાર અહેવાલો, ઓડિટ અને સંસાધનો" : "Official Reports, Audits & Resources"}
            </h1>
            <p className="font-body text-sm sm:text-base text-white/85 leading-relaxed max-w-2xl">
              {isGujarati
                ? "સ્વદીપના છેલ્લા ૧૩ વર્ષના પ્રમાણિત વાર્ષિક અહેવાલો (૨૦૧૨-૨૫), સનદી હિસાબી ઓડિટ રિપોર્ટ્સ, એફસીઆરએ વિદેશી અનુદાન ખાતાઓ અને સંસ્થાકીય પરિચય બ્રોશર."
                : "Explore 13+ years of audited statutory annual reports, chartered accountant balance sheets, foreign contribution (FCRA) accounts, and our organization brochure."}
            </p>
          </div>

          {/* Statutory Credentials */}
          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.08] border border-white/[0.12] text-[11px] text-white">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
              <span>{isGujarati ? "કલમ ૮૦G અને ૧૨A કર મુક્તિ પ્રમાણિત" : "Section 80G & 12A Certified"}</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.08] border border-white/[0.12] text-[11px] text-white">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
              <span>{isGujarati ? "FCRA માન્ય (ગૃહ મંત્રાલય MHA)" : "MHA FCRA Registered"}</span>
            </div>
            <Link
              href="/publications"
              className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F47B2A] hover:bg-[#E06A1B] text-white text-[11px] font-bold transition-all shadow-sm"
            >
              <BookOpenIcon size={13} />
              <span>{isGujarati ? "પ્રકાશનો →" : "Publications →"}</span>
            </Link>
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
            2. THREE PROMINENT CATEGORY NAVIGATION CARDS
        ════════════════════════════════════ */}
        <section aria-label="Document Category Navigation">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {(Object.entries(CATEGORY_CONFIG) as [CategoryKey, typeof CATEGORY_CONFIG[CategoryKey]][]).map(
              ([key, cfg]) => {
                const count = categoryCounts[key] || 0;
                const isActive = activeCategory === key;

                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleCategorySelect(key)}
                    className={`group text-left p-6 rounded-2xl border transition-all duration-300 relative flex flex-col justify-between ${
                      isActive
                        ? "bg-white border-[#0B3025] shadow-lg ring-2 ring-[#0B3025]/20 -translate-y-0.5"
                        : "bg-white border-neutral-200/90 shadow-xs hover:shadow-md hover:border-neutral-300 hover:-translate-y-0.5"
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className={`w-12 h-12 rounded-xl ${cfg.iconBg} text-white flex items-center justify-center shadow-sm`}>
                          {cfg.icon}
                        </div>
                        <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-full bg-neutral-100 text-[#0B3025]">
                          {count} {isGujarati ? "દસ્તાવેજો" : "Reports"}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <h3 className="font-heading font-extrabold text-lg text-[#0B3025] group-hover:text-[#F47B2A] transition-colors">
                          {isGujarati ? cfg.labelGu : cfg.labelEn}
                        </h3>
                        <p className="font-mono text-xs text-neutral-500 font-semibold">
                          {isGujarati ? cfg.subtitleGu : cfg.subtitleEn}
                        </p>
                      </div>

                      <p className="font-body text-xs text-neutral-600 leading-relaxed line-clamp-3">
                        {isGujarati ? cfg.descGu : cfg.descEn}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-bold text-[#0B3025] group-hover:text-[#F47B2A]">
                      <span>{isGujarati ? "આ કેટેગરીના અહેવાલો જુઓ" : "View Collection"}</span>
                      <span>→</span>
                    </div>
                  </button>
                );
              }
            )}
          </div>
        </section>

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
                  {isGujarati ? "બ્રોશર" : "Brochure"}
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
                    {isGujarati ? "સંસ્થાકીય પરિચય દસ્તાવેજ" : "Institutional Presentation"}
                  </span>
                  <h2 className="font-heading text-lg sm:text-xl md:text-2xl font-extrabold text-[#0B3025] leading-snug">
                    {isGujarati ? OFFICIAL_BROCHURE.titleGu : OFFICIAL_BROCHURE.title}
                  </h2>
                </div>

                <p className="font-body text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  {isGujarati ? OFFICIAL_BROCHURE.descriptionGu : OFFICIAL_BROCHURE.description}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setPreviewDoc(OFFICIAL_BROCHURE)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0B3025] hover:bg-[#174B38] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all"
                  >
                    <ExternalLinkIcon size={14} />
                    <span>{isGujarati ? "બ્રોશર વાંચો (Preview)" : "Read Brochure (Preview)"}</span>
                  </button>

                  <a
                    href={OFFICIAL_BROCHURE.fileUrl}
                    download
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#F47B2A] hover:bg-[#E06A1B] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all"
                  >
                    <DownloadIcon size={14} />
                    <span>{isGujarati ? "ડાઉનલોડ PDF" : "Download PDF"}</span>
                  </a>

                  <span className="text-xs text-emerald-700 font-medium flex items-center gap-1.5 font-mono">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                    {isGujarati ? "સત્તાવાર સંસ્થાકીય દસ્તાવેજ" : "Verified Official Publication"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════
            4. SEARCH & FILTER TOOLBAR
        ════════════════════════════════════ */}
        <section id="document-library-section" className="scroll-mt-28 space-y-4" aria-label="Document Repository">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <div>
              <span className="text-[#F47B2A] font-bold text-xs uppercase tracking-widest block mb-1">
                {isGujarati ? "દસ્તાવેજ ભંડાર" : "Document Library"}
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#0B3025]">
                {isGujarati ? "વૈધાનિક અહેવાલોનો સંગ્રહ" : "Statutory Document Collection"}
              </h2>
            </div>
            <div className="text-xs text-neutral-500 font-medium">
              <span>{isGujarati ? "દર્શાવેલ: " : "Showing: "}</span>
              <strong className="text-[#0B3025] font-bold">{filteredResources.length}</strong>
              <span> of {reports.length} {isGujarati ? "અહેવાલો" : "reports"}</span>
            </div>
          </div>

          {/* Search + Controls Container */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-neutral-200 shadow-xs space-y-3.5">
            {/* Top row: Search input + Year Select + Sort */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Search input */}
              <div className="relative flex-1">
                <SearchIcon
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    isGujarati
                      ? "અહેવાલનું શીર્ષક, વર્ષ અથવા પ્રકાર શોધો..."
                      : "Search reports by title, fiscal year, or keywords..."
                  }
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

              {/* Year Dropdown */}
              <div className="flex items-center gap-2 shrink-0">
                <CalendarIcon size={14} className="text-neutral-400 hidden sm:block" />
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="px-3 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs font-semibold text-neutral-700 focus:outline-none focus:ring-2 focus:ring-[#F47B2A]/40 cursor-pointer"
                  aria-label="Filter by Fiscal Year"
                >
                  <option value="All">{isGujarati ? "તમામ વર્ષો (All Years)" : "All Fiscal Years"}</option>
                  {availableYears.map((yr) => (
                    <option key={yr} value={yr}>
                      {yr}
                    </option>
                  ))}
                </select>

                {/* Sort Order */}
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as "newest" | "oldest")}
                  className="px-3 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs font-semibold text-neutral-700 focus:outline-none focus:ring-2 focus:ring-[#F47B2A]/40 cursor-pointer"
                  aria-label="Sort documents by year"
                >
                  <option value="newest">{isGujarati ? "સૌથી નવા પ્રથમ" : "Newest First"}</option>
                  <option value="oldest">{isGujarati ? "સૌથી જૂના પ્રથમ" : "Oldest First"}</option>
                </select>
              </div>
            </div>

            {/* Bottom row: Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-neutral-100">
              <div className="flex flex-wrap items-center gap-2">
                {/* All Reports Tab */}
                <button
                  type="button"
                  onClick={() => setActiveCategory("All")}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                    activeCategory === "All"
                      ? "bg-[#0B3025] text-white shadow-xs"
                      : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                  }`}
                >
                  <span>{isGujarati ? "તમામ અહેવાલો" : "All Reports"}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      activeCategory === "All" ? "bg-white/20 text-white" : "bg-white text-neutral-600"
                    }`}
                  >
                    {categoryCounts["All"]}
                  </span>
                </button>

                {/* Specific Category Tabs */}
                {(Object.entries(CATEGORY_CONFIG) as [CategoryKey, typeof CATEGORY_CONFIG[CategoryKey]][]).map(
                  ([key, cfg]) => {
                    const isActive = activeCategory === key;
                    const count = categoryCounts[key] || 0;

                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setActiveCategory(key)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                          isActive
                            ? "bg-[#0B3025] text-white shadow-xs"
                            : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                        }`}
                      >
                        <span>{isGujarati ? cfg.labelGu : cfg.labelEn}</span>
                        <span
                          className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                            isActive ? "bg-white/20 text-white" : "bg-white text-neutral-600"
                          }`}
                        >
                          {count}
                        </span>
                      </button>
                    );
                  }
                )}

                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="px-3 py-1.5 rounded-full text-xs font-semibold text-[#F47B2A] hover:bg-amber-50 transition-colors"
                  >
                    {isGujarati ? "ફિલ્ટર્સ સાફ કરો" : "Clear Filters"}
                  </button>
                )}
              </div>

              {/* Status indicator */}
              <span className="text-[11px] text-emerald-800 font-medium flex items-center gap-1.5 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                All 32 Original Reports Verified
              </span>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════
            5. DOCUMENT LIBRARY CARDS GRID
        ════════════════════════════════════ */}
        <section aria-label="Official Document Library">
          {filteredResources.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {filteredResources.map((doc) => (
                <EditorialDocumentCard
                  key={doc.id}
                  document={doc}
                  onPreview={(d) => setPreviewDoc(d)}
                  isGujarati={isGujarati}
                />
              ))}
            </div>
          ) : (
            <div className="p-12 sm:p-16 rounded-2xl bg-white border border-dashed border-neutral-300 text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto">
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
                className="px-5 py-2.5 rounded-xl bg-[#0B3025] hover:bg-[#174B38] text-white text-xs font-bold transition-all shadow-xs"
              >
                {isGujarati ? "તમામ દસ્તાવેજો બતાવો" : "Reset & Show All Documents"}
              </button>
            </div>
          )}
        </section>

        {/* ════════════════════════════════════
            6. CROSS-MEDIA DISCOVERY BANNER
        ════════════════════════════════════ */}
        <section className="p-7 sm:p-9 rounded-2xl bg-[#0B3025] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg border border-white/10">
          <div className="space-y-2 max-w-lg">
            <span className="text-[11px] uppercase tracking-wider text-[#F47B2A] font-bold">
              {isGujarati ? "સ્વદીપ ડિજિટલ જ્ઞાન કેન્દ્ર" : "Swadeep Digital Knowledge Center"}
            </span>
            <h3 className="font-heading text-lg sm:text-xl font-bold text-white">
              {isGujarati ? "શૈક્ષણિક પ્રકાશનો, ક્ષેત્રીય તસ્વીરો અને વિડીયો" : "Looking for Publications, Photos or Videos?"}
            </h3>
            <p className="text-xs sm:text-sm text-white/75 leading-relaxed font-body">
              {isGujarati
                ? "બાળકો માટે ડેન્ટલ હાઇજીન વાર્તાપુસ્તકો, ૮૬+ ક્ષેત્રીય તસ્વીરો અને ૧૨ સત્તાવાર કાર્યક્રમ વિડીયો ઉપલબ્ધ છે."
                : "Explore illustrated children's storybooks, 86+ high-resolution field photographs, and 12 YouTube activity videos."}
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
              <span>{isGujarati ? "વિડીયો ગેલેરી" : "Video Gallery"}</span>
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
