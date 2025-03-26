"use client";

import type React from "react";
import BlogCard from "./BlogCard";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Article {
  featuredImage: string;
  authorName: string;
  authorImage: string | null;
  date: string;
  title: string;
  excerpt: string;
  readMoreUrl: string;
}

interface SectionWrapperProps {
  sliderHeading: string;
  articles?: Article[];
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({
  sliderHeading,
  articles = [],
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [slideDirection, setSlideDirection] = useState(0);

  // Check screen size for responsive behavior
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640);
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1.0],
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const lineVariants = {
    hidden: { scaleX: 0, originX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 0.7,
        ease: "easeInOut",
        delay: 0.2,
      },
    },
  };

  const defaultArticles = [
    {
      featuredImage: "/images/9a679af59a3678412acbe0c5b79c5c31.jpeg",
      authorName: "Jake Will",
      authorImage: "/images/unsplash_B5PLtlpR7YA.png",
      date: "04 June 2023",
      title:
        "5 Exercises Basketball Players Should Be Using To Develop Strength",
      excerpt:
        "This article was written by Jake Willhoite from Healthlisted.com Strength in basketball isn't all about a massive body mass or ripped muscles.",
      readMoreUrl: "/blog/basketball-strength-exercises",
    },
    {
      featuredImage: "/images/9a679af59a3678412acbe0c5b79c5c31.jpeg",
      authorName: "Jake Will",
      authorImage: "/images/unsplash_B5PLtlpR7YA.png",
      date: "04 June 2023",
      title:
        "5 Exercises Basketball Players Should Be Using To Develop Strength",
      excerpt:
        "This article was written by Jake Willhoite from Healthlisted.com Strength in basketball isn't all about a massive body mass or ripped muscles.",
      readMoreUrl: "/blog/basketball-strength-exercises",
    },
    {
      featuredImage: "/images/9a679af59a3678412acbe0c5b79c5c31.jpeg",
      authorName: "Jake Will",
      authorImage: "/images/unsplash_B5PLtlpR7YA.png",
      date: "04 June 2023",
      title:
        "5 Exercises Basketball Players Should Be Using To Develop Strength",
      excerpt:
        "This article was written by Jake Willhoite from Healthlisted.com Strength in basketball isn't all about a massive body mass or ripped muscles.",
      readMoreUrl: "/blog/basketball-strength-exercises",
    },
  ];

  const displayArticles = articles.length > 0 ? articles : defaultArticles;

  // Calculate how many cards to show per page based on screen size
  const getCardsPerPage = () => {
    if (isMobile) return 1;
    if (isTablet) return 2;
    return 3; // Desktop
  };

  const cardsPerPage = getCardsPerPage();
  const totalPages = Math.ceil(displayArticles.length / cardsPerPage);

  // Get current page of articles
  const getCurrentPageArticles = () => {
    const startIndex = currentPage * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    return displayArticles.slice(startIndex, endIndex);
  };

  // Navigation handlers
  const goToPrevPage = () => {
    setSlideDirection(-1);
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const goToNextPage = () => {
    setSlideDirection(1);
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : prev));
  };

  // Only show navigation if we have more than one page
  const showNavigation = totalPages > 1;

  return (
    <div className="max-w-7xl w-full mx-auto px-5 sm:px-6 md:px-8 lg:px-10 py-5 sm:py-6 md:py-8 lg:py-10 xl:py-11">
      <div className="space-y-[10px] sm:space-y-[14px] md:space-y-[18px] lg:space-y-[20px]">
        <motion.div
          className="flex items-center space-x-2 sm:space-x-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: {},
            visible: {},
          }}
        >
          <motion.h2
            className="font-saira-condensed text-[#d9d9d9] text-[24px] sm:text-[28px] leading-[34px] font-bold"
            variants={headerVariants}
          >
            {sliderHeading}
          </motion.h2>
          <motion.span
            className="flex-1 bg-[#2a2a2a] h-[5px] mt-1.5"
            variants={lineVariants}
          ></motion.span>
        </motion.div>

        <AnimatePresence mode="wait" custom={slideDirection}>
          <motion.div
            key={currentPage}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[26px]"
            custom={slideDirection}
            variants={{
              enter: (direction: number) => ({
                opacity: 0,
                x: direction > 0 ? 100 : -100,
              }),
              center: {
                opacity: 1,
                x: 0,
              },
              exit: (direction: number) => ({
                opacity: 0,
                x: direction > 0 ? -100 : 100,
              }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] }}
          >
            {getCurrentPageArticles().map((article, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
              >
                <BlogCard
                  featuredImage={article.featuredImage}
                  authorName={article.authorName}
                  authorImage={article.authorImage}
                  date={article.date}
                  title={article.title}
                  excerpt={article.excerpt}
                  readMoreUrl={article.readMoreUrl}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {showNavigation && (
          <div className="flex justify-center items-center mt-8 space-x-4">
            <motion.button
              onClick={goToPrevPage}
              disabled={currentPage === 0}
              className={`p-2 rounded-full ${
                currentPage === 0
                  ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                  : "bg-[#2a2a2a] text-white hover:bg-[#3a3a3a] transition-colors"
              }`}
              aria-label="Previous page"
              whileHover={currentPage !== 0 ? { scale: 1.1 } : {}}
              whileTap={currentPage !== 0 ? { scale: 0.95 } : {}}
            >
              <ChevronLeft size={24} />
            </motion.button>

            <div className="text-[#d9d9d9] text-sm">
              {currentPage + 1} / {totalPages}
            </div>

            <motion.button
              onClick={goToNextPage}
              disabled={currentPage === totalPages - 1}
              className={`p-2 rounded-full ${
                currentPage === totalPages - 1
                  ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                  : "bg-[#2a2a2a] text-white hover:bg-[#3a3a3a] transition-colors"
              }`}
              aria-label="Next page"
              whileHover={currentPage !== totalPages - 1 ? { scale: 1.1 } : {}}
              whileTap={currentPage !== totalPages - 1 ? { scale: 0.95 } : {}}
            >
              <ChevronRight size={24} />
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionWrapper;
