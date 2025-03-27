import HeroSection from "@/components/HeroSection";
import SectionWrapper from "@/components/SectionWrapper";
import FullWidthSlider from "@/components/FullWidthSlider";
import SectionWrapperV2 from "@/components/SectionWrapperV2";
export const revalidate = 0;

interface Author {
  id: number;
  documentId: string;
  name: string;
  email: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  avatar?: {
    url: string;
  };
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

interface SliderArticle {
  id: number;
  documentId: string;
  title: string;
  description: string | null;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  cover: Cover;
  author: Author;
  category: Category;
  blocks: Block[];
}

interface SliderResponse {
  data: {
    id: number;
    documentId: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    slider1: SliderArticle[];
    slider2: SliderArticle[];
  };
  meta: any;
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

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

async function getSliderData() {
  try {
    const response = await fetch(
      "https://credible-rhythm-2abfae7efc.strapiapp.com/api/slider?populate%5Bslider1%5D%5Bpopulate%5D=*&populate%5Bslider2%5D%5Bpopulate%5D=*"
      // { next: { revalidate: 0 } }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch slider data: ${response.status}`);
    }

    const data: SliderResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching slider data:", error);
    return null;
  }
}

async function getTrendingArticles() {
  try {
    const response = await fetch(
      "https://credible-rhythm-2abfae7efc.strapiapp.com/api/articles?filters[category][name][$eq]=trending&pagination[limit]=3&populate=*"
      // { next: { revalidate: 3600 } }
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

async function getRecentArticles() {
  try {
    const response = await fetch(
      "https://credible-rhythm-2abfae7efc.strapiapp.com/api/articles?filters[category][name][$eq]=recent&pagination[limit]=3&populate=*"
      // { next: { revalidate: 3600 } }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch recent articles: ${response.status}`);
    }

    const data: ApiResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching recent articles:", error);
    return null;
  }
}

// Add a new function to fetch top articles after the getRecentArticles function
async function getTopArticles() {
  try {
    const response = await fetch(
      "https://credible-rhythm-2abfae7efc.strapiapp.com/api/articles?filters[category][name][$eq]=top&pagination[limit]=3&populate=*"
      // { next: { revalidate: 3600 } }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch top articles: ${response.status}`);
    }

    const data: ApiResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching top articles:", error);
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
    authorImage: article.author?.avatar?.url || null,
    date: formatDate(article.publishedAt),
    title: article.title,
    excerpt:
      article.description ||
      article.blocks?.[0]?.body?.substring(0, 150) + "..." ||
      "",
    readMoreUrl: `/articles/${article.slug}`,
  }));
}

function transformSliderArticlesToPosts(sliderArticles: SliderArticle[]) {
  return sliderArticles.map((article) => ({
    tag: article.category?.name || "Uncategorized",
    date: `${article.author?.name || "Unknown"} - ${formatDate(
      article.publishedAt
    )}`,
    image:
      article.cover?.url ||
      article.cover?.formats?.large?.url ||
      "/placeholder.svg?height=600&width=1200",
    title: article.title,
    slug: article.slug,
    description: article.description || undefined,
  }));
}

export default async function Home() {
  // Fetch slider data
  const sliderResponse = await getSliderData();
  const slider1Articles = sliderResponse?.data?.slider1 || [];
  const slider1Posts = transformSliderArticlesToPosts(slider1Articles);

  // Transform slider2 articles for FullWidthSlider
  const slider2Articles = sliderResponse?.data?.slider2 || [];
  const slider2Posts = transformSliderArticlesToPosts(slider2Articles);

  // Fetch trending articles
  const trendingArticlesResponse = await getTrendingArticles();
  const trendingArticles = trendingArticlesResponse?.data || [];
  const trendingCardData = transformArticlesToCardFormat(trendingArticles);

  // Fetch recent articles
  const recentArticlesResponse = await getRecentArticles();
  const recentArticles = recentArticlesResponse?.data || [];
  const recentCardData = transformArticlesToCardFormat(recentArticles);

  // Fetch top articles
  const topArticlesResponse = await getTopArticles();
  const topArticles = topArticlesResponse?.data || [];
  const topCardData = transformArticlesToCardFormat(topArticles);

  // Update the return statement to conditionally render SectionWrapper components
  return (
    <>
      <HeroSection posts={slider1Posts} />
      {trendingCardData.length > 0 && (
        <SectionWrapper sliderHeading="Trending" articles={trendingCardData} />
      )}
      <SectionWrapperV2 headingCol1="IPL Points table" headingCol2="Folders" />
      {slider2Posts.length > 0 && <FullWidthSlider posts={slider2Posts} />}
      {recentCardData.length > 0 && (
        <SectionWrapper sliderHeading="Recent" articles={recentCardData} />
      )}
      {topCardData.length > 0 && (
        <SectionWrapper sliderHeading="Top Articles" articles={topCardData} />
      )}
    </>
  );
}
