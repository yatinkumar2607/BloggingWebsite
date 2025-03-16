"use client";

import Link from "next/link";
import type React from "react";
import Image from "next/image";
import { useState } from "react";
import { MoveUpRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

export default function FooterV1() {
  const [email, setEmail] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Subscribing email:", email);
    setEmail("");
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const formVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1.2,
        delay: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    hover: {
      x: -10,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
      },
    },
  };

  const socialVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.8 + i * 0.1,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: {
      scale: 1.05,
      backgroundColor: "#f8f8f8",
      transition: { duration: 0.3 },
    },
    tap: { scale: 0.95 },
  };

  return (
    <motion.footer
      className="w-full bg-[#121212] pt-[35px] px-4 sm:px-6 md:px-8 lg:px-10 pb-[25px] sm:pb-[32px] md:pb-[40px] lg:pb-[55px] xl:pb-[70px]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <div className="max-w-7xl w-full mx-auto space-y-[16px]">
        <motion.div
          className="bg-lighter/30 relative py-[18px] sm:py-[30px] md:py-[45px] lg:py-[60px] xl:py-[82px] px-[22px] sm:px-[36px] md:px-[50px] lg:px-[65px] xl:px-[77px] overflow-hidden rounded-[6px]"
          variants={itemVariants}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          <motion.div
            className="absolute -right-4 sm:-right-3 w-[155px] sm:w-[180px] md:w-[300px] lg:w-[420px] xl:w-[550px] h-[122px] sm:h-[170px] md:h-[260px] lg:h-[370px] xl:h-[450px] bottom-0"
            variants={imageVariants}
            animate={isHovered ? "hover" : "visible"}
          >
            <Image
              src="/images/e25d0c33a53a19b554dd3e8a9c8cf7c1.png"
              alt="search-icon"
              fill
              sizes="100vw"
              objectFit="cover"
              objectPosition="top"
            />
          </motion.div>
          <div className="space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10 w-[60%]">
            <div>
              <motion.h3
                className="text-[24px] sm:text-[28px] md:text-[40px] lg:text-[52px] xl:text-[60px] leading-[34px] md:leading-[42px] lg:leading-[58px] xl:leading-[60px] font-black tracking-tight font-saira-condensed upppercase"
                variants={titleVariants}
              >
                NEWSLETTER
              </motion.h3>
              <motion.h3
                className="text-[24px] sm:text-[28px] md:text-[40px] lg:text-[52px] xl:text-[60px] leading-[34px] md:leading-[42px] lg:leading-[58px] xl:leading-[60px] font-black text-zinc-400 font-saira-condensed upppercase"
                variants={titleVariants}
                transition={{ delay: 0.2 }}
              >
                SUBSCRIPTION
              </motion.h3>
            </div>
            <motion.div className="max-w-[585px]" variants={formVariants}>
              <form onSubmit={handleSubmit} className="flex w-full">
                <Input
                  type="email"
                  placeholder="aree99@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-[#303030] border-white rounded-s-sm rounded-e-none py-[7.5px] sm:py-[8px] pl-[6px] sm:pl-[10px] text-[12px] sm:text-[16px] md:text-[18px] lg:text-[21px] leading-[16px] sm:leading-[20px] md:leading-[22px] lg:leading-[28px] h-[31px] sm:h-[38px] md:h-[42px] lg:h-[58px]"
                  required
                />
                <motion.button
                  type="submit"
                  className="bg-white rounded-e-sm hover:bg-zinc-200 w-[31px] sm:w-[38px] md:w-[42px] lg:w-[85px] h-[31px] sm:h-[38px] md:h-[42px] lg:h-[58px] flex items-center justify-center"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <MoveUpRight className="text-[#84878b] w-4 h-4" />
                </motion.button>
              </form>
            </motion.div>
          </div>
        </motion.div>
        <div className="flex items-center space-x-[14px]">
          {[
            {
              icon: "/images/facebook.svg",
              width: 11,
              height: 22,
              rounded: "rounded-sm",
            },
            {
              icon: "/images/instagram.svg",
              width: 17,
              height: 17,
              rounded: "rounded-sm",
            },
            {
              icon: "/images/twitter.svg",
              width: 16,
              height: 13,
              rounded: "rounded-full",
            },
          ].map((social, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={socialVariants}
              whileHover={{
                scale: 1.1,
                backgroundColor: "rgba(255, 255, 255, 0.3)",
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/"
                className={`w-[30px] sm:w-[34px] md:w-[40px] lg:w-[50px] xl:w-[55px] h-[30px] sm:h-[34px] md:h-[40px] lg:h-[50px] xl:h-[55px] ${social.rounded} bg-[#d9d9d936] flex items-center justify-center`}
              >
                <motion.div
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Image
                    src={social.icon || "/placeholder.svg"}
                    alt="social-icon"
                    width={social.width}
                    height={social.height}
                  />
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.footer>
  );
}
