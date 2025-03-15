import type { Metadata } from "next";
import NewsSlider from "@/components/NewsSlider";
import HeroSection from "@/components/HeroSection";
import SectionWrapper from "@/components/SectionWrapper";

// Static metadata for the home page
export const metadata: Metadata = {
  title: "Six and Fours | Sports News and Updates",
  description:
    "Get the latest sports news, trending stories, recent updates, and top articles from Six and Fours.",
  keywords: ["sports", "cycling", "news", "articles"],
  openGraph: {
    title: "Six and Fours | Sports News and Updates",
    description:
      "Get the latest sports news, trending stories, recent updates, and top articles from Six and Fours.",
    images: [
      {
        url: "/images/og-image.jpg", // Replace with your actual OG image
        width: 1200,
        height: 630,
        alt: "Six and Fours",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Six and Fours | Sports News and Updates",
    description:
      "Get the latest sports news, trending stories, recent updates, and top articles from Six and Fours.",
    images: ["/images/twitter-image.jpg"], // Replace with your actual Twitter image
  },
};

export default function Home() {
  return (
    <>
      <HeroSection
        image="/images/dec5f05fce3ccef2b5c1d1d3b1dfedb8.jpeg"
        tag="Cycling"
        date="Debits - 03 June 2023"
        title="Discover the member benifts of USA Cycling!"
      />
      <SectionWrapper sliderHeading="Trending" />
      <NewsSlider />
      <SectionWrapper sliderHeading="Recent" />
      <SectionWrapper sliderHeading="Top Articles" />
    </>
  );
}
