"use client";

import { useEffect, useState } from "react";
import SectionHeading from "@/components/SectionHeading";
import CategoryArticlesContainer from "@/components/CategoryArticlesContainer";
import { capitalizeFirstLetter } from "@/lib/utils";

interface CategoryWrapperProps {
  categorySlug: string;
}

export default function CategoryWrapper({
  categorySlug,
}: CategoryWrapperProps) {
  const [categoryExists, setCategoryExists] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function checkCategoryExists() {
      try {
        const response = await fetch(
          `https://credible-rhythm-2abfae7efc.strapiapp.com/api/categories/${categorySlug}`
        );

        if (response.status === 404) {
          setCategoryExists(false);
          return;
        }

        if (!response.ok) {
          throw new Error(`Failed to fetch category: ${response.status}`);
        }

        const data = await response.json();
        setCategoryExists(true);
      } catch (error) {
        console.error("Error checking category:", error);
        setError("Failed to check if category exists. Please try again later.");
        setCategoryExists(false);
      } finally {
        setLoading(false);
      }
    }

    checkCategoryExists();
  }, [categorySlug]);

  if (loading) {
    return (
      <div className="text-white text-center py-10">Checking category...</div>
    );
  }

  if (error) {
    return (
      <div className="text-white text-center py-10">
        <p className="text-red-400 mb-4">{error}</p>
        <a
          href="/articles"
          className="inline-block mt-4 px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
        >
          View All Articles
        </a>
      </div>
    );
  }

  if (!categoryExists) {
    return (
      <div className="text-white text-center py-10">
        <p className="text-red-400 mb-4">Category not found</p>
        <a
          href="/articles"
          className="inline-block mt-4 px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
        >
          View All Articles
        </a>
      </div>
    );
  }

  const displayCategory = capitalizeFirstLetter(categorySlug);

  return (
    <>
      <SectionHeading heading={`${displayCategory}`} version="single-page" />
      <CategoryArticlesContainer category={categorySlug} />
    </>
  );
}
