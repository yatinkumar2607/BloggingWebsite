import type { Metadata } from "next";

// This function tells Next.js which routes to generate at build time
export async function generateStaticParams() {
  // Make sure to include 'abc' in your list of slugs
  const articles = [
    { slug: "first-article" },
    { slug: "second-article" },
    { slug: "third-article" },
    { slug: "abc" }, // Add the specific slug you're trying to access
  ];

  return articles.map((article) => ({
    slug: article.slug,
  }));
}

// Optional: Generate metadata for each page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  // Await the params Promise to get the actual slug
  const { slug } = await params;

  return {
    title: `Article: ${slug}`,
  };
}

// Make the component async to await the params
export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Await the params Promise to get the actual slug
  const { slug } = await params;

  return (
    <>
      <h1 className="text-3xl font-bold mb-4">Article: {slug}</h1>
      <div className="prose">
        <p>This is the content for {slug}</p>
      </div>
    </>
  );
}
