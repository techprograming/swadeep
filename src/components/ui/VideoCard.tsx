"use client";

import React, { useState } from "react";
import Image from "next/image";
import { YouTubeVideoItem } from "@/lib/constants";
import { PlayIcon, YoutubeIcon, ClockIcon, ExternalLinkIcon } from "@/components/ui/Icons";

interface VideoCardProps {
  video: YouTubeVideoItem;
  onPlay: (video: YouTubeVideoItem) => void;
  priority?: boolean;
  isGujarati?: boolean;
}

export default function VideoCard({
  video,
  onPlay,
  priority = false,
  isGujarati = false,
}: VideoCardProps) {
  const [imgSrc, setImgSrc] = useState<string>(
    `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`
  );

  const displayTitle = video.title;

  return (
    <div className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-forest/10 shadow-xs hover:shadow-xl hover:border-forest/25 transition-all duration-300 hover:-translate-y-1">
      {/* 16:9 Thumbnail Container */}
      <div
        className="relative w-full aspect-video bg-neutral-900 overflow-hidden cursor-pointer select-none"
        onClick={() => onPlay(video)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onPlay(video);
          }
        }}
        aria-label={`Play video: ${displayTitle}`}
      >
        <Image
          src={imgSrc}
          alt={displayTitle}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          onError={() => {
            setImgSrc(`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`);
          }}
        />

        {/* Ambient Dark Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

        {/* Category Pill Over Thumbnail */}
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold tracking-wide bg-[#0B3025]/90 backdrop-blur-md text-white border border-white/20 shadow-sm">
            {video.category}
          </span>
        </div>

        {/* Duration Badge */}
        {video.duration && (
          <div className="absolute bottom-3 right-3 z-10 px-2.5 py-1 rounded-md bg-black/85 backdrop-blur-xs text-white text-xs font-mono font-bold flex items-center gap-1 shadow-sm">
            <ClockIcon size={12} className="text-[#F47B2A]" />
            <span>{video.duration}</span>
          </div>
        )}

        {/* Interactive Play Button */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="relative flex items-center justify-center">
            <div className="absolute w-14 h-14 rounded-full bg-[#F47B2A]/30 group-hover:scale-125 group-hover:bg-[#F47B2A]/40 blur-md transition-all duration-300" />
            <span className="relative flex items-center justify-center w-12 h-12 rounded-full bg-red-600 text-white shadow-xl group-hover:bg-[#F47B2A] group-hover:scale-110 group-active:scale-95 transition-all duration-300">
              <PlayIcon size={20} className="ml-0.5 text-white" />
            </span>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="flex-1 flex flex-col p-5 sm:p-6 justify-between space-y-3">
        <div className="space-y-1.5">
          <h3 className="text-base sm:text-lg font-heading font-bold text-[#0B3025] line-clamp-2 leading-snug group-hover:text-[#F47B2A] transition-colors">
            {displayTitle}
          </h3>

          <p className="text-xs sm:text-sm text-charcoal/75 line-clamp-3 leading-relaxed pt-1">
            {video.description}
          </p>
        </div>

        {/* Card Footer Actions */}
        <div className="pt-3 border-t border-forest/10 flex items-center justify-between text-xs">
          <button
            type="button"
            onClick={() => onPlay(video)}
            className="inline-flex items-center gap-1.5 font-bold text-[#0B3025] hover:text-[#F47B2A] transition-colors"
          >
            <PlayIcon size={14} className="text-[#F47B2A]" />
            <span>{"Play Video"}</span>
          </button>

          <a
            href={`https://www.youtube.com/watch?v=${video.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-charcoal/60 hover:text-red-600 transition-colors font-semibold"
            title="Watch directly on YouTube"
          >
            <YoutubeIcon size={15} />
            <span>YouTube</span>
            <ExternalLinkIcon size={12} />
          </a>
        </div>
      </div>
    </div>
  );
}
