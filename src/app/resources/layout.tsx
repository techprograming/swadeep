import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reports & Publications | Swadeep Shikshan Vikas Sanstha",
  description:
    "Official audited annual reports, FCRA accounts, organization brochure, and publications of Swadeep Shikshan Vikas Sanstha.",
  alternates: {
    canonical: "/resources",
  },
  openGraph: {
    title: "Reports & Publications | Swadeep Shikshan Vikas Sanstha",
    description:
      "Download official annual reports, FCRA statements, and research publications of Swadeep.",
    url: "https://www.swadeep.org/resources",
    siteName: "Swadeep Shikshan Vikas Sanstha",
    type: "website",
  },
};

export default function ResourcesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

