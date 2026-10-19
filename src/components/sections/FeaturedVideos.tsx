"use client";

import React, { useState } from "react";
import Link from "next/link";
import { YOUTUBE_VIDEOS, YOUTUBE_CHANNEL, YouTubeVideoItem } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";
import VideoCard from "@/components/ui/VideoCard";
import VideoModal from "@/components/ui/VideoModal";
import { YoutubeIcon, FilmIcon, ExternalLinkIcon } from "@/components/ui/Icons";

export default function FeaturedVideos() {
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideoItem | null>(null);

  // Take the 3 featured videos
  const featuredVideos = YOUTUBE_VIDEOS.filter((v) => v.isFeatured).slice(0, 3);

  return (
    <section id="featured-videos" className="py-20 bg-warm-cream dark:bg-forest-950/60 relative overflow-hidden">
      {/* Subtle modern background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-forest-200/40 dark:bg-forest-800/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <SectionHeading
            badge="Official Video Channel"
            title="Watch Our Work in Action"
            subtitle="Explore real grassroots activities, Anganwadi teacher trainings, nutrition awareness campaigns, and joyful classroom learning from our official YouTube channel."
            gujaratiText="અમારા કાર્યોનો વિડીયો પરિચય - @swadeepindia2543"
            align="center"
          />
        </div>

        {/* 3 Featured Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredVideos.map((video, idx) => (
            <div
              key={video.id}
              className="transform transition-all duration-300"
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              <VideoCard
                video={video}
                onPlay={(v) => setSelectedVideo(v)}
                priority={idx === 0}
              />
            </div>
          ))}
        </div>

        {/* Action Callouts */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <Link
            href="/videos"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-forest-800 hover:bg-forest-900 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 group"
          >
            <FilmIcon size={18} className="text-saffron-400 group-hover:scale-110 transition-transform" />
            <span>Explore All Videos & Gallery</span>
          </Link>

          <a
            href={YOUTUBE_CHANNEL.subscribeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 group"
          >
            <YoutubeIcon size={18} className="group-hover:scale-110 transition-transform" />
            <span>Subscribe on YouTube ({YOUTUBE_CHANNEL.handle})</span>
            <ExternalLinkIcon size={14} className="opacity-80" />
          </a>
        </div>
      </div>

      {/* Video Modal Player */}
      <VideoModal
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />
    </section>
  );
}
