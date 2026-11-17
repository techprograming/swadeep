"use client";

import React from "react";
import Image from "next/image";
import { SITE_CONFIG, ACHIEVEMENTS, TESTIMONIALS } from "@/lib/constants";
import SectionHeading from "@/components/ui/SectionHeading";
import OurTrustees from "@/components/sections/OurTrustees";
import Partners from "@/components/sections/Partners";
import { EyeIcon, TargetIcon, AwardMedalIcon } from "@/components/ui/Icons";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutContent() {
  const [employees, setEmployees] = React.useState<any[]>([]);

  React.useEffect(() => {
    async function loadEmployees() {
      try {
        const res = await fetch("/api/employees");
        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.employees)) {
            setEmployees(data.employees);
          }
        }
      } catch (err) {
        console.warn("Could not load employees:", err);
      }
    }
    loadEmployees();
  }, []);
  const { isGujarati, t } = useLanguage();

  const fundingPartnersTestimonials = TESTIMONIALS.filter(
    (item) => item.category === "Funding Partners"
  );

  return (
    <main id="main-content" className="flex-1 bg-cream">
      {/* 1. Hero Banner */}
      <section
        aria-labelledby="about-hero-heading"
        className="relative py-20 lg:py-28 bg-gradient-to-br from-forest-dark via-forest to-forest-900 text-cream overflow-hidden"
      >
        {/* Enhanced Grassroots Background Image */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-25">
          <Image
            src="/images/community.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover filter contrast-[1.08] saturate-[1.15]"
          />
        </div>
        <div
          className="absolute inset-0 opacity-15 pointer-events-none bg-gradient-to-t from-forest-dark via-transparent to-forest-dark/80"
          aria-hidden="true"
        />

        <div className="container-wide section-padding relative z-10 text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 text-xs sm:text-sm font-bold tracking-wider text-cream/90 uppercase">
            <span>{isGujarati ? SITE_CONFIG.nameGujarati : SITE_CONFIG.name}</span>
          </div>

          <h1
            id="about-hero-heading"
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white"
          >
            {isGujarati ? "અમારા વિશે — પરિચય અને ઉદ્દેશ્યો" : "Who Are We?"}
          </h1>

          <p className="font-gujarati text-xl sm:text-2xl text-saffron-light font-medium">
            {isGujarati
              ? "૨૦૦૫ થી વંચિત સમુદાયો અને બાળકોના સર્વાંગી ઉત્થાન માટે સમર્પિત"
              : "સ્વદીપ શિક્ષણ વિકાસ સંસ્થા — પરિચય અને ઉદ્દેશ્યો"}
          </p>

          <p className="font-body text-cream/90 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto pt-2">
            {isGujarati
              ? "અમદાવાદ, ગુજરાતમાં ૨૦૦૫ માં સ્થપાયેલી સામાજિક બિન-નફાકારક સંસ્થા"
              : "Non-profit organization in Ahmedabad, Gujarat founded in 2005."}
          </p>
        </div>
      </section>

      {/* 2. Who Are We? Content Section */}
      <section id="history" className="section-padding py-20 lg:py-24 scroll-mt-24">
        <div className="container-wide max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Story Text */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-saffron bg-saffron-50 px-3.5 py-1.5 rounded-full border border-saffron-200">
                {isGujarati ? SITE_CONFIG.nameGujarati : "SWADEEP SHIKSHAN VIKAS SANSTHA"}
              </span>

              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-forest-dark tracking-tight">
                {isGujarati ? "સંસ્થાની સ્થાપના અને સફર" : "Who Are We?"}
              </h2>

              <div className="space-y-4 font-body text-charcoal/85 text-base sm:text-lg leading-relaxed">
                <p>{isGujarati ? SITE_CONFIG.whoAreWe1Gu : SITE_CONFIG.whoAreWe1}</p>
                <p>{isGujarati ? SITE_CONFIG.whoAreWe2Gu : SITE_CONFIG.whoAreWe2}</p>
              </div>

              {/* Award Callout */}
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0">
                  <AwardMedalIcon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs uppercase font-bold text-amber-900 tracking-wider">
                    {isGujarati ? "સન્માન" : "Recognition"}
                  </div>
                  <div className="font-heading font-extrabold text-amber-950 text-base sm:text-lg">
                    {isGujarati ? "CSR કોન્ક્લેવ ૨૦૧૯ એવોર્ડ વિજેતા" : "CSR Conclave 2019 Award"}
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Media Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative h-96 sm:h-[450px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src="/images/projects-hero.jpg"
                  alt="Swadeep Field Work"
                  fill
                  sizes="(max-width: 768px) 100vw, 450px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                  <span className="text-xs uppercase tracking-wider font-semibold text-saffron bg-forest-dark/90 px-3 py-1 rounded-full inline-block">
                    {isGujarati ? "ક્ષેત્રીય નેતૃત્વ" : "Grassroots Leadership"}
                  </span>
                  <h3 className="font-heading font-bold text-xl">
                    {isGujarati ? SITE_CONFIG.nameGujarati : SITE_CONFIG.name}
                  </h3>
                  <p className="text-sm text-cream/95">
                    {isGujarati
                      ? "અમદાવાદ, ગુજરાત – ૨૦૦૫ થી અવિરત સેવા"
                      : "Ahmedabad, Gujarat – Serving Communities Since 2005"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Vision & Mission Cards */}
      <section id="vision-mission" className="section-padding py-20 bg-cream-dark/50 border-y border-forest/10 scroll-mt-24" aria-label="Vision and Mission">
        <div className="container-wide max-w-5xl mx-auto">
          <SectionHeading
            badge={isGujarati ? "ધ્યેય અને દ્રષ્ટિકોણ" : "OUR PURPOSE"}
            gujaratiText="આપણું વિઝન અને મિશન"
            title={isGujarati ? "ધ્યેય અને દ્રષ્ટિકોણ" : "Our Vision & Mission"}
            subtitle={
              isGujarati
                ? "૨૦૦૫ થી સ્વદીપ ટીમને માર્ગદર્શન આપતો આધારસ્તંભ."
                : "The foundational purpose guiding team Swadeep since 2005."
            }
            align="center"
          />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vision */}
            <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-sm border-2 border-forest/10 flex flex-col justify-between hover:border-forest/30 transition-colors">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-forest-50 text-forest flex items-center justify-center border border-forest-100">
                  <EyeIcon className="w-7 h-7 text-forest" />
                </div>
                <h3 className="font-heading text-2xl font-extrabold text-forest-dark">
                  {isGujarati ? "અમારું વિઝન (Vision)" : "Our Vision"}
                </h3>
                <p className="font-body text-charcoal/85 text-base sm:text-lg leading-relaxed">
                  {isGujarati ? SITE_CONFIG.visionGu : SITE_CONFIG.vision}
                </p>
              </div>
            </div>

            {/* Mission */}
            <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-sm border-2 border-saffron/20 flex flex-col justify-between hover:border-saffron/40 transition-colors">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-saffron-50 text-saffron-dark flex items-center justify-center border border-saffron-100">
                  <TargetIcon className="w-7 h-7 text-saffron-dark" />
                </div>
                <h3 className="font-heading text-2xl font-extrabold text-forest-dark">
                  {isGujarati ? "અમારું મિશન (Mission)" : "Our Mission"}
                </h3>
                <p className="font-body text-charcoal/85 text-base sm:text-lg leading-relaxed">
                  {isGujarati ? SITE_CONFIG.missionGu : SITE_CONFIG.mission}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Our Journey Visual Timeline (Prompt Step 7 Specification) */}
      <section id="our-journey" className="section-padding py-20 lg:py-24 bg-white scroll-mt-24" aria-label="Our Journey">
        <div className="container-wide max-w-5xl mx-auto space-y-12">
          <SectionHeading
            badge={isGujarati ? "સંસ્થાની વિકાસ યાત્રા" : "HISTORICAL TIMELINE"}
            gujaratiText="અમારી ૨૦+ વર્ષોની અવિરત સેવા યાત્રા"
            title={isGujarati ? "અમારી યાત્રા — ૨૦૦૫ થી આજ સુધી" : "Our Journey: 2005 to Present"}
            subtitle={
              isGujarati
                ? "વંચિત સમુદાયો સાથે પાયાના સ્તરે સતત વિકાસ, સંશોધન અને સશક્તિકરણની ઐતિહાસિક સફર."
                : "A verified chronological milestone record of Swadeep's grassroots transformation across Gujarat."
            }
            align="center"
          />

          <div className="relative border-l-2 border-[#174B38]/20 ml-4 sm:ml-32 md:ml-40 space-y-10 py-4">
            {/* 2005 Foundation */}
            <div className="relative pl-6 sm:pl-8 group">
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#174B38] border-4 border-white shadow-sm" />
              <div className="hidden sm:block absolute -left-36 top-1 font-heading font-black text-xl text-[#174B38]">
                2005
              </div>
              <div className="bg-cream/40 p-5 sm:p-6 rounded-2xl border border-forest/10 hover:border-forest/30 transition-all space-y-2">
                <span className="sm:hidden inline-block text-xs font-bold text-white bg-[#174B38] px-2.5 py-0.5 rounded-full mb-1">
                  2005
                </span>
                <div className="text-xs font-bold text-[#F47B2A] uppercase tracking-wider">
                  {isGujarati ? "સંસ્થાની સ્થાપના" : "FOUNDATION"}
                </div>
                <h3 className="font-heading font-extrabold text-xl text-forest-dark">
                  {isGujarati ? "સ્વદીપ શિક્ષણ વિકાસ સંસ્થાની સ્થાપના" : "Establishment in Ahmedabad, Gujarat"}
                </h3>
                <p className="font-body text-charcoal/80 text-sm sm:text-base leading-relaxed">
                  {isGujarati
                    ? "અમદાવાદમાં વંચિત સમુદાયો, મહિલાઓ અને બાળકોના ઉત્થાન માટે સામાજિક સેવાની ભાવના સાથે સંસ્થાની શરૂઆત થઈ."
                    : "Founded in Ahmedabad with the clear urge and smart strategies to empower vulnerable communities through education and social service."}
                </p>
              </div>
            </div>

            {/* 2008 Early Education */}
            <div className="relative pl-6 sm:pl-8 group">
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#174B38] border-4 border-white shadow-sm" />
              <div className="hidden sm:block absolute -left-36 top-1 font-heading font-black text-xl text-[#174B38]">
                2008
              </div>
              <div className="bg-cream/40 p-5 sm:p-6 rounded-2xl border border-forest/10 hover:border-forest/30 transition-all space-y-2">
                <span className="sm:hidden inline-block text-xs font-bold text-white bg-[#174B38] px-2.5 py-0.5 rounded-full mb-1">
                  2008
                </span>
                <div className="text-xs font-bold text-[#F47B2A] uppercase tracking-wider">
                  {isGujarati ? "પૂર્વ-પ્રાથમિક શિક્ષણ" : "EARLY EDUCATION INITIATIVES"}
                </div>
                <h3 className="font-heading font-extrabold text-xl text-forest-dark">
                  {isGujarati ? "આંગણવાડી અને BaLA પહેલ" : "Anganwadi Interventions & BaLA Learning"}
                </h3>
                <p className="font-body text-charcoal/80 text-sm sm:text-base leading-relaxed">
                  {isGujarati
                    ? "૨૭૭ આંગણવાડી કેન્દ્રોમાં બાળ-મૈત્રીપૂર્ણ શિક્ષણ સામગ્રી (BaLA), બાળગીતો અને શિક્ષિકા તાલીમ કાર્યક્રમો શરૂ કર્યા."
                    : "Pioneered Building as Learning Aid (BaLA) in 277 ICDS Anganwadi centres, joyful rhyme literature, and caregiver capacity workshops."}
                </p>
              </div>
            </div>

            {/* 2012 Community Dev */}
            <div className="relative pl-6 sm:pl-8 group">
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#174B38] border-4 border-white shadow-sm" />
              <div className="hidden sm:block absolute -left-36 top-1 font-heading font-black text-xl text-[#174B38]">
                2012
              </div>
              <div className="bg-cream/40 p-5 sm:p-6 rounded-2xl border border-forest/10 hover:border-forest/30 transition-all space-y-2">
                <span className="sm:hidden inline-block text-xs font-bold text-white bg-[#174B38] px-2.5 py-0.5 rounded-full mb-1">
                  2012
                </span>
                <div className="text-xs font-bold text-[#F47B2A] uppercase tracking-wider">
                  {isGujarati ? "સમુદાય વિકાસ" : "COMMUNITY DEVELOPMENT & EXPANSION"}
                </div>
                <h3 className="font-heading font-extrabold text-xl text-forest-dark">
                  {isGujarati ? "૧૦૦ પ્રાથમિક અને ૩૦ માધ્યમિક શાળાઓ" : "Scaling Primary Education & Resource Centres"}
                </h3>
                <p className="font-body text-charcoal/80 text-sm sm:text-base leading-relaxed">
                  {isGujarati
                    ? "૨૦૦ થી વધુ ગામોમાં શૈક્ષણિક પહોંચ વધારી ૬૦,૦૦૦ થી વધુ બાળકો સુધી લર્નિંગ રિસોર્સ સેન્ટર (LRC) અને પુસ્તકાલયો સ્થાપ્યા."
                    : "Expanded educational footprint across 200+ villages, establishing Learning Resource Centres (LRCs) and supporting over 60,000 children."}
                </p>
              </div>
            </div>

            {/* 2015 Health & Livelihood */}
            <div className="relative pl-6 sm:pl-8 group">
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#174B38] border-4 border-white shadow-sm" />
              <div className="hidden sm:block absolute -left-36 top-1 font-heading font-black text-xl text-[#174B38]">
                2015
              </div>
              <div className="bg-cream/40 p-5 sm:p-6 rounded-2xl border border-forest/10 hover:border-forest/30 transition-all space-y-2">
                <span className="sm:hidden inline-block text-xs font-bold text-white bg-[#174B38] px-2.5 py-0.5 rounded-full mb-1">
                  2015
                </span>
                <div className="text-xs font-bold text-[#F47B2A] uppercase tracking-wider">
                  {isGujarati ? "આરોગ્ય અને આજીવિકા" : "HEALTH & LIVELIHOOD"}
                </div>
                <h3 className="font-heading font-extrabold text-xl text-forest-dark">
                  {isGujarati ? "પ્રોજેક્ટ આરોગ્ય અને સાગરશાળા પહેલ" : "Project Arogya & Coastal Sagar Shala"}
                </h3>
                <p className="font-body text-charcoal/80 text-sm sm:text-base leading-relaxed">
                  {isGujarati
                    ? "૧૩,૦૦૦ લાભાર્થીઓ માટે દંત આરોગ્ય શિબિરો અને મુંદ્રા-જાફરાબાદના ૫૦૦ માછીમારો માટે આજીવિકા કેન્દ્ર અને સાગરશાળા શરૂ કરી."
                    : "Launched Project Arogya dental hygiene programs reaching 13,000 beneficiaries and established coastal fisheries livelihood support for 500 fishermen."}
                </p>
              </div>
            </div>

            {/* 2019 CSR Conclave */}
            <div className="relative pl-6 sm:pl-8 group">
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#F47B2A] border-4 border-white shadow-sm" />
              <div className="hidden sm:block absolute -left-36 top-1 font-heading font-black text-xl text-[#F47B2A]">
                2019
              </div>
              <div className="bg-amber-50/70 p-5 sm:p-6 rounded-2xl border border-amber-200 hover:border-amber-400 transition-all space-y-2">
                <span className="sm:hidden inline-block text-xs font-bold text-white bg-[#F47B2A] px-2.5 py-0.5 rounded-full mb-1">
                  2019
                </span>
                <div className="text-xs font-bold text-[#F47B2A] uppercase tracking-wider">
                  {isGujarati ? "રાષ્ટ્રીય સન્માન" : "INSTITUTIONAL RECOGNITION"}
                </div>
                <h3 className="font-heading font-extrabold text-xl text-amber-950">
                  {isGujarati ? "CSR કોન્ક્લેવ ૨૦૧૯ એવોર્ડ" : "CSR Conclave 2019 Award"}
                </h3>
                <p className="font-body text-charcoal/80 text-sm sm:text-base leading-relaxed">
                  {isGujarati
                    ? "ટાટા પાવર અને અન્ય અગ્રણી ભાગીદારો સાથે મળીને ગ્રામીણ શિક્ષણ અને સમુદાય ઉત્થાનમાં ઉત્કૃષ્ટ યોગદાન બદલ પ્રતિષ્ઠિત સન્માન પ્રાપ્ત કર્યું."
                    : "Honored with the CSR Conclave 2019 Award for high-impact corporate social responsibility collaboration with Tata Power, CGPL, APM Terminals, and AIF."}
                </p>
              </div>
            </div>

            {/* 2020 Disaster Response */}
            <div className="relative pl-6 sm:pl-8 group">
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#174B38] border-4 border-white shadow-sm" />
              <div className="hidden sm:block absolute -left-36 top-1 font-heading font-black text-xl text-[#174B38]">
                2020-21
              </div>
              <div className="bg-cream/40 p-5 sm:p-6 rounded-2xl border border-forest/10 hover:border-forest/30 transition-all space-y-2">
                <span className="sm:hidden inline-block text-xs font-bold text-white bg-[#174B38] px-2.5 py-0.5 rounded-full mb-1">
                  2020-21
                </span>
                <div className="text-xs font-bold text-[#F47B2A] uppercase tracking-wider">
                  {isGujarati ? "આપત્તિ વ્યવસ્થાપન" : "DISASTER RESPONSE"}
                </div>
                <h3 className="font-heading font-extrabold text-xl text-forest-dark">
                  {isGujarati ? "કોવિડ-૧૯ અને તૌકતે વાવાઝોડું રાહત" : "Emergency COVID-19 & Cyclone Tauktae Relief"}
                </h3>
                <p className="font-body text-charcoal/80 text-sm sm:text-base leading-relaxed">
                  {isGujarati
                    ? "૧,૦૦,૦૦૦ થી વધુ માસ્ક વિતરણ, રાશન કિટ સહાય અને સૌરાષ્ટ્રના દરિયાકાંઠાના ૧,૦૦૦ થી વધુ પરિવારોને વાવાઝોડા પછી તાત્કાલિક રાહત પહોંચાડી."
                    : "Mobilized frontline disaster response distributing 100,000 safety masks, essential food kits, and emergency rehab for 1,000+ cyclone-affected families."}
                </p>
              </div>
            </div>

            {/* Present Day */}
            <div className="relative pl-6 sm:pl-8 group">
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#174B38] border-4 border-white shadow-sm ring-4 ring-[#174B38]/20" />
              <div className="hidden sm:block absolute -left-36 top-1 font-heading font-black text-xl text-[#174B38]">
                Present
              </div>
              <div className="bg-forest-50/60 p-5 sm:p-6 rounded-2xl border border-forest/20 hover:border-forest/40 transition-all space-y-2">
                <span className="sm:hidden inline-block text-xs font-bold text-white bg-[#174B38] px-2.5 py-0.5 rounded-full mb-1">
                  Present Day
                </span>
                <div className="text-xs font-bold text-[#174B38] uppercase tracking-wider">
                  {isGujarati ? "ટકાઉ વિકાસ" : "PRESENT DAY"}
                </div>
                <h3 className="font-heading font-extrabold text-xl text-forest-dark">
                  {isGujarati ? "સર્વાંગી ગ્રામીણ વિકાસ અને માળખાકીય સુરક્ષા" : "Integrated Rural Development & Solar Security"}
                </h3>
                <p className="font-body text-charcoal/80 text-sm sm:text-base leading-relaxed">
                  {isGujarati
                    ? "૪૦ ગામોમાં ૧,૦૫૦ સોલાર સ્ટ્રીટ લાઈટ્સ, ડિજિટલ સ્માર્ટ વર્ગખંડો અને મહિલા સ્વસહાય જૂથો દ્વારા ટકાઉ સ્વાવલંબન."
                    : "Operating 1,050 solar streetlights across 40 villages, continuing active schooling partnerships, and empowering self-reliant communities."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Our Board of Trustees */}
      <OurTrustees />

      {/* 5. Our Achievements Section */}
      <section className="section-padding py-20 lg:py-24 bg-white border-y border-forest/10" aria-label="Our Achievements">
        <div className="container-wide max-w-5xl mx-auto space-y-12">
          <SectionHeading
            badge={isGujarati ? "પ્રમાણિત કામગીરી" : "MEASURABLE WORK"}
            gujaratiText="અમારી સિદ્ધિઓ"
            title={isGujarati ? "અમારી સિદ્ધિઓ" : "Our Achievements"}
            subtitle={
              isGujarati
                ? "અમારા પાંચ વિકાસ ક્ષેત્રોમાં નોંધાયેલ વાસ્તવિક પરિણામો."
                : "Authentic programmatic milestones across our thematic areas of development."
            }
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Education */}
            <div className="p-6 rounded-3xl bg-cream-dark/40 border border-forest/10 space-y-4">
              <div className="font-heading font-extrabold text-xl text-forest border-b border-forest/10 pb-2">
                {isGujarati ? ACHIEVEMENTS.education.titleGu : ACHIEVEMENTS.education.title}
              </div>
              <ul className="space-y-2.5 font-body text-charcoal/85 text-base">
                {ACHIEVEMENTS.education.items.map((item, idx) => (
                  <li key={idx} className="flex items-center justify-between">
                    <span>{isGujarati ? item.labelGu : item.label}</span>
                    <span className="font-heading font-extrabold text-forest-dark">{item.count}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Health */}
            <div className="p-6 rounded-3xl bg-cream-dark/40 border border-forest/10 space-y-4">
              <div className="font-heading font-extrabold text-xl text-forest border-b border-forest/10 pb-2">
                {isGujarati ? ACHIEVEMENTS.health.titleGu : ACHIEVEMENTS.health.title}
              </div>
              <ul className="space-y-2.5 font-body text-charcoal/85 text-base">
                {ACHIEVEMENTS.health.items.map((item, idx) => (
                  <li key={idx} className="flex items-center justify-between">
                    <span>{isGujarati ? item.labelGu : item.label}</span>
                    <span className="font-heading font-extrabold text-forest-dark">{item.count}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Livelihood */}
            <div className="p-6 rounded-3xl bg-cream-dark/40 border border-forest/10 space-y-4">
              <div className="font-heading font-extrabold text-xl text-forest border-b border-forest/10 pb-2">
                {isGujarati ? ACHIEVEMENTS.livelihood.titleGu : ACHIEVEMENTS.livelihood.title}
              </div>
              <ul className="space-y-2.5 font-body text-charcoal/85 text-base">
                {ACHIEVEMENTS.livelihood.items.map((item, idx) => (
                  <li key={idx} className="flex items-center justify-between">
                    <span>{isGujarati ? item.labelGu : item.label}</span>
                    <span className="font-heading font-extrabold text-forest-dark">{item.count}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Rural Infrastructure Development */}
            <div className="p-6 rounded-3xl bg-cream-dark/40 border border-forest/10 space-y-4">
              <div className="font-heading font-extrabold text-xl text-forest border-b border-forest/10 pb-2">
                {isGujarati ? ACHIEVEMENTS.infrastructure.titleGu : ACHIEVEMENTS.infrastructure.title}
              </div>
              <ul className="space-y-2.5 font-body text-charcoal/85 text-base">
                {ACHIEVEMENTS.infrastructure.items.map((item, idx) => (
                  <li key={idx} className="flex items-center justify-between">
                    <span>{isGujarati ? item.labelGu : item.label}</span>
                    <span className="font-heading font-extrabold text-forest-dark">{item.count}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Disaster Management */}
            <div className="p-6 rounded-3xl bg-cream-dark/40 border border-forest/10 space-y-4 md:col-span-2 lg:col-span-2">
              <div className="font-heading font-extrabold text-xl text-forest border-b border-forest/10 pb-2">
                {isGujarati ? ACHIEVEMENTS.disaster.titleGu : ACHIEVEMENTS.disaster.title}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {ACHIEVEMENTS.disaster.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between font-body text-charcoal/85 text-base p-2 bg-white rounded-xl border border-forest/5">
                    <span>{isGujarati ? item.labelGu : item.label}</span>
                    <span className="font-heading font-extrabold text-forest-dark">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Our Partners */}
      <Partners />

      {/* 7. What They Say About Us */}
      <section className="section-padding py-20 lg:py-24 bg-cream" aria-label="What They Say About Us">
        <div className="container-wide max-w-5xl mx-auto space-y-14">
          <SectionHeading
            badge={isGujarati ? "અભિપ્રાય અને પ્રશંસા" : "SWADEEP SHIKSHAN VIKAS SANSTHA"}
            gujaratiText="અમારા વિશે મહાનુભાવો અને સાથીઓના વિચારો"
            title={isGujarati ? "ભાગીદારો અને સાથીઓના વિચારો" : "What They Say About Us"}
            subtitle={
              isGujarati
                ? "અમારા પ્રતિષ્ઠિત સહયોગીઓ અને સમર્પિત કાર્યકરો દ્વારા વ્યક્ત કરાયેલ વિશ્વાસ."
                : "Words of trust and collaboration from our esteemed partners and dedicated staff members."
            }
            align="center"
          />

          {/* Funding Partners Quotes */}
          <div className="space-y-6">
            <h3 className="font-heading text-2xl font-bold text-forest-dark border-l-4 border-saffron pl-4">
              {isGujarati ? "સહયોગી પાર્ટનર્સ (Funding Partners)" : "Funding Partners"}
            </h3>
            <div className="space-y-6">
              {fundingPartnersTestimonials.map((tItem, idx) => (
                <div key={idx} className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-forest/10 space-y-4">
                  <p className="font-body text-charcoal/85 text-base sm:text-lg italic leading-relaxed">
                    &ldquo;{tItem.quote}&rdquo;
                  </p>
                  <div className="pt-2 border-t border-cream-dark flex items-center justify-between">
                    <div>
                      <div className="font-heading font-bold text-lg text-forest-dark">{tItem.name}</div>
                      <div className="text-sm text-charcoal/70">{tItem.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Swadeep Executive & Field Operations Team */}
          {employees.length > 0 && (
            <div className="space-y-6 pt-4">
              <div className="border-l-4 border-forest pl-4">
                <h3 className="font-heading text-2xl font-bold text-forest-dark">
                  {isGujarati ? "અમારી ક્ષેત્રીય અને વ્યવસ્થાપકીય ટીમ" : "Our Operational & Field Leadership Team"}
                </h3>
                <p className="font-body text-xs sm:text-sm text-charcoal/70 mt-1">
                  {isGujarati
                    ? "પાયાના સ્તરે સતત કાર્યરત કર્મનિષ્ઠ કાર્યકરો અને પ્રોજેક્ટ કોઓર્ડિનેટર."
                    : "Dedicated project coordinators, social educators, and community mobilization leads."}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {employees.map((emp) => (
                  <div
                    key={emp.id || emp.name}
                    className="bg-white rounded-3xl p-6 shadow-sm border border-forest/10 hover:border-forest/30 transition-all hover:shadow-md flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-heading font-bold text-base text-forest-dark">
                          {emp.name}
                        </span>
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-forest-50 text-forest border border-forest/15">
                          {emp.department || "Operations"}
                        </span>
                      </div>
                      <div className="text-xs font-semibold text-saffron-dark">
                        {emp.role}
                      </div>
                      {emp.bio && (
                        <p className="text-xs text-charcoal/75 leading-relaxed line-clamp-3 pt-1">
                          {emp.bio}
                        </p>
                      )}
                    </div>

                    {(emp.email || emp.phone) && (
                      <div className="pt-3 mt-3 border-t border-cream-dark text-[11px] text-charcoal/60 space-y-0.5">
                        {emp.email && <div>Email: {emp.email}</div>}
                        {emp.phone && <div>Phone: {emp.phone}</div>}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
