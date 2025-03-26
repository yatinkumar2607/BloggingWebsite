// Alternative approach: Create a dynamic version of the page
// This file would be used if you switch from static export to server rendering

import { Suspense } from "react";
import type { Metadata } from "next";
import ArticleDetail from "@/components/ArticleDetail";
import SimilarArticles from "@/components/SimilarArticles";

// No need for generateStaticParams with dynamic rendering

async function getArticleBySlug(slug: string) {
  try {
    const response = await fetch(
      `https://credible-rhythm-2abfae7efc.strapiapp.com/api/articles/${slug}?populate=*`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch article: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching article with slug ${slug}:`, error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Article Not Found | Six and Fours",
      description: "The article you're looking for could not be found.",
    };
  }

  const title = article.title || "Article";
  const description =
    article.description || "Read this article on Six and Fours.";

  let ogImageUrl = "/images/og-image.jpg";
  if (article.cover) {
    ogImageUrl =
      article.cover.url ||
      article.cover.formats?.large?.url ||
      article.cover.formats?.medium?.url ||
      ogImageUrl;
  }

  return {
    title: `${title} | Six and Fours`,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: `/articles/${slug}`,
      siteName: "Six and Fours",
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: article.author ? [article.author.name] : undefined,
      images: [ogImageUrl],
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: [ogImageUrl],
    },
  };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  return (
    <div className="max-w-7xl mx-auto w-full px-5 sm:px-6 md:px-8 lg:px-10 pt-[8px] space-y-[66px]">
      <Suspense
        fallback={
          <div className="text-white text-center py-20">Loading article...</div>
        }
      >
        <ArticlePageContent params={params} />
      </Suspense>
    </div>
  );
}

async function ArticlePageContent({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return (
      <div className="text-white text-center py-20">
        <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
        <p className="mb-6">
          The article you're looking for could not be found.
        </p>
        <a
          href="/articles"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Browse All Articles
        </a>
      </div>
    );
  }

  // Extract category slug, article ID, and article slug for similar articles
  const categorySlug = article.category?.slug || null;
  const categoryName = article.category?.name || null;
  const articleId = article.id || null;
  const articleSlug = article.slug || null;

  return (
    <>
      <ArticleDetail article={article} />
      <SimilarArticles
        categorySlug={categorySlug}
        categoryName={categoryName}
        currentArticleId={articleId}
        currentArticleSlug={articleSlug}
      />
    </>
  );
}
