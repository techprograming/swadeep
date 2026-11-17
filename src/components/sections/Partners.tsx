"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { PARTNERS } from "@/lib/constants";
import { useLanguage } from "@/context/LanguageContext";
import { HandshakeIcon } from "@/components/ui/Icons";

export interface PartnerItem {
  id?: string;
  name: string;
  nameGu?: string;
  shortName?: string;
  category?: string;
  role: string;
  roleGu?: string;
  description?: string;
  descriptionGu?: string;
  logo?: string;
}

export default function Partners() {
  const { isGujarati } = useLanguage();
  const [partnersList, setPartnersList] = useState<PartnerItem[]>([...PARTNERS]);
  const [activePartnerModal, setActivePartnerModal] = useState<PartnerItem | null>(null);

  useEffect(() => {
    async function loadPartners() {
      try {
        const res = await fetch("/api/partners");
        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.partners) && data.partners.length > 0) {
            setPartnersList(data.partners);
          }
        }
      } catch (err) {
        console.warn("[Partners] Using static fallback:", err);
      }
    }
    loadPartners();
  }, []);

  return (
    <section
      id="partners"
      className="section-padding py-16 lg:py-24 bg-gradient-to-b from-cream via-[#FFFBF2] to-cream border-y border-forest/10 scroll-mt-20 relative overflow-hidden"
      aria-labelledby="partners-heading"
    >
      {/* Decorative ambient subtle background glows */}
      <div
        className="absolute top-0 right-1/4 w-96 h-96 bg-forest-50/40 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-1/4 w-96 h-96 bg-saffron/5 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="container-wide relative z-10 max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-saffron-50 text-saffron border border-saffron-200 text-xs font-bold uppercase tracking-wider shadow-xs">
            <HandshakeIcon size={16} />
            <span>SWADEEP SHIKSHAN VIKAS SANSTHA</span>
          </div>

          <h2
            id="partners-heading"
            className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-forest-dark tracking-tight"
          >
            {isGujarati ? "અમારા સહયોગીઓ અને પરોપકારી ભાગીદારો" : "Our Partners & Donors"}
          </h2>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 items-stretch">
          {partnersList.map((partner, index) => {
            const displayName = isGujarati && partner.nameGu ? partner.nameGu : partner.name;

            return (
              <div
                key={partner.id || partner.name || index}
                onClick={() => setActivePartnerModal(partner)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActivePartnerModal(partner);
                  }
                }}
                className="bg-white rounded-3xl p-5 shadow-xs hover:shadow-xl border border-forest/10 hover:border-forest/40 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5 cursor-pointer"
              >
                <div>
                  {/* Logo Container */}
                  <div className="relative w-full h-24 sm:h-28 flex items-center justify-center p-3 mb-4 bg-white rounded-2xl border border-forest/5 shadow-inner overflow-hidden">
                    <Image
                      src={partner.logo || "/images/partners/icds-gujarat.png"}
                      alt={partner.name}
                      fill
                      sizes="(max-width: 768px) 240px, 300px"
                      className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Partner Name */}
                  <h3 className="font-heading font-extrabold text-sm sm:text-base text-forest-dark line-clamp-2 leading-snug group-hover:text-forest transition-colors">
                    {displayName}
                  </h3>

                  {isGujarati && partner.name && (
                    <span className="text-[11px] text-charcoal/50 block mt-0.5 truncate">
                      {partner.name}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA for prospective partners */}
        <div className="mt-14 bg-gradient-to-r from-[#0B3025] to-[#144737] rounded-3xl p-6 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold tracking-wider uppercase text-saffron">
              {isGujarati ? "ભાગીદારી માટે આમંત્રણ" : "JOIN AS A COLLABORATOR"}
            </span>
            <h3 className="font-heading text-xl sm:text-2xl font-bold">
              {isGujarati
                ? "તમારી સંસ્થા અથવા CSR ફંડ સાથે સ્વદીપ સાથે જોડાઓ"
                : "Partner with Swadeep on High-Impact CSR Programs"}
            </h3>
            <p className="font-body text-xs sm:text-sm text-cream/80 max-w-2xl leading-relaxed">
              {isGujarati
                ? "શિક્ષણ, તટીય આજીવિકા, સ્વચ્છતા અને મહિલા સશક્તિકરણ ક્ષેત્રે ટકાઉ સામાજિક પરિવર્તન લાવવા માટે અમારી સાથે સહયોગ કરો."
                : "We welcome corporations, foundations, and government departments to partner with us for transparent, audited, and field-tested grassroots execution across Gujarat."}
            </p>
          </div>

          <a
            href="/contact?subject=CSR+Partnership+Inquiry#contact-form"
            className="px-6 py-3.5 rounded-full text-xs sm:text-sm font-bold bg-[#F47B2A] hover:bg-[#E06A1B] text-white transition-all shadow-md shrink-0 hover:scale-105"
          >
            {isGujarati ? "પાર્ટનરશિપ માટે સંપર્ક કરો" : "Inquire About Partnership"}
          </a>
        </div>
      </div>

      {/* Partner Detail Modal */}
      {activePartnerModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn"
          role="dialog"
          aria-modal="true"
          onClick={() => setActivePartnerModal(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-forest/20 relative space-y-5 animate-scaleUp overflow-y-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActivePartnerModal(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-cream-dark/60 text-charcoal/70 hover:bg-rose-100 hover:text-rose-700 flex items-center justify-center font-bold text-sm transition-colors"
              aria-label="Close modal"
            >
              ✕
            </button>

            {/* Modal Header with Logo */}
            <div className="flex items-center gap-4 border-b border-forest/10 pb-4">
              <div className="relative w-20 h-20 bg-white rounded-2xl border border-forest/10 p-2 shrink-0 flex items-center justify-center shadow-xs">
                <Image
                  src={activePartnerModal.logo || "/images/partners/icds-gujarat.png"}
                  alt={activePartnerModal.name}
                  fill
                  className="object-contain p-1"
                />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-forest-50 text-forest border border-forest/15 inline-block mb-1">
                  {activePartnerModal.category || "Official Partner"}
                </span>
                <h3 className="font-heading font-extrabold text-base sm:text-lg text-forest-dark">
                  {isGujarati && activePartnerModal.nameGu ? activePartnerModal.nameGu : activePartnerModal.name}
                </h3>
                {isGujarati && activePartnerModal.name && (
                  <p className="text-xs text-charcoal/60 mt-0.5">{activePartnerModal.name}</p>
                )}
              </div>
            </div>

            {/* Scope / Initiative */}
            <div className="bg-cream/40 p-4 rounded-2xl border border-forest/10 space-y-1">
              <div className="text-[11px] font-bold text-[#F47B2A] uppercase tracking-wider">
                {isGujarati ? "સહયોગ ક્ષેત્ર અને પરિયોજના" : "Joint Program Focus"}
              </div>
              <div className="font-heading font-bold text-sm text-[#0B3025]">
                {isGujarati && activePartnerModal.roleGu ? activePartnerModal.roleGu : activePartnerModal.role}
              </div>
            </div>

            {/* In-Depth Description */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-charcoal/80 uppercase tracking-wider">
                {isGujarati ? "વિગતવાર કાર્યક્રમ વિગત" : "Partnership Overview & Impact"}
              </h4>
              <p className="font-body text-xs sm:text-sm text-charcoal/80 leading-relaxed">
                {isGujarati && activePartnerModal.descriptionGu
                  ? activePartnerModal.descriptionGu
                  : activePartnerModal.description}
              </p>
            </div>

            {/* Testimonials / Specific Quotes if available */}
            {activePartnerModal.name.includes("Coastal Gujarat Power") && (
              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 text-xs text-amber-950 space-y-1.5">
                <span className="font-bold text-[#F47B2A]">Partner Testimonial — CGPL / Tata Power:</span>
                <p className="italic leading-relaxed">
                  &ldquo;CGPL’s partnership with SWADEEP has become an integral part of CGPL’s Integrated Fishermen Development Program titled &lsquo;Sagarbandhu&rsquo;. Together we bring transformation through effective partnership and continued collaboration.&rdquo;
                </p>
                <div className="text-[11px] font-bold text-charcoal/70 pt-1">
                  — Pradeep Kumar Ghosal, Head - Environment, CR &amp; Sustainability, CGPL (Tata Power)
                </div>
              </div>
            )}

            {activePartnerModal.name.includes("American India Foundation") && (
              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 text-xs text-amber-950 space-y-1.5">
                <span className="font-bold text-[#F47B2A]">Partner Testimonial — AIF:</span>
                <p className="italic leading-relaxed">
                  &ldquo;Working with an NGO like Swadeep which has a vast &amp; logical understanding of communities and smart solutions for the problems of the region they serve is great. Swadeep surely deserves appreciation for their honest efforts.&rdquo;
                </p>
                <div className="text-[11px] font-bold text-charcoal/70 pt-1">
                  — American India Foundation (AIF)
                </div>
              </div>
            )}

            {activePartnerModal.name.includes("Dadra and Nagar") && (
              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 text-xs text-amber-950 space-y-1.5">
                <span className="font-bold text-[#F47B2A]">Government Partner Acknowledgment:</span>
                <p className="italic leading-relaxed">
                  &ldquo;We applaud team Swadeep for their incredible efforts in the betterment of the U/T Dadra and Nagar Haveli through tangible deliverables in education and grassroots welfare.&rdquo;
                </p>
                <div className="text-[11px] font-bold text-charcoal/70 pt-1">
                  — U.T. Administration of Dadra and Nagar Haveli and Daman and Diu, Govt. of India
                </div>
              </div>
            )}

            {/* Modal Actions */}
            <div className="pt-3 border-t border-forest/10 flex items-center justify-between">
              <span className="text-[11px] text-charcoal/50">
                Verified CSR Partner &bull; Swadeep NGO
              </span>
              <button
                type="button"
                onClick={() => setActivePartnerModal(null)}
                className="px-5 py-2 text-xs font-bold text-white bg-[#0B3025] hover:bg-[#174B38] rounded-full shadow-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
