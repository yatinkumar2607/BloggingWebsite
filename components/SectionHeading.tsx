"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  heading: string;
  version?: "home-page" | "single-page";
}

const SectionHeading = ({
  heading,
  version = "home-page",
}: SectionHeadingProps) => {
  const variants = {
    hidden: {},
    visible: {},
  };

  const titleVariants = {
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

  const animationProps =
    version === "single-page"
      ? {
          initial: "hidden",
          animate: "visible",
        }
      : {
          initial: "hidden",
          whileInView: "visible",
          viewport: { once: true, amount: 0.3 },
        };

  return (
    <motion.div
      className="flex items-center space-x-3"
      variants={variants}
      {...animationProps}
    >
      <motion.h1
        className="font-saira-condensed text-[#d9d9d9] text-[28px] sm:text-[32px] md:text-[36px] leading-[40px] font-bold"
        variants={titleVariants}
      >
        {heading}
      </motion.h1>
      {version !== "single-page" && (
        <motion.span
          className="flex-1 bg-[#2a2a2a] h-[5px] mt-1.5"
          variants={lineVariants}
        ></motion.span>
      )}
    </motion.div>
  );
};

export default SectionHeading;
