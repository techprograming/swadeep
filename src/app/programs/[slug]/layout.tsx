import type { Metadata } from "next";
import { PROGRAMS_DATA } from "@/lib/programsData";

type Props = {
  params: { slug: string };
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const program = PROGRAMS_DATA[params.slug];

  if (!program) {
    return {
      title: "Program | Swadeep Shikshan Vikas Sanstha",
      description: "Grassroots development programs by Swadeep Shikshan Vikas Sanstha.",
    };
  }

  const desc = program.summary.slice(0, 160);

  return {
    title: `${program.title} | Swadeep Shikshan Vikas Sanstha`,
    description: desc,
    alternates: {
      canonical: `/programs/${params.slug}`,
    },
    openGraph: {
      title: `${program.title} | Swadeep Shikshan Vikas Sanstha`,
      description: desc,
      url: `https://www.swadeep.org/programs/${params.slug}`,
      siteName: "Swadeep Shikshan Vikas Sanstha",
      type: "article",
      images: [
        {
          url: program.image,
          width: 1200,
          height: 630,
          alt: program.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${program.title} | Swadeep Shikshan Vikas Sanstha`,
      description: desc,
      images: [program.image],
    },
  };
}

export default function ProgramDetailLayout({ children }: Props) {
  return <>{children}</>;
}
