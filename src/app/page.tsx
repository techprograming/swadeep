import React from "react";
import Hero from "@/components/sections/Hero";
import WhoAreWeSection from "@/components/sections/WhoAreWeSection";
import FocusAreas from "@/components/sections/FocusAreas";
import ImpactStats from "@/components/sections/ImpactStats";
import WorkInAction from "@/components/sections/WorkInAction";
import Partners from "@/components/sections/Partners";
import OurTrustees from "@/components/sections/OurTrustees";
import FeaturedVideos from "@/components/sections/FeaturedVideos";
import Testimonials from "@/components/sections/Testimonials";
import CallToAction from "@/components/sections/CallToAction";

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

      {/* 5. Our Work in Action */}
      <WorkInAction />

      {/* 6. Our Partners & Donors */}
      <Partners />

      {/* 7. Our Trustees */}
      <OurTrustees />

      {/* 8. Videos */}
      <FeaturedVideos />

      {/* 9. Testimonials */}
      <Testimonials />

      {/* 10. Final CTA */}
      <CallToAction />
    </main>
  );
}
