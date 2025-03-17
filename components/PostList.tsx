"use client";

import type React from "react";
import BlogCard from "./BlogCard";
import { motion } from "framer-motion";

interface PostListProps {
  posts?: {
    date: string;
    title: string;
    excerpt: string;
    authorName: string;
    authorImage: string;
    readMoreUrl: string;
    featuredImage: string;
  }[];
}

const PostList: React.FC<PostListProps> = ({
  posts = [
    {
      featuredImage: "/images/a2133d2051ea3e3a6a557b092072c912.jpeg",
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
      featuredImage: "/images/2a0a6b22204579198ff2e4508646a424.jpeg",
      authorName: "Foxi.zacon",
      authorImage: "/images/5981edd2f36ac7a25da535a72c53d8d1.png",
      date: "04 June 2023",
      title: "Golden Knights out to fulfill owner's quest to win Stanley Cup ",
      excerpt:
        "The Vegas Golden Knights will play the Florida Panthers in the Stanley Cup Final beginning Saturday.",
      readMoreUrl: "/blog/basketball-strength-exercises",
    },
    {
      featuredImage: "/images/9a679af59a3678412acbe0c5b79c5c31.jpeg",
      authorName: "Bong Lozada",
      authorImage: "/images/2ebb4b871e0a80806470c2eb1a8969ce.png",
      date: "04 June 2023",
      title: "‘Outdoor’ Badminton Gets Support From Local Federation",
      excerpt:
        "The Badminton World Federation is developing Air Badminton and the country’s governing body, Philippine Badminton Association.",
      readMoreUrl: "/blog/basketball-strength-exercises",
    },
  ],
}) => {
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

  return (
    <>
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
    </>
  );
};

export default PostList;
