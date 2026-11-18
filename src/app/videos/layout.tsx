import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Videos & Field Documentary | Swadeep Shikshan Vikas Sanstha",
  description:
    "Watch authentic grassroots videos, classroom learning activities, and community welfare programs on Swadeep's official YouTube channel (@swadeepindia2543).",
  alternates: {
    canonical: "/videos",
  },
  openGraph: {
    title: "Videos & Field Documentary | Swadeep Shikshan Vikas Sanstha",
    description:
      "Watch grassroots stories and community welfare programs from Swadeep's official channel.",
    url: "https://www.swadeep.org/videos",
    siteName: "Swadeep Shikshan Vikas Sanstha",
    type: "website",
  },
};

export default function VideosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
