"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { SITE_CONFIG } from "@/lib/constants";
import {
  FilmIcon,
  BookOpenIcon,
  CalendarIcon,
  SparklesIcon,
  ExternalLinkIcon,
} from "@/components/ui/Icons";

export default function ResourcesPage() {
  const { isGujarati, t } = useLanguage();

  const newsItems = [
    {
      date: "October 2026",
      dateGu: "ઓક્ટોબર ૨૦૨૬",
      title: "Interactive Anganwadi Pedagogy & Early Writing Skills Drive",
      titleGu: "આંગણવાડી પૂર્વ-પ્રાથમિક શિક્ષણ અને લેખન કૌશલ્ય અભિયાન",
      tag: "Education",
      tagGu: "શિક્ષણ",
      desc: "Swadeep trainers conducted intensive capacity-building modules with ICDS frontline workers focusing on motor skills and joyful rhymes.",
      descGu: "આંગણવાડી બહેનો સાથે બાળગીતો અને લેખન કૌશલ્ય અંગે સઘન તાલીમ શિબિરોનું આયોજન.",
    },
    {
      date: "September 2026",
      dateGu: "સપ્ટેમ્બર ૨૦૨૬",
      title: "Preventive Dental Health & Hygiene Camps in Coastal Amreli",
      titleGu: "અમરેલી સાગરકાંઠા વિસ્તારમાં દાંત આરોગ્ય તપાસ શિબિર",
      tag: "Health",
      tagGu: "આરોગ્ય",
      desc: "Over 500 children and community members received specialized dental cavity screening and free dental care kits.",
      descGu: "૫૦૦થી વધુ બાળકો અને ગ્રામજનોની દાંત તપાસ અને ઓરલ કેર કિટ સહાય.",
    },
    {
      date: "Honour & Milestone",
      dateGu: "સન્માન",
      title: "Recognition: CSR Conclave 2019 Award Winner",
      titleGu: "સન્માન: CSR કોન્ક્લેવ ૨૦૧૯ એવોર્ડ",
      tag: "Recognition",
      tagGu: "સન્માન",
      desc: "Swadeep was honoured with the prestigious CSR Conclave Award for community-centric interventions in fisheries and child education.",
      descGu: "માછીમાર ઉત્થાન અને બાળ શિક્ષણમાં વિશિષ્ટ યોગદાન બદલ પ્રતિષ્ઠિત CSR કોન્ક્લેવ એવોર્ડ એનાયત.",
    },
  ];

  const publications = [
    {
      title: "Foundational Literacy & Joyful Learning Handbook",
      titleGu: "પાયાનું શિક્ષણ અને આનંદદાયક બાળગીતો માર્ગદર્શિકા",
      type: "Field Pedagogy Guide",
      typeGu: "શૈક્ષણિક સાહિત્ય",
      pages: "ICDS Module",
      pagesGu: "આંગણવાડી તાલીમ",
    },
    {
      title: "Marine Fishermen Safety Protocols & Information Handbook",
      titleGu: "માછીમાર દરિયાઈ સુરક્ષા અને માહિતી પુસ્તિકા",
      type: "Fisheries Resource",
      typeGu: "માછીમાર માર્ગદર્શિકા",
      pages: "Sagarbandhu Project",
      pagesGu: "સાગરબંધુ પ્રોજેક્ટ",
    },
    {
      title: "Preventive Dental Hygiene Manual for Rural Educators",
      titleGu: "ગ્રામીણ આરોગ્ય અને દાંતની સંભાળ પુસ્તિકા",
      type: "Oral Health Manual",
      typeGu: "આરોગ્ય માર્ગદર્શિકા",
      pages: "Community Health",
      pagesGu: "સમુદાય આરોગ્ય",
    },
  ];

  return (
    <main id="main-content" className="pt-24 sm:pt-28 pb-20 bg-cream min-h-screen">
      {/* 1. Header Banner */}
      <section className="bg-gradient-to-r from-[#0B3025] via-[#174B38] to-[#205943] text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="container-wide section-padding relative z-10 max-w-6xl mx-auto space-y-4">
          <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 border border-white/20 text-[#F47B2A]">
            {isGujarati ? "સંસાધન કેન્દ્ર" : "RESOURCES & MEDIA"}
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            {isGujarati ? "સંસાધનો, ગેલેરી અને સમાચાર" : "Knowledge, Media & Updates"}
          </h1>
          <p className="font-body text-base sm:text-lg text-white/90 max-w-2xl leading-relaxed">
            {isGujarati
              ? "સ્વદીપના ક્ષેત્રીય દસ્તાવેજો, ફોટો ગેલેરી, યુટ્યુબ વીડિયો, ક્ષેત્રીય સમાચાર અને શૈક્ષણિક સાહિત્યનો સંગ્રહ."
              : "Explore Swadeep's field documentation, photography, YouTube video library, community bulletins, and publication materials."}
          </p>
        </div>
      </section>

      <div className="container-wide section-padding max-w-6xl mx-auto py-12 sm:py-16 space-y-16">
        {/* 2. Media Hub Quick Links */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Photo Gallery Card */}
          <Link
            href="/gallery"
            className="group block bg-white rounded-3xl p-8 border border-forest/10 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="relative h-48 rounded-2xl overflow-hidden mb-6 bg-forest-900/10">
              <Image
                src="/images/projects-hero.jpg"
                alt="Photo Gallery"
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white font-bold text-sm bg-[#F47B2A] px-3 py-1 rounded-full">
                {isGujarati ? "ફોટો ગેલેરી" : "Photo Gallery"}
              </div>
            </div>
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-[#0B3025] group-hover:text-[#F47B2A] transition-colors">
              {isGujarati ? "ક્ષેત્રીય ફોટો ગેલેરી જુઓ" : "Explore Field Photography"}
            </h2>
            <p className="font-body text-sm text-charcoal/70 mt-2 leading-relaxed">
              {isGujarati
                ? "શિક્ષણ, આરોગ્ય, આજીવિકા અને રાહત કાર્યના જીવંત ફોટોગ્રાફ્સનું વર્ગીકરણ."
                : "Browse authentic grassroots photography across our five focus areas, sorted by thematic category."}
            </p>
            <div className="pt-4 flex items-center text-xs font-bold text-[#F47B2A]">
              <span>{t("viewAll")}</span>
              <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </Link>

          {/* Video Library Card */}
          <Link
            href="/videos"
            className="group block bg-white rounded-3xl p-8 border border-forest/10 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="relative h-48 rounded-2xl overflow-hidden mb-6 bg-forest-900/10">
              <Image
                src="https://img.youtube.com/vi/RwLPnssozZk/hqdefault.jpg"
                alt="Video Library"
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white font-bold text-sm bg-red-600 px-3 py-1 rounded-full flex items-center gap-1.5">
                <FilmIcon size={14} />
                <span>{isGujarati ? "સત્તાવાર વીડિયો" : "Official Videos"}</span>
              </div>
            </div>
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-[#0B3025] group-hover:text-[#F47B2A] transition-colors">
              {isGujarati ? "યુટ્યુબ વીડિયો સંગ્રહ જુઓ" : "Official Video Library"}
            </h2>
            <p className="font-body text-sm text-charcoal/70 mt-2 leading-relaxed">
              {isGujarati
                ? "આંગણવાડી બાળગીતો, પોષણ જાગૃતિ, પ્રવૃત્તિ આધારિત શિક્ષણ અને નૈતિક વાર્તાઓ."
                : "Watch verified classroom rhymes, Anganwadi capacity building sessions, and nutritional awareness videos."}
            </p>
            <div className="pt-4 flex items-center text-xs font-bold text-[#F47B2A]">
              <span>{t("viewAll")}</span>
              <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </Link>
        </section>

        {/* 3. News and Community Updates */}
        <section id="news" className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-forest/10 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#F47B2A]">
                {isGujarati ? "તાજેતરના સમાચારો" : "LATEST ANNOUNCEMENTS"}
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#0B3025]">
                {isGujarati ? "સમાચાર અને ક્ષેત્રીય અપડેટ્સ" : "News & Community Updates"}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {newsItems.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-3xl border border-forest/10 shadow-sm space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#174B38] bg-forest-50 px-2.5 py-0.5 rounded-full border border-forest/15">
                      {isGujarati ? item.tagGu : item.tag}
                    </span>
                    <span className="text-xs text-charcoal/60 font-medium">
                      {isGujarati ? item.dateGu : item.date}
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-base text-[#0B3025]">
                    {isGujarati ? item.titleGu : item.title}
                  </h3>
                  <p className="font-body text-xs sm:text-sm text-charcoal/75 leading-relaxed">
                    {isGujarati ? item.descGu : item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Publications & Field Materials */}
        <section id="publications" className="bg-white p-8 sm:p-10 rounded-3xl border border-forest/10 shadow-sm space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#F47B2A]">
              {isGujarati ? "પ્રકાશનો અને સાહિત્ય" : "PUBLICATIONS"}
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#0B3025]">
              {isGujarati ? "શૈક્ષણિક અને ક્ષેત્રીય માર્ગદર્શિકાઓ" : "Field Manuals & Training Guides"}
            </h2>
            <p className="font-body text-xs sm:text-sm text-charcoal/70 mt-1">
              {isGujarati
                ? "સંસ્થા દ્વારા ક્ષેત્રમાં વપરાતી તાલીમ પુસ્તિકાઓ અને સંસાધન સાહિત્ય."
                : "Handbooks developed for community workers, teachers, and field mobilizers."}
            </p>
          </div>

          <div className="divide-y divide-forest/10">
            {publications.map((pub, idx) => (
              <div key={idx} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-forest-50 text-[#174B38] flex items-center justify-center shrink-0 mt-0.5">
                    <BookOpenIcon size={20} />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-sm sm:text-base text-[#0B3025]">
                      {isGujarati ? pub.titleGu : pub.title}
                    </h4>
                    <p className="text-xs text-charcoal/60 mt-0.5">
                      {isGujarati ? pub.typeGu : pub.type} • {isGujarati ? pub.pagesGu : pub.pages}
                    </p>
                  </div>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center text-xs font-bold text-[#174B38] hover:text-[#F47B2A] bg-cream px-3 py-1.5 rounded-full border border-forest/15 transition-colors"
                >
                  <span>{isGujarati ? "વિગત માટે સંપર્ક કરો" : "Request Material"}</span>
                  <ExternalLinkIcon size={12} className="ml-1" />
                </Link>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
