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

export default function ArticlesContainer() {
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

    checkMobile();
    window.addEventListener("resize", checkMobile);

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

        const response = await fetch(
          `https://credible-rhythm-2abfae7efc.strapiapp.com/api/articles?pagination[page]=${currentPage}&pagination[pageSize]=${pageSize}&populate=*`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch articles: ${response.status}`);
        }

        const data = await response.json();

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
            date: article.createdAt,
            image:
              article.cover?.formats?.medium?.url ||
              article.cover?.url ||
              "/placeholder.svg?height=400&width=600",
            author: article.author?.name || "Unknown Author",
            authorImage:
              article.author?.avatar?.url || "/images/unsplash_B5PLtlpR7YA.png",
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
  }, [currentPage, isMobile]);

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

  return (
    <ArticleGrid
      articles={articles}
      pagination={pagination}
      currentPage={currentPage}
      context="main"
    />
  );
}
