"use client";

import React from "react";
import { DownloadIcon, ExternalLinkIcon } from "@/components/ui/Icons";
import { PreviewDocument } from "@/components/ui/DocumentPreviewModal";

interface DocumentCardProps {
  document: PreviewDocument;
  onPreview: (doc: PreviewDocument) => void;
  isGujarati?: boolean;
}

export default function DocumentCard({
  document,
  onPreview,
  isGujarati = false,
}: DocumentCardProps) {
  const displayTitle = isGujarati && document.titleGu ? document.titleGu : document.title;
  const displayCategory = isGujarati && document.categoryGu ? document.categoryGu : document.category;
  const displayDesc = isGujarati && document.descriptionGu ? document.descriptionGu : document.description;

  // Visual category styling
  const getCategoryTheme = (cat: string) => {
    const lower = cat.toLowerCase();
    if (lower.includes("annual")) {
      return "bg-emerald-50 text-emerald-800 border-emerald-200/80";
    }
    if (lower.includes("audit")) {
      return "bg-blue-50 text-blue-800 border-blue-200/80";
    }
    if (lower.includes("fc") || lower.includes("fcra")) {
      return "bg-purple-50 text-purple-800 border-purple-200/80";
    }
    if (lower.includes("child") || lower.includes("story")) {
      return "bg-amber-50 text-amber-900 border-amber-200/80";
    }
    if (lower.includes("health") || lower.includes("pedagogy")) {
      return "bg-teal-50 text-teal-800 border-teal-200/80";
    }
    if (lower.includes("brochure")) {
      return "bg-orange-50 text-orange-900 border-orange-200/80";
    }
    return "bg-forest-50 text-forest border-forest/20";
  };

  return (
    <div className="group relative flex flex-col justify-between bg-white rounded-3xl p-6 sm:p-7 border border-forest/10 shadow-xs hover:shadow-xl hover:border-forest/25 transition-all duration-300">
      {/* Top Meta Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span
            className={`inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border ${getCategoryTheme(
              document.category
            )}`}
          >
            {displayCategory}
          </span>

          <div className="flex items-center gap-1.5 font-mono text-[11px] text-charcoal/60">
            {document.year && (
              <span className="font-semibold text-forest bg-cream/80 px-2 py-0.5 rounded-md border border-forest/10">
                {document.year}
              </span>
            )}
            <span className="px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-600 font-bold uppercase text-[10px]">
              PDF
            </span>
          </div>
        </div>

        {/* Document Icon & Title */}
        <div className="space-y-2">
          <div className="w-10 h-10 rounded-2xl bg-[#0B3025]/5 text-[#0B3025] flex items-center justify-center group-hover:bg-[#0B3025] group-hover:text-white transition-all duration-300">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>

          <h3 className="font-heading font-bold text-base sm:text-lg text-[#0B3025] leading-snug group-hover:text-[#F47B2A] transition-colors line-clamp-2">
            {displayTitle}
          </h3>

          {displayDesc && (
            <p className="font-body text-xs sm:text-sm text-charcoal/70 leading-relaxed line-clamp-3">
              {displayDesc}
            </p>
          )}
        </div>
      </div>

      {/* Bottom Metadata & Actions */}
      <div className="pt-5 mt-5 border-t border-forest/10 space-y-3.5">
        <div className="flex items-center justify-between text-xs text-charcoal/60 font-mono">
          <span>{document.size ? document.size : "Verified PDF Document"}</span>
          <span className="text-[11px] text-emerald-800 font-medium font-sans flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
            {isGujarati ? "પ્રમાણિત દસ્તાવેજ" : "Verified Official"}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => onPreview(document)}
            className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full bg-cream hover:bg-forest-50 text-[#0B3025] border border-forest/15 hover:border-forest/30 text-xs font-bold transition-all"
          >
            <ExternalLinkIcon size={13} />
            <span>{isGujarati ? "વાંચો / જુઓ" : "Preview"}</span>
          </button>

          <a
            href={document.fileUrl}
            download
            className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full bg-[#0B3025] hover:bg-[#174B38] text-white text-xs font-bold transition-all shadow-xs"
          >
            <DownloadIcon size={13} />
            <span>{isGujarati ? "ડાઉનલોડ" : "Download"}</span>
          </a>
        </div>
      </div>
    </div>
  );
}

