"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ArticleGrid from "@/components/ArticlesGrid";

interface Article {
  id: number;
  title: string;
  description: string;
  slug: string;
  date: string;
  image: string;
  author: string;
  authorImage: string;
  category: string;
  blocksContent?: string;
}

interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

interface CategoryArticlesContainerProps {
  category: string;
}

export default function CategoryArticlesContainer({
  category,
}: CategoryArticlesContainerProps) {
  const searchParams = useSearchParams();
  const [articles, setArticles] = useState<Article[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    pageSize: 12,
    pageCount: 1,
    total: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Add event listener
    window.addEventListener("resize", checkMobile);

    // Cleanup
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Get the current page from search params
  const pageParam = searchParams.get("page");
  const currentPage = pageParam ? Number.parseInt(pageParam, 10) : 1;

  useEffect(() => {
    async function fetchArticles() {
      try {
        setLoading(true);

        const pageSize = isMobile ? 6 : 12;

        // Use category slug for filtering
        const response = await fetch(
          `https://truthful-prosperity-edd54e9c51.strapiapp.com/api/articles?filters[category][slug][$eq]=${category}&sort[updatedAt]=desc&pagination[page]=${currentPage}&pagination[pageSize]=${pageSize}&populate=*`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch articles: ${response.status}`);
        }

        const data = await response.json();

        // Format the articles for the grid
        const formattedArticles = data.data.map((article: any) => {
          const blocksContent =
            article.blocks
              ?.filter((block: any) => block.__component === "shared.rich-text")
              .map((block: any) => block.body || "")
              .join(" ") || "";

          return {
            id: article.id,
            title: article.title,
            description: article.description || "",
            slug: article.slug,
            date: article.publishedAt,
            image:
              article.cover?.formats?.medium?.url ||
              article.cover?.url ||
              "/images/elementor-placeholder-image.webp",
            author: article.author?.name || "Unknown Author",
            authorImage: article.author?.avatar?.url || null,
            category: article.category?.name || "Uncategorized",
            blocksContent: blocksContent,
          };
        });

        setArticles(formattedArticles);
        setPagination(data.meta.pagination);
        setError(null);
      } catch (err) {
        console.error("Error fetching articles:", err);
        setError("Failed to load articles. Please try again later.");
        setArticles([]);
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, [category, currentPage, isMobile]);

  if (error) {
    return (
      <div className="text-white text-center py-10">
        <p className="text-red-400 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-white text-center py-10">Loading articles...</div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="text-white text-center py-10">
        <p>No articles found in this category.</p>
        <a
          href="/articles"
          className="inline-block mt-4 px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
        >
          View All Articles
        </a>
      </div>
    );
  }

  return (
    <ArticleGrid
      articles={articles}
      pagination={pagination}
      currentPage={currentPage}
    />
  );
}
