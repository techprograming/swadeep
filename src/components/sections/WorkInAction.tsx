"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { MapPinIcon } from "@/components/ui/Icons";

const FIELD_MOMENTS = [
  {
    id: 1,
    title: "Community Education & Classroom Interaction",
    titleGu: "શાળા અને આંગણવાડી શિક્ષણ પ્રવૃત્તિ",
    category: "Education",
    categoryGu: "શિક્ષણ",
    location: "Rural Gujarat",
    image: "/img/Education/Swadeep-Shikshan-Vikas-Sanstha-Education-1-700x525.jpg",
    span: "col-span-1 sm:col-span-2 lg:col-span-2 row-span-2",
    aspect: "aspect-[4/3] sm:aspect-auto sm:min-h-[420px]",
    featured: true,
  },
  {
    id: 2,
    title: "Preventive Dental & Health Checkup Camps",
    titleGu: "આરોગ્ય અને દંત તપાસ શિબિર",
    category: "Health",
    categoryGu: "આરોગ્ય",
    location: "Coastal Gujarat",
    image: "/img/Helth/Shikshan-Vikas-SansthaBest-of-Swadeep-Health-Programs-1-400x300.jpg",
    span: "col-span-1",
    aspect: "aspect-[4/3]",
  },
  {
    id: 3,
    title: "Fisheries Livelihood & Coastal Community Support",
    titleGu: "દરિયાકાંઠાના માછીમારો માટે આજીવિકા સહાય",
    category: "Livelihood",
    categoryGu: "આજીવિકા",
    location: "Mundra & Jafrabad",
    image: "/img/Livelihood/Swadeep-Shikshan-Vikas-Sanstha-Fishries-1-400x300.jpg",
    span: "col-span-1",
    aspect: "aspect-[4/3]",
  },
  {
    id: 4,
    title: "Solar Street Lights & Village Infrastructure",
    titleGu: "સોલાર લાઈટ્સ અને ગ્રામીણ માળખાગત સુવિધા",
    category: "Rural Infrastructure",
    categoryGu: "ગ્રામ વિકાસ",
    location: "40 Villages",
    image: "/img/Rural%20Infastucture/Swadeep-Shikshan-Vikas-Sanstha-Infrastructure-1-400x267.jpg",
    span: "col-span-1",
    aspect: "aspect-[4/3]",
  },
  {
    id: 5,
    title: "Educational Kit Distribution & Learning Support",
    titleGu: "શૈક્ષણિક કિટ વિતરણ અને સહાય",
    category: "Media & Outreach",
    categoryGu: "પ્રેસ અને પહોંચ",
    location: "Gujarat, India",
    image: "/img/Media/Educational-Kit-Distribution-Sagarshala-400x265.jpg",
    span: "col-span-1",
    aspect: "aspect-[4/3]",
  },
];

export default function WorkInAction() {
  const { isGujarati } = useLanguage();

  return (
    <section
      id="work-in-action"
      className="section-padding py-20 lg:py-24 bg-white border-b border-forest/10 scroll-mt-20"
      aria-labelledby="work-in-action-heading"
    >
      <div className="container-wide max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-100 text-forest-dark text-xs font-bold uppercase tracking-wider">
              <span className="text-xs">📷</span>
              <span>{isGujarati ? "વાસ્તવિક ક્ષેત્ર તસવીરો" : "AUTHENTIC FIELD DOCUMENTATION"}</span>
            </div>

            <h2
              id="work-in-action-heading"
              className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-forest-dark tracking-tight"
            >
              {isGujarati ? "અમારા કાર્યો — જીવંત સ્મૃતિઓ" : "Our Work in Action"}
            </h2>

            <p className="font-body text-xs sm:text-sm md:text-base text-charcoal/75 leading-relaxed">
              {isGujarati
                ? "ગુજરાતના ૨૦૦+ ગામોમાં શિક્ષણ, આરોગ્ય, આજીવિકા અને સમુદાય સશક્તિકરણની પ્રત્યક્ષ તસવીરો."
                : "Real moments captured from Swadeep's on-ground programs across 200+ villages in Gujarat."}
            </p>
          </div>

          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0B3025] hover:bg-[#174B38] text-white text-xs sm:text-sm font-bold transition-all shadow-md hover:shadow-lg shrink-0 self-start md:self-end"
          >
            <span>{isGujarati ? "સંપૂર્ણ ફોટો ગેલેરી જુઓ" : "View Photo Gallery"}</span>
            <span className="text-base font-bold">→</span>
          </Link>
        </div>

        {/* Editorial Photo Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-stretch">
          {FIELD_MOMENTS.map((item) => (
            <Link
              key={item.id}
              href="/gallery"
              className={`group relative overflow-hidden rounded-3xl bg-forest-900 border border-forest/10 shadow-xs hover:shadow-xl transition-all duration-500 block ${item.span} ${item.aspect}`}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent transition-opacity duration-300" />

              {/* Category Pill */}
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-[#0B3025]/85 backdrop-blur-md text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-white/20">
                  {isGujarati ? item.categoryGu : item.category}
                </span>
              </div>

              {/* Card Footer Info */}
              <div className="absolute bottom-4 left-4 right-4 z-10 text-white space-y-1">
                <div className="flex items-center gap-1.5 text-[11px] text-white/80 font-medium">
                  <MapPinIcon className="w-3.5 h-3.5 text-[#F47B2A] shrink-0" />
                  <span>{item.location}</span>
                </div>
                <h3 className="font-heading font-bold text-sm sm:text-base lg:text-lg leading-snug line-clamp-2 text-white group-hover:text-cream transition-colors">
                  {isGujarati ? item.titleGu : item.title}
                </h3>
              </div>

              {/* Zoom Hover Icon */}
              <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Gallery Archive Counter Callout */}
        <div className="pt-2 text-center">
          <p className="text-xs sm:text-sm text-charcoal/60 font-medium">
            {isGujarati
              ? "૮૬+ પ્રમાણિત તસવીરો • ૫ મુખ્ય વિકાસ ક્ષેત્રો • ૨૦+ વર્ષનું ક્ષેત્રીય કાર્ય"
              : "86+ Verified Field Photographs • 5 Core Program Areas • 20+ Years of Documented Impact"}
          </p>
        </div>
      </div>
    </section>
  );
}
