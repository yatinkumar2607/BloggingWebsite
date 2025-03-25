"use client";

import Link from "next/link";
import type React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface ArticleGridProps {
  articles: {
    id: number;
    date: string;
    slug: string;
    image: string;
    title: string;
    author: string;
    category: string;
    authorImage: string;
    description: string;
    blocksContent?: string;
  }[];
  pagination: {
    page: number;
    total: number;
    pageSize: number;
    pageCount: number;
  };
  currentPage: number;
  currentPath?: string;
  categorySlug?: string;
  categoryName?: string;
  paginationUrlParam?: string;
  context?: "main" | "similar";
}

const ArticleGrid: React.FC<ArticleGridProps> = ({
  articles,
  pagination,
  currentPage,
  paginationUrlParam = "page",
  currentPath = "",
  context = "main",
  categorySlug = "",
  categoryName = "",
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

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

  const getDisplayArticles = () => {
    if (context === "main") {
      return isMobile ? articles.slice(0, 6) : articles;
    } else {
      return isMobile ? articles.slice(0, 3) : articles.slice(0, 6);
    }
  };

  const displayArticles = getDisplayArticles();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1.0],
      },
    },
  };

  // Function to create excerpt from description
  const createExcerpt = (text: string, maxLength = 120): string => {
    if (!text) return "";

    // If text is already shorter than maxLength, return it as is
    if (text.length <= maxLength) return text;

    // Find the last space before maxLength to avoid cutting words
    const lastSpaceIndex = text.substring(0, maxLength).lastIndexOf(" ");

    // If no space found, just cut at maxLength
    const cutIndex = lastSpaceIndex > 0 ? lastSpaceIndex : maxLength;

    // Return truncated text with ellipsis
    return `${text.substring(0, cutIndex)}...`;
  };

  const calculateReadingTime = (content: string | undefined) => {
    if (!content) return "1 Min. To Read";

    const words = content.trim().split(/\s+/).length;
    const minutes = Math.max(1, Math.ceil(words / 200));
    return `${minutes} Min. To Read`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const createPaginationUrl = (page: number) => {
    if (currentPath) {
      return `${currentPath}?${paginationUrlParam}=${page}`;
    }
    return `/articles?${paginationUrlParam}=${page}`;
  };

  const renderSimilarArticlesNavigation = () => {
    if (context !== "similar") return null;

    const viewAllUrl = categorySlug
      ? `/articles/category/${categorySlug}`
      : "/articles";
    const buttonText = categorySlug
      ? `View All ${categoryName} Articles`
      : "View All Articles";

    return (
      <div className="flex flex-col justify-center">
        {categorySlug && (
          <Link
            href={viewAllUrl}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-center"
          >
            {buttonText}
          </Link>
        )}
        <Link
          href="/articles"
          className="px-6 py-3 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors text-center"
        >
          View All Articles
        </Link>
      </div>
    );
  };

  const renderPagination = () => {
    if (context === "main" && pagination.pageCount > 1) {
      return (
        <div className="flex justify-center items-center space-x-2 pt-8">
          <Link
            href={createPaginationUrl(Math.max(1, currentPage - 1))}
            className={`p-2 rounded-md ${
              currentPage <= 1
                ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                : "bg-gray-800 text-white hover:bg-gray-700"
            }`}
            aria-disabled={currentPage <= 1}
            tabIndex={currentPage <= 1 ? -1 : undefined}
          >
            <ChevronLeft size={20} />
          </Link>

          {Array.from({ length: pagination.pageCount }, (_, i) => i + 1).map(
            (page) => (
              <Link
                key={page}
                href={createPaginationUrl(page)}
                className={`w-10 h-10 flex items-center justify-center rounded-md ${
                  currentPage === page
                    ? "bg-blue-600 text-white"
                    : "bg-gray-800 text-white hover:bg-gray-700"
                }`}
                aria-current={currentPage === page ? "page" : undefined}
              >
                {page}
              </Link>
            )
          )}

          <Link
            href={createPaginationUrl(
              Math.min(pagination.pageCount, currentPage + 1)
            )}
            className={`p-2 rounded-md ${
              currentPage >= pagination.pageCount
                ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                : "bg-gray-800 text-white hover:bg-gray-700"
            }`}
            aria-disabled={currentPage >= pagination.pageCount}
            tabIndex={currentPage >= pagination.pageCount ? -1 : undefined}
          >
            <ChevronRight size={20} />
          </Link>
        </div>
      );
    }

    return null;
  };

  if (articles.length === 0) {
    return (
      <motion.div
        className="text-center py-20 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-xl font-semibold mb-4">No articles found</h3>
        <p>Check back later for new content.</p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-10">
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-[26px]"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {displayArticles.map((article) => (
          <motion.div
            key={article.id}
            variants={itemVariants}
            className="h-full"
            onHoverStart={() => setHoveredId(article.id)}
            onHoverEnd={() => setHoveredId(null)}
            whileHover={{
              y: -8,
              transition: { duration: 0.3, ease: "easeOut" },
            }}
          >
            <Link href={`/articles/${article.slug}`} className="block h-full">
              <div className="bg-[#121212] h-full flex flex-col space-y-[16px] transition-all duration-300 ease-in-out">
                <div className="relative h-48 sm:h-[166px] w-full overflow-hidden rounded-[10px]">
                  <motion.div
                    animate={{
                      scale: hoveredId === article.id ? 1.05 : 1,
                    }}
                    transition={{ duration: 0.5 }}
                    className="h-full w-full"
                  >
                    <Image
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </motion.div>
                  <motion.div
                    className="absolute inset-0 bg-black"
                    animate={{
                      opacity: hoveredId === article.id ? 0.3 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <div className="flex-1 flex flex-col space-y-[18px]">
                  <div className="flex items-center justify-between text-[12px] leading-[12px] text-[#b6b6b6]">
                    <div className="flex sm:flex-1 items-center space-x-[6.4px]">
                      <div className="relative w-5 h-5 rounded-full overflow-hidden">
                        <Avatar className="h-5 w-5">
                          <AvatarImage
                            src={article.authorImage}
                            alt={`${article.author} avatar`}
                          />
                          <AvatarFallback className="text-[#121212] font-saira-condensed font-bold">
                            {article.author.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <span className="font-noto-sans font-normal text-[12px] leading-[12px]">
                        {article.author}
                      </span>
                    </div>
                    <div className="flex items-center space-x-[6.2px]">
                      <svg
                        className="inline-block w-[11px] h-[12px]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect
                          x="3"
                          y="4"
                          width="18"
                          height="18"
                          rx="2"
                          ry="2"
                        ></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                      <span>{formatDate(article.date)}</span>
                    </div>
                    <div className="flex sm:hidden items-center space-x-[6.2px]">
                      <svg
                        className="inline-block w-3 h-3"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      <span>
                        {calculateReadingTime(
                          article.blocksContent || article.description
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 font-nato-sans font-normal text-[14px] leading-[22px] text-[#9e9e9e] space-y-[13px]">
                    <motion.h3
                      className="font-noto-sans font-semibold text-[18px] leading-[24px]"
                      animate={{
                        color: hoveredId === article.id ? "#ffffff" : "#d9d9d9",
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {article.title}
                    </motion.h3>
                    <p className="line-clamp-3">
                      {createExcerpt(article.description, 136)}
                    </p>
                  </div>
                  <div className="mt-auto self-end">
                    <motion.span
                      className="border border-white rounded-[4px] min-w-[90px] min-h-[30px] flex items-center justify-center text-center px-[10px] py-[6px] font-dm-sans font-normal text-[14px] leading-[14px]"
                      animate={{
                        backgroundColor:
                          hoveredId === article.id
                            ? "rgba(255, 255, 255, 1)"
                            : "rgba(255, 255, 255, 0)",
                        color: hoveredId === article.id ? "#121212" : "#ebeef3",
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      Read more
                    </motion.span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {context === "main"
        ? renderPagination()
        : renderSimilarArticlesNavigation()}
    </div>
  );
};

export default ArticleGrid;
