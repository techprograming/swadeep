"use client";

import React, { useEffect, useCallback } from "react";
import { YouTubeVideoItem, YOUTUBE_CHANNEL } from "@/lib/constants";
import { YoutubeIcon, ExternalLinkIcon } from "@/components/ui/Icons";

interface VideoModalProps {
  video: YouTubeVideoItem | null;
  onClose: () => void;
}

export default function VideoModal({ video, onClose }: VideoModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (video) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [video, handleKeyDown]);

  if (!video) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-warm-cream dark:bg-forest-900 rounded-2xl shadow-2xl border border-warm-cream-border dark:border-forest-700 overflow-hidden transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-warm-cream-border dark:border-forest-800 bg-white/70 dark:bg-forest-950/70">
          <div className="flex items-center gap-2.5 min-w-0 pr-4">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-red-600/10 text-red-600 dark:bg-red-500/20 dark:text-red-400 shrink-0">
              <YoutubeIcon size={18} />
            </span>
            <div className="min-w-0">
              <h3
                id="video-modal-title"
                className="text-lg sm:text-xl font-serif font-bold text-forest-900 dark:text-forest-100 truncate"
              >
                {video.title}
              </h3>
              <p className="text-sm text-forest-700 dark:text-forest-300 font-gujarati font-medium truncate">
                {video.titleGu}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 text-forest-500 hover:text-forest-900 dark:text-forest-400 dark:hover:text-forest-100 rounded-lg hover:bg-forest-100 dark:hover:bg-forest-800 transition-colors shrink-0"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Video Player */}
        <div className="relative w-full bg-black aspect-video">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
            className="absolute inset-0 w-full h-full border-0"
          />
        </div>

        {/* Details & Action Bar */}
        <div className="p-5 sm:p-6 bg-white dark:bg-forest-900/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <span className="inline-block text-xs sm:text-sm font-bold px-3 py-1 rounded-full bg-forest-100 text-forest-900 dark:bg-forest-800 dark:text-forest-100">
              {video.category}
            </span>
            <p className="text-base sm:text-lg text-forest-800 dark:text-forest-200 leading-relaxed max-w-2xl font-normal">
              {video.description}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`https://www.youtube.com/watch?v=${video.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-semibold tracking-wide transition-all shadow-sm hover:shadow"
            >
              <YoutubeIcon size={18} />
              <span>Watch on YouTube</span>
              <ExternalLinkIcon size={14} />
            </a>

            <a
              href={YOUTUBE_CHANNEL.subscribeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl bg-warm-cream-border dark:bg-forest-800 text-forest-900 dark:text-forest-100 hover:bg-forest-200 dark:hover:bg-forest-700 text-sm font-semibold transition-colors"
            >
              <span>Channel</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
