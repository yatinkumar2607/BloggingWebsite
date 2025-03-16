"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Post {
  tag: string;
  date: string;
  image: string;
  title: string;
  description?: string;
}

interface FullWidthSliderProps {
  posts: Post[];
}

export default function FullWidthSlider({ posts = [] }: FullWidthSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const defaultPosts: Post[] = [
    {
      tag: "Technology",
      date: "March 15, 2025",
      image: "/placeholder.svg?height=600&width=1200",
      title: "The Future of AI Development",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      tag: "Design",
      date: "March 14, 2025",
      image: "/placeholder.svg?height=600&width=1200",
      title: "Minimalism in Modern Web Design",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      tag: "Business",
      date: "March 13, 2025",
      image: "/placeholder.svg?height=600&width=1200",
      title: "Startup Funding Strategies for 2025",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      tag: "Health",
      date: "March 12, 2025",
      image: "/placeholder.svg?height=600&width=1200",
      title: "Wellness Tech Transforming Healthcare",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      tag: "Travel",
      date: "March 11, 2025",
      image: "/placeholder.svg?height=600&width=1200",
      title: "Remote Work Destinations for Digital Nomads",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
  ];

  const allPosts = posts.length > 0 ? posts : defaultPosts;

  // Auto-rotate through slides
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        handleNext();
      }
    }, 8000); // Change slide every 8 seconds

    return () => clearInterval(interval);
  }, [currentIndex, isAnimating]);

  const handlePrevious = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? allPosts.length - 1 : prevIndex - 1
    );

    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const handleNext = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === allPosts.length - 1 ? 0 : prevIndex + 1
    );

    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentIndex) return;

    setIsAnimating(true);
    setCurrentIndex(index);

    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  return (
    <section className="relative min-h-[450px] lg:min-h-[500px] xl:min-h-[583px] overflow-hidden bg-[#121212]">
      {allPosts.map((post, index) => (
        <div
          key={index}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{
            opacity: index === currentIndex ? 1 : 0,
            zIndex: index === currentIndex ? 1 : 0,
          }}
        >
          <div className="absolute inset-0">
            <Image
              src={post.image || "/placeholder.svg"}
              alt={`Hero background ${index + 1}`}
              fill
              priority={index === 0}
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>
          <div className="max-w-7xl mx-auto w-full relative p-5 pb-[84px] flex flex-col min-h-[450px] lg:min-h-[500px] xl:min-h-[583px] text-[#d9d9d9]">
            <div className="flex flex-col justify-between h-full w-auto">
              {index === currentIndex && (
                <motion.span
                  className="flex"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.6,
                      delay: 0.3,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  }}
                >
                  <motion.span
                    className="font-roboto font-medium text-sm sm:text-base md:text-[18px] lg:text-[20px] text-[#d9d9d9] px-[16.85px] sm:px-[18px] py-[3.85px] border-[0.65px] border-[#d9d9d9]"
                    initial={{ scale: 0.9 }}
                    animate={{
                      scale: 1,
                      transition: {
                        duration: 0.4,
                        delay: 0.5,
                      },
                    }}
                  >
                    {post.tag}
                  </motion.span>
                </motion.span>
              )}
            </div>
            <div className="space-y-[26px] flex-1 flex flex-col justify-end">
              <div className="space-y-[10px] sm:space-y-[12px] ">
                {index === currentIndex && (
                  <>
                    <motion.span
                      className="font-nato-sans text-[14px] sm:text-[16px] md:text-[18px] font-normal text-[#d9d9d9]"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        transition: {
                          duration: 0.6,
                          delay: 0.7,
                          ease: [0.22, 1, 0.36, 1],
                        },
                      }}
                    >
                      {post.date}
                    </motion.span>
                    <motion.h1
                      className="uppercase font-saira-condensed font-bold text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px] leading-[34px] lg:leading-[36px] text-[#d9d9d9]"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        transition: {
                          duration: 0.8,
                          delay: 0.9,
                          ease: [0.22, 1, 0.36, 1],
                        },
                      }}
                    >
                      {post.title.split(" ").map((word, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{
                            opacity: 1,
                            y: 0,
                            transition: {
                              duration: 0.5,
                              delay: 1.1 + i * 0.08,
                              ease: [0.22, 1, 0.36, 1],
                            },
                          }}
                          className="inline-block mr-2"
                        >
                          {word}
                        </motion.span>
                      ))}
                    </motion.h1>
                  </>
                )}
              </div>
              {index === currentIndex && post.description && (
                <div>
                  <motion.p
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-white/90 max-w-2xl"
                  >
                    {post.description}
                  </motion.p>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Navigation buttons */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center gap-2 z-20">
        <button
          onClick={handlePrevious}
          className="bg-gray-800/80 hover:bg-gray-700/80 text-white p-3 rounded-md focus:outline-none transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} />
        </button>

        {allPosts.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-10 h-10 flex items-center justify-center rounded-md focus:outline-none transition-colors ${
              index === currentIndex
                ? "bg-blue-600 text-white"
                : "bg-gray-800/80 hover:bg-gray-700/80 text-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentIndex ? "true" : "false"}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={handleNext}
          className="bg-gray-800/80 hover:bg-gray-700/80 text-white p-3 rounded-md focus:outline-none transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
}
