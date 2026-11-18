import React from "react";
import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import WhoAreWeSection from "@/components/sections/WhoAreWeSection";
import FocusAreas from "@/components/sections/FocusAreas";
import ImpactStats from "@/components/sections/ImpactStats";
import Partners from "@/components/sections/Partners";
import OurTrustees from "@/components/sections/OurTrustees";
import FeaturedVideos from "@/components/sections/FeaturedVideos";
import Testimonials from "@/components/sections/Testimonials";
import CallToAction from "@/components/sections/CallToAction";

export const metadata: Metadata = {
  title: "Swadeep Shikshan Vikas Sanstha | Grassroots NGO in Gujarat",
  description:
    "Official website of Swadeep Shikshan Vikas Sanstha — grassroots NGO empowering rural communities across 200+ villages in Gujarat through Education, Health, Livelihoods, Rural Infrastructure, and Disaster Response since 2005.",
  keywords: [
    "Swadeep Shikshan Vikas Sanstha",
    "NGO in Ahmedabad",
    "Grassroots NGO Gujarat",
    "Education NGO Gujarat",
    "Rural Development Gujarat",
    "Section 80G Tax Exemption NGO",
    "FCRA Registered NGO",
    "ICDS Anganwadi BaLA",
    "Coastal Fishermen Livelihood",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Swadeep Shikshan Vikas Sanstha | Grassroots NGO in Gujarat",
    description:
      "Empowering rural communities across 200+ villages in Gujarat through Education, Health, Livelihoods, Infrastructure, and Relief since 2005.",
    url: "https://www.swadeep.org",
    siteName: "Swadeep Shikshan Vikas Sanstha",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/hero-1.jpg",
        width: 1200,
        height: 630,
        alt: "Swadeep Shikshan Vikas Sanstha Grassroots Impact",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Swadeep Shikshan Vikas Sanstha | Grassroots NGO in Gujarat",
    description:
      "Empowering rural communities across 200+ villages in Gujarat through Education, Health, Livelihoods, Infrastructure, and Relief.",
    images: ["/images/hero-1.jpg"],
  },
};

export default function HomePage() {
  return (
    <main id="main-content" className="flex-1">
      {/* 1. Hero */}
      <Hero />

      {/* 2. Who Are We? */}
      <WhoAreWeSection />

      {/* 3. What We Do — Five Core Programs */}
      <FocusAreas />

      {/* 4. Our Achievements */}
      <ImpactStats />

      {/* 5. Our Partners & Donors */}
      <Partners />

      {/* 6. Our Trustees */}
      <OurTrustees />

      {/* 7. Videos */}
      <FeaturedVideos />

      {/* 8. Testimonials */}
      <Testimonials />

      {/* 9. Final CTA */}
      <CallToAction />
    </main>
  );
}
