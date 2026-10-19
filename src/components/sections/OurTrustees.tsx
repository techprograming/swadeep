import React from "react";
import Image from "next/image";
import { TRUSTEES } from "@/lib/constants";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function OurTrustees() {
  const getInitials = (name: string) => {
    return name
      .replace(/^(Shri|Smt|Dr)\s+/i, "")
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <section
      id="our-trustees"
      className="section-padding py-20 lg:py-24 bg-cream relative overflow-hidden border-t border-forest/10 scroll-mt-20"
      aria-labelledby="trustees-heading"
    >
      {/* Decorative ambient subtle background elements */}
      <div
        className="absolute top-0 right-1/4 w-96 h-96 bg-forest-50/50 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-1/4 w-96 h-96 bg-saffron/5 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="container-wide relative z-10 max-w-5xl mx-auto">
        <SectionHeading
          badge="SWADEEP SHIKSHAN VIKAS SANSTHA"
          gujaratiText="અમારા ટ્રસ્ટીઓ"
          title="Our Trustees"
          subtitle="We are a professionally managed organisation with decisions taken with utmost care and for the interest of people we strive to serve."
          align="center"
        />

        {/* Trustees Grid - Name and Role with Full Green Image Background */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {TRUSTEES.map((trustee) => (
            <AnimatedSection
              key={trustee.name}
              animation="slide-up"
              className="bg-white rounded-2xl p-6 shadow-sm border border-forest/10 hover:border-forest hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center group"
            >
              {/* Image / Avatar Container with Full Green Background */}
              <div className="w-20 h-20 rounded-2xl bg-forest text-cream font-heading font-black text-xl flex items-center justify-center shadow-md border-2 border-forest-light group-hover:scale-105 group-hover:bg-forest-dark transition-all duration-300 mb-4 overflow-hidden relative">
                {trustee.image ? (
                  <Image
                    src={trustee.image}
                    alt={trustee.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                ) : (
                  <span>{getInitials(trustee.name)}</span>
                )}
              </div>

              <h3 className="font-heading font-bold text-lg sm:text-xl text-forest-dark group-hover:text-forest transition-colors">
                {trustee.name}
              </h3>

              {/* Trustee Role */}
              <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-forest/10 text-forest border border-forest/20">
                {trustee.role}
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
