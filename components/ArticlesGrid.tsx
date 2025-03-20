"use client";

import Link from "next/link";
import type React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
}

const ArticleGrid: React.FC<ArticleGridProps> = ({
  articles,
  pagination,
  currentPage,
}) => {
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
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-[24px] xl:gap-x-[26px] xl:gap-y-[30px]"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {articles.map((article) => (
          <motion.div
            key={article.id}
            variants={itemVariants}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <Link href={`/articles/${article.slug}`} className="block h-full">
              <div className="bg-[#121212] h-full flex flex-col space-y-[16px]">
                <div className="relative h-48 sm:h-56 w-full rounded-[6px] overflow-hidden">
                  <Image
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="flex-1 flex flex-col space-y-[18px]">
                  <div className="flex items-center justify-between text-[12px] md:text-[14px] leading-[12px] md:leading-[14px] text-[#b6b6b6]">
                    <div className="max-w-[45%] w-full flex sm:flex-1 items-center space-x-[6.4px]">
                      <div className="relative w-5 md:w-6 h-5 md:h-6 rounded-full overflow-hidden">
                        <Image
                          src={article.authorImage || "/placeholder.svg"}
                          alt={article.author}
                          fill
                          className="object-cover"
                          sizes="20px"
                        />
                      </div>
                      <span className="font-noto-sans font-normal text-[12px] md:text-[14px] leading-[12px] md:leading-[14px]">
                        {article.author}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-wrap gap-1 items-center justify-between text-right">
                      <div className="flex items-center justify-end w-full space-x-[6.2px]">
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
                      <div className="flex items-center justify-end w-full space-x-[6.2px] text-right">
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
                  </div>
                  <div className="flex-1 font-nato-sans font-normal text-[14px] leading-[22px] text-[#9e9e9e] space-y-[13px]">
                    <h3 className="font-noto-sans font-semibold text-[18px] md:text-[20px] leading-[24px] text-[#d9d9d9]">
                      {article.title}
                    </h3>
                    <p>{article.description}</p>
                  </div>
                  <div className="mt-auto self-end">
                    <span className="border border-white text-[#ebeef3] rounded-[4px] min-w-[90px] min-h-[30px] flex items-center justify-center text-center px-[10px] py-[6px] font-dm-sans font-normal text-[14px] leading-[14px]">
                      Read more
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
      {pagination.pageCount > 1 && (
        <div className="flex justify-center items-center space-x-2 pt-8">
          <Link
            href={`/articles?page=${Math.max(1, currentPage - 1)}`}
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
                href={`/articles?page=${page}`}
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
            href={`/articles?page=${Math.min(
              pagination.pageCount,
              currentPage + 1
            )}`}
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
      )}
    </div>
  );
};

export default ArticleGrid;
