"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { YOUTUBE_VIDEOS, YOUTUBE_CHANNEL, YouTubeVideoItem } from "@/lib/constants";
import VideoCard from "@/components/ui/VideoCard";
import VideoModal from "@/components/ui/VideoModal";
import MediaSubNav from "@/components/ui/MediaSubNav";
import {
  YoutubeIcon,
  SearchIcon,
  ExternalLinkIcon,
  CheckCircleIcon,
  GraduationCapIcon,
  UsersGroupIcon,
  HeartPulseIcon,
  CameraIcon,
  BookOpenIcon,
  ReceiptTextIcon,
} from "@/components/ui/Icons";

const CATEGORIES = [
  "All",
  "Education & Foundational Literacy",
  "Anganwadi & ICDS Training",
  "Health & Nutrition",
  "Child Development & Activities",
  "Culture & Community",
] as const;

const VIDEO_CATEGORY_LABELS: Record<string, { en: string; gu: string }> = {
  All: { en: "All Videos", gu: "તમામ વિડીયો" },
  "Education & Foundational Literacy": {
    en: "Education & Literacy",
    gu: "શિક્ષણ અને સાક્ષરતા",
  },
  "Anganwadi & ICDS Training": {
    en: "Anganwadi & ICDS",
    gu: "આંગણવાડી તાલીમ",
  },
  "Health & Nutrition": {
    en: "Health & Nutrition",
    gu: "આરોગ્ય અને પોષણ",
  },
  "Child Development & Activities": {
    en: "Child Activities",
    gu: "બાળ પ્રવૃત્તિઓ",
  },
  "Culture & Community": {
    en: "Culture & Community",
    gu: "સંસ્કૃતિ અને સમુદાય",
  },
};

