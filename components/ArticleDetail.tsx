"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { calculateReadingTime, formatDate } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import TrendingSidebar from "./TrendingSidebar";

interface ArticleDetailProps {
  article: any;
}

export default function ArticleDetail({ article }: ArticleDetailProps) {
  if (!article) {
    return null;
  }

  const articleContent = article.blocks
    ?.filter((block: any) => block.__component === "shared.rich-text")
    .map((block: any) => block.body)
    .join("\n\n");

  const coverImage =
    article.cover?.url ||
    article.cover?.formats?.large?.url ||
    article.cover?.formats?.medium?.url ||
    "/placeholder.svg?height=600&width=1200";

  // Animation variants
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
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const sidebarVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const metadataVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <>
      <motion.article
        className="text-[#d9d9d9]"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="space-y-[15px] lg:space-y-[23px] xl:space-y-[25px]">
          <motion.h1
            className="font-saira-condensed font-bold text-[24px] sm:text-[28px] md:text-[32px] leading-[36px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {article.title}
          </motion.h1>
          <div className="flex flex-col lg:flex-row space-y-[20px] lg:space-y-0 lg:space-x-[25px]">
            <motion.div
              className="bg-[#121212] space-y-[15px] xl:space-y-[42px] flex-1"
              variants={itemVariants}
            >
              <div className="lg:pr-[30px] xl:pr-[45px] xl:pt-[5px] space-y-[23px] xl:space-y-[26px]">
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
                <motion.div
                  className="flex items-center justify-between text-[12px] sm:text-[14px] lg:text-[16px] leading-[12px] sm:leading-[14px] text-[#b6b6b6]"
                  variants={metadataVariants}
                >
                  <div className="max-w-[45%] sm:max-w-[33%] w-full flex sm:flex-1 items-center space-x-[6.4px] sm:space-x-[8px] md:space-x-[10px] lg:space-x-[14px] xl:space-x-[18px]">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.7 }}
                    >
                      <Avatar className="relative w-5 sm:w-6 md:w-7 lg:w-[35px] xl:w-[43px] h-5 sm:h-6 md:h-7 lg:h-[35px] xl:h-[43px] rounded-full overflow-hidden">
                        <AvatarImage
                          src={article.author.authorImage}
                          alt={`${article.author.name} avatar`}
                        />
                        <AvatarFallback className="text-[#121212] font-saira-condensed font-bold">
                          {article.author.name
                            .split(" ")
                            .map((name: string) => name[0])
                            .join("")
                            .substring(0, 2)
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </motion.div>
                    <motion.span
                      className="font-noto-sans font-normal text-[12px] sm:text-[14px] lg:text-[16px] xl:text-[20px] leading-[12px] sm:leading-[14px]"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.8 }}
                    >
                      {article.author.name || "Author"}
                    </motion.span>
                  </div>
                  <div className="flex flex-1 flex-wrap sm:flex-nowrap gap-1 items-center justify-between text-right">
                    <motion.div
                      className="flex items-center justify-end sm:justify-center w-full space-x-[6.2px] sm:space-x-[8px] md:space-x-[10px] lg:space-x-[14px] xl:space-x-[18px]"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.9 }}
                    >
                      <svg
                        className="inline-block w-[11px] sm:w-[14px] md:w-[18px] lg:w-[22px] xl:w-[29px] h-[12px] sm:h-[14px] md:h-[20px] lg:h-[25px] xl:h-[32px]"
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
                    </motion.div>
                    <motion.div
                      className="flex items-center justify-end w-full space-x-[6.2px] lg:space-x-[14px] xl:space-x-[18px] text-right"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 1 }}
                    >
                      <svg
                        className="inline-block w-3 sm:w-4 md:w-[20px] lg:w-[25px] xl:w-[32px] h-3 sm:h-4 md:h-[20px] lg:h-[25px] xl:h-[32px]"
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
                          articleContent || article.description
                        )}
                      </span>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
              <div className="prose prose-lg prose-invert max-w-none space-y-6">
                {articleContent
                  .split("\n\n")
                  .map((paragraph: string, index: number) => (
                    <motion.p
                      key={index}
                      className="font-nato-sans font-normal lg:font-medium text-[14px] sm:text-[16px] lg:text-[18px] xl:text-[20px] leading-[28px] lg:leading-[34px] xl:leading-[40px]"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    >
                      {paragraph}
                    </motion.p>
                  ))}
              </div>
            </motion.div>

            {/* Using the updated TrendingSidebar component with API fetching */}
            <motion.div
              className="flex flex-col sm:flex-row lg:flex-col lg:max-w-[35%] w-full space-x-0 sm:space-x-[25px] lg:space-x-0 space-y-[25px] sm:space-y-0 lg:space-y-[40px]"
              variants={sidebarVariants}
            >
              <TrendingSidebar category="trending" delay={0.3} />
              <TrendingSidebar category="recent" delay={0.5} />
            </motion.div>
          </div>
        </div>
      </motion.article>
    </>
  );
}
