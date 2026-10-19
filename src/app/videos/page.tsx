"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { YOUTUBE_VIDEOS, YOUTUBE_CHANNEL, YouTubeVideoItem } from "@/lib/constants";
import VideoCard from "@/components/ui/VideoCard";
import VideoModal from "@/components/ui/VideoModal";
import {
  YoutubeIcon,
  SearchIcon,
  ExternalLinkIcon,
  FilmIcon,
  CheckCircleIcon,
  GraduationCapIcon,
  UsersGroupIcon,
  HeartPulseIcon,
} from "@/components/ui/Icons";

const CATEGORIES = [
  "All",
  "Education & Foundational Literacy",
  "Anganwadi & ICDS Training",
  "Health & Nutrition",
  "Child Development & Activities",
  "Culture & Community",
] as const;

export default function VideosPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeVideo, setActiveVideo] = useState<YouTubeVideoItem | null>(null);

  // Filtered video list
  const filteredVideos = useMemo(() => {
    return YOUTUBE_VIDEOS.filter((video) => {
      const matchesCategory =
        selectedCategory === "All" || video.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        video.title.toLowerCase().includes(q) ||
        video.titleGu.toLowerCase().includes(q) ||
        video.description.toLowerCase().includes(q) ||
        video.category.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <main id="main-content" className="flex-1 min-h-screen bg-warm-cream/50 dark:bg-forest-950">
      {/* Hero Header Section */}
      <section className="relative py-16 md:py-24 bg-forest-900 text-white overflow-hidden">
        {/* Modern ambient backdrop glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-forest-700/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-saffron-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            {/* Left Content */}
            <div className="max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-800/80 border border-forest-700 text-saffron-300 text-xs font-semibold tracking-wide uppercase mb-4 backdrop-blur-xs">
                <YoutubeIcon size={16} className="text-red-500" />
                <span>Official Video Channel</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-white leading-tight">
                Activity Video Gallery
              </h1>
              <p className="mt-2 text-lg sm:text-xl font-gujarati text-saffron-200">
                પ્રવૃત્તિ વિડીયો ગેલેરી — {YOUTUBE_CHANNEL.handle}
              </p>

              <p className="mt-4 text-base sm:text-lg text-forest-100/90 leading-relaxed font-sans">
                Experience authentic on-ground moments from rural Gujarat: classroom innovations, Anganwadi capacity building workshops, child health check-ups, and community empowerment sessions.
              </p>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <a
                  href={YOUTUBE_CHANNEL.subscribeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
                >
                  <YoutubeIcon size={18} />
                  <span>Subscribe on YouTube</span>
                  <ExternalLinkIcon size={14} className="opacity-80" />
                </a>

                <Link
                  href="/gallery"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-forest-800 hover:bg-forest-700 text-forest-100 text-sm font-medium border border-forest-700 transition-colors"
                >
                  <FilmIcon size={16} />
                  <span>View Photo Gallery</span>
                </Link>
              </div>
            </div>

            {/* Right Card: Official Channel Highlights */}
            <div className="w-full lg:w-auto shrink-0">
              <div className="bg-forest-800/90 backdrop-blur-md border border-forest-700 rounded-2xl p-6 sm:p-7 shadow-2xl max-w-md mx-auto">
                <div className="flex items-center gap-4 border-b border-forest-700/80 pb-5">
                  <div className="w-14 h-14 rounded-2xl bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-500 shrink-0">
                    <YoutubeIcon size={32} />
                  </div>
                  <div>
                    <h2 className="text-lg font-serif font-bold text-white">
                      Swadeep Shikshan Vikas
                    </h2>
                    <p className="text-sm text-saffron-300 font-mono font-semibold">
                      {YOUTUBE_CHANNEL.handle}
                    </p>
                    <p className="text-xs sm:text-sm text-forest-200 mt-1">
                      Non-Profit Organization • Gujarat
                    </p>
                  </div>
                </div>

                <div className="mt-5 space-y-3.5 text-sm sm:text-base text-forest-100 font-medium">
                  <div className="flex items-center gap-2.5">
                    <GraduationCapIcon size={18} className="text-saffron-400 shrink-0" />
                    <span>295+ Primary Schools & Learning Centers</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <UsersGroupIcon size={18} className="text-saffron-400 shrink-0" />
                    <span>950+ Anganwadi Workers & Helpers Trained</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <HeartPulseIcon size={18} className="text-saffron-400 shrink-0" />
                    <span>Preventive Child Healthcare & Nutrition</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-forest-700/80 text-center">
                  <span className="inline-flex items-center gap-2 text-sm text-saffron-300 font-semibold">
                    <CheckCircleIcon size={16} className="text-emerald-400" />
                    <span>Official Verified Content</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Controls & Filters */}
      <section className="py-10 border-b border-warm-cream-border dark:border-forest-800 bg-white/70 dark:bg-forest-900/60 sticky top-16 z-30 backdrop-blur-md shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <SearchIcon
                size={20}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-forest-400 dark:text-forest-500 pointer-events-none"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search videos by title, topic, or keyword..."
                className="w-full pl-11 pr-12 py-3 rounded-xl border border-warm-cream-border dark:border-forest-700 bg-warm-cream/40 dark:bg-forest-800 text-forest-900 dark:text-forest-100 text-base placeholder:text-forest-400 focus:outline-none focus:ring-2 focus:ring-forest-600 transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold text-forest-500 hover:text-forest-800 dark:hover:text-forest-200"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Video Counter */}
            <div className="text-sm sm:text-base text-forest-700 dark:text-forest-300 flex items-center gap-1.5 self-center">
              <span>Showing</span>
              <strong className="font-bold text-forest-900 dark:text-forest-100">
                {filteredVideos.length}
              </strong>
              <span>of {YOUTUBE_VIDEOS.length} videos</span>
            </div>
          </div>

          {/* Category Filter Chips */}
          <div className="mt-6 flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-thin">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? "bg-forest-800 text-white shadow-sm ring-1 ring-forest-800 dark:bg-forest-700"
                      : "bg-white dark:bg-forest-800 text-forest-700 dark:text-forest-300 border border-warm-cream-border dark:border-forest-700 hover:bg-forest-50 dark:hover:bg-forest-700/60"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Videos Grid */}
      <section className="py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredVideos.length === 0 ? (
            <div className="text-center py-20 bg-white dark:bg-forest-900/60 rounded-3xl border border-warm-cream-border dark:border-forest-800 max-w-lg mx-auto p-8 shadow-xs">
              <div className="w-16 h-16 rounded-full bg-forest-100 dark:bg-forest-800 text-forest-500 mx-auto flex items-center justify-center mb-4">
                <SearchIcon size={24} />
              </div>
              <h3 className="text-xl font-serif font-bold text-forest-900 dark:text-forest-100">
                No videos found
              </h3>
              <p className="mt-2 text-sm text-forest-700 dark:text-forest-300">
                No videos match your filter &ldquo;{searchQuery || selectedCategory}&rdquo;. Try another search term or reset filters.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="mt-5 inline-flex items-center px-5 py-2.5 rounded-xl bg-forest-800 text-white text-sm font-semibold hover:bg-forest-900 transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredVideos.map((video, idx) => (
                <div
                  key={video.id}
                  className="transition-all duration-300"
                >
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

      {/* Switch to Photo Gallery & Support Banner */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-forest-900 via-forest-800 to-forest-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-forest-700/80 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl text-center md:text-left">
              <span className="text-xs uppercase tracking-wider text-saffron-300 font-semibold">
                Explore More
              </span>
              <h3 className="mt-1 text-2xl sm:text-3xl font-serif font-bold">
                Want to see our high-resolution photo archive?
              </h3>
              <p className="mt-2 text-sm text-forest-100/90 leading-relaxed">
                Browse through field photography covering 20 years of humanitarian work, school inaugurations, marine livelihoods, and cyclone disaster relief.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 shrink-0">
              <Link
                href="/gallery"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-saffron-500 hover:bg-saffron-600 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all"
              >
                <span>Browse Photo Gallery</span>
              </Link>

              <Link
                href="/donate"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-forest-800 hover:bg-forest-700 text-white font-semibold text-sm border border-forest-600 transition-colors"
              >
                <span>Support Our Cause</span>
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
