"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { calculateReadingTime, formatDate } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import SectionHeading from "./SectionHeading";

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

  return (
    <>
      <article className="text-[#d9d9d9]">
        <div className="space-y-[23px] xl:space-y-[25px]">
          <motion.h1
            className="font-saira-condensed font-bold text-[24px] sm:text-[28px] md:text-[32px] leading-[36px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {article.title}
          </motion.h1>
          <div className="flex flex-col lg:flex-row lg:space-x-[25px]">
            <div className="bg-[#121212] space-y-[15px] xl:space-y-[42px] flex-1">
              <div className="xl:pr-[45px] xl:pt-[5px] xl:space-y-[26px]">
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
                <div className="flex items-center justify-between text-[12px] sm:text-[14px] leading-[12px] sm:leading-[14px] text-[#b6b6b6]">
                  <div className="max-w-[45%] sm:max-w-[33%] w-full flex sm:flex-1 items-center space-x-[6.4px] xl:space-x-[18px]">
                    <Avatar className="relative w-5 sm:w-6 xl:w-[43px] h-5 sm:h-6 xl:h-[43px] rounded-full overflow-hidden">
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
                    <span className="font-noto-sans font-normal text-[12px] sm:text-[14px] xl:text-[20px] leading-[12px] sm:leading-[14px]">
                      {article.author.name || "Author"}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-wrap sm:flex-nowrap gap-1 items-center justify-between text-right">
                    <div className="flex items-center justify-end sm:justify-center w-full space-x-[6.2px] xl:space-x-[18px]">
                      <svg
                        className="inline-block w-[11px] sm:w-[14px] xl:w-[29px] h-[12px] sm:h-[14px] xl:h-[32px]"
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
                    <div className="flex items-center justify-end w-full space-x-[6.2px] xl:space-x-[18px] text-right">
                      <svg
                        className="inline-block w-3 sm:w-4 xl:w-[32px] h-3 sm:h-4 xl:h-[32px]"
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
                      className="font-nato-sans font-normal lg:font-medium text-[14px] sm:text-[16px] xl:text-[20px] leading-[28px] xl:leading-[40px]"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    >
                      {paragraph}
                    </motion.p>
                  ))}
              </div>
            </div>
            <div className="max-w-[35%] w-full space-y-[40px]">
              <div className="space-y-[23px]">
                <SectionHeading heading="Trending" version="home-page" />
                <div className="bg-[#2a2a2a] rounded-[6px] xl:py-[26px] xl:px-5">
                  <div className="xl:space-y-10">
                    <div className="folderBlock flex items-center space-x-[18px] font-noto-sans">
                      <div className="relative w-[100px] h-[100px] overflow-hidden rounded-[3px]">
                        <Image
                          src="/images/6462ac36c7d10cb538c2c7a2daa32ce6.png"
                          alt="Trending"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="space-y-[12px]">
                        <span className="font-medium text-[14px] leading-[14px] text-white/60">
                          #Pollar. 87 - 12 July 2023
                        </span>
                        <h4 className="font-semibold text-[18px] leading-[22px] text-[#d9d9d9]">
                          Baku 2023 Taekwondo Championships
                        </h4>
                      </div>
                    </div>
                    <div className="folderBlock flex items-center space-x-[18px] font-noto-sans">
                      <div className="relative w-[100px] h-[100px] overflow-hidden rounded-[3px]">
                        <Image
                          src="/images/6462ac36c7d10cb538c2c7a2daa32ce6.png"
                          alt="Trending"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="space-y-[12px]">
                        <span className="font-medium text-[14px] leading-[14px] text-white/60">
                          #Pollar. 87 - 12 July 2023
                        </span>
                        <h4 className="font-semibold text-[18px] leading-[22px] text-[#d9d9d9]">
                          Baku 2023 Taekwondo Championships
                        </h4>
                      </div>
                    </div>
                    <div className="folderBlock flex items-center space-x-[18px] font-noto-sans">
                      <div className="relative w-[100px] h-[100px] overflow-hidden rounded-[3px]">
                        <Image
                          src="/images/6462ac36c7d10cb538c2c7a2daa32ce6.png"
                          alt="Trending"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="space-y-[12px]">
                        <span className="font-medium text-[14px] leading-[14px] text-white/60">
                          #Pollar. 87 - 12 July 2023
                        </span>
                        <h4 className="font-semibold text-[18px] leading-[22px] text-[#d9d9d9]">
                          Baku 2023 Taekwondo Championships
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-[23px]">
                <SectionHeading heading="Trending" version="home-page" />
                <div className="bg-[#2a2a2a] rounded-[6px] xl:py-[26px] xl:px-5">
                  <div className="xl:space-y-10">
                    <div className="folderBlock flex items-center space-x-[18px] font-noto-sans">
                      <div className="relative w-[100px] h-[100px] overflow-hidden rounded-[3px]">
                        <Image
                          src="/images/6462ac36c7d10cb538c2c7a2daa32ce6.png"
                          alt="Trending"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="space-y-[12px]">
                        <span className="font-medium text-[14px] leading-[14px] text-white/60">
                          #Pollar. 87 - 12 July 2023
                        </span>
                        <h4 className="font-semibold text-[18px] leading-[22px] text-[#d9d9d9]">
                          Baku 2023 Taekwondo Championships
                        </h4>
                      </div>
                    </div>
                    <div className="folderBlock flex items-center space-x-[18px] font-noto-sans">
                      <div className="relative w-[100px] h-[100px] overflow-hidden rounded-[3px]">
                        <Image
                          src="/images/6462ac36c7d10cb538c2c7a2daa32ce6.png"
                          alt="Trending"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="space-y-[12px]">
                        <span className="font-medium text-[14px] leading-[14px] text-white/60">
                          #Pollar. 87 - 12 July 2023
                        </span>
                        <h4 className="font-semibold text-[18px] leading-[22px] text-[#d9d9d9]">
                          Baku 2023 Taekwondo Championships
                        </h4>
                      </div>
                    </div>
                    <div className="folderBlock flex items-center space-x-[18px] font-noto-sans">
                      <div className="relative w-[100px] h-[100px] overflow-hidden rounded-[3px]">
                        <Image
                          src="/images/6462ac36c7d10cb538c2c7a2daa32ce6.png"
                          alt="Trending"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="space-y-[12px]">
                        <span className="font-medium text-[14px] leading-[14px] text-white/60">
                          #Pollar. 87 - 12 July 2023
                        </span>
                        <h4 className="font-semibold text-[18px] leading-[22px] text-[#d9d9d9]">
                          Baku 2023 Taekwondo Championships
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