export default function VideosPage() {
  const { isGujarati } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeVideo, setActiveVideo] = useState<YouTubeVideoItem | null>(null);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: YOUTUBE_VIDEOS.length };
    YOUTUBE_VIDEOS.forEach((v) => {
      counts[v.category] = (counts[v.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Filtered video list
  const filteredVideos = useMemo(() => {
    return YOUTUBE_VIDEOS.filter((video) => {
      const matchesCategory =
        selectedCategory === "All" || video.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        video.title.toLowerCase().includes(q) ||
        (video.titleGu && video.titleGu.toLowerCase().includes(q)) ||
        video.description.toLowerCase().includes(q) ||
        video.category.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <main id="main-content" className="flex-1 min-h-screen bg-[#FAFAF7]">
      {/* 1. Hero Header Section */}
      <section className="relative py-16 sm:py-20 bg-gradient-to-r from-[#0B3025] via-[#174B38] to-[#205943] text-white overflow-hidden">
        {/* Modern ambient backdrop glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-forest-700/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#F47B2A]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            {/* Left Content */}
            <div className="max-w-2xl text-center lg:text-left space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#F47B2A] text-xs font-bold tracking-wider uppercase backdrop-blur-xs">
                <YoutubeIcon size={16} className="text-red-500" />
                <span>{isGujarati ? "સત્તાવાર વિડીયો ચેનલ" : "Official Video Channel"}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold tracking-tight text-white leading-tight">
                {isGujarati ? "પ્રવૃત્તિ વિડીયો ગેલેરી" : "Activity Video Gallery"}
              </h1>
              <p className="text-base sm:text-lg font-body text-saffron-300 font-semibold">
                {isGujarati ? `સ્વદીપ શિક્ષણ વિકાસ — ${YOUTUBE_CHANNEL.handle}` : `Swadeep Shikshan Vikas — ${YOUTUBE_CHANNEL.handle}`}
              </p>

              <p className="text-sm sm:text-base text-cream/85 leading-relaxed font-body">
                {isGujarati
                  ? "ગ્રામીણ ગુજરાતમાં પ્રાથમિક શિક્ષણ, આંગણવાડી કાર્યકર તાલીમ, બાળ આરોગ્ય કેમ્પ અને સમુદાય સશક્તિકરણની જીવંત પ્રવૃત્તિઓના સત્તાવાર વિડીયો."
                  : "Experience authentic on-ground moments from rural Gujarat: classroom innovations, Anganwadi capacity building workshops, child health check-ups, and community empowerment sessions."}
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <a
                  href={YOUTUBE_CHANNEL.subscribeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all"
                >
                  <YoutubeIcon size={18} />
                  <span>{isGujarati ? "YouTube પર સબ્સ્ક્રાઇબ કરો" : "Subscribe on YouTube"}</span>
                  <ExternalLinkIcon size={14} className="opacity-80" />
                </a>

                <Link
                  href="/gallery"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold border border-white/20 transition-all"
                >
                  <CameraIcon size={16} />
                  <span>{isGujarati ? "ફોટો ગેલેરી જુઓ" : "View Photo Gallery"}</span>
                </Link>
              </div>
            </div>

            {/* Right Card: Official Channel Highlights */}
            <div className="w-full lg:w-auto shrink-0">
              <div className="bg-[#061F17]/90 backdrop-blur-md border border-white/15 rounded-3xl p-6 sm:p-7 shadow-2xl max-w-md mx-auto">
                <div className="flex items-center gap-4 border-b border-white/10 pb-5">
                  <div className="w-14 h-14 rounded-2xl bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-500 shrink-0 shadow-inner">
                    <YoutubeIcon size={32} />
                  </div>
                  <div>
                    <h2 className="text-lg font-heading font-bold text-white">
                      Swadeep Shikshan Vikas
                    </h2>
                    <p className="text-sm text-[#F47B2A] font-mono font-semibold">
                      {YOUTUBE_CHANNEL.handle}
                    </p>
                    <p className="text-xs text-white/70 mt-0.5">
                      {isGujarati ? "બિન-નફાકારક સંસ્થા • ગુજરાત" : "Non-Profit Organization • Gujarat"}
                    </p>
                  </div>
                </div>

                <div className="mt-5 space-y-3.5 text-xs sm:text-sm text-cream/90 font-medium">
                  <div className="flex items-center gap-2.5">
                    <GraduationCapIcon size={18} className="text-[#F47B2A] shrink-0" />
                    <span>{isGujarati ? "૨૯૫+ પ્રાથમિક શાળાઓ અને કેન્દ્રો" : "295+ Primary Schools & Learning Centers"}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <UsersGroupIcon size={18} className="text-[#F47B2A] shrink-0" />
                    <span>{isGujarati ? "૯૫૦+ આંગણવાડી કાર્યકરો તાલીમ પામેલા" : "950+ Anganwadi Workers Trained"}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <HeartPulseIcon size={18} className="text-[#F47B2A] shrink-0" />
                    <span>{isGujarati ? "બાળ આરોગ્ય અને પોષણ માર્ગદર્શન" : "Preventive Child Healthcare & Nutrition"}</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 text-center">
                  <span className="inline-flex items-center gap-2 text-xs text-[#F47B2A] font-bold">
                    <CheckCircleIcon size={16} className="text-emerald-400" />
                    <span>{isGujarati ? "સત્તાવાર પ્રમાણિત સામગ્રી" : "Official Verified Content"}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shared Media Sub-Navigation */}
      <MediaSubNav activeTab="videos" />

      {/* 2. Interactive Controls & Filters */}
      <section className="py-8 bg-white border-b border-forest/10 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-5">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <SearchIcon
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/40 pointer-events-none"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isGujarati ? "વિડીયો અથવા વિષય શોધો..." : "Search videos by title or topic..."}
                className="w-full pl-11 pr-12 py-2.5 rounded-2xl bg-[#FBF8F3] border border-forest/15 text-xs sm:text-sm text-charcoal placeholder:text-charcoal/45 focus:outline-none focus:ring-2 focus:ring-[#F47B2A] transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-charcoal/50 hover:text-charcoal"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Video Counter */}
            <div className="text-xs text-charcoal/70 font-medium flex items-center gap-1.5 self-center">
              <span>{isGujarati ? "પરિણામો: " : "Showing: "}</span>
              <strong className="font-bold text-[#0B3025]">
                {filteredVideos.length}
              </strong>
              <span> of {YOUTUBE_VIDEOS.length} videos</span>
            </div>
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none snap-x snap-mandatory">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              const labelObj = VIDEO_CATEGORY_LABELS[cat] || { en: cat, gu: cat };
              const count = categoryCounts[cat] || 0;

              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`snap-start shrink-0 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? "bg-[#0B3025] text-white shadow-sm"
                      : "bg-[#FBF8F3] text-charcoal/80 border border-forest/10 hover:bg-forest-50"
                  }`}
                >
                  <span>{isGujarati ? labelObj.gu : labelObj.en}</span>
                  <span
                    className={`text-[10px] rounded-full px-1.5 py-0.5 font-bold ${
                      isActive ? "bg-white/20 text-white" : "bg-neutral-200/70 text-charcoal/60"
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
                className="px-3.5 py-2 rounded-full text-xs font-semibold text-[#F47B2A] hover:bg-amber-50 transition-colors shrink-0"
              >
                {isGujarati ? "ફિલ્ટર્સ સાફ કરો" : "Reset Filters"}
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 3. Videos Grid */}
      <section className="py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {filteredVideos.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-forest/10 max-w-lg mx-auto p-8 shadow-xs">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-800 mx-auto flex items-center justify-center mb-4">
                <SearchIcon size={24} />
              </div>
              <h3 className="text-lg font-heading font-bold text-[#0B3025]">
                {isGujarati ? "કોઈ વિડીયો મળ્યો નથી" : "No Videos Found"}
              </h3>
              <p className="mt-2 text-xs text-charcoal/70">
                {isGujarati
                  ? `તમારી શોધ "${searchQuery || selectedCategory}" માટે કોઈ વિડીયો મળ્યો નથી.`
                  : `No videos match your filter "${searchQuery || selectedCategory}". Try another search term or reset filters.`}
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="mt-5 inline-flex items-center px-5 py-2.5 rounded-full bg-[#0B3025] text-white text-xs font-bold hover:bg-[#174B38] transition-colors"
              >
                {isGujarati ? "બધા વિડીયો જુઓ" : "Reset All Filters"}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVideos.map((video, idx) => (
                <div key={video.id} className="transition-all duration-300">
                  <VideoCard
                    video={video}
                    onPlay={(v) => setActiveVideo(v)}
                    priority={idx < 3}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. Cross-Media Discovery Callout Banner */}
      <section className="pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-r from-[#0B3025] via-[#174B38] to-[#0B3025] text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl text-center md:text-left space-y-2">
              <span className="text-xs uppercase tracking-wider text-[#F47B2A] font-bold">
                {isGujarati ? "વધુ સંસાધનો જુઓ" : "Explore More Resources"}
              </span>
              <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
                {isGujarati ? "તસ્વીરો, વાર્ષિક અહેવાલો અને પ્રકાશનો" : "High-Resolution Photos, Reports & Storybooks"}
              </h3>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-body">
                {isGujarati
                  ? "૮૬ થી વધુ ક્ષેત્રીય તસ્વીરો, છેલ્લા ૧૩ વર્ષના વાર્ષિક ઓડિટ અહેવાલો અને ડેન્ટલ હાઇજીન બાળવાર્તાઓ જુઓ."
                  : "Browse through 86+ field photographs, 13+ years of audited balance sheets, and illustrated children's storybooks."}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
              <Link
                href="/gallery"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#F47B2A] hover:bg-[#E06A1B] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all"
              >
                <CameraIcon size={16} />
                <span>{isGujarati ? "ફોટો ગેલેરી" : "Photo Gallery"}</span>
              </Link>

              <Link
                href="/publications"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 transition-colors"
              >
                <BookOpenIcon size={16} />
                <span>{isGujarati ? "શૈક્ષણિક પ્રકાશનો" : "Publications"}</span>
              </Link>

              <Link
                href="/resources"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 transition-colors"
              >
                <ReceiptTextIcon size={16} />
                <span>{isGujarati ? "ઓડિટ અહેવાલો" : "Statutory Reports"}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal Player */}
      <VideoModal
        video={activeVideo}
        onClose={() => setActiveVideo(null)}
      />
    </main>
  );
}
