"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { calculateReadingTime, formatDate } from "@/lib/utils";

interface ArticleDetailProps {
  article: any;
}

export default function ArticleDetail({ article }: ArticleDetailProps) {
  if (!article) {
    return null;
  }

  const publishedDate = article.publishedAt
    ? formatDate(article.publishedAt, "2-digit")
    : formatDate(article.createdAt, "2-digit");

  const articleContent = article.blocks
    ?.filter((block: any) => block.__component === "shared.rich-text")
    .map((block: any) => block.body)
    .join("\n\n");

  const coverImage =
    article.cover?.url ||
    article.cover?.formats?.large?.url ||
    article.cover?.formats?.medium?.url ||
    "/placeholder.svg?height=600&width=1200";

  return (
    <>
      <article className="text-[#d9d9d9]">
        <div className="space-y-[23px]">
          <div className="bg-[#121212] space-y-[15px]">
            <motion.h1
              className="font-saira-condensed font-bold text-[24px] sm:text-[28px] md:text-[32px] leading-[36px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              {article.title}
            </motion.h1>
            <motion.div
              className="relative w-full h-[216px] sm:h-[350px] md:h-[461px] rounded-[10px] overflow-hidden"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <motion.div
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{
                  duration: 1.2,
                  delay: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="w-full h-full"
              >
                <Image
                  src={coverImage || "/placeholder.svg"}
                  alt={article.title}
                  fill
                  priority
                  className="object-cover rounded-[10px]"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
                />
              </motion.div>
            </motion.div>
            <div className="flex items-center justify-between text-[12px] md:text-[14px] leading-[12px] md:leading-[14px] text-[#b6b6b6]">
              {article.author ? (
                <div className="max-w-[45%] w-full flex sm:flex-1 items-center space-x-[6.4px]">
                  <div className="relative w-5 md:w-6 h-5 md:h-6 rounded-full overflow-hidden">
                    <Image
                      src={
                        article.author.authorImage ||
                        article.author.avatar?.url ||
                        "/placeholder.svg?height=20&width=20"
                      }
                      alt={article.author.name || "Author"}
                      fill
                      className="object-cover"
                      sizes="20px"
                    />
                  </div>
                  <span className="font-noto-sans font-normal text-[12px] md:text-[14px] leading-[12px] md:leading-[14px]">
                    {article.author.name || "Author"}
                  </span>
                </div>
              ) : (
                <div className="max-w-[45%] w-full"></div>
              )}
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
                  <span>{formatDate(article.createdAt, "numeric")}</span>
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
          </div>
          <div className="prose prose-lg prose-invert max-w-none space-y-6">
            {articleContent
              .split("\n\n")
              .map((paragraph: string, index: number) => (
                <motion.p
                  key={index}
                  className="font-nato-sans font-normal text-[14px] leading-[28px]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                >
                  {paragraph}
                </motion.p>
              ))}
          </div>
        </div>
      </article>
    </>
  );
}
