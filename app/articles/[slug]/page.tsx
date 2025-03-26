import { Suspense } from "react";
import type { Metadata } from "next";
import ArticleDetail from "@/components/ArticleDetail";
import SimilarArticles from "@/components/SimilarArticles";
export const revalidate = 0;
//
async function getAllArticleSlugs() {
  try {
    // First, get the total count of articles
    const countResponse = await fetch(
      "https://credible-rhythm-2abfae7efc.strapiapp.com/api/articles?fields[0]=id&pagination[pageSize]=1"
      // { next: { revalidate: 0 } } // Disable caching to always get fresh data
    );

    if (!countResponse.ok) {
      throw new Error(`Failed to fetch article count: ${countResponse.status}`);
    }

    const countData = await countResponse.json();
    const totalArticles = countData.meta.pagination.total;
    const pageSize = 100; // Maximum page size
    const totalPages = Math.ceil(totalArticles / pageSize);

    // Fetch all articles across multiple pages if needed
    let allSlugs: { slug: string }[] = [];

    for (let page = 1; page <= totalPages; page++) {
      const response = await fetch(
        `https://credible-rhythm-2abfae7efc.strapiapp.com/api/articles?fields[0]=slug&pagination[page]=${page}&pagination[pageSize]=${pageSize}`
        // { next: { revalidate: 0 } } // Disable caching
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch articles page ${page}: ${response.status}`
        );
      }

      const data = await response.json();
      const pageSlugs = data.data.map((article: any) => ({
        slug: article.slug,
      }));

      allSlugs = [...allSlugs, ...pageSlugs];
    }

    console.log(`Generated paths for ${allSlugs.length} articles`);
    return allSlugs;
  } catch (error) {
    console.error("Error fetching all article slugs:", error);
    return [];
  }
}

export async function generateStaticParams() {
  const slugs = await getAllArticleSlugs();
  return slugs;
}

async function getArticleBySlug(slug: string) {
  try {
    const response = await fetch(
      `https://credible-rhythm-2abfae7efc.strapiapp.com/api/articles/${slug}?populate=*`,
      {
        // next: { revalidate: 0 }, // Disable caching
      }
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
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
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

export default function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <div className="max-w-7xl  mx-auto w-full px-5 sm:px-6 md:px-8 lg:px-10 pt-[8px] space-y-[66px]">
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

async function ArticlePageContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
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
