import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Photo Gallery | Swadeep Shikshan Vikas Sanstha",
  description:
    "Explore 86+ authentic on-ground photographs documenting Swadeep's grassroots work in education, health, livelihoods, rural development, and disaster response across Gujarat.",
  alternates: {
    canonical: "/gallery",
  },
  openGraph: {
    title: "Photo Gallery | Swadeep Shikshan Vikas Sanstha",
    description:
      "Authentic moments from Swadeep's field interventions across 200+ villages in Gujarat.",
    url: "https://www.swadeep.org/gallery",
    siteName: "Swadeep Shikshan Vikas Sanstha",
    type: "website",
    images: [
      {
        url: "/img/Education/Swadeep-Shikshan-Vikas-Sanstha-Education-1-700x525.jpg",
        width: 700,
        height: 525,
        alt: "Swadeep Education Field Photograph",
      },
    ],
  },
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

