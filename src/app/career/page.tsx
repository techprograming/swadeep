import type { Metadata } from "next";
import CareerContent from "@/components/sections/CareerContent";

export const metadata: Metadata = {
  title: "Career | Discover New Career | Swadeep Shikshan Vikas Sanstha",
  description:
    "Come, be a part of team Swadeep! Together, let’s spread smile across the world! View current openings for Co-ordinator and Teacher positions based in Gujarat.",
  alternates: {
    canonical: "/career",
  },
};

export default function CareerPage() {
  return <CareerContent />;
}
