"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";
import { MapPinIcon, CalendarIcon, SearchIcon, YoutubeIcon } from "@/components/ui/Icons";

type GalleryCategory = "All" | "Education" | "Health" | "Livelihood" | "Infrastructure" | "Relief";

interface GalleryItem {
  id: number;
  title: string;
  titleGu: string;
  category: "Education" | "Health" | "Livelihood" | "Infrastructure" | "Relief";
  location: string;
  date: string;
  image: string;
  description: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 1,
    title: "Primary Education & Learning Resource Centres",
    titleGu: "પ્રાથમિક શિક્ષણ અને અભ્યાસ કેન્દ્ર",
    category: "Education",
    location: "295 Schools across Gujarat",
    date: "Active Program",
    image: "/images/education.jpg",
    description:
      "Children actively participating in remedial learning, reading sessions, and interactive tablet exercises across rural Gujarat.",
  },
  {
    id: 2,
    title: "Healthcare Diagnostics & Dental Clinics",
    titleGu: "મફત આરોગ્ય અને દંત ચિકિત્સા શિબિર",
    category: "Health",
    location: "100+ Villages in Gujarat",
    date: "Ongoing Health Drives",
    image: "/images/health.jpg",
    description:
      "Volunteer medical doctors and dental teams providing comprehensive check-ups, eye screenings, and free medicines to 27,000+ villagers.",
  },
  {
    id: 3,
    title: "Marine Fisheries Empowerment ('Sagarbandhu')",
    titleGu: "સાગરબંધુ દરિયાકાંઠાના માછીમાર આજીવિકા",
    category: "Livelihood",
    location: "Coastal Gujarat (Tata Power CGPL)",
    date: "Signature CSR Program",
    image: "/images/livelihood.jpg",
    description:
      "Uplifting 400+ coastal fishermen households with sustainable marine gear, safe fish handling skills, and direct market access.",
  },
  {
    id: 4,
    title: "Anganwadi BaLA Modernization & Beautification",
    titleGu: "આંગણવાડી આધુનિકીકરણ (BaLA)",
    category: "Infrastructure",
    location: "100+ Anganwadis Renovated",
    date: "Infrastructure Initiative",
    image: "/images/infrastructure.jpg",
    description:
      "Transforming dull rural structures into vibrant Building as a Learning Aid (BaLA) joyful learning environments with clean sanitation.",
  },
  {
    id: 5,
    title: "Disaster Management & Cyclone Tauktae Relief",
    titleGu: "આપત્તિ વ્યવસ્થાપન અને તોકતે વાવાઝોડું સહાય",
    category: "Relief",
    location: "27 Coastal Villages",
    date: "Emergency Action",
    image: "/images/safety.jpg",
    description:
      "Emergency distribution of 1,000 household kits, 1,00,000 protective masks, and restoration of damaged dwellings post-cyclone.",
  },
  {
    id: 6,
    title: "ICDS Anganwadi Workers Capacity Building",
    titleGu: "આંગણવાડી કાર્યકરોની તાલીમ શિબિર",
    category: "Education",
    location: "Dadra & Nagar Haveli and Gujarat",
    date: "Government Partnership",
    image: "/images/community.jpg",
    description:
      "Training 481 Anganwadi workers and 473 helpers across 482 ICDS centres, nurturing 11,000+ toddlers in early childhood growth.",
  },
  {
    id: 7,
    title: "Field Monitoring & Village Inspections",
    titleGu: "પાયાના સ્તરે નિરીક્ષણ અને મૂલ્યાંકન",
    category: "Infrastructure",
    location: "Ahmedabad & Saurashtra Clusters",
    date: "Field Leadership",
    image: "/images/projects-hero.jpg",
    description:
      "Team Swadeep conducting on-ground feasibility surveys, public water filtration inspections, and community meetings.",
  },
  {
    id: 8,
    title: "Sagar Shala Coastal School Classrooms",
    titleGu: "સાગર શાળા — દરિયાકાંઠાના બાળકોનું શિક્ષણ",
    category: "Education",
    location: "Mundra & Coastal Belt",
    date: "Fishermen Education",
    image: "/images/education.jpg",
    description:
      "Delivering continuous formal education and nutritious meals for children of seasonal migratory fishermen communities.",
  },
  {
    id: 9,
    title: "Women Self-Help Groups (SHG) Livelihood",
    titleGu: "મહિલા સ્વ-સહાય જૂથ અને આજીવિકા",
    category: "Livelihood",
    location: "Rural Gujarat",
    date: "Women Empowerment",
    image: "/images/livelihood.jpg",
    description:
      "Tailoring, handicraft skills, and micro-savings programs enabling hundreds of rural women to achieve financial independence.",
  },
];

