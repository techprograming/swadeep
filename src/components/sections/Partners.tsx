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
                className="bg-white rounded-3xl p-5 shadow-xs border border-forest/10 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Logo Container */}
                  <div className="relative w-full h-24 sm:h-28 flex items-center justify-center p-3 mb-4 bg-white rounded-2xl border border-forest/5 shadow-inner overflow-hidden">
                    <Image
                      src={partner.logo || "/images/partners/icds-gujarat.png"}
                      alt={partner.name}
                      fill
                      sizes="(max-width: 768px) 240px, 300px"
                      className="object-contain p-2"
                    />
                  </div>

                  {/* Partner Name */}
                  <h3 className="font-heading font-extrabold text-sm sm:text-base text-forest-dark line-clamp-2 leading-snug">
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
    </section>
  );
}
