import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Photo Gallery | Swadeep Shikshan Vikas Sanstha",
  description:
    "Photo Gallery of Swadeep Shikshan Vikas Sanstha across Education, Health, Livelihood, Rural Infrastructure, Disaster, and Media.",
  alternates: {
    canonical: "/gallery",
  },
  openGraph: {
    title: "Photo Gallery | Swadeep Shikshan Vikas Sanstha",
    description:
      "Photo Gallery of Swadeep Shikshan Vikas Sanstha across Education, Health, Livelihood, Rural Infrastructure, Disaster, and Media.",
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

