"use client";

import React, { useMemo, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import {
  BookOpenIcon,
  DownloadIcon,
  ExternalLinkIcon,
  SearchIcon,
  CameraIcon,
  YoutubeIcon,
  ReceiptTextIcon,
  CheckCircleIcon,
  SparklesIcon,
} from "@/components/ui/Icons";
import DocumentPreviewModal, { PreviewDocument } from "@/components/ui/DocumentPreviewModal";
import MediaSubNav from "@/components/ui/MediaSubNav";

/* ─── 5 Verified Original Publications with Authentic Cover Images ─── */
const OFFICIAL_PUBLICATIONS: (PreviewDocument & {
  groupCategory: "storybooks" | "manuals";
  groupCategoryEn: string;
  coverImage: string;
  badgeEn: string;
})[] = [
  {
    id: "pub-arti",
    title: "Story Book: Arti & The Tooth Fairy",
    
    category: "Child Health & Storytelling",
    
    groupCategory: "storybooks",
    groupCategoryEn: "Storybooks & Children's Literature",
    
    size: "12.76 MB",
    fileUrl: "/publications/Story-Book-Arti-Tooth-Fairy.pdf",
    coverImage: "/publications/covers/Story-Book-Arti-Tooth-Fairy.jpg",
    badgeEn: "Illustrated Storybook",
    
    description:
      "Colorful illustrated children’s storybook encouraging joyful dental hygiene habits, regular brushing techniques, and cavity prevention among primary students.",
    
  },
  {
    id: "pub-tlm",
    title: "Dental Health Teaching Learning Material (TLM) Book",
    
    category: "Pedagogy & Healthcare",
    
    groupCategory: "manuals",
    groupCategoryEn: "Teaching & Training Manuals",
    
    size: "1.31 MB",
    fileUrl: "/publications/DH-TLM-book-English.pdf",
    coverImage: "/publications/covers/DH-TLM-book-English.jpg",
    badgeEn: "Educator Manual",
    
    description:
      "Comprehensive English teaching-learning manual designed for educators, teachers, and health mobilizers to deliver interactive dental hygiene pedagogy.",
    
  },
  {
    id: "pub-mano-prem-asha",
    title: "Maa No Prem Children’s Rhymes & Poem Book",
    
    category: "Early Childhood Literature",
    
    groupCategory: "storybooks",
    groupCategoryEn: "Storybooks & Children's Literature",
    
    size: "1.67 MB",
    fileUrl: "/publications/Ma-no-Prem-Poem-book-asha.pdf",
    coverImage: "/publications/covers/Ma-no-Prem-Poem-book-asha.jpg",
    badgeEn: "Gujarati Rhymes",
    
    description:
      "Illustrated Gujarati rhymes and emotional verses celebrating motherly affection, family values, and early childhood learning in rural Gujarat.",
    
  },
  {
    id: "pub-mano-prem-makvana",
    title: "Maa No Prem Poem Collection (Special Edition)",
    
    category: "Poetry & Literature",
    
    groupCategory: "storybooks",
    groupCategoryEn: "Storybooks & Children's Literature",
    
    size: "0.09 MB",
    fileUrl: "/publications/Ma-no-Prem-Poem-book-asha-makvana.pdf",
    coverImage: "/publications/covers/Ma-no-Prem-Poem-book-asha-makvana.jpg",
    badgeEn: "Special Poetry Edition",
    
    description:
      "Dedicated poetic verses and educational reflections authored by grassroots contributor Asha Makvana supporting village learning.",
    
  },
  {
    id: "pub-manual",
    title: "Swadeep Organizational Manual & Operational Guidelines",
    
    category: "Governance & SOPs",
    
    groupCategory: "manuals",
    groupCategoryEn: "Teaching & Training Manuals",
    
    size: "0.67 MB",
    fileUrl: "/publications/organizational-manual-swadeep-18.04.23.pdf",
    coverImage: "/publications/covers/organizational-manual-swadeep-18.04.23.jpg",
    badgeEn: "SOP & Governance",
    
    description:
      "Official institutional standard operating procedures, personnel policies, field management frameworks, and transparency protocols.",
    
  },
];

/* ─── Premium Editorial Book Card ─── */
function PublicationCard({
  pub,
  onPreview,
  isGujarati,
}: {
  pub: (typeof OFFICIAL_PUBLICATIONS)[number];
  onPreview: (doc: PreviewDocument) => void;
  isGujarati: boolean;
}) {
  const displayTitle = pub.title;
  const secondaryTitle = pub.titleGu;
  const displayBadge = pub.badgeEn;

  return (
    <div className="group relative flex flex-col bg-white rounded-2xl border border-neutral-200/90 shadow-xs hover:shadow-xl hover:border-neutral-300 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      {/* ── Realistic Book Cover Display ── */}
      <div className="relative w-full aspect-[3/4] bg-neutral-100 overflow-hidden cursor-pointer select-none border-b border-neutral-200/80">
        {/* Book spine shadow on left edge */}
        <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-black/25 via-black/10 to-transparent z-10 pointer-events-none" />

        {/* Paper page layers on right edge */}
        <div className="absolute right-0 top-3 bottom-3 w-1 bg-cream/90 border-l border-neutral-300/40 z-10 pointer-events-none" />

        <Image
          src={pub.coverImage}
          alt={displayTitle}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Subtle dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Badge on Top Left */}
        <div className="absolute top-3 left-4 z-20">
          <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#0B3025]/90 backdrop-blur-md text-white border border-white/20 shadow-sm">
            {displayBadge}
          </span>
        </div>

        {/* Format & Size Badge on Top Right */}
        <div className="absolute top-3 right-3 z-20">
          <span className="px-2 py-0.5 rounded bg-black/75 backdrop-blur-xs text-white text-[10px] font-mono font-bold uppercase shadow-sm">
            {pub.size}
          </span>
        </div>

        {/* Hover Quick Action Overlay */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
          <button
            type="button"
            onClick={() => onPreview(pub)}
            className="px-4 py-2 rounded-full bg-white text-[#0B3025] hover:bg-[#F47B2A] hover:text-white text-xs font-bold shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-1.5"
          >
            <ExternalLinkIcon size={13} />
            <span>{"Read / Preview"}</span>
          </button>
        </div>
      </div>

      {/* ── Book Card Body ── */}
      <div className="flex flex-col flex-1 p-5 justify-between space-y-3">
        <div className="space-y-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#F47B2A] font-mono block">
            {pub.category}
          </span>

          <h3
            className="font-heading font-extrabold text-base text-[#0B3025] leading-snug group-hover:text-[#F47B2A] transition-colors line-clamp-2"
            title={displayTitle}
          >
            {displayTitle}
          </h3>

          {secondaryTitle && (
            <p className="text-xs text-neutral-500 font-body line-clamp-1">
              {secondaryTitle}
            </p>
          )}

          <p className="text-xs text-neutral-600 line-clamp-3 leading-relaxed font-body pt-1">
            {pub.description}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-3 border-t border-neutral-100 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => onPreview(pub)}
            className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-neutral-50 hover:bg-neutral-100 text-[#0B3025] border border-neutral-200 hover:border-neutral-300 text-xs font-semibold transition-all"
          >
            <ExternalLinkIcon size={12} />
            <span>{"Preview"}</span>
          </button>

          <a
            href={pub.fileUrl}
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

/* ─── Main Publications Page Component ─── */
export default function PublicationsPage() {
  const { isGujarati } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [previewDoc, setPreviewDoc] = useState<PreviewDocument | null>(null);

  // Featured publication: "Story Book: Arti & The Tooth Fairy"
  const featuredPublication = OFFICIAL_PUBLICATIONS[0];

  // Simplified natural category filters
  const filterTabs = useMemo(() => {
    const storyCount = OFFICIAL_PUBLICATIONS.filter((p) => p.groupCategory === "storybooks").length;
    const manualCount = OFFICIAL_PUBLICATIONS.filter((p) => p.groupCategory === "manuals").length;

    return [
      {
        key: "All",
        labelEn: "All Publications",
        
        count: OFFICIAL_PUBLICATIONS.length,
      },
      {
        key: "storybooks",
        labelEn: "Storybooks & Literature",
        
        count: storyCount,
      },
      {
        key: "manuals",
        labelEn: "Teaching & Training Manuals",
        
        count: manualCount,
      },
    ];
  }, []);

  // Filtered publications list
  const filteredPublications = useMemo(() => {
    return OFFICIAL_PUBLICATIONS.filter((doc) => {
      const matchesCategory =
        activeCategory === "All" || doc.groupCategory === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        doc.title.toLowerCase().includes(q) ||
        (doc.titleGu && doc.titleGu.toLowerCase().includes(q)) ||
        doc.category.toLowerCase().includes(q) ||
        (doc.categoryGu && doc.categoryGu.toLowerCase().includes(q)) ||
        doc.groupCategoryEn.toLowerCase().includes(q) ||
        (doc.description && doc.description.toLowerCase().includes(q)) ||
        (doc.descriptionGu && doc.descriptionGu.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Modal navigation handlers
  const handleNextDoc = useCallback(() => {
    if (!previewDoc) return;
    const idx = filteredPublications.findIndex((d) => d.id === previewDoc.id);
    if (idx !== -1) {
      setPreviewDoc(filteredPublications[(idx + 1) % filteredPublications.length]);
    }
  }, [previewDoc, filteredPublications]);

  const handlePrevDoc = useCallback(() => {
    if (!previewDoc) return;
    const idx = filteredPublications.findIndex((d) => d.id === previewDoc.id);
    if (idx !== -1) {
      setPreviewDoc(filteredPublications[(idx - 1 + filteredPublications.length) % filteredPublications.length]);
    }
  }, [previewDoc, filteredPublications]);

  return (
    <main id="main-content" className="pt-32 sm:pt-36 lg:pt-40 pb-20 bg-cream min-h-screen">
      {/* ════════════════════════════════════
          1. COMPACT EDITORIAL HERO
      ════════════════════════════════════ */}
      <section className="relative bg-[#0B3025] text-white overflow-hidden py-12 sm:py-16">
        {/* Subtle geometric circles */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
          <div className="absolute -top-12 -right-12 w-96 h-96 rounded-full border-2 border-white" />
          <div className="absolute bottom-0 left-10 w-72 h-72 rounded-full border border-white" />
        </div>

        <div className="relative z-10 container-wide section-padding max-w-6xl mx-auto space-y-4">
          <div className="max-w-3xl space-y-2">
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Publications
            </h1>
            <p className="font-body text-xs sm:text-sm text-white/85 leading-relaxed max-w-2xl">
              {"Explore field-tested health pedagogical manuals, illustrated children's storybooks, Gujarati poem collections, and official institutional operating guidelines."}
            </p>
          </div>

          {/* Quick Badges */}
          <div className="pt-1 flex flex-wrap items-center gap-2.5 text-xs">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.08] border border-white/[0.12] text-white">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>{"100% Free Public Access"}</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.08] border border-white/[0.12] text-white">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>{"Official Verified PDFs"}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Shared Media Sub-Navigation */}
      <MediaSubNav activeTab="publications" />

      {/* Main Container */}
      <div className="container-wide section-padding max-w-6xl mx-auto space-y-10 sm:space-y-12 mt-8 sm:mt-10">

        {/* ════════════════════════════════════
            2. FEATURED PUBLICATION SHOWCASE
            (Story Book: Arti & The Tooth Fairy)
        ════════════════════════════════════ */}
        <section aria-label="Featured Publication">
          <div className="bg-white rounded-3xl border border-neutral-200/90 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
            <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8 p-6 sm:p-8 lg:p-10">
              {/* Actual Book Cover Display */}
              <div
                className="relative w-48 sm:w-56 md:w-64 aspect-[3/4] bg-neutral-100 rounded-2xl overflow-hidden shadow-xl shrink-0 cursor-pointer group border border-neutral-200 select-none"
                onClick={() => setPreviewDoc(featuredPublication)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setPreviewDoc(featuredPublication);
                  }
                }}
                aria-label={`Preview featured storybook: ${featuredPublication.title}`}
              >
                {/* Book spine on left */}
                <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-black/25 via-black/10 to-transparent z-10" />

                <Image
                  src={featuredPublication.coverImage}
                  alt={featuredPublication.title}
                  fill
                  priority
                  sizes="(max-width: 768px) 256px, 300px"
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20">
                  <span className="px-4 py-2 rounded-full bg-white text-[#0B3025] text-xs font-bold shadow-lg flex items-center gap-1.5">
                    <ExternalLinkIcon size={13} />
                    <span>{"Quick Preview"}</span>
                  </span>
                </div>
              </div>

              {/* Featured Book Content */}
              <div className="flex-1 space-y-4 text-left">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#F47B2A] text-white text-[11px] font-bold uppercase tracking-wider shadow-xs">
                      {"Featured Publication"}
                    </span>
                    <span className="text-xs font-mono font-semibold text-neutral-500">
                      {featuredPublication.size} • PDF
                    </span>
                  </div>

                  <h2 className="font-heading text-xl sm:text-2xl md:text-3xl font-extrabold text-[#0B3025] leading-snug">
                    {featuredPublication.title}
                  </h2>

                  {featuredPublication.titleGu && (
                    <p className="text-xs text-neutral-500 font-body">
                      {featuredPublication.titleGu}
                    </p>
                  )}
                </div>

                <p className="font-body text-xs sm:text-sm text-neutral-700 leading-relaxed">
                  {featuredPublication.description}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setPreviewDoc(featuredPublication)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0B3025] hover:bg-[#174B38] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all"
                  >
                    <ExternalLinkIcon size={14} />
                    <span>{"Read Storybook (Preview)"}</span>
                  </button>

                  <a
                    href={featuredPublication.fileUrl}
                    download
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#F47B2A] hover:bg-[#E06A1B] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all"
                  >
                    <DownloadIcon size={14} />
                    <span>{"Download PDF"}</span>
                  </a>

                  <span className="text-xs text-emerald-800 font-medium flex items-center gap-1.5 font-mono">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                    {"Official Published Storybook"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════
            3. SEARCH & SIMPLIFIED CATEGORY FILTERS
        ════════════════════════════════════ */}
        <section aria-label="Publications Library Toolbar" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <div>
              <span className="text-[#F47B2A] font-bold text-xs uppercase tracking-widest block mb-1">
                {"Digital Library"}
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#0B3025]">
                Publications
              </h2>
            </div>
            <div className="text-xs text-neutral-500 font-medium">
              <span>{"Showing: "}</span>
              <strong className="text-[#0B3025] font-bold">{filteredPublications.length}</strong>
              <span> of {OFFICIAL_PUBLICATIONS.length} publications</span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-xs space-y-3">
            {/* Search Input */}
            <div className="relative">
              <SearchIcon
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={"Search publications by title, category, or keywords..."}
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

            {/* Simplified Category Filter Chips */}
            <div
              role="group"
              aria-label="Filter publications by category"
              className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none snap-x snap-mandatory flex-nowrap"
            >
              {filterTabs.map((tab) => {
                const isActive = activeCategory === tab.key;

                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveCategory(tab.key)}
                    aria-pressed={isActive}
                    className={`snap-start shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 ${
                      isActive
                        ? "bg-[#0B3025] text-white shadow-xs"
                        : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                    }`}
                  >
                    <span>{tab.labelEn}</span>
                    <span
                      className={`text-[10px] rounded-full px-1.5 py-0.2 font-mono font-bold ${
                        isActive ? "bg-white/20 text-white" : "bg-white text-neutral-600"
                      }`}
                    >
                      {tab.count}
                    </span>
                  </button>
                );
              })}

              {(activeCategory !== "All" || searchQuery) && (
                <button
                  type="button"
                  onClick={() => {
                    setActiveCategory("All");
                    setSearchQuery("");
                  }}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold text-[#F47B2A] hover:bg-amber-50 transition-colors shrink-0"
                >
                  {"Clear Filters"}
                </button>
              )}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════
            4. PUBLICATION CARDS GRID (ALL 5)
        ════════════════════════════════════ */}
        <section aria-label="Publications Grid">
          {filteredPublications.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {filteredPublications.map((pub) => (
                <PublicationCard
                  key={pub.id}
                  pub={pub}
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
                  {"No Publications Found"}
                </h3>
                <p className="text-xs text-neutral-500">
                  {"No publications match your selected category or search keyword."}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setActiveCategory("All");
                  setSearchQuery("");
                }}
                className="px-5 py-2.5 rounded-xl bg-[#0B3025] hover:bg-[#174B38] text-white text-xs font-bold transition-all shadow-xs"
              >
                {"View All Publications"}
              </button>
            </div>
          )}
        </section>

        {/* ════════════════════════════════════
            5. GOVERNANCE RESOURCES & CROSS-MEDIA CTA
        ════════════════════════════════════ */}
        <section
          aria-labelledby="governance-cta-heading"
          className="rounded-3xl bg-[#0B3025] text-white p-7 sm:p-9 shadow-lg border border-white/10"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
            <div className="space-y-2 max-w-xl text-center md:text-left">
              <span className="text-[11px] uppercase tracking-wider text-[#F47B2A] font-bold">
                {"Official Governance & Transparency"}
              </span>
              <h3 id="governance-cta-heading" className="font-heading text-xl sm:text-2xl font-bold text-white">
                {"Looking for Reports?"}
              </h3>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-body">
                {"Explore 13+ years of audited annual balance sheets, chartered accountant reports, foreign contribution filings, and our organization brochure."}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
              <Link
                href="/resources"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F47B2A] hover:bg-[#E06A1B] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all"
              >
                <ReceiptTextIcon size={15} />
                <span>{"Explore Reports (32 Documents) →"}</span>
              </Link>

              <Link
                href="/gallery"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 transition-all"
              >
                <CameraIcon size={15} />
                <span>{"Photo Gallery"}</span>
              </Link>

              <Link
                href="/videos"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 transition-all"
              >
                <YoutubeIcon size={15} />
                <span>{"Video Gallery"}</span>
              </Link>
            </div>
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
