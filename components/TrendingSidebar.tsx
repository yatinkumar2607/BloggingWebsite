"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import Link from "next/link";
import { useEffect, useState } from "react";

interface TrendingItem {
  id: string;
  image: string;
  date: string;
  title: string;
  slug: string;
}

interface TrendingSidebarProps {
  heading?: string;
  category: "trending" | "recent";
  delay?: number;
  className?: string;
}

export default function TrendingSidebar({
  heading,
  category = "trending",
  delay = 0.3,
  className = "",
}: TrendingSidebarProps) {
  const [items, setItems] = useState<TrendingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Set default heading based on category if not provided
  const displayHeading =
    heading || (category === "trending" ? "Trending" : "Recent");

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const apiUrl = `https://credible-rhythm-2abfae7efc.strapiapp.com/api/articles?filters[category][slug][$eq]=${category}&sort[publishedAt]=desc&pagination[limit]=3&populate=*`;

        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(
            `Failed to fetch ${category} articles: ${response.status}`
          );
        }

        const data = await response.json();

        // Transform API response to match component's data structure
        const transformedItems = data.data.map((article: any) => ({
          id: article.id.toString(),
          image:
            article.cover?.url ||
            article.cover?.formats?.medium?.url ||
            "/placeholder.svg?height=100&width=100",
          date: formatDate(article.publishedAt),
          title: article.title,
          slug: `/articles/${article.slug}`,
        }));

        setItems(transformedItems);
        setError(null);
      } catch (err) {
        console.error(`Error fetching ${category} articles:`, err);
        setError(`Failed to load ${category} articles`);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [category]);

  // Format date function
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    return `#${
      category.charAt(0).toUpperCase() + category.slice(1)
    }. - ${formattedDate}`;
  };

  // Animation variants
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

  const folderBlockVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: (custom: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: delay + custom * 0.1,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  // Loading state
  if (loading) {
    return (
      <motion.div
        className={`flex-1 lg:flex-initial space-y-[18px] md:space-y-[23px] ${className}`}
        variants={itemVariants}
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay }}
        >
          <SectionHeading heading={displayHeading} version="home-page" />
        </motion.div>
        <motion.div
          className="bg-[#2a2a2a] rounded-[6px] p-4 xl:py-[26px] px-[15px] xl:px-5 min-h-[300px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: delay + 0.1 }}
        >
          <div className="space-y-6 xl:space-y-10 animate-pulse">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="flex items-center space-x-[18px]">
                <div className="bg-gray-700 w-[70px] sm:w-[75px] lg:w-[80px] xl:w-[100px] h-[70px] sm:h-[75px] lg:h-[80px] xl:h-[100px] rounded-[3px]"></div>
                <div className="space-y-[8px] xl:space-y-[12px] flex-1">
                  <div className="bg-gray-700 h-4 w-24 rounded"></div>
                  <div className="bg-gray-700 h-5 w-full rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    );
  }

  // Error state
  if (error) {
    return (
      <motion.div
        className={`flex-1 lg:flex-initial space-y-[18px] md:space-y-[23px] ${className}`}
        variants={itemVariants}
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay }}
        >
          <SectionHeading heading={displayHeading} version="home-page" />
        </motion.div>
        <motion.div
          className="bg-[#2a2a2a] rounded-[6px] p-4 xl:py-[26px] px-[15px] xl:px-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: delay + 0.1 }}
        >
          <div className="text-center py-8 text-red-400">
            <p>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  // Empty state
  if (items.length === 0) {
    return (
      <motion.div
        className={`flex-1 lg:flex-initial space-y-[18px] md:space-y-[23px] ${className}`}
        variants={itemVariants}
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay }}
        >
          <SectionHeading heading={displayHeading} version="home-page" />
        </motion.div>
        <motion.div
          className="bg-[#2a2a2a] rounded-[6px] p-4 xl:py-[26px] px-[15px] xl:px-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: delay + 0.1 }}
        >
          <div className="text-center py-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: delay + 0.3 }}
              className="space-y-4"
            >
              <h3 className="text-[#d9d9d9] text-xl font-semibold">
                Coming Soon
              </h3>
              <p className="text-[#9e9e9e] text-sm">
                {category.charAt(0).toUpperCase() + category.slice(1)} content
                will be available shortly.
              </p>
              <div className="w-16 h-1 bg-blue-500 mx-auto mt-2"></div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`flex-1 lg:flex-initial space-y-[18px] md:space-y-[23px] ${className}`}
      variants={itemVariants}
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay }}
      >
        <SectionHeading heading={displayHeading} version="home-page" />
      </motion.div>
      <motion.div
        className="bg-[#2a2a2a] rounded-[6px] p-4 xl:py-[26px] px-[15px] xl:px-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: delay + 0.1 }}
      >
        <div className="space-y-6 xl:space-y-10">
          {items.map((item, index) => (
            <Link href={item.slug} key={item.id} className="block">
              <motion.div
                className="folderBlock flex items-center space-x-[18px] font-noto-sans group cursor-pointer"
                custom={index}
                variants={folderBlockVariants}
                whileHover={{ x: 5, transition: { duration: 0.2 } }}
              >
                <div className="relative min-w-[70px] sm:w-[75px] lg:w-[80px] xl:w-[100px] h-[70px] sm:h-[75px] lg:h-[80px] xl:h-[100px] overflow-hidden rounded-[3px]">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                </div>
                <div className="space-y-[8px] xl:space-y-[12px]">
                  <span className="font-medium text-[14px] leading-[14px] text-white/60">
                    {item.date}
                  </span>
                  <h4 className="font-semibold text-[14px] lg:text-[16px] xl:text-[18px] lg:leading-[20px] xl:leading-[22px] text-[#d9d9d9] group-hover:text-white transition-colors duration-300">
                    {item.title}
                  </h4>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
