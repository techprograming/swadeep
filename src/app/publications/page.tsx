"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { BookOpenIcon, DownloadIcon, ExternalLinkIcon, SearchIcon, CameraIcon, YoutubeIcon, ReceiptTextIcon } from "@/components/ui/Icons";
import DocumentCard from "@/components/ui/DocumentCard";
import DocumentPreviewModal, { PreviewDocument } from "@/components/ui/DocumentPreviewModal";
import MediaSubNav from "@/components/ui/MediaSubNav";

const OFFICIAL_PUBLICATIONS: PreviewDocument[] = [
  {
    id: "pub-1",
    title: "Dental Health Teaching Learning Material (TLM) Book",
    titleGu: "ડેન્ટલ હેલ્થ શિક્ષણ-શિક્ષણ સામગ્રી (TLM) પુસ્તિકા",
    category: "Pedagogy & Healthcare",
    categoryGu: "શિક્ષણ અને આરોગ્ય",
    size: "1.31 MB",
    fileUrl: "/publications/DH-TLM-book-English.pdf",
    description:
      "Comprehensive English teaching-learning manual designed for educators, teachers, and health mobilizers to deliver interactive dental hygiene pedagogy.",
    descriptionGu:
      "શિક્ષકો અને ક્ષેત્રીય આરોગ્ય કાર્યકરો માટે દાંતની સ્વચ્છતા અને શિક્ષણ પદ્ધતિ અંગેની વ્યાપક માર્ગદર્શિકા પુસ્તિકા.",
  },
  {
    id: "pub-2",
    title: "Story Book: Arti & The Tooth Fairy",
    titleGu: "વાર્તા પુસ્તક: આરતી અને દાંતની પરી",
    category: "Child Health & Storytelling",
    categoryGu: "બાળ આરોગ્ય અને બાળવાર્તા",
    size: "12.76 MB",
    fileUrl: "/publications/Story-Book-Arti-Tooth-Fairy.pdf",
    description:
      "Colorful illustrated children’s storybook encouraging joyful dental hygiene habits, regular brushing techniques, and cavity prevention among primary students.",
    descriptionGu:
      "પ્રાથમિક શાળા અને આંગણવાડી બાળકોમાં દાંતની સ્વચ્છતા, યોગ્ય બ્રશિંગ અને કાળજી અંગેની રંગબેરંગી ચિત્રવાર્તા પુસ્તિકા.",
  },
  {
    id: "pub-3",
    title: "Maa No Prem Children’s Rhymes & Poem Book",
    titleGu: "મા નો પ્રેમ — બાળગીતો અને કવિતા સંગ્રહ",
    category: "Early Childhood Literature",
    categoryGu: "બાળ સાહિત્ય અને બાળગીતો",
    size: "1.67 MB",
    fileUrl: "/publications/Ma-no-Prem-Poem-book-asha.pdf",
    description:
      "Illustrated Gujarati rhymes and emotional verses celebrating motherly affection, family values, and early childhood learning in rural Gujarat.",
    descriptionGu:
      "માતૃપ્રેમ, કૌટુંબિક સંસ્કાર અને પૂર્વ-પ્રાથમિક બાળ શિક્ષણને પ્રોત્સાહિત કરતી સચિત્ર ગુજરાતી કવિતાઓ અને બાળગીતોનો સંગ્રહ.",
  },
  {
    id: "pub-4",
    title: "Maa No Prem Poem Collection (Special Edition)",
    titleGu: "મા નો પ્રેમ કાવ્ય સંગ્રહ (વિશેષ આવૃત્તિ)",
    category: "Poetry & Literature",
    categoryGu: "કાવ્ય સાહિત્ય",
    size: "0.09 MB",
    fileUrl: "/publications/Ma-no-Prem-Poem-book-asha-makvana.pdf",
    description:
      "Dedicated poetic verses and educational reflections authored by grassroots contributor Asha Makvana supporting village learning.",
    descriptionGu:
      "ક્ષેત્રીય સાથી આશા મકવાણા દ્વારા રચિત પ્રેરક કાવ્યો અને શિક્ષણલક્ષી પંક્તિઓનો વિશેષ સંગ્રહ.",
  },
  {
    id: "pub-5",
    title: "Swadeep Organizational Manual & Operational Guidelines",
    titleGu: "સ્વદીપ સંસ્થાકીય માર્ગદર્શિકા અને સંચાલન નિયમાવલી",
    category: "Governance & SOPs",
    categoryGu: "સંચાલન અને નીતિનિયમો",
    size: "0.67 MB",
    fileUrl: "/publications/organizational-manual-swadeep-18.04.23.pdf",
    description:
      "Official institutional standard operating procedures, personnel policies, field management frameworks, and transparency protocols.",
    descriptionGu:
      "સંસ્થાની સ્ટાન્ડર્ડ ઓપરેટિંગ પ્રોસિજર્સ (SOPs), કર્મચારી નીતિઓ, ક્ષેત્રીય પ્રોટોકોલ અને વહીવટી પારદર્શિતા માર્ગદર્શિકા.",
  },
];

