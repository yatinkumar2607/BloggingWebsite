import HeroSection from "@/components/HeroSection";
import SectionWrapper from "@/components/SectionWrapper";
import FullWidthSlider from "@/components/FullWidthSlider";
import SectionWrapperV2 from "@/components/SectionWrapperV2";

interface Author {
  id: number;
  documentId: string;
  name: string;
  email: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface Category {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface ImageFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
}

interface Cover {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    large: ImageFormat;
    small: ImageFormat;
    medium: ImageFormat;
    thumbnail: ImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface Block {
  __component: string;
  id: number;
  body: string;
}

interface Article {
  id: number;
  documentId: string;
  title: string;
  description: string | null;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  cover: Cover | null;
  author: Author;
  category: Category;
  blocks: Block[];
}

interface ApiResponse {
  data: Article[];
  meta: {
    pagination: {
      start: number;
      limit: number;
      total: number;
    };
  };
}

// Function to format date from ISO string
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

// Fetch trending articles from the API
async function getTrendingArticles() {
  try {
    const response = await fetch(
      "https://credible-rhythm-2abfae7efc.strapiapp.com/api/articles?filters[category][name][$eq]=trending&pagination[limit]=3&populate=*",
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    const data: ApiResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching trending articles:", error);
    return null;
  }
}

function transformArticlesToCardFormat(articles: Article[]) {
  return articles.map((article) => ({
    featuredImage:
      article.cover?.url ||
      article.cover?.formats?.medium?.url ||
      "/placeholder.svg?height=400&width=600",
    authorName: article.author?.name || "Unknown Author",
    authorImage: "/images/unsplash_B5PLtlpR7YA.png",
    date: formatDate(article.publishedAt),
    title: article.title,
    excerpt:
      article.description ||
      article.blocks?.[0]?.body?.substring(0, 150) + "..." ||
      "",
    readMoreUrl: `/blog/${article.slug}`,
  }));
}

export default async function Home() {
  const trendingArticlesResponse = await getTrendingArticles();
  const trendingArticles = trendingArticlesResponse?.data || [];

  const trendingCardData = transformArticlesToCardFormat(trendingArticles);

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
        "Lionel Messi Leaving Ligue 2 Team Paris Saint-Germain, Club Confirms",
    },
  ];

  const newsItems = [
    {
      image: "/images/08e1a7e3ae559ddf8fac2dd016a414b4.jpeg",
      date: "Agence France-Presse - 04 June 2023",
      title:
        "LIONEL MESSI LEAVING LIGUE 1 TEAM PARIS SAINT-GERMAIN, CLUB CONFIRMS",
      description:
        "The EuroLeague Finals Top Scorer is the individual award for the player that gained the highest points in the EuroLeague Finals",
      tag: "Recent",
    },
    {
      image: "/images/2a0a6b22204579198ff2e4508646a424.jpeg",
      date: "ESPN - 15 March 2025",
      title:
        "MANCHESTER CITY WINS PREMIER LEAGUE TITLE FOR FOURTH CONSECUTIVE SEASON",
      description:
        "Manchester City has secured the Premier League title with three games remaining, setting a new record for consecutive titles in the modern era.",
      tag: "Breaking",
    },
    {
      image: "/images/a2133d2051ea3e3a6a557b092072c912.jpeg",
      date: "Sports Illustrated - 14 March 2025",
      title: "NBA ANNOUNCES EXPANSION TEAMS IN LAS VEGAS AND SEATTLE",
      description:
        "The NBA Board of Governors has unanimously approved the addition of two expansion franchises in Las Vegas and Seattle, set to begin play in the 2027-28 season.",
      tag: "Basketball",
    },
    {
      image: "/images/9a679af59a3678412acbe0c5b79c5c31.jpeg",
      date: "BBC Sport - 12 March 2025",
      title: "RAFAEL NADAL ANNOUNCES RETIREMENT FROM PROFESSIONAL TENNIS",
      description:
        "After a legendary career spanning over two decades, 24-time Grand Slam champion Rafael Nadal has announced his retirement from professional tennis.",
      tag: "Tennis",
    },
  ];

  return (
    <>
      <HeroSection posts={posts} />
      <SectionWrapper sliderHeading="Trending" articles={trendingCardData} />
      <SectionWrapperV2 headingCol1="IPL Points table" headingCol2="Folders" />
      <FullWidthSlider posts={newsItems} />
      <SectionWrapper sliderHeading="Recent" />
      <SectionWrapper sliderHeading="Top Articles" />
    </>
  );
}
