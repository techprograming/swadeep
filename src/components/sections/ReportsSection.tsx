"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { BookOpenIcon, ShieldCheckIcon, CheckCircleIcon } from "@/components/ui/Icons";

export interface ReportItem {
  id: string;
  title: string;
  titleGu?: string;
  category: "Annual Report" | "Audit Report" | "FC Accounts" | string;
  year: string;
  description?: string;
  fileUrl: string;
  size?: string;
  status?: string;
}

interface ReportsSectionProps {
  id?: string;
  title?: string;
  subtitle?: string;
  showTitle?: boolean;
}

export default function ReportsSection({
  id = "reports",
  title,
  subtitle,
  showTitle = true,
}: ReportsSectionProps) {
  const { isGujarati } = useLanguage();
  const [reports, setReports] = React.useState<ReportItem[]>([]);
  const [activeCategory, setActiveCategory] = React.useState<string>("all");
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    let isMounted = true;
    async function loadReports() {
      try {
        const res = await fetch("/api/reports");
        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.reports) && isMounted) {
            setReports(data.reports);
          }
        }
      } catch (err) {
        console.warn("Could not load reports:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadReports();
    return () => {
      isMounted = false;
    };
  }, []);

  const categoryCounts = React.useMemo(() => {
    const counts: Record<string, number> = { all: reports.length };
    reports.forEach((r) => {
      counts[r.category] = (counts[r.category] || 0) + 1;
    });
    return counts;
  }, [reports]);

  const filteredReports = React.useMemo(() => {
    return reports.filter((item) => {
      const matchesCat =
        activeCategory === "all" || item.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        (item.titleGu && item.titleGu.toLowerCase().includes(q)) ||
        item.year.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [reports, activeCategory, searchQuery]);

  const categories = [
    { key: "all", labelEn: "All Reports",  },
    { key: "Annual Report", labelEn: "Annual Reports",  },
    { key: "Audit Report", labelEn: "Audit Reports",  },
    { key: "FC Accounts", labelEn: "FC Accounts",  },
  ];

  return (
    <section id={id} className="space-y-8 scroll-mt-24" aria-label="Official Reports Repository">
      {showTitle && (
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-forest/10 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-forest-50 text-forest border border-forest/15">
              <ShieldCheckIcon className="w-3.5 h-3.5 text-forest" />
              <span>{"STATUTORY TRANSPARENCY"}</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0B3025]">
              {title ? title : "Reports — All Statutory & Project Documentation"}
            </h2>
            <p className="font-body text-xs sm:text-sm text-charcoal/75 max-w-2xl">
              {subtitle ? subtitle : "Complete collection of Swadeep Shikshan Vikas Sanstha's Annual Reports, Statutory Audit Reports, and FCRA Accounts."}
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs font-medium text-charcoal/70 bg-white px-4 py-2 rounded-2xl border border-forest/10 shadow-xs shrink-0">
            <CheckCircleIcon className="w-4 h-4 text-forest" />
            <span>{"Verified Documents: "}</span>
            <strong className="text-forest font-bold font-mono">{reports.length || 32}</strong>
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white/70 backdrop-blur-xs p-3.5 sm:p-4 rounded-2xl border border-forest/10 shadow-xs">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {categories.map((cat) => {
            const count = categoryCounts[cat.key] || 0;
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => setActiveCategory(cat.key)}
                className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                  isActive
                    ? "bg-[#0B3025] text-white shadow-xs"
                    : "bg-white text-charcoal/70 hover:bg-forest/5 hover:text-forest border border-forest/10"
                }`}
              >
                <span>{cat.labelEn}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isActive ? "bg-white/20 text-white" : "bg-forest/5 text-forest"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative sm:w-64">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={"Search by year or title..."}
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-white border border-forest/15 focus:outline-none focus:ring-2 focus:ring-forest text-charcoal"
          />
          <svg
            className="w-3.5 h-3.5 text-charcoal/40 absolute left-2.5 top-1/2 -translate-y-1/2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-charcoal/50 hover:text-charcoal"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Reports Grid */}
      {loading ? (
        <div className="py-12 text-center text-charcoal/60 text-sm">
          {"Loading reports repository..."}
        </div>
      ) : filteredReports.length === 0 ? (
        <div className="p-8 text-center bg-white rounded-3xl border border-forest/10 space-y-2">
          <p className="font-heading font-bold text-base text-[#0B3025]">
            {"No matching reports found"}
          </p>
          <p className="text-xs text-charcoal/60">
            {"Try adjusting your search query or selected filter."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredReports.map((item) => (
            <div
              key={item.id || item.title}
              className="bg-white rounded-2xl p-5 border border-forest/10 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group hover:-translate-y-0.5 duration-200"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-forest-50 text-forest border border-forest/15">
                    {item.category}
                  </span>
                  <span className="text-xs font-mono font-bold text-saffron bg-saffron/10 px-2 py-0.5 rounded-full">
                    {item.year}
                  </span>
                </div>

                <div>
                  <h3 className="font-heading font-bold text-forest-dark text-base group-hover:text-forest transition-colors leading-snug">
                    {item.title}
                  </h3>
                </div>

                {item.size && (
                  <div className="inline-flex items-center gap-1 text-[11px] text-charcoal/50 font-mono">
                    <span>PDF • {item.size}</span>
                  </div>
                )}
              </div>

              <div className="pt-4 mt-4 border-t border-forest/5 flex items-center justify-between">
                <a
                  href={item.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-forest group-hover:text-[#F47B2A] transition-colors"
                >
                  <BookOpenIcon className="w-3.5 h-3.5" />
                  <span>{"Download PDF ↗"}</span>
                </a>
                <span className="text-[10px] text-forest/70 font-semibold bg-forest/5 px-2 py-0.5 rounded-full">
                  Official
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

