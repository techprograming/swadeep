import type { Metadata } from "next";
import AboutContent from "@/components/sections/AboutContent";

export const metadata: Metadata = {
  title: "Who Are We? | Swadeep Shikshan Vikas Sanstha",
  description:
    "With a strong urge, smart strategies and clear aim to stand along with the communities who needs a push to find a better direction, Swadeep was founded in 2005 in Ahmedabad, Gujarat.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
