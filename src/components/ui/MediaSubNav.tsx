"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import {
  ReceiptTextIcon,
  BookOpenIcon,
  CameraIcon,
  YoutubeIcon,
} from "@/components/ui/Icons";

export type MediaTabId = "resources" | "publications" | "gallery" | "videos";

interface MediaSubNavProps {
  activeTab: MediaTabId;
  className?: string;
}

interface NavItem {
  id: MediaTabId;
  href: string;
  labelEn: string;
  labelGu: string;
  badgeEn: string;
  badgeGu: string;
  icon: React.ComponentType<{ size?: number | string; className?: string }>;
}

const NAV_ITEMS: NavItem[] = [
  {
    id: "resources",
    href: "/resources",
    labelEn: "Reports & Governance",
    labelGu: "અહેવાલો અને સંસાધનો",
    badgeEn: "33 Documents",
    badgeGu: "૩૩ દસ્તાવેજો",
    icon: ReceiptTextIcon,
  },
  {
    id: "publications",
    href: "/publications",
    labelEn: "Field Publications",
    labelGu: "શૈક્ષણિક સાહિત્ય",
    badgeEn: "5 Books & Guides",
    badgeGu: "૫ પુસ્તિકાઓ",
    icon: BookOpenIcon,
  },
  {
    id: "gallery",
    href: "/gallery",
    labelEn: "Photo Gallery",
    labelGu: "ફોટો ગેલેરી",
    badgeEn: "86 Field Photos",
    badgeGu: "૮૬ તસ્વીરો",
    icon: CameraIcon,
  },
  {
    id: "videos",
    href: "/videos",
    labelEn: "Video Gallery",
    labelGu: "વિડીયો ગેલેરી",
    badgeEn: "12 YouTube Videos",
    badgeGu: "૧૨ વિડીયો",
    icon: YoutubeIcon,
  },
];

export default function MediaSubNav({ activeTab, className = "" }: MediaSubNavProps) {
  const { isGujarati } = useLanguage();

  return (
    <nav
      aria-label={isGujarati ? "સંસાધન અને મીડિયા નેવિગેશન" : "Media & Knowledge Library Navigation"}
      className={`w-full bg-[#061F17]/95 border-b border-white/10 backdrop-blur-md sticky top-16 sm:top-20 z-20 shadow-md ${className}`}
    >
      <div className="container-wide max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto py-3 scrollbar-none snap-x snap-mandatory">
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.id;
            const Icon = item.icon;

            return (
              <Link
                key={item.id}
                href={item.href}
                className={`snap-center shrink-0 inline-flex items-center gap-2.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 border ${
                  isActive
                    ? "bg-[#F47B2A] text-white border-[#F47B2A] shadow-lg shadow-[#F47B2A]/25"
                    : "bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border-white/10 hover:border-white/20"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon
                  size={16}
                  className={isActive ? "text-white" : "text-saffron-400 group-hover:text-white"}
                />
                <span>{isGujarati ? item.labelGu : item.labelEn}</span>
                <span
                  className={`hidden md:inline-block px-2 py-0.5 rounded-full text-[10px] font-mono tracking-tight font-bold ${
                    isActive ? "bg-black/20 text-white" : "bg-white/10 text-white/70"
                  }`}
                >
                  {isGujarati ? item.badgeGu : item.badgeEn}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
