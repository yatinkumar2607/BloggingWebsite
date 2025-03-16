"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface Post {
  tag: string;
  date: string;
  image: string;
  title: string;
}

interface HeroSectionProps {
  posts: Post[];
}

export default function HeroSection({ posts = [] }: HeroSectionProps) {
  // Default posts if none provided
  const defaultPosts: Post[] = [
    {
      tag: "Technology",
      date: "March 15, 2025",
      image: "/placeholder.svg?height=600&width=1200",
      title: "The Future of AI Development",
    },
    {
      tag: "Design",
      date: "March 14, 2025",
      image: "/placeholder.svg?height=600&width=1200",
      title: "Minimalism in Modern Web Design",
    },
    {
      tag: "Business",
      date: "March 13, 2025",
      image: "/placeholder.svg?height=600&width=1200",
      title: "Startup Funding Strategies for 2025",
    },
    {
      tag: "Health",
      date: "March 12, 2025",
      image: "/placeholder.svg?height=600&width=1200",
      title: "Wellness Tech Transforming Healthcare",
    },
    {
      tag: "Travel",
      date: "March 11, 2025",
      image: "/placeholder.svg?height=600&width=1200",
      title: "Remote Work Destinations for Digital Nomads",
    },
  ];

  const allPosts = posts.length > 0 ? posts : defaultPosts;

  return (
    <section className="relative min-h-[460px] lg:min-h-[500px] xl:min-h-[583px] overflow-hidden bg-[#121212]">
      {/* CSS for animations - improved cross-fade */}
      <style jsx global>{`
        .hero-slide {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 2s ease-in-out;
        }

        @keyframes crossfade {
          0% {
            opacity: 1;
          }
          40% {
            /* Extended from 20% to 40% - slides stay visible longer */
            opacity: 1;
          }
          45% {
            /* Added a gradual transition */
            opacity: 0.5;
          }
          50% {
            opacity: 0;
          }
          90% {
            /* Slides stay invisible longer */
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        ${allPosts
          .map(
            (_, index) => `
    .hero-slide:nth-child(${index + 1}) {
      animation: crossfade ${allPosts.length * 8}s ease-in-out ${
              index * 8
            }s infinite; /* Changed from 5s to 8s per slide for slower animation */
    }
  `
          )
          .join("\n")}
      `}</style>

      {allPosts.map((post, index) => (
        <div key={index} className="hero-slide">
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
          <div className="max-w-7xl mx-auto w-full relative px-5 sm:px-6 md:px-8 lg:px-10 pt-[66px] sm:pt-[72px] md:pt-[88px] lg:pt-[100px] xl:pt-[113px] pb-[15px] sm:pb-[20px] md:pb-[30px] lg:pb-[40px] xl:pb-[68px] flex flex-col min-h-[460px] lg:min-h-[500px] xl:min-h-[583px] text-[#d9d9d9]">
            <div className="pt-5 sm:pt-4 md:pt-3 lg:pt-2 xl:pt-1 flex flex-col justify-between h-full w-auto">
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
            </div>

            <div className="space-y-[10px] sm:space-y-[12px] flex-1 flex flex-col justify-end">
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
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
