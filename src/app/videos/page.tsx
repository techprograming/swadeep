"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
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
  PlayIcon,
  ClockIcon,
  HeartIcon,
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

const VIDEO_CATEGORY_LABELS: Record<string, { en: string }> = {
  All: { en: "All Videos",  },
  "Education & Foundational Literacy": {
    en: "Education & Literacy",
    
  },
  "Anganwadi & ICDS Training": {
    en: "Anganwadi & ICDS",
    
  },
  "Health & Nutrition": {
    en: "Health & Nutrition",
    
  },
  "Child Development & Activities": {
    en: "Child Activities",
    
  },
  "Culture & Community": {
    en: "Culture & Community",
    
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
        video.description.toLowerCase().includes(q) ||
        video.category.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Featured Video: first item from verified list
  const featuredVideo: YouTubeVideoItem = YOUTUBE_VIDEOS[0];

  return (
    <main id="main-content" className="flex-1 min-h-screen bg-cream">
      {/* ════════════════════════════════════
          1. COMPACT EDITORIAL HERO
      ════════════════════════════════════ */}
      <section className="relative pt-32 sm:pt-36 lg:pt-40 pb-14 sm:pb-16 bg-[#0B3025] text-white overflow-hidden">
        {/* Subtle geometric circles */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
          <div className="absolute -top-12 -right-12 w-96 h-96 rounded-full border-2 border-white" />
          <div className="absolute bottom-0 left-10 w-72 h-72 rounded-full border border-white" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 space-y-4">
          <div className="max-w-3xl space-y-2">
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {"Activity Video Gallery"}
            </h1>
            <p className="font-body text-xs sm:text-sm text-white/85 leading-relaxed max-w-2xl">
              {"Experience authentic on-ground moments from rural Gujarat: classroom innovations, Anganwadi capacity building workshops, child health check-ups, and community empowerment sessions."}
            </p>
          </div>

          {/* Quick Hero Actions */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <a
              href={YOUTUBE_CHANNEL.subscribeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all"
            >
              <YoutubeIcon size={16} />
              <span>{"Subscribe on YouTube"}</span>
              <ExternalLinkIcon size={13} className="opacity-80" />
            </a>

            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold border border-white/20 transition-all"
            >
              <CameraIcon size={15} />
              <span>{"Photo Gallery (86 Photos)"}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Shared Media Sub-Navigation */}
      <MediaSubNav activeTab="videos" />

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10 sm:space-y-12 mt-8 sm:mt-10">

        {/* ════════════════════════════════════
            2. FEATURED VIDEO SHOWCASE
        ════════════════════════════════════ */}
        <section aria-label="Featured Organization Video">
          <div className="bg-white rounded-3xl border border-neutral-200/90 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
            <div className="flex flex-col lg:flex-row items-stretch">
              {/* 16:9 Thumbnail with large interactive play button */}
              <div
                className="relative lg:w-3/5 aspect-video bg-neutral-900 overflow-hidden cursor-pointer group shrink-0"
                onClick={() => setActiveVideo(featuredVideo)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveVideo(featuredVideo);
                  }
                }}
                aria-label={`Play featured video: ${featuredVideo.title}`}
              >
                <Image
                  src={`https://img.youtube.com/vi/${featuredVideo.id}/hqdefault.jpg`}
                  alt={featuredVideo.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Dark Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10 group-hover:opacity-75 transition-opacity" />

                {/* Featured Badge */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#F47B2A] text-white text-xs font-bold uppercase tracking-wider shadow-sm">
                    {"Featured Spotlight"}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-sm text-white text-[11px] font-mono font-bold">
                    {featuredVideo.duration}
                  </span>
                </div>

                {/* Center Large Play Icon with Pulse */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div className="relative flex items-center justify-center">
                    <div className="absolute w-20 h-20 rounded-full bg-[#F47B2A]/30 group-hover:scale-125 group-hover:bg-[#F47B2A]/50 blur-lg transition-all duration-300" />
                    <span className="relative flex items-center justify-center w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-red-600 text-white shadow-2xl group-hover:bg-[#F47B2A] group-hover:scale-110 transition-all duration-300">
                      <PlayIcon size={28} className="ml-1 text-white" />
                    </span>
                  </div>
                </div>
              </div>

              {/* Featured Content & Actions */}
              <div className="flex-1 p-6 sm:p-8 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#F47B2A] font-mono">
                    {featuredVideo.category}
                  </span>
                  <h2 className="font-heading text-xl sm:text-2xl font-extrabold text-[#0B3025] leading-snug">
                    {featuredVideo.title}
                  </h2>
                  <p className="font-body text-xs sm:text-sm text-charcoal/75 leading-relaxed pt-2">
                    {featuredVideo.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-100 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveVideo(featuredVideo)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0B3025] hover:bg-[#174B38] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all"
                  >
                    <PlayIcon size={16} />
                    <span>{"Play Featured Video"}</span>
                  </button>

                  <a
                    href={`https://www.youtube.com/watch?v=${featuredVideo.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-charcoal text-xs font-semibold transition-colors"
                  >
                    <YoutubeIcon size={16} className="text-red-600" />
                    <span>Watch on YouTube</span>
                    <ExternalLinkIcon size={12} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════
            3. CATEGORY NAVIGATION & SEARCH TOOLBAR
        ════════════════════════════════════ */}
        <section aria-label="Video Filters and Search" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <div>
              <span className="text-[#F47B2A] font-bold text-xs uppercase tracking-widest block mb-1">
                {"Video Repository"}
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#0B3025]">
                {"Browse by Program Area"}
              </h2>
            </div>
            <div className="text-xs text-neutral-500 font-medium">
              <span>{"Showing: "}</span>
              <strong className="text-[#0B3025] font-bold">{filteredVideos.length}</strong>
              <span> of {YOUTUBE_VIDEOS.length} videos</span>
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
                placeholder={"Search videos by title, topic, or category..."}
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

            {/* Category Filter Chips — Horizontally Scrollable on Mobile */}
            <div
              role="group"
              aria-label="Filter videos by category"
              className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none snap-x snap-mandatory flex-nowrap"
            >
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                const labelObj = VIDEO_CATEGORY_LABELS[cat] || { en: cat,  };
                const count = categoryCounts[cat] || 0;

                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    aria-pressed={isActive}
                    className={`snap-start shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 ${
                      isActive
                        ? "bg-[#0B3025] text-white shadow-xs"
                        : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                    }`}
                  >
                    <span>{labelObj.en}</span>
                    <span
                      className={`text-[10px] rounded-full px-1.5 py-0.2 font-mono font-bold ${
                        isActive ? "bg-white/20 text-white" : "bg-white text-neutral-600"
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
                  className="px-3 py-1.5 rounded-full text-xs font-semibold text-[#F47B2A] hover:bg-amber-50 transition-colors shrink-0"
                >
                  {"Clear Filters"}
                </button>
              )}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════
            4. VIDEO GRID
        ════════════════════════════════════ */}
        <section aria-label="Activity Videos Collection">
          {filteredVideos.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-neutral-300 p-8 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 mx-auto flex items-center justify-center mb-2">
                <SearchIcon size={24} />
              </div>
              <h3 className="font-heading font-bold text-base text-[#0B3025]">
                {"No Videos Found"}
              </h3>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                {`No videos match your filter "${searchQuery || selectedCategory}". Try another search term or reset filters.`}
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="px-4 py-2 rounded-xl bg-[#0B3025] hover:bg-[#174B38] text-white text-xs font-bold transition-all shadow-xs"
              >
                {"Reset All Filters"}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {filteredVideos.map((video, idx) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  onPlay={(v) => setActiveVideo(v)}
                  priority={idx < 3}
                  isGujarati={isGujarati}
                />
              ))}
            </div>
          )}
        </section>

        {/* ════════════════════════════════════
            5. CLEAN CLOSING BOTTOM SECTION
        ════════════════════════════════════ */}
        <section
          aria-labelledby="video-closing-heading"
          className="rounded-3xl bg-[#0B3025] text-white p-8 sm:p-10 shadow-lg border border-white/10"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
            <div className="space-y-2 max-w-xl text-center md:text-left">
              <span className="text-[11px] uppercase tracking-wider text-[#F47B2A] font-bold">
                {"Stay Connected & Support"}
              </span>
              <h3 id="video-closing-heading" className="font-heading text-xl sm:text-2xl font-bold text-white">
                {"Support Swadeep's Grassroots Mission"}
              </h3>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-body">
                {"Subscribe to our YouTube channel for updates, explore our 86+ field photos, or support our 5 core programs across Gujarat."}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
              <a
                href={YOUTUBE_CHANNEL.subscribeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all"
              >
                <YoutubeIcon size={16} />
                <span>{"Subscribe on YouTube"}</span>
              </a>

              <Link
                href="/gallery"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 transition-all"
              >
                <CameraIcon size={15} />
                <span>{"Photo Gallery"}</span>
              </Link>

              <Link
                href="/donate"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F47B2A] hover:bg-[#E06A1B] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all"
              >
                <HeartIcon size={15} />
                <span>{"Support Our Cause"}</span>
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* ════════════════════════════════════
          LAZY LOADED VIDEO PLAYER MODAL
      ════════════════════════════════════ */}
      <VideoModal
        video={activeVideo}
        onClose={() => setActiveVideo(null)}
        isGujarati={isGujarati}
      />
    </main>
  );
}
