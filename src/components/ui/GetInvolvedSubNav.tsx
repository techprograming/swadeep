"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import {
  HeartIcon,
  UsersGroupIcon,
  HandshakeIcon,
  BriefcaseIcon,
  SparklesIcon,
} from "@/components/ui/Icons";

export type GetInvolvedTabId = "overview" | "donation" | "volunteer" | "partner" | "career";

interface GetInvolvedSubNavProps {
  activeTab: GetInvolvedTabId;
  className?: string;
}

interface NavItem {
  id: GetInvolvedTabId;
  href: string;
  labelEn: string;
  badgeEn?: string;
  icon: React.ComponentType<{ size?: number | string; className?: string }>;
}

const NAV_ITEMS: NavItem[] = [
  {
    id: "overview",
    href: "/get-involved",
    labelEn: "Get Involved",
    
    badgeEn: "Overview",
    
    icon: SparklesIcon,
  },
  {
    id: "donation",
    href: "/donation",
    labelEn: "Donation",
    
    badgeEn: "80G / FCRA",
    
    icon: HeartIcon,
  },
  {
    id: "volunteer",
    href: "/become-a-volunteer",
    labelEn: "Become A Volunteer",
    
    badgeEn: "Join Us",
    
    icon: UsersGroupIcon,
  },
  {
    id: "partner",
    href: "/partner-with-us",
    labelEn: "Partner With Us",
    
    badgeEn: "Collaboration",
    
    icon: HandshakeIcon,
  },
  {
    id: "career",
    href: "/career",
    labelEn: "Career",
    
    badgeEn: "Openings",
    
    icon: BriefcaseIcon,
  },
];

export default function GetInvolvedSubNav({ activeTab, className = "" }: GetInvolvedSubNavProps) {
  const { isGujarati } = useLanguage();

  return (
    <nav
      aria-label={"Get Involved Sub Navigation"}
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
                className={`snap-center shrink-0 inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 border ${
                  isActive
                    ? "bg-[#F47B2A] text-white border-[#F47B2A] shadow-lg shadow-[#F47B2A]/25"
                    : "bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border-white/10 hover:border-white/20"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon
                  size={15}
                  className={isActive ? "text-white" : "text-saffron-400"}
                />
                <span>{item.labelEn}</span>
                {item.badgeEn && (
                  <span
                    className={`hidden md:inline-block px-2 py-0.5 rounded-full text-[10px] font-mono tracking-tight font-bold ${
                      isActive ? "bg-black/20 text-white" : "bg-white/10 text-white/70"
                    }`}
                  >
                    {item.badgeEn}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
