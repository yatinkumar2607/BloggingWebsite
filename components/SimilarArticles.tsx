"use client";

import ArticleGrid from "./ArticlesGrid";
import { useEffect, useState } from "react";
import SectionHeading from "./SectionHeading";

interface SimilarArticlesProps {
  categorySlug?: string;
  categoryName?: string;
  currentArticleSlug?: string;
  currentArticleId?: number | string;
}

const SimilarArticles = ({
  categorySlug,
  categoryName = "",
  currentArticleId,
  currentArticleSlug,
}: SimilarArticlesProps) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const formatArticles = (data: any) => {
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

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);

        const limit = 20;
        let allArticles = [];
        let usedFallback = false;

        if (categorySlug) {
          const categoryResponse = await fetch(
            `https://credible-rhythm-2abfae7efc.strapiapp.com/api/articles?filters[category][slug][$eq]=${categorySlug}&sort[publishedAt]=desc&pagination[limit]=${limit}&populate=*`
          );

          if (categoryResponse.ok) {
            const categoryData = await categoryResponse.json();
            allArticles = formatArticles(categoryData);
          }
        }

        if (allArticles.length === 0) {
          usedFallback = true;
          const allArticlesResponse = await fetch(
            `https://credible-rhythm-2abfae7efc.strapiapp.com/api/articles?pagination[page]=1&pagination[pageSize]=${limit}&populate=*&sort[publishedAt]=desc`
          );

          if (!allArticlesResponse.ok) {
            throw new Error(
              `Failed to fetch articles: ${allArticlesResponse.status}`
            );
          }

          const allArticlesData = await allArticlesResponse.json();
          allArticles = formatArticles(allArticlesData);
        }

        setUsingFallback(usedFallback);
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
    return (
      <section className="section">
        <div className="space-y-5">
          <SectionHeading heading="More Articles" />
          <div className="text-center py-8 text-[#d9d9d9]">
            No articles found.
          </div>
        </div>
      </section>
    );
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