export default function PublicationsPage() {
  const { isGujarati } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [previewDoc, setPreviewDoc] = useState<PreviewDocument | null>(null);

  // Featured publication is the illustrated children's storybook
  const featuredPublication = OFFICIAL_PUBLICATIONS[1];

  // Distinct categories with counts
  const categories = useMemo(() => {
    const list: { key: string; labelEn: string; labelGu: string; count: number }[] = [
      {
        key: "All",
        labelEn: "All Publications",
        labelGu: "તમામ પ્રકાશનો",
        count: OFFICIAL_PUBLICATIONS.length,
      },
    ];

    OFFICIAL_PUBLICATIONS.forEach((doc) => {
      const existing = list.find((c) => c.key === doc.category);
      if (existing) {
        existing.count += 1;
      } else {
        list.push({
          key: doc.category,
          labelEn: doc.category,
          labelGu: doc.categoryGu || doc.category,
          count: 1,
        });
      }
    });

    return list;
  }, []);

  // Filtered publications
  const filteredPublications = useMemo(() => {
    return OFFICIAL_PUBLICATIONS.filter((doc) => {
      const matchesCategory = activeCategory === "All" || doc.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        doc.title.toLowerCase().includes(q) ||
        (doc.titleGu && doc.titleGu.toLowerCase().includes(q)) ||
        doc.category.toLowerCase().includes(q) ||
        (doc.description && doc.description.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <main id="main-content" className="pt-24 sm:pt-28 pb-20 bg-cream min-h-screen">
      {/* 1. Hero Section */}
      <section className="bg-gradient-to-r from-[#0B3025] via-[#174B38] to-[#205943] text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="container-wide section-padding relative z-10 max-w-6xl mx-auto space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 border border-white/20 text-[#F47B2A]">
              {isGujarati ? "શૈક્ષણિક સાહિત્ય અને પુસ્તિકાઓ" : "PUBLICATIONS & LEARNING KITS"}
            </span>
            <span className="text-white/60 text-xs">•</span>
            <span className="text-white/80 text-xs font-medium">
              {isGujarati ? "૫ પ્રમાણિત ક્ષેત્રીય પુસ્તકો" : "5 Verified Field Publications"}
            </span>
          </div>

          <div className="space-y-3 max-w-3xl">
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              {isGujarati ? "સ્વદીપ શૈક્ષણિક પ્રકાશનો અને સાહિત્ય" : "Official Publications & Learning Materials"}
            </h1>
            <p className="font-body text-base sm:text-lg text-white/90 leading-relaxed">
              {isGujarati
                ? "બાળકો, શિક્ષકો અને ક્ષેત્રીય કાર્યકરો માટે તૈયાર કરાયેલ ડેન્ટલ હાઇજીન માર્ગદર્શિકા, સચિત્ર બાળવાર્તાઓ, કાવ્ય સંગ્રહો અને સંસ્થાકીય નીતિ નિયમાવલી."
                : "Explore field-tested health pedagogical manuals, illustrated children's storybooks, Gujarati poem collections, and official institutional operating guidelines."}
            </p>
          </div>

          {/* Quick Stats & Badges */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-xs border border-white/15 text-xs text-white">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>{isGujarati ? "૧૦૦% જાહેર સુલભતા" : "100% Free Public Access"}</span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-xs border border-white/15 text-xs text-white">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>{isGujarati ? "સત્તાવાર પીડીએફ ડાઉનલોડ" : "Official Verified PDFs"}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Shared Media Sub-Navigation */}
      <MediaSubNav activeTab="publications" />

      {/* Main Container */}
      <div className="container-wide section-padding max-w-6xl mx-auto space-y-12 mt-10">
        {/* 2. Featured Publication Showcase Banner */}
        <section aria-label="Featured Publication">
          <div className="relative overflow-hidden rounded-3xl bg-white border border-forest/15 shadow-sm hover:shadow-md transition-shadow p-6 sm:p-8 md:p-10 flex flex-col md:flex-row items-center gap-8">
            {/* Visual Icon Badge */}
            <div className="w-full md:w-1/3 shrink-0 flex flex-col items-center justify-center p-8 rounded-2xl bg-gradient-to-br from-amber-500/10 via-[#F47B2A]/10 to-[#0B3025]/5 border border-amber-200/60 text-center space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-[#0B3025] text-[#F47B2A] flex items-center justify-center shadow-md">
                <BookOpenIcon className="w-8 h-8" />
              </div>
              <span className="px-3 py-1 rounded-full bg-[#0B3025] text-white text-[11px] font-bold uppercase tracking-wider">
                {isGujarati ? "વિશેષ પ્રકાશન" : "Featured Publication"}
              </span>
              <p className="font-mono text-xs text-charcoal/70">
                {featuredPublication.size} • PDF Document
              </p>
            </div>

            {/* Featured Content & CTAs */}
            <div className="w-full md:w-2/3 space-y-4 text-left">
              <div className="space-y-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#F47B2A]">
                  {isGujarati ? featuredPublication.categoryGu : featuredPublication.category}
                </span>
                <h2 className="font-heading text-xl sm:text-2xl md:text-3xl font-extrabold text-[#0B3025] leading-snug">
                  {isGujarati ? featuredPublication.titleGu : featuredPublication.title}
                </h2>
              </div>

              <p className="font-body text-sm sm:text-base text-charcoal/80 leading-relaxed">
                {isGujarati ? featuredPublication.descriptionGu : featuredPublication.description}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setPreviewDoc(featuredPublication)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0B3025] hover:bg-[#174B38] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all"
                >
                  <ExternalLinkIcon size={14} />
                  <span>{isGujarati ? "દસ્તાવેજ વાંચો (Preview)" : "Read Document (Preview)"}</span>
                </button>

                <a
                  href={featuredPublication.fileUrl}
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

        {/* 3. Search and Category Filter Toolbar */}
        <section className="space-y-4" aria-label="Publications Library Toolbar">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-3xl border border-forest/10 shadow-xs">
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
                placeholder={isGujarati ? "પુસ્તિકા અથવા વિષય શોધો..." : "Search publications by title or topic..."}
                className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-cream/50 border border-forest/15 text-xs sm:text-sm text-charcoal placeholder:text-charcoal/45 focus:outline-none focus:ring-2 focus:ring-[#F47B2A] transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-charcoal/50 hover:text-charcoal"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Total Results Summary */}
            <div className="text-xs text-charcoal/70 font-medium px-2 shrink-0">
              <span>{isGujarati ? "પરિણામો: " : "Showing: "}</span>
              <strong className="text-[#0B3025] font-bold">{filteredPublications.length}</strong>
              <span> of {OFFICIAL_PUBLICATIONS.length}</span>
            </div>
          </div>

          {/* Category Filter Pills */}
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

            {(activeCategory !== "All" || searchQuery) && (
              <button
                type="button"
                onClick={() => {
                  setActiveCategory("All");
                  setSearchQuery("");
                }}
                className="px-3.5 py-2 rounded-full text-xs font-semibold text-[#F47B2A] hover:bg-amber-50 transition-colors"
              >
                {isGujarati ? "ફિલ્ટર્સ સાફ કરો (Clear)" : "Clear Filters"}
              </button>
            )}
          </div>
        </section>

        {/* 4. Publications Document Cards Grid */}
        <section aria-label="Publications Grid">
          {filteredPublications.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPublications.map((doc) => (
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
                  {isGujarati ? "કોઈ પ્રકાશન મળ્યું નથી" : "No Publications Found"}
                </h3>
                <p className="text-xs text-charcoal/70">
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
                className="px-4 py-2 rounded-full bg-[#0B3025] hover:bg-[#174B38] text-white text-xs font-bold transition-all"
              >
                {isGujarati ? "બધા પ્રકાશનો બતાવો" : "View All Publications"}
              </button>
            </div>
          )}
        </section>

        {/* 5. Institutional Support & Media Discovery Callout */}
        <section className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#0B3025] via-[#174B38] to-[#0B3025] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md border border-white/10">
          <div className="space-y-2 max-w-xl text-left">
            <span className="text-xs uppercase tracking-wider text-[#F47B2A] font-bold">
              {isGujarati ? "સ્વદીપ દસ્તાવેજ કેન્દ્ર" : "Swadeep Digital Knowledge Center"}
            </span>
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-white">
              {isGujarati ? "વાર્ષિક હિસાબો, તસ્વીરો અને વિડીયો જુઓ" : "Looking for Statutory Audits, Photos, or Videos?"}
            </h3>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-body">
              {isGujarati
                ? "સ્વદીપના છેલ્લા ૧૩ વર્ષના વાર્ષિક અહેવાલો, ઓડિટેડ બેલેન્સશીટ, ૮૬ થી વધુ ક્ષેત્રીય તસ્વીરો અને ૧૨ સત્તાવાર કાર્યક્રમ વિડીયો ઉપલબ્ધ છે."
                : "Explore 13+ years of audited balance sheets, official annual reports, 86+ high-resolution field photographs, and 12 YouTube activity videos."}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0 self-start md:self-auto">
            <Link
              href="/resources"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F47B2A] hover:bg-[#E06A1B] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all"
            >
              <ReceiptTextIcon size={15} />
              <span>{isGujarati ? "ઓડિટ અહેવાલો" : "Statutory Reports"}</span>
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

