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
  groupCategoryGu: string;
  coverImage: string;
  badgeEn: string;
  badgeGu: string;
})[] = [
  {
    id: "pub-arti",
    title: "Story Book: Arti & The Tooth Fairy",
    titleGu: "વાર્તા પુસ્તક: આરતી અને દાંતની પરી",
    category: "Child Health & Storytelling",
    categoryGu: "બાળ આરોગ્ય અને બાળવાર્તા",
    groupCategory: "storybooks",
    groupCategoryEn: "Storybooks & Children's Literature",
    groupCategoryGu: "બાળવાર્તા અને બાળ સાહિત્ય",
    size: "12.76 MB",
    fileUrl: "/publications/Story-Book-Arti-Tooth-Fairy.pdf",
    coverImage: "/publications/covers/Story-Book-Arti-Tooth-Fairy.jpg",
    badgeEn: "Illustrated Storybook",
    badgeGu: "સચિત્ર બાળવાર્તા",
    description:
      "Colorful illustrated children’s storybook encouraging joyful dental hygiene habits, regular brushing techniques, and cavity prevention among primary students.",
    descriptionGu:
      "પ્રાથમિક શાળા અને આંગણવાડી બાળકોમાં દાંતની સ્વચ્છતા, યોગ્ય બ્રશિંગ અને કાળજી અંગેની રંગબેરંગી ચિત્રવાર્તા પુસ્તિકા.",
  },
  {
    id: "pub-tlm",
    title: "Dental Health Teaching Learning Material (TLM) Book",
    titleGu: "ડેન્ટલ હેલ્થ શિક્ષણ-શિક્ષણ સામગ્રી (TLM) પુસ્તિકા",
    category: "Pedagogy & Healthcare",
    categoryGu: "શિક્ષણ અને આરોગ્ય",
    groupCategory: "manuals",
    groupCategoryEn: "Teaching & Training Manuals",
    groupCategoryGu: "શિક્ષણ અને તાલીમ માર્ગદર્શિકાઓ",
    size: "1.31 MB",
    fileUrl: "/publications/DH-TLM-book-English.pdf",
    coverImage: "/publications/covers/DH-TLM-book-English.jpg",
    badgeEn: "Educator Manual",
    badgeGu: "શિક્ષક માર્ગદર્શિકા",
    description:
      "Comprehensive English teaching-learning manual designed for educators, teachers, and health mobilizers to deliver interactive dental hygiene pedagogy.",
    descriptionGu:
      "શિક્ષકો અને ક્ષેત્રીય આરોગ્ય કાર્યકરો માટે દાંતની સ્વચ્છતા અને શિક્ષણ પદ્ધતિ અંગેની વ્યાપક માર્ગદર્શિકા પુસ્તિકા.",
  },
  {
    id: "pub-mano-prem-asha",
    title: "Maa No Prem Children’s Rhymes & Poem Book",
    titleGu: "મા નો પ્રેમ — બાળગીતો અને કવિતા સંગ્રહ",
    category: "Early Childhood Literature",
    categoryGu: "બાળ સાહિત્ય અને બાળગીતો",
    groupCategory: "storybooks",
    groupCategoryEn: "Storybooks & Children's Literature",
    groupCategoryGu: "બાળવાર્તા અને બાળ સાહિત્ય",
    size: "1.67 MB",
    fileUrl: "/publications/Ma-no-Prem-Poem-book-asha.pdf",
    coverImage: "/publications/covers/Ma-no-Prem-Poem-book-asha.jpg",
    badgeEn: "Gujarati Rhymes",
    badgeGu: "બાળગીતો અને કવિતા",
    description:
      "Illustrated Gujarati rhymes and emotional verses celebrating motherly affection, family values, and early childhood learning in rural Gujarat.",
    descriptionGu:
      "માતૃપ્રેમ, કૌટુંબિક સંસ્કાર અને પૂર્વ-પ્રાથમિક બાળ શિક્ષણને પ્રોત્સાહિત કરતી સચિત્ર ગુજરાતી કવિતાઓ અને બાળગીતોનો સંગ્રહ.",
  },
  {
    id: "pub-mano-prem-makvana",
    title: "Maa No Prem Poem Collection (Special Edition)",
    titleGu: "મા નો પ્રેમ કાવ્ય સંગ્રહ (વિશેષ આવૃત્તિ)",
    category: "Poetry & Literature",
    categoryGu: "કાવ્ય સાહિત્ય",
    groupCategory: "storybooks",
    groupCategoryEn: "Storybooks & Children's Literature",
    groupCategoryGu: "બાળવાર્તા અને બાળ સાહિત્ય",
    size: "0.09 MB",
    fileUrl: "/publications/Ma-no-Prem-Poem-book-asha-makvana.pdf",
    coverImage: "/publications/covers/Ma-no-Prem-Poem-book-asha-makvana.jpg",
    badgeEn: "Special Poetry Edition",
    badgeGu: "વિશેષ કાવ્ય આવૃત્તિ",
    description:
      "Dedicated poetic verses and educational reflections authored by grassroots contributor Asha Makvana supporting village learning.",
    descriptionGu:
      "ક્ષેત્રીય સાથી આશા મકવાણા દ્વારા રચિત પ્રેરક કાવ્યો અને શિક્ષણલક્ષી પંક્તિઓનો વિશેષ સંગ્રહ.",
  },
  {
    id: "pub-manual",
    title: "Swadeep Organizational Manual & Operational Guidelines",
    titleGu: "સ્વદીપ સંસ્થાકીય માર્ગદર્શિકા અને સંચાલન નિયમાવલી",
    category: "Governance & SOPs",
    categoryGu: "સંચાલન અને નીતિનિયમો",
    groupCategory: "manuals",
    groupCategoryEn: "Teaching & Training Manuals",
    groupCategoryGu: "શિક્ષણ અને તાલીમ માર્ગદર્શિકાઓ",
    size: "0.67 MB",
    fileUrl: "/publications/organizational-manual-swadeep-18.04.23.pdf",
    coverImage: "/publications/covers/organizational-manual-swadeep-18.04.23.jpg",
    badgeEn: "SOP & Governance",
    badgeGu: "સંચાલન નિયમાવલી",
    description:
      "Official institutional standard operating procedures, personnel policies, field management frameworks, and transparency protocols.",
    descriptionGu:
      "સંસ્થાની સ્ટાન્ડર્ડ ઓપરેટિંગ પ્રોસિજર્સ (SOPs), કર્મચારી નીતિઓ, ક્ષેત્રીય પ્રોટોકોલ અને વહીવટી પારદર્શિતા માર્ગદર્શિકા.",
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
  const displayTitle = isGujarati && pub.titleGu ? pub.titleGu : pub.title;
  const secondaryTitle = isGujarati && pub.titleGu ? pub.title : pub.titleGu;
  const displayBadge = isGujarati ? pub.badgeGu : pub.badgeEn;

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
            <span>{isGujarati ? "વાંચો / પ્રીવ્યૂ" : "Read / Preview"}</span>
          </button>
        </div>
      </div>

      {/* ── Book Card Body ── */}
      <div className="flex flex-col flex-1 p-5 justify-between space-y-3">
        <div className="space-y-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#F47B2A] font-mono block">
            {isGujarati ? pub.categoryGu : pub.category}
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
            {isGujarati && pub.descriptionGu ? pub.descriptionGu : pub.description}
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
            <span>{isGujarati ? "વાંચો" : "Preview"}</span>
          </button>

          <a
            href={pub.fileUrl}
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
        labelGu: "તમામ પ્રકાશનો",
        count: OFFICIAL_PUBLICATIONS.length,
      },
      {
        key: "storybooks",
        labelEn: "Storybooks & Literature",
        labelGu: "બાળવાર્તા અને બાળસાહિત્ય",
        count: storyCount,
      },
      {
        key: "manuals",
        labelEn: "Teaching & Training Manuals",
        labelGu: "શિક્ષણ અને સંચાલન માર્ગદર્શિકા",
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
    <main id="main-content" className="pt-24 sm:pt-28 pb-20 bg-cream min-h-screen">
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
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#F47B2A]/15 border border-[#F47B2A]/30 text-[#F47B2A]">
              <BookOpenIcon size={14} />
              <span>{isGujarati ? "શૈક્ષણિક સાહિત્ય અને પુસ્તિકાઓ" : "PUBLICATIONS & LEARNING RESOURCES"}</span>
            </span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/80 text-xs font-semibold font-mono">
              5 {isGujarati ? "પ્રમાણિત ક્ષેત્રીય પુસ્તકો" : "Verified Field Publications"}
            </span>
          </div>

          <div className="max-w-3xl space-y-2">
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {isGujarati ? "શૈક્ષણિક પ્રકાશનો અને સંસાધનો" : "Publications & Learning Resources"}
            </h1>
            <p className="font-body text-xs sm:text-sm text-white/85 leading-relaxed max-w-2xl">
              {isGujarati
                ? "બાળકો, શિક્ષકો અને ક્ષેત્રીય કાર્યકરો માટે તૈયાર કરાયેલ ડેન્ટલ હાઇજીન માર્ગદર્શિકા, સચિત્ર બાળવાર્તાઓ, કાવ્ય સંગ્રહો અને સંસ્થાકીય નીતિ નિયમાવલી."
                : "Explore field-tested health pedagogical manuals, illustrated children's storybooks, Gujarati poem collections, and official institutional operating guidelines."}
            </p>
          </div>

          {/* Quick Badges */}
          <div className="pt-1 flex flex-wrap items-center gap-2.5 text-xs">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.08] border border-white/[0.12] text-white">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>{isGujarati ? "૧૦૦% સાર્વજનિક સુલભતા" : "100% Free Public Access"}</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.08] border border-white/[0.12] text-white">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>{isGujarati ? "સત્તાવાર પીડીએફ દસ્તાવેજો" : "Official Verified PDFs"}</span>
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
                    <span>{isGujarati ? "વાંચો / પ્રીવ્યૂ" : "Quick Preview"}</span>
                  </span>
                </div>
              </div>

              {/* Featured Book Content */}
              <div className="flex-1 space-y-4 text-left">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#F47B2A] text-white text-[11px] font-bold uppercase tracking-wider shadow-xs">
                      {isGujarati ? "વિશેષ બાળવાર્તા પ્રકાશન" : "Featured Publication"}
                    </span>
                    <span className="text-xs font-mono font-semibold text-neutral-500">
                      {featuredPublication.size} • PDF
                    </span>
                  </div>

                  <h2 className="font-heading text-xl sm:text-2xl md:text-3xl font-extrabold text-[#0B3025] leading-snug">
                    {isGujarati ? featuredPublication.titleGu : featuredPublication.title}
                  </h2>

                  {featuredPublication.titleGu && (
                    <p className="text-xs text-neutral-500 font-body">
                      {isGujarati ? featuredPublication.title : featuredPublication.titleGu}
                    </p>
                  )}
                </div>

                <p className="font-body text-xs sm:text-sm text-neutral-700 leading-relaxed">
                  {isGujarati ? featuredPublication.descriptionGu : featuredPublication.description}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setPreviewDoc(featuredPublication)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0B3025] hover:bg-[#174B38] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all"
                  >
                    <ExternalLinkIcon size={14} />
                    <span>{isGujarati ? "વાર્તાપુસ્તક વાંચો (Preview)" : "Read Storybook (Preview)"}</span>
                  </button>

                  <a
                    href={featuredPublication.fileUrl}
                    download
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#F47B2A] hover:bg-[#E06A1B] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all"
                  >
                    <DownloadIcon size={14} />
                    <span>{isGujarati ? "ડાઉનલોડ કરો (PDF)" : "Download PDF"}</span>
                  </a>

                  <span className="text-xs text-emerald-800 font-medium flex items-center gap-1.5 font-mono">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                    {isGujarati ? "સત્તાવાર પ્રકાશિત પુસ્તિકા" : "Official Published Storybook"}
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
                {isGujarati ? "પ્રકાશન સંગ્રહ" : "Digital Library"}
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#0B3025]">
                {isGujarati ? "તમામ અધિકૃત પુસ્તકો અને માર્ગદર્શિકાઓ" : "Official Educational Publications"}
              </h2>
            </div>
            <div className="text-xs text-neutral-500 font-medium">
              <span>{isGujarati ? "દર્શાવેલ: " : "Showing: "}</span>
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
                placeholder={isGujarati ? "પુસ્તિકાનું નામ, વિષય અથવા લેખક શોધો..." : "Search publications by title, category, or keywords..."}
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
                    <span>{isGujarati ? tab.labelGu : tab.labelEn}</span>
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
                  {isGujarati ? "ફિલ્ટર્સ સાફ કરો" : "Clear Filters"}
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
                  {isGujarati ? "કોઈ પ્રકાશન મળ્યું નથી" : "No Publications Found"}
                </h3>
                <p className="text-xs text-neutral-500">
                  {isGujarati
                    ? "તમારી શોધ માટે કોઈ સાહિત્ય મળ્યું નથી. કૃપા કરીને અન્ય શોધ શબ્દ અજમાવો."
                    : "No publications match your selected category or search keyword."}
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
                {isGujarati ? "બધા પ્રકાશનો બતાવો" : "View All Publications"}
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
                {isGujarati ? "સત્તાવાર શાસન અને પારદર્શિતા" : "Official Governance & Transparency"}
              </span>
              <h3 id="governance-cta-heading" className="font-heading text-xl sm:text-2xl font-bold text-white">
                {isGujarati ? "વાર્ષિક અહેવાલો, ઓડિટ અને એફસીઆરએ" : "Looking for Statutory Reports & Audits?"}
              </h3>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-body">
                {isGujarati
                  ? "સ્વદીપના છેલ્લા ૧૩ વર્ષના વાર્ષિક અહેવાલો, સનદી હિસાબી ઓડિટ રિપોર્ટ્સ, FCRA ખાતાઓ અને સત્તાવાર સંસ્થાકીય બ્રોશર જુઓ."
                  : "Explore 13+ years of audited annual balance sheets, chartered accountant reports, foreign contribution filings, and our organization brochure."}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
              <Link
                href="/resources"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F47B2A] hover:bg-[#E06A1B] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all"
              >
                <ReceiptTextIcon size={15} />
                <span>{isGujarati ? "૩૨ અહેવાલો જુઓ →" : "Explore Reports (32 Documents) →"}</span>
              </Link>

              <Link
                href="/gallery"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 transition-all"
              >
                <CameraIcon size={15} />
                <span>{isGujarati ? "ફોટો ગેલેરી" : "Photo Gallery"}</span>
              </Link>

              <Link
                href="/videos"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 transition-all"
              >
                <YoutubeIcon size={15} />
                <span>{isGujarati ? "વિડીયો ગેલેરી" : "Video Gallery"}</span>
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
