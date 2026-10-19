"use client";

import React, { useState } from "react";
import Image from "next/image";
import { YouTubeVideoItem } from "@/lib/constants";
import { PlayIcon, YoutubeIcon, ClockIcon, ExternalLinkIcon } from "@/components/ui/Icons";

interface VideoCardProps {
  video: YouTubeVideoItem;
  onPlay: (video: YouTubeVideoItem) => void;
  priority?: boolean;
}

export default function VideoCard({ video, onPlay, priority = false }: VideoCardProps) {
  const [imgSrc, setImgSrc] = useState<string>(
    `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`
  );

  return (
    <div className="group relative flex flex-col bg-white dark:bg-forest-900/80 rounded-2xl overflow-hidden border border-warm-cream-border dark:border-forest-800 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 focus-within:ring-2 focus-within:ring-saffron-500">
      {/* Thumbnail & Play Overlay */}
      <div
        className="relative w-full aspect-video bg-forest-950 overflow-hidden cursor-pointer"
        onClick={() => onPlay(video)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onPlay(video);
          }
        }}
        aria-label={`Play video: ${video.title}`}
      >
        <Image
          src={imgSrc}
          alt={video.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priority}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          onError={() => {
            // Fallback to standard thumbnail if hqdefault fails
            setImgSrc(`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`);
          }}
        />

        {/* Ambient Dark Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

        {/* Duration Badge */}
        {video.duration && (
          <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-xs text-white text-xs font-mono font-medium flex items-center gap-1 shadow-sm">
            <ClockIcon size={12} className="text-warm-cream" />
            <span>{video.duration}</span>
          </div>
        )}

        {/* Play Button - Minimal Modern Interactive Animation */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative flex items-center justify-center">
            {/* Glowing ring animation on hover */}
            <div className="absolute w-16 h-16 rounded-full bg-saffron-500/30 group-hover:scale-125 group-hover:bg-saffron-500/40 blur-md transition-all duration-300" />
            
            <span className="relative flex items-center justify-center w-14 h-14 rounded-full bg-red-600 text-white shadow-lg group-hover:bg-saffron-500 group-hover:scale-110 group-active:scale-95 transition-all duration-300">
              <PlayIcon size={22} className="ml-1 text-white" />
            </span>
          </div>
        </div>

        {/* Category Pill Over Thumbnail */}
        <div className="absolute top-3 left-3">
          <span className="inline-block px-3 py-1 rounded-full text-xs sm:text-sm font-semibold tracking-wide bg-forest-900/90 backdrop-blur-xs text-warm-cream border border-forest-700/60 shadow-xs">
            {video.category}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="flex-1 flex flex-col p-5 sm:p-6">
        <h3 className="text-lg sm:text-xl font-serif font-bold text-forest-900 dark:text-forest-100 line-clamp-2 leading-snug group-hover:text-forest-700 dark:group-hover:text-forest-300 transition-colors">
          {video.title}
        </h3>

        {video.titleGu && (
          <p className="mt-1.5 text-sm sm:text-base text-forest-700 dark:text-forest-300 font-gujarati font-medium line-clamp-1">
            {video.titleGu}
          </p>
        )}

        <p className="mt-3 text-sm sm:text-base text-forest-800/90 dark:text-forest-200/90 line-clamp-3 leading-relaxed flex-1">
          {video.description}
        </p>

        {/* Card Footer Actions */}
        <div className="mt-5 pt-3.5 border-t border-warm-cream-border dark:border-forest-800 flex items-center justify-between text-sm sm:text-base">
          <button
            type="button"
            onClick={() => onPlay(video)}
            className="inline-flex items-center gap-2 font-bold text-forest-900 dark:text-forest-100 hover:text-saffron-600 dark:hover:text-saffron-400 transition-colors"
          >
            <PlayIcon size={16} className="text-saffron-500" />
            <span>Play Video</span>
          </button>

          <a
            href={`https://www.youtube.com/watch?v=${video.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-medium text-forest-600 dark:text-forest-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
            title="Watch directly on YouTube"
          >
            <YoutubeIcon size={16} />
            <span>YouTube</span>
            <ExternalLinkIcon size={13} />
          </a>
        </div>
      </div>
    </div>
  );
}
