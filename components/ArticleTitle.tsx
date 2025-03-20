"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const ArticleTitle = () => {
  return (
    <section className="section">
      <div className="max-w-7xl mx-auto w-full relative px-5 sm:px-6 md:px-8 lg:px-10 pt-[66px] sm:pt-[72px] md:pt-[88px] lg:pt-[100px] xl:pt-[113px] pb-[15px] sm:pb-[20px] md:pb-[30px] lg:pb-[40px] xl:pb-[68px] text-[#d9d9d9]">
        <div className="pt-5 sm:pt-4 md:pt-3 lg:pt-2 xl:pt-1 flex flex-col justify-between h-full w-auto space-y-[15px]">
          <motion.h1
            className="font-saira-condensed font-bold text-[24px] leading-[36px]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {/* Split text into words for word-by-word animation */}
            {[
              "Schedule",
              "out",
              "for",
              "cricket",
              "world",
              "cup",
              "2023.",
              "First",
              "match",
              "to",
              "be",
              "played",
              "at",
              "Ahmedabad",
            ].map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.1 + index * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="inline-block mr-[6px]"
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          <motion.div
            className="relative max-w-[350px] sm:max-w-[692px] w-full h-[216px] sm:h-[461px] rounded-[10px] overflow-hidden"
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
                src="/images/97b0599555bd228d78a2264e0c13e321.jpeg"
                alt="feature-image"
                fill
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ArticleTitle;
