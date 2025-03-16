import type { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import SectionWrapper from "@/components/SectionWrapper";
import NewsSlider from "@/components/NewsSlider";

const posts = [
  {
    tag: "Cycling",
    date: "Debits - 03 June 2023",
    image: "/images/dec5f05fce3ccef2b5c1d1d3b1dfedb8.jpeg",
    title: "Discover the member benifts of USA Cycling!",
  },
  {
    tag: "Recent",
    date: "Agence France-Presse - 04 June 2023",
    image: "/images/08e1a7e3ae559ddf8fac2dd016a414b4.jpeg",
    title:
      "Lionel Messi Leaving Ligue 1 Team Paris Saint-Germain, Club Confirms",
  },
  // Add more posts as needed
];

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
  const newsItems = [
    {
      id: 1,
      image: "/images/08e1a7e3ae559ddf8fac2dd016a414b4.jpeg",
      source: "Agence France-Presse",
      date: "04 June 2023",
      title:
        "LIONEL MESSI LEAVING LIGUE 1 TEAM PARIS SAINT-GERMAIN, CLUB CONFIRMS",
      description:
        "The EuroLeague Finals Top Scorer is the individual award for the player that gained the highest points in the EuroLeague Finals",
      category: "Recent",
    },
    {
      id: 2,
      image: "/images/2a0a6b22204579198ff2e4508646a424.jpeg",
      source: "ESPN",
      date: "15 March 2025",
      title:
        "MANCHESTER CITY WINS PREMIER LEAGUE TITLE FOR FOURTH CONSECUTIVE SEASON",
      description:
        "Manchester City has secured the Premier League title with three games remaining, setting a new record for consecutive titles in the modern era.",
      category: "Breaking",
    },
    {
      id: 3,
      image: "/images/9a679af59a3678412acbe0c5b79c5c31.jpeg",
      source: "Sports Illustrated",
      date: "14 March 2025",
      title: "NBA ANNOUNCES EXPANSION TEAMS IN LAS VEGAS AND SEATTLE",
      description:
        "The NBA Board of Governors has unanimously approved the addition of two expansion franchises in Las Vegas and Seattle, set to begin play in the 2027-28 season.",
      category: "Basketball",
    },
    {
      id: 4,
      image: "/images/a2133d2051ea3e3a6a557b092072c912.jpeg",
      source: "BBC Sport",
      date: "12 March 2025",
      title: "RAFAEL NADAL ANNOUNCES RETIREMENT FROM PROFESSIONAL TENNIS",
      description:
        "After a legendary career spanning over two decades, 24-time Grand Slam champion Rafael Nadal has announced his retirement from professional tennis.",
      category: "Tennis",
    },
  ];
  return (
    <>
      <HeroSection posts={posts} />
      <SectionWrapper sliderHeading="Trending" />
      <NewsSlider items={newsItems} autoPlayInterval={8000} />
      <SectionWrapper sliderHeading="Recent" />
      <SectionWrapper sliderHeading="Top Articles" />
    </>
  );
}
