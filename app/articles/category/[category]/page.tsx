import { Suspense } from "react";
import CategoryWrapper from "@/components/CategoryWrapper";
import type { Metadata } from "next";
import { capitalizeFirstLetter } from "@/lib/utils";

export async function generateStaticParams() {
  try {
    const response = await fetch(
      "https://credible-rhythm-2abfae7efc.strapiapp.com/api/categories",
      {
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.status}`);
    }

    const data = await response.json();

    return data.data
      .filter((category: any) => category.slug)
      .map((category: any) => ({
        category: category.slug,
      }));
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [
      { category: "trending" },
      { category: "recent" },
      { category: "top" },
      { category: "basketball" },
      { category: "tennis" },
      { category: "cycling" },
      { category: "breaking" },
      { category: "folders" },
    ];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const displayCategory = capitalizeFirstLetter(category);

  return {
    title: `Articles - ${displayCategory}`,
    description: `Browse our collection of articles in the ${displayCategory} category.`,
    openGraph: {
      title: `${displayCategory} Articles`,
      description: `Browse our collection of articles in the ${displayCategory} category.`,
      url: `/articles/${category}`,
      siteName: "Sports News",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${displayCategory} Articles`,
      description: `Browse our collection of articles in the ${displayCategory} category.`,
    },
  };
}

export default function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  return (
    <div className="bg-[#121212] min-h-screen pb-16">
      <div className="max-w-7xl mx-auto w-full px-5 sm:px-6 md:px-8 lg:px-10 pt-[8px] space-y-6">
        <Suspense
          fallback={
            <div className="text-white text-center py-20">
              Loading category...
            </div>
          }
        >
          <CategoryPageContent params={params} />
        </Suspense>
      </div>
    </div>
  );
}

async function CategoryPageContent({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  return <CategoryWrapper categorySlug={category} />;
}