const CATEGORIES: GalleryCategory[] = [
  "All",
  "Education",
  "Health",
  "Livelihood",
  "Infrastructure",
  "Relief",
];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>("All");
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const filteredItems =
    selectedCategory === "All"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  const handleNext = useCallback(() => {
    if (!activeItem) return;
    const currentIndex = filteredItems.findIndex((item) => item.id === activeItem.id);
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setActiveItem(filteredItems[nextIndex]);
  }, [activeItem, filteredItems]);

  const handlePrev = useCallback(() => {
    if (!activeItem) return;
    const currentIndex = filteredItems.findIndex((item) => item.id === activeItem.id);
    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setActiveItem(filteredItems[prevIndex]);
  }, [activeItem, filteredItems]);

  // Lightbox keyboard navigation (Escape, ArrowLeft, ArrowRight)
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!activeItem) return;

      if (e.key === "Escape") {
        setActiveItem(null);
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      }
    },
    [activeItem, handleNext, handlePrev]
  );

  useEffect(() => {
    if (activeItem) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeItem, handleKeyDown]);

  return (
    <main id="main-content" className="flex-1 bg-cream">
      {/* 1. Hero Banner */}
      <section
        aria-labelledby="gallery-hero-heading"
        className="relative py-20 lg:py-28 bg-gradient-to-br from-forest-dark via-forest to-forest-900 text-cream overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage: `radial-gradient(circle at 20px 20px, white 2px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
        <div
          className="absolute -top-32 -right-32 w-96 h-96 bg-saffron/20 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 left-10 w-80 h-80 bg-forest-light/30 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="container-wide section-padding relative z-10 text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-saffron-light border border-white/15">
            <span>Swadeep Shikshan Vikas Sanstha</span>
          </div>

          <h1
            id="gallery-hero-heading"
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight"
          >
            Photo Gallery
          </h1>

          <p className="font-gujarati text-xl sm:text-2xl text-cream/90 font-medium">
            સ્વદીપ શિક્ષણ વિકાસ સંસ્થા — ફોટો ગેલેરી
          </p>

          <p className="font-body text-cream/85 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Authentic photographs capturing two decades of grassroots development, smiles,
            and sustainable transformation across Gujarat.
          </p>

          <div className="pt-2 flex items-center justify-center gap-3">
            <Link
              href="/videos"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-semibold shadow-md hover:shadow-lg transition-all"
            >
              <YoutubeIcon size={16} />
              <span>Watch Official Video Gallery (@swadeepindia2543)</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Filter Bar & Gallery Grid */}
      <section className="section-padding py-16 lg:py-24">
        <div className="container-wide">
          {/* Category Filter Buttons */}
          <div
            className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-12 lg:mb-16"
            role="toolbar"
            aria-label="Filter gallery by category"
          >
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-saffron ${
                    isSelected
                      ? "bg-forest text-cream shadow-md scale-105"
                      : "bg-white text-charcoal/80 hover:bg-forest-50 hover:text-forest border border-forest/10"
                  }`}
                  aria-pressed={isSelected}
                >
                  {cat}
                  {cat === "All" && ` (${GALLERY_ITEMS.length})`}
                </button>
              );
            })}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveItem(item)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveItem(item);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`View larger photo and details for ${item.title}`}
                className="group cursor-pointer bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl border border-forest/10 hover:border-saffron/40 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-saffron flex flex-col justify-between hover:-translate-y-1.5"
              >
                {/* Photo Container */}
                <div className="relative w-full h-64 overflow-hidden bg-forest-900">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                  {/* Top Category Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-forest-dark/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-white border border-white/20">
                      {item.category}
                    </span>
                  </div>

                  {/* Bottom Meta */}
                  <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between text-[11px] text-white">
                    <span className="truncate max-w-[65%] font-medium inline-flex items-center gap-1">
                      <MapPinIcon className="w-3 h-3 shrink-0 text-saffron-light" />
                      <span>{item.location}</span>
                    </span>
                    <span className="bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded text-[10px]">
                      {item.date}
                    </span>
                  </div>
                </div>

                {/* Card Caption Footer */}
                <div className="p-5 sm:p-6 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="font-gujarati text-xs text-saffron-dark font-semibold block">
                      {item.titleGu}
                    </span>
                    <h3 className="font-heading font-bold text-base sm:text-lg text-forest-dark group-hover:text-forest transition-colors line-clamp-2 mt-0.5">
                      {item.title}
                    </h3>
                  </div>

                  <p className="font-body text-xs sm:text-sm text-charcoal/70 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="pt-3 border-t border-cream-dark flex items-center justify-between text-xs font-bold text-saffron group-hover:text-saffron-dark">
                    <span>Enlarge Photo</span>
                    <svg
                      className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty state if filtered item count is zero */}
          {filteredItems.length === 0 && (
            <div className="text-center py-16 bg-white rounded-3xl border border-forest/10 p-8">
              <div className="w-12 h-12 mx-auto rounded-full bg-forest-50 text-forest flex items-center justify-center mb-3">
                <SearchIcon className="w-6 h-6 text-forest" />
              </div>
              <h3 className="font-heading text-xl font-bold text-forest">
                No items found in this category
              </h3>
              <p className="text-sm text-charcoal/70 mt-1">
                Please select another filter or choose &quot;All&quot;.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 3. Lightbox Modal */}
      {activeItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-charcoal/80 backdrop-blur-md animate-fade-in"
          onClick={() => setActiveItem(null)}
        >
          {/* Modal Container */}
          <div
            className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-3xl w-full border border-white/20 relative animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image with Controls */}
            <div className="relative w-full h-72 sm:h-96 bg-forest-900 group">
              <Image
                src={activeItem.image}
                alt={activeItem.title}
                fill
                sizes="(max-width: 1024px) 100vw, 800px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/80 via-transparent to-transparent pointer-events-none" />

              {/* Previous Button Overlay */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/60 hover:bg-forest text-white flex items-center justify-center transition-all shadow-lg focus:outline-none focus:ring-2 focus:ring-saffron"
                aria-label="Previous photograph"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Next Button Overlay */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/60 hover:bg-forest text-white flex items-center justify-center transition-all shadow-lg focus:outline-none focus:ring-2 focus:ring-saffron"
                aria-label="Next photograph"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveItem(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-saffron"
                aria-label="Close dialog"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Category Pill */}
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-forest-dark/90 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold text-white border border-white/30">
                  {activeItem.category}
                </span>
              </div>

              {/* Location & Date Footer */}
              <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between text-xs text-white bg-black/40 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/15">
                <span className="font-medium inline-flex items-center gap-1.5">
                  <MapPinIcon className="w-3.5 h-3.5 text-saffron-light shrink-0" />
                  <span>{activeItem.location}</span>
                </span>
                <span className="font-medium inline-flex items-center gap-1.5">
                  <CalendarIcon className="w-3.5 h-3.5 text-saffron-light shrink-0" />
                  <span>{activeItem.date}</span>
                </span>
              </div>
            </div>

            {/* Modal Content Body */}
            <div className="p-6 sm:p-8 space-y-4">
              <div>
                <span className="font-gujarati text-saffron-dark text-sm font-semibold block">
                  {activeItem.titleGu}
                </span>
                <h3
                  id="lightbox-title"
                  className="font-heading font-extrabold text-xl sm:text-2xl text-forest-dark mt-1"
                >
                  {activeItem.title}
                </h3>
              </div>

              <p className="font-body text-charcoal/80 text-sm sm:text-base leading-relaxed">
                {activeItem.description}
              </p>

              {/* Modal Navigation Footer */}
              <div className="pt-4 border-t border-cream-dark flex flex-wrap items-center justify-between gap-3 text-xs text-charcoal/70">
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="px-3.5 py-1.5 rounded-lg bg-cream-dark hover:bg-forest hover:text-white font-bold transition-colors inline-flex items-center gap-1"
                  >
                    <span>Previous</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-3.5 py-1.5 rounded-lg bg-cream-dark hover:bg-forest hover:text-white font-bold transition-colors inline-flex items-center gap-1"
                  >
                    <span>Next</span>
                  </button>
                  <span className="text-charcoal/60 ml-2 hidden sm:inline">
                    Photo {filteredItems.findIndex((it) => it.id === activeItem.id) + 1} of {filteredItems.length}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveItem(null)}
                  className="px-5 py-2 rounded-lg bg-forest text-white hover:bg-forest-light font-bold transition-colors shadow-xs"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
