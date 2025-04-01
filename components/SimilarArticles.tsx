"use client";

import { useEffect, useState } from "react";
import SectionHeading from "./SectionHeading";
import ArticleGrid from "./ArticlesGrid";

interface SimilarArticlesProps {
  categorySlug?: string;
  categoryName?: string;
  currentArticleId?: number | string;
  currentArticleSlug?: string;
}

const SimilarArticles = ({
  categorySlug,
  categoryName = "",
  currentArticleId,
  currentArticleSlug,
}: SimilarArticlesProps) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [usingFallback, setUsingFallback] = useState(false);

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
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

  // Format articles from API response
  const formatArticles = (data: any) => {
    // Filter out the current article
    return data.data
      .filter((article: any) => {
        return (
          String(article.id) !== String(currentArticleId) &&
          article.slug !== currentArticleSlug
        );
      })
      .map((article: any) => {
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
            "/placeholder.svg?height=400&width=600",
          author: article.author?.name || "Unknown Author",
          authorImage:
            article.author?.avatar?.url || "/images/unsplash_B5PLtlpR7YA.png",
          category: article.category?.name || "Uncategorized",
          blocksContent: blocksContent,
        };
      });
  };

  // Fetch similar articles
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);

        const limit = 20;
        let allArticles = [];

        if (categorySlug) {
          const categoryResponse = await fetch(
            `https://truthful-prosperity-edd54e9c51.strapiapp.com/api/articles?filters[category][slug][$eq]=${categorySlug}&sort[publishedAt]=desc&pagination[limit]=${limit}&populate=*`
          );

          if (categoryResponse.ok) {
            const categoryData = await categoryResponse.json();
            allArticles = formatArticles(categoryData);
          }
        }

        // No fallback fetch - just use what we got from the category
        setArticles(allArticles);
        setError(null);
      } catch (err) {
        console.error("Error fetching articles:", err);
        setError("Failed to load articles.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [categorySlug, currentArticleId, currentArticleSlug]);

  if (loading) {
    return (
      <section className="section">
        <div className="space-y-5">
          <SectionHeading heading="More Articles" />
          <div className="text-center py-8 text-[#d9d9d9]">
            Loading articles...
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="section">
        <div className="space-y-5">
          <SectionHeading heading="More Articles" />
          <div className="text-center py-8 text-[#d9d9d9]">{error}</div>
        </div>
      </section>
    );
  }

  if (articles.length === 0) {
    return null; // Don't render the component at all when no articles are found
  }

  return (
    <section className="section">
      <div className="space-y-5">
        <SectionHeading heading="More Articles" />
        <ArticleGrid
          articles={articles}
          pagination={{
            page: 1,
            total: articles.length,
            pageSize: isMobile ? 3 : 6,
            pageCount: 1,
          }}
          currentPage={1}
          context="similar"
          categorySlug={!usingFallback ? categorySlug : undefined}
          categoryName={!usingFallback ? categoryName : undefined}
        />
      </div>
    </section>
  );
};

export default SimilarArticles;
