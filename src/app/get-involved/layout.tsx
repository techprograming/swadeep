import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get Involved & CSR Partnerships | Swadeep Shikshan Vikas Sanstha",
  description:
    "Collaborate with Swadeep Shikshan Vikas Sanstha through corporate CSR partnerships under Section 135, volunteer, or support grassroots rural programs in Gujarat.",
  alternates: {
    canonical: "/get-involved",
  },
  openGraph: {
    title: "Get Involved & CSR Partnerships | Swadeep Shikshan Vikas Sanstha",
    description:
      "Collaborate with Swadeep on Section 135 CSR projects and grassroots community initiatives across Gujarat.",
    url: "https://www.swadeep.org/get-involved",
    siteName: "Swadeep Shikshan Vikas Sanstha",
    type: "website",
  },
};

export default function GetInvolvedLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

