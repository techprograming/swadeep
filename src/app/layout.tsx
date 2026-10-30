import type { Metadata } from "next";
import { Inter, Source_Sans_3, Noto_Sans_Gujarati } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SITE_CONFIG } from "@/lib/constants";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
});

const notoSansGujarati = Noto_Sans_Gujarati({
  subsets: ["gujarati", "latin"],
  variable: "--font-noto-gujarati",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Swadeep Shikshan Vikas Sanstha | NGO in Ahmedabad, Gujarat",
  description: SITE_CONFIG.description,
  keywords: [
    "Swadeep Shikshan Vikas Sanstha",
    "NGO Ahmedabad",
    "NGO Gujarat",
    "Rural Development Gujarat",
    "Education NGO",
    "Women Empowerment Gujarat",
    "Healthcare NGO Ahmedabad",
  ],
  authors: [{ name: SITE_CONFIG.name }],
  metadataBase: new URL(SITE_CONFIG.url),
  alternates: {
    canonical: SITE_CONFIG.url,
  },
  openGraph: {
    title: "Swadeep Shikshan Vikas Sanstha | NGO in Ahmedabad, Gujarat",
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Swadeep Shikshan Vikas Sanstha | NGO in Ahmedabad, Gujarat",
    description: SITE_CONFIG.description,
  },
};

import { Providers } from "@/components/layout/Providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: "Swadeep Shikshan Vikas Sanstha",
    alternateName: "સ્વદીપ શિક્ષણ વિકાસ સંસ્થા",
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/images/favicon.png`,
    description: SITE_CONFIG.description,
    foundingDate: "2005",
    address: {
      "@type": "PostalAddress",
      streetAddress: "21, Abhinandan Park Society, Prernatirth Derasar Road, Prahlad Nagar",
      addressLocality: "Ahmedabad",
      addressRegion: "Gujarat",
      postalCode: "380015",
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-942-830-9408",
      contactType: "customer service",
      email: SITE_CONFIG.email,
      availableLanguage: ["English", "Gujarati"],
    },
    sameAs: [
      SITE_CONFIG.social.facebook,
      SITE_CONFIG.social.youtube,
    ],
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} ${sourceSans.variable} ${notoSansGujarati.variable} scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-cream text-charcoal font-body antialiased flex flex-col">
        <Providers>
          {/* Accessible skip link for keyboard users */}
          <a
            href="#main-content"
            className="skip-link sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-forest focus:text-white focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-saffron"
          >
            Skip to main content
          </a>

          {/* Global Navigation Bar */}
          <Navbar />

          {/* Dynamic Page Content */}
          <div className="flex-1 flex flex-col">{children}</div>

          {/* Global Footer */}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
