"use client";

import type React from "react";
import BlogCard from "./BlogCard";
import { motion } from "framer-motion";

interface SliderPostsProps {
  heading: string;
  posts?: {
    featuredImage: string;
    authorName: string;
    authorImage: string;
    date: string;
    title: string;
    excerpt: string;
    readMoreUrl: string;
  }[];
}

const SliderPosts: React.FC<SliderPostsProps> = ({
  heading,
  posts = [
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
  ],
}) => {
  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Stagger children animations by 0.2s
        delayChildren: 0.1, // Delay the first child by 0.1s
      },
    },
  };

  // Individual card animation variants
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
        ease: [0.25, 0.1, 0.25, 1.0], // Custom easing function for smoother animation
      },
    },
  };

  // Header animation variants
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

  // Line animation variants
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
            {heading}
          </motion.h2>
          <motion.span
            className="flex-1 bg-[#2a2a2a] h-[5px]"
            variants={lineVariants}
          ></motion.span>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[26px]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {posts.map((post, index) => (
            <motion.div
              key={index}
              className={index === 2 ? "hidden lg:block" : ""}
              variants={cardVariants}
              whileHover={{
                y: -5,
                transition: { duration: 0.2 },
              }}
            >
              <BlogCard
                featuredImage={post.featuredImage}
                authorName={post.authorName}
                authorImage={post.authorImage}
                date={post.date}
                title={post.title}
                excerpt={post.excerpt}
                readMoreUrl={post.readMoreUrl}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default SliderPosts;
