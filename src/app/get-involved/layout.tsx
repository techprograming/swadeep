import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get Involved | Swadeep Shikshan Vikas Sanstha",
  description:
    "Get involved with Swadeep Shikshan Vikas Sanstha through Donation, Volunteering, Partnerships, and Career opportunities in Gujarat.",
  alternates: {
    canonical: "/get-involved",
  },
  openGraph: {
    title: "Get Involved | Swadeep Shikshan Vikas Sanstha",
    description:
      "Get involved with Swadeep Shikshan Vikas Sanstha through Donation, Volunteering, Partnerships, and Career opportunities in Gujarat.",
    url: "https://www.swadeep.org/get-involved",
    siteName: "Swadeep Shikshan Vikas Sanstha",
    type: "website",
  },
};

export default function GetInvolvedLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

