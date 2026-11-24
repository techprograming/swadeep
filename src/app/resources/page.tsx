"use client";

import React, { useEffect, useMemo, useState } from "react";
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
} from "@/components/ui/Icons";
import DocumentCard from "@/components/ui/DocumentCard";
import DocumentPreviewModal, { PreviewDocument } from "@/components/ui/DocumentPreviewModal";
import MediaSubNav from "@/components/ui/MediaSubNav";
import {
  OFFICIAL_BROCHURE,
  VERIFIED_REPORTS,
} from "@/lib/reportsData";

export default function ResourcesPage() {
  const { isGujarati } = useLanguage();
  // Initialize with verified static reports so SSR/first paint renders all 33 documents immediately with exact counts
  const [reports, setReports] = useState<PreviewDocument[]>(VERIFIED_REPORTS);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedYear, setSelectedYear] = useState<string>("All");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [previewDoc, setPreviewDoc] = useState<PreviewDocument | null>(null);

  // Background revalidation: fetch latest reports from API in case admin updated records via /admin
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
        // Silently preserve verified static reports on network error
        console.warn("Could not revalidate reports API:", err);
      }
    }
    revalidateReports();
    return () => {
      isMounted = false;
    };
  }, []);

  // Combine brochure with verified statutory reports
  const allResources: PreviewDocument[] = useMemo(() => {
    return [OFFICIAL_BROCHURE, ...reports];
  }, [reports]);

  // Dynamic category tabs with exact real-time item counts
  const categories = useMemo(() => {
    const annualCount = allResources.filter((r) => r.category === "Annual Report").length;
    const auditCount = allResources.filter((r) => r.category === "Audit Report").length;
    const fcCount = allResources.filter((r) => r.category === "FC Accounts").length;
    const brochureCount = allResources.filter((r) => r.category === "Official Brochure").length;

    return [
      {
        key: "All",
        labelEn: "All Resources",
        labelGu: "તમામ સંસાધનો",
        count: allResources.length,
      },
      {
        key: "Annual Report",
        labelEn: "Annual Reports",
        labelGu: "વાર્ષિક અહેવાલો",
        count: annualCount,
      },
      {
        key: "Audit Report",
        labelEn: "Audit Reports",
        labelGu: "ઓડિટ અહેવાલો",
        count: auditCount,
      },
      {
        key: "FC Accounts",
        labelEn: "FCRA Accounts",
        labelGu: "એફસીઆરએ હિસાબ",
        count: fcCount,
      },
      {
        key: "Official Brochure",
        labelEn: "Official Brochure",
        labelGu: "સત્તાવાર બ્રોશર",
        count: brochureCount,
      },
    ];
  }, [allResources]);

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
    const list = allResources.filter((item) => {
      // Category match
      const matchesCategory =
        activeCategory === "All" || item.category === activeCategory;

      // Year match
      const matchesYear =
        selectedYear === "All" || item.year === selectedYear;

      // Search match
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

    // Sorting
    return list.sort((a, b) => {
      if (a.id === "res-brochure") return -1;
      if (b.id === "res-brochure") return 1;

      const yearA = a.year || "";
      const yearB = b.year || "";
      return sortOrder === "newest"
        ? yearB.localeCompare(yearA, undefined, { numeric: true })
        : yearA.localeCompare(yearB, undefined, { numeric: true });
    });
  }, [allResources, activeCategory, selectedYear, searchQuery, sortOrder]);

  const hasActiveFilters =
    activeCategory !== "All" || selectedYear !== "All" || searchQuery.trim().length > 0;

  const handleResetFilters = () => {
    setActiveCategory("All");
    setSelectedYear("All");
    setSearchQuery("");
  };

  return (
    <main id="main-content" className="pt-24 sm:pt-28 pb-20 bg-cream min-h-screen">
      {/* 1. Hero Section */}
      <section className="bg-gradient-to-r from-[#0B3025] via-[#174B38] to-[#205943] text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="container-wide section-padding relative z-10 max-w-6xl mx-auto space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 border border-white/20 text-[#F47B2A]">
              <ShieldCheckIcon className="w-3.5 h-3.5 text-[#F47B2A]" />
              <span>{isGujarati ? "પારદર્શિતા અને વૈધાનિક હિસાબો" : "STATUTORY TRANSPARENCY & GOVERNANCE"}</span>
            </span>
            <span className="text-white/60 text-xs">•</span>
            <span className="text-white/90 text-xs font-semibold">
              {isGujarati
                ? `${allResources.length} પ્રમાણિત વૈધાનિક દસ્તાવેજો`
                : `${allResources.length} Verified Statutory Documents`}
            </span>
          </div>

          <div className="space-y-3 max-w-3xl">
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              {isGujarati ? "સત્તાવાર અહેવાલો, ઓડિટ હિસાબ અને સંસાધનો" : "Official Reports, Audits & Resources"}
            </h1>
            <p className="font-body text-base sm:text-lg text-white/90 leading-relaxed">
              {isGujarati
                ? "સ્વદીપના છેલ્લા ૧૩ વર્ષના પ્રમાણિત વાર્ષિક અહેવાલો (૨૦૧૨-૨૫), સનદી હિસાબી ઓડિટ રિપોર્ટ્સ, એફસીઆરએ વિદેશી અનુદાન ખાતાઓ અને સત્તાવાર સંસ્થાકીય બ્રોશર."
                : "Explore 13+ years of audited statutory annual reports, chartered accountant balance sheets, foreign contribution (FCRA) accounts, and our verified organization brochure."}
            </p>
          </div>

          {/* Statutory Credentials & Publications CTA */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-xs border border-white/15 text-xs text-white">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>{isGujarati ? "કલમ ૮૦G અને ૧૨A કર મુક્તિ પ્રમાણિત" : "Section 80G & 12A Certified"}</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-xs border border-white/15 text-xs text-white">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>{isGujarati ? "FCRA માન્ય (ગૃહ મંત્રાલય)" : "MHA FCRA Registered"}</span>
            </div>

            <Link
              href="/publications"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F47B2A] hover:bg-[#E06A1B] text-white text-xs font-bold transition-all shadow-md hover:shadow-lg"
            >
              <BookOpenIcon className="w-3.5 h-3.5" />
              <span>{isGujarati ? "શૈક્ષણિક પ્રકાશનો અને બાળવાર્તાઓ જુઓ →" : "Explore Field Publications & Storybooks →"}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Shared Media Sub-Navigation */}
      <MediaSubNav activeTab="resources" />

      {/* Main Container */}
      <div className="container-wide section-padding max-w-6xl mx-auto space-y-12 mt-10">
        {/* 2. Featured Official Brochure Showcase Banner */}
        <section aria-label="Official Organization Brochure">
          <div className="relative overflow-hidden rounded-3xl bg-white border border-forest/15 shadow-sm hover:shadow-md transition-shadow p-6 sm:p-8 md:p-10 flex flex-col md:flex-row items-center gap-8">
            {/* Visual Document Emblem */}
            <div className="w-full md:w-1/3 shrink-0 flex flex-col items-center justify-center p-8 rounded-2xl bg-gradient-to-br from-[#0B3025]/10 via-[#174B38]/10 to-[#F47B2A]/10 border border-forest/15 text-center space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-[#0B3025] text-white flex items-center justify-center shadow-md">
                <BookOpenIcon className="w-8 h-8" />
              </div>
              <span className="px-3 py-1 rounded-full bg-[#0B3025] text-white text-[11px] font-bold uppercase tracking-wider">
                {isGujarati ? "સત્તાવાર બ્રોશર" : "Official Brochure"}
              </span>
              <p className="font-mono text-xs text-charcoal/70">
                {OFFICIAL_BROCHURE.size} • Verified PDF
              </p>
            </div>

            {/* Featured Content & CTAs */}
            <div className="w-full md:w-2/3 space-y-4 text-left">
              <div className="space-y-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#F47B2A]">
                  {isGujarati ? "સંસ્થાકીય પરિચય દસ્તાવેજ" : "Institutional Presentation"}
                </span>
                <h2 className="font-heading text-xl sm:text-2xl md:text-3xl font-extrabold text-[#0B3025] leading-snug">
                  {isGujarati ? OFFICIAL_BROCHURE.titleGu : OFFICIAL_BROCHURE.title}
                </h2>
              </div>

              <p className="font-body text-sm sm:text-base text-charcoal/80 leading-relaxed">
                {isGujarati ? OFFICIAL_BROCHURE.descriptionGu : OFFICIAL_BROCHURE.description}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setPreviewDoc(OFFICIAL_BROCHURE)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0B3025] hover:bg-[#174B38] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all"
                >
                  <ExternalLinkIcon size={14} />
                  <span>{isGujarati ? "બ્રોશર વાંચો (Preview)" : "Read Brochure (Preview)"}</span>
                </button>

                <a
                  href={OFFICIAL_BROCHURE.fileUrl}
                  download
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F47B2A] hover:bg-[#E06A1B] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all"
                >
                  <DownloadIcon size={14} />
                  <span>{isGujarati ? "ડાઉનલોડ કરો (PDF)" : "Download PDF"}</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Search and Filtering Toolbar */}
        <section className="space-y-4" aria-label="Resources Toolbar">
          <div className="bg-white p-4 sm:p-5 rounded-3xl border border-forest/10 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <SearchIcon
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/40"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isGujarati ? "અહેવાલ, વર્ષ અથવા દસ્તાવેજ શોધો..." : "Search reports by title, year, or type..."}
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

            {/* Year Filter & Sorting Controls */}
            <div className="flex items-center gap-2.5 shrink-0 flex-wrap sm:flex-nowrap">
              {/* Year Select */}
              <div className="flex items-center gap-1.5 text-xs text-charcoal/70">
                <span className="font-bold text-[#0B3025] hidden sm:inline">
                  {isGujarati ? "વર્ષ:" : "Year:"}
                </span>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-cream/50 border border-forest/15 text-xs font-semibold text-charcoal focus:outline-none focus:ring-2 focus:ring-[#F47B2A]"
                  aria-label="Filter by Fiscal Year"
                >
                  <option value="All">{isGujarati ? "તમામ વર્ષો (All Years)" : "All Years"}</option>
                  {availableYears.map((yr) => (
                    <option key={yr} value={yr}>
                      {yr}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sorting Select */}
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as "newest" | "oldest")}
                className="px-3 py-2 rounded-xl bg-cream/50 border border-forest/15 text-xs font-semibold text-charcoal focus:outline-none focus:ring-2 focus:ring-[#F47B2A]"
                aria-label="Sort documents"
              >
                <option value="newest">{isGujarati ? "સૌથી નવા પ્રથમ" : "Newest First"}</option>
                <option value="oldest">{isGujarati ? "સૌથી જૂના પ્રથમ" : "Oldest First"}</option>
              </select>
            </div>
          </div>

          {/* Category Filter Pills with Live Accurate Counts */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.key;
                return (
                  <button
                    key={cat.key}
                    type="button"
                    onClick={() => setActiveCategory(cat.key)}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                      isActive
                        ? "bg-[#0B3025] text-white shadow-xs"
                        : "bg-white text-charcoal/80 hover:bg-forest-50 border border-forest/10"
                    }`}
                  >
                    <span>{isGujarati ? cat.labelGu : cat.labelEn}</span>
                    <span
                      className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                        isActive ? "bg-white/20 text-white" : "bg-neutral-100 text-charcoal/60"
                      }`}
                    >
                      {cat.count}
                    </span>
                  </button>
                );
              })}

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="px-3.5 py-2 rounded-full text-xs font-semibold text-[#F47B2A] hover:bg-amber-50 transition-colors"
                >
                  {isGujarati ? "ફિલ્ટર્સ સાફ કરો (Clear)" : "Clear Filters"}
                </button>
              )}
            </div>

            {/* Results Count Indicator */}
            <div className="text-xs text-charcoal/60 font-medium">
              <span>{isGujarati ? "દર્શાવેલ દસ્તાવેજો: " : "Showing: "}</span>
              <strong className="text-[#0B3025] font-bold">{filteredResources.length}</strong>
              <span> of {allResources.length}</span>
            </div>
          </div>
        </section>

        {/* 4. Resources Cards Grid */}
        <section aria-label="Official Resources Grid">
          {filteredResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((doc) => (
                <DocumentCard
                  key={doc.id}
                  document={doc}
                  onPreview={(d) => setPreviewDoc(d)}
                  isGujarati={isGujarati}
                />
              ))}
            </div>
          ) : (
            <div className="p-12 sm:p-16 rounded-3xl bg-white border border-dashed border-forest/20 text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto">
                <SearchIcon size={24} />
              </div>
              <div className="space-y-1 max-w-sm mx-auto">
                <h3 className="font-heading font-bold text-base text-[#0B3025]">
                  {isGujarati ? "કોઈ અહેવાલ મળ્યો નથી" : "No Reports Found"}
                </h3>
                <p className="text-xs text-charcoal/70">
                  {isGujarati
                    ? "પસંદ કરેલા ફિલ્ટર્સ અથવા શોધ માટે કોઈ અહેવાલ ઉપલબ્ધ નથી. કૃપા કરીને અન્ય વર્ષ અથવા શ્રેણી પસંદ કરો."
                    : "No documents match your selected filters. Please adjust the year, category, or search keywords."}
                </p>
              </div>
              <button
                type="button"
                onClick={handleResetFilters}
                className="px-4 py-2 rounded-full bg-[#0B3025] hover:bg-[#174B38] text-white text-xs font-bold transition-all shadow-xs"
              >
                {isGujarati ? "તમામ દસ્તાવેજો બતાવો" : "Reset & Show All Documents"}
              </button>
            </div>
          )}
        </section>

        {/* 5. Cross-Media Discovery Callout Banner */}
        <section className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#0B3025] via-[#174B38] to-[#0B3025] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md border border-white/10">
          <div className="space-y-2 max-w-xl text-left">
            <span className="text-xs uppercase tracking-wider text-[#F47B2A] font-bold">
              {isGujarati ? "સ્વદીપ દસ્તાવેજ કેન્દ્ર" : "Swadeep Digital Knowledge Center"}
            </span>
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-white">
              {isGujarati ? "શૈક્ષણિક સાહિત્ય, ક્ષેત્રીય તસ્વીરો અને વિડીયો" : "Looking for Field Publications, Photos or Videos?"}
            </h3>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-body">
              {isGujarati
                ? "બાળકો માટે ડેન્ટલ હાઇજીન વાર્તાપુસ્તકો, ૮૬ થી વધુ ક્ષેત્રીય તસ્વીરો અને ૧૨ સત્તાવાર કાર્યક્રમ વિડીયો ઉપલબ્ધ છે."
                : "Explore illustrated children's storybooks, 86+ high-resolution field photographs, and 12 YouTube activity videos."}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0 self-start md:self-auto">
            <Link
              href="/publications"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F47B2A] hover:bg-[#E06A1B] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all"
            >
              <BookOpenIcon size={15} />
              <span>{isGujarati ? "શૈક્ષણિક પ્રકાશનો" : "Field Publications"}</span>
            </Link>
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold border border-white/20 transition-all"
            >
              <CameraIcon size={15} />
              <span>{isGujarati ? "ફોટો ગેલેરી" : "Photo Gallery"}</span>
            </Link>
            <Link
              href="/videos"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold border border-white/20 transition-all"
            >
              <YoutubeIcon size={15} />
              <span>{isGujarati ? "વિડીયો ગેલેરી" : "Video Gallery"}</span>
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
