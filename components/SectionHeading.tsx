"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  heading: string;
  version?: "home-page" | "single-page";
}

const SectionHeading = ({ heading, version }: SectionHeadingProps) => {
  return (
    <motion.div
      className="flex items-center space-x-3"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={{
        hidden: {},
        visible: {},
      }}
    >
      <motion.h1
        className="font-saira-condensed text-[#d9d9d9] text-[28px] sm:text-[32px] md:text-[36px] leading-[40px] font-bold"
        variants={{
          hidden: { opacity: 0, x: -20 },
          visible: {
            opacity: 1,
            x: 0,
            transition: {
              duration: 0.5,
              ease: "easeOut",
            },
          },
        }}
      >
        {heading}
      </motion.h1>
      {version !== "single-page" && (
        <motion.span
          className="flex-1 bg-[#2a2a2a] h-[5px]"
          variants={{
            hidden: { scaleX: 0, originX: 0 },
            visible: {
              scaleX: 1,
              transition: {
                duration: 0.7,
                ease: "easeInOut",
                delay: 0.2,
              },
            },
          }}
        ></motion.span>
      )}
    </motion.div>
  );
};

export default SectionHeading;
