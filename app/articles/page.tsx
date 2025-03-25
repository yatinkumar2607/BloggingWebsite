import { Suspense } from "react";
import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import ArticlesContainer from "@/components/ArticlesContainer";

export const metadata: Metadata = {
  title: "Articles",
  description: "Browse our collection of articles on sports, news, and more.",
  openGraph: {
    title: "Articles",
    description: "Browse our collection of articles on sports, news, and more.",
    url: "/articles",
    siteName: "Sports News",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Articles",
    description: "Browse our collection of articles on sports, news, and more.",
  },
};

export default function ArticlesPage() {
  return (
    <div className="bg-[#121212] pb-16">
      <div className="max-w-7xl mx-auto w-full px-5 sm:px-6 md:px-8 lg:px-10 pt-[8px] space-y-6">
        <SectionHeading heading="Articles" version="single-page" />
        <Suspense
          fallback={
            <div className="text-white text-center py-20">
              Loading articles...
            </div>
          }
        >
          <ArticlesContainer />
        </Suspense>
      </div>
    </div>
  );
}
