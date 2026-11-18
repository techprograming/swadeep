"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { BookOpenIcon, ExternalLinkIcon, ShieldCheckIcon, CheckCircleIcon } from "@/components/ui/Icons";
import ReportsSection from "@/components/sections/ReportsSection";

export default function ResourcesPage() {
  const { isGujarati } = useLanguage();
  const [activePubCategory, setActivePubCategory] = React.useState<string>("All");
  const [pubSearchQuery, setPubSearchQuery] = React.useState<string>("");

  const publications = [
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

  return (
    <main id="main-content" className="pt-24 sm:pt-28 pb-20 bg-cream min-h-screen">
      {/* 1. Header Banner */}
      <section className="bg-gradient-to-r from-[#0B3025] via-[#174B38] to-[#205943] text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="container-wide section-padding relative z-10 max-w-6xl mx-auto space-y-4">
          <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 border border-white/20 text-[#F47B2A]">
            {isGujarati ? "સંસાધન અને દસ્તાવેજ કેન્દ્ર" : "RESOURCES & DOCUMENTATION"}
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            {isGujarati ? "સત્તાવાર અહેવાલો, પ્રકાશનો અને બ્રોશર" : "Official Reports, Publications & Brochure"}
          </h1>
          <p className="font-body text-base sm:text-lg text-white/90 max-w-2xl leading-relaxed">
            {isGujarati
              ? "સ્વદીપના વાર્ષિક અહેવાલો, ઓડિટ હિસાબ, શૈક્ષણિક સાહિત્ય, બાળવાર્તાઓ અને સંસ્થાનું સત્તાવાર બ્રોશર."
              : "Access official statutory annual reports, financial audits, field pedagogical handbooks, children's storybooks, and our official organization brochure."}
          </p>

          {/* Quick Action Link for Brochure */}
          <div className="pt-3 flex flex-wrap items-center gap-3">
            <a
              href="/brochure/swadeep-brochure.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F47B2A] hover:bg-[#E06A1B] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all"
            >
              <BookOpenIcon className="w-4 h-4" />
              <span>{isGujarati ? "સંસ્થાનું બ્રોશર જુઓ (PDF)" : "View Official Brochure (PDF)"}</span>
              <ExternalLinkIcon size={14} />
            </a>
            <a
              href="#publications"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs sm:text-sm font-semibold transition-all"
            >
              <span>{isGujarati ? "પ્રકાશનો (Publications) ↓" : "Publications ↓"}</span>
            </a>
            <a
              href="#reports"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs sm:text-sm font-semibold transition-all"
            >
              <span>{isGujarati ? "અહેવાલો (Reports) ↓" : "Reports ↓"}</span>
            </a>
          </div>
        </div>
      </section>

      <div className="container-wide section-padding max-w-6xl mx-auto py-12 sm:py-16 space-y-16">
        {/* 2. Official Brochure Feature Card */}
        <section id="brochure" className="scroll-mt-24">
          <div className="bg-gradient-to-br from-[#0B3025] to-[#174B38] text-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-lg border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-saffron border border-white/15">
                <CheckCircleIcon className="w-3.5 h-3.5 text-saffron" />
                <span>{isGujarati ? "સત્તાવાર પરિચય પુસ્તિકા" : "OFFICIAL ORGANIZATIONAL BROCHURE"}</span>
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
                {isGujarati
                  ? "સ્વદીપ શિક્ષણ વિકાસ સંસ્થા અધિકૃત બ્રોશર"
                  : "Swadeep Shikshan Vikas Sanstha Overview Brochure"}
              </h2>
              <p className="font-body text-xs sm:text-sm text-cream/90 leading-relaxed">
                {isGujarati
                  ? "સંસ્થાના ધ્યેય, કાર્યક્ષેત્રો, શિક્ષણ, આરોગ્ય અને આજીવિકા પ્રોજેક્ટ્સ તથા સંસ્થાકીય વિગતો દર્શાવતું સત્તાવાર બ્રોશર પીડીએફ ફોર્મેટમાં ઉપલબ્ધ છે."
                  : "Comprehensive introduction to Swadeep's vision, history, programmatic footprint in education, health, coastal fisheries, and grassroots community empowerment across Gujarat."}
              </p>
              <div className="flex items-center gap-4 text-xs text-cream/70 font-mono pt-1">
                <span>Format: PDF</span>
                <span>•</span>
                <span>Size: 2.74 MB</span>
                <span>•</span>
                <span className="text-saffron font-semibold">{isGujarati ? "પ્રમાણિત દસ્તાવેજ" : "Verified Official"}</span>
              </div>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row md:flex-col gap-3">
              <a
                href="/brochure/swadeep-brochure.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#F47B2A] hover:bg-[#E06A1B] text-white text-sm font-bold shadow-md hover:shadow-xl transition-all cursor-pointer text-center"
              >
                <BookOpenIcon className="w-4 h-4" />
                <span>{isGujarati ? "બ્રોશર પીડીએફ જુઓ / ડાઉનલોડ ↗" : "Open / Download Brochure ↗"}</span>
              </a>
            </div>
          </div>
        </section>

        {/* 3. Publications & Educational Handbooks Section */}
        <section id="publications" className="space-y-6 scroll-mt-24" aria-label="Official Publications">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-forest/10 pb-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-forest-50 text-forest border border-forest/15">
                <BookOpenIcon className="w-3.5 h-3.5 text-forest" />
                <span>{isGujarati ? "પ્રકાશનો અને સાહિત્ય" : "FIELD PUBLICATIONS & LEARNING KITS"}</span>
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0B3025]">
                {isGujarati ? "શૈક્ષણિક પ્રકાશનો અને માર્ગદર્શિકાઓ" : "Publications & Learning Materials"}
              </h2>
              <p className="font-body text-xs sm:text-sm text-charcoal/75 max-w-2xl">
                {isGujarati
                  ? "શિક્ષકો, આંગણવાડી બહેનો અને બાળકો માટે સંસ્થા દ્વારા વિકસાવવામાં આવેલ શૈક્ષણિક પુસ્તિકાઓ અને બાળ સાહિત્ય."
                  : "Field-tested teaching learning materials (TLM), children's illustrated storybooks, poem books, and organizational guidelines."}
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs font-medium text-charcoal/70 bg-white px-4 py-2 rounded-2xl border border-forest/10 shadow-xs shrink-0">
              <CheckCircleIcon className="w-4 h-4 text-forest" />
              <span>{isGujarati ? "કુલ પ્રકાશનો: " : "Publications: "}</span>
              <strong className="text-forest font-bold font-mono">{publications.length} Unique</strong>
            </div>
          </div>

          {/* Filter & Search Bar for Publications */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {["All", "Pedagogy & Healthcare", "Child Health & Storytelling", "Early Childhood Literature", "Governance & SOPs"].map((cat) => {
                const isActive = activePubCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActivePubCategory(cat)}
                    className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-bold transition-all focus:outline-none focus:ring-2 focus:ring-[#F47B2A] ${
                      isActive
                        ? "bg-[#0B3025] text-white shadow-xs"
                        : "bg-white text-charcoal/80 border border-forest/15 hover:border-forest/40"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            <div className="relative sm:w-64">
              <input
                type="text"
                value={pubSearchQuery}
                onChange={(e) => setPubSearchQuery(e.target.value)}
                placeholder={isGujarati ? "પુસ્તિકા શોધો..." : "Search publications..."}
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-white border border-forest/15 focus:outline-none focus:ring-2 focus:ring-forest text-charcoal"
              />
              <svg
                className="w-3.5 h-3.5 text-charcoal/40 absolute left-2.5 top-1/2 -translate-y-1/2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {pubSearchQuery && (
                <button
                  type="button"
                  onClick={() => setPubSearchQuery("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-charcoal/50 hover:text-charcoal"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {publications
              .filter((pub) => {
                const matchesCat = activePubCategory === "All" || pub.category === activePubCategory;
                const q = pubSearchQuery.toLowerCase().trim();
                const matchesSearch =
                  !q ||
                  pub.title.toLowerCase().includes(q) ||
                  pub.titleGu.toLowerCase().includes(q) ||
                  pub.description.toLowerCase().includes(q);
                return matchesCat && matchesSearch;
              })
              .map((pub) => (
              <div
                key={pub.id}
                className="bg-white rounded-2xl p-6 border border-forest/10 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group hover:-translate-y-1 duration-200"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-forest-50 text-forest border border-forest/15">
                      {isGujarati ? pub.categoryGu : pub.category}
                    </span>
                    <span className="text-xs font-mono font-bold text-saffron bg-saffron/10 px-2 py-0.5 rounded-full">
                      {pub.size}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-heading font-bold text-forest-dark text-base sm:text-lg group-hover:text-forest transition-colors leading-snug">
                      {isGujarati ? pub.titleGu : pub.title}
                    </h3>
                    <p className="font-gujarati text-xs text-charcoal/60 mt-0.5">
                      {isGujarati ? pub.title : pub.titleGu}
                    </p>
                  </div>

                  <p className="font-body text-xs text-charcoal/70 leading-relaxed">
                    {isGujarati ? pub.descriptionGu : pub.description}
                  </p>
                </div>

                <div className="pt-4 mt-5 border-t border-forest/5 flex items-center justify-between">
                  <a
                    href={pub.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-forest hover:text-saffron transition-colors"
                  >
                    <BookOpenIcon className="w-3.5 h-3.5" />
                    <span>{isGujarati ? "પુસ્તિકા વાંચો / PDF ↗" : "Read / Download PDF ↗"}</span>
                  </a>
                  <span className="text-[10px] text-forest/70 font-semibold bg-forest/5 px-2 py-0.5 rounded-full">
                    Official
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Official Reports Section */}
        <ReportsSection
          id="reports"
          title={isGujarati ? "સત્તાવાર વાર્ષિક અને ઓડિટ અહેવાલો" : "Official Reports & Statutory Accounts"}
          subtitle={
            isGujarati
              ? "સ્વદીપ શિક્ષણ વિકાસ સંસ્થાના તમામ ૩૨ વાર્ષિક અહેવાલો, ઓડિટ અહેવાલો અને FCRA હિસાબો."
              : "Complete statutory documentation featuring all 32 Annual Reports, Audit Reports, and FCRA Accounts."
          }
        />
      </div>
    </main>
  );
}
