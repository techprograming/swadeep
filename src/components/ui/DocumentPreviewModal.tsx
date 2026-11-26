"use client";

import React, { useEffect, useRef, useState } from "react";
import { DownloadIcon, ExternalLinkIcon } from "@/components/ui/Icons";

export interface PreviewDocument {
  id: string;
  title: string;
  titleGu?: string;
  category: string;
  categoryGu?: string;
  year?: string;
  fileUrl: string;
  size?: string;
  description?: string;
  descriptionGu?: string;
  coverImage?: string;
}

interface DocumentPreviewModalProps {
  document: PreviewDocument | null;
  isOpen: boolean;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  isGujarati?: boolean;
}

export default function DocumentPreviewModal({
  document,
  isOpen,
  onClose,
  onPrev,
  onNext,
  isGujarati = false,
}: DocumentPreviewModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeError, setIframeError] = useState(false);

  // Reset loading state when document changes
  useEffect(() => {
    if (document) {
      setIframeLoaded(false);
      setIframeError(false);
    }
  }, [document]);

  // Handle ESC key press and scroll locking
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
      if (e.key === "ArrowLeft" && onPrev) {
        onPrev();
      }
      if (e.key === "ArrowRight" && onNext) {
        onNext();
      }
    };

    const originalOverflow = window.getComputedStyle(documentBody()).overflow;
    documentBody().style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      documentBody().style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, onPrev, onNext]);

  const documentBody = () => (typeof window !== "undefined" ? window.document.body : { style: { overflow: "" } } as any);

  if (!isOpen || !document) return null;

  const displayTitle = document.title;
  const displayCategory = document.category;
  const displayDesc = document.description;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="preview-modal-title"
      onClick={(e) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
          onClose();
        }
      }}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-5xl h-[90vh] max-h-[850px] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-forest/15 animate-in zoom-in-95 duration-200"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 bg-[#0B3025] text-white border-b border-white/10 shrink-0">
          <div className="min-w-0 pr-4">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-[#F47B2A] text-white">
                {displayCategory}
              </span>
              {document.year && (
                <span className="px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-mono font-semibold bg-white/15 text-white/90">
                  {document.year}
                </span>
              )}
              {document.size && (
                <span className="text-[11px] text-white/70 font-mono hidden sm:inline">
                  • {document.size}
                </span>
              )}
            </div>
            <h3
              id="preview-modal-title"
              className="font-heading font-bold text-base sm:text-lg text-white truncate max-w-xl sm:max-w-2xl"
              title={displayTitle}
            >
              {displayTitle}
            </h3>
          </div>

          {/* Action buttons & Close button */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {onPrev && (
              <button
                type="button"
                onClick={onPrev}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all"
                title={"Previous Document (Arrow Left)"}
                aria-label="Previous Document"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            {onNext && (
              <button
                type="button"
                onClick={onNext}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all"
                title={"Next Document (Arrow Right)"}
                aria-label="Next Document"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}

            <a
              href={document.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs font-bold transition-all"
              title="Open document in new browser tab"
            >
              <ExternalLinkIcon size={14} />
              <span className="hidden md:inline">{"Open in New Tab"}</span>
            </a>

            <a
              href={document.fileUrl}
              download
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F47B2A] hover:bg-[#E06A1B] text-white text-xs font-bold transition-all shadow-sm"
              title="Download original PDF"
            >
              <DownloadIcon size={14} />
              <span>{"Download"}</span>
            </a>

            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all ml-1"
              aria-label="Close document preview"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Modal Description Banner (if available) */}
        {displayDesc && (
          <div className="px-5 sm:px-6 py-2.5 bg-cream/70 border-b border-forest/10 text-xs text-charcoal/80 shrink-0 line-clamp-2">
            {displayDesc}
          </div>
        )}

        {/* Document Viewer Body */}
        <div className="relative flex-1 bg-neutral-100 overflow-hidden">
          {/* Loading Indicator */}
          {!iframeLoaded && !iframeError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-neutral-100 z-10">
              <div className="w-8 h-8 border-3 border-[#0B3025] border-t-transparent rounded-full animate-spin" />
              <p className="text-xs text-charcoal/70 font-medium">
                {"Loading PDF document preview..."}
              </p>
            </div>
          )}

          {/* Iframe for PDF rendering */}
          {!iframeError ? (
            <iframe
              src={`${document.fileUrl}#toolbar=0&navpanes=0&scrollbar=1`}
              title={displayTitle}
              className="w-full h-full border-0"
              onLoad={() => setIframeLoaded(true)}
              onError={() => setIframeError(true)}
            />
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-8 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div className="max-w-md space-y-1">
                <h4 className="font-heading font-bold text-base text-[#0B3025]">
                  {"Inline Preview Not Available"}
                </h4>
                <p className="text-xs text-charcoal/70">
                  {"Your browser does not support embedded PDF preview for this file. You can open it in a new tab or download it directly."}
                </p>
              </div>
              <div className="flex items-center gap-3 pt-2">
                <a
                  href={document.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full bg-[#0B3025] hover:bg-[#174B38] text-white text-xs font-bold transition-all shadow-sm"
                >
                  {"Open in New Tab"}
                </a>
                <a
                  href={document.fileUrl}
                  download
                  className="px-5 py-2.5 rounded-full bg-[#F47B2A] hover:bg-[#E06A1B] text-white text-xs font-bold transition-all shadow-sm"
                >
                  {"Download PDF"}
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 sm:px-6 py-3 bg-white border-t border-forest/10 flex flex-wrap items-center justify-between gap-3 text-xs text-charcoal/60 shrink-0">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] font-semibold text-[#0B3025]">
              Swadeep Official Document Repository
            </span>
            <span>•</span>
            <span className="text-[11px]">Format: PDF</span>
            {document.size && (
              <>
                <span>•</span>
                <span className="text-[11px]">{document.size}</span>
              </>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-bold text-[#0B3025] hover:text-[#F47B2A] transition-colors"
          >
            {"Close Preview (Esc)"}
          </button>
        </div>
      </div>
    </div>
  );
}

