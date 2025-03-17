"use client";

import type React from "react";
import { motion } from "framer-motion";

interface SectionHeadingProps {
  heading: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ heading }) => {
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

  return (
    <>
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
    </>
  );
};

export default SectionHeading;
