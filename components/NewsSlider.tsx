"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface NewsItem {
  id: number;
  image: string;
  source: string;
  date: string;
  title: string;
  description: string;
  category?: string;
}

interface NewsSliderProps {
  items: NewsItem[];
  autoPlayInterval?: number;
}

export default function NewsSlider({
  items,
  autoPlayInterval = 5000,
}: NewsSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        handleNext();
      }
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [currentIndex, isAnimating, autoPlayInterval]);

  const handlePrevious = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );

    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const handleNext = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
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
    <div className="relative w-full h-[518px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-full h-full"
        >
          <Image
            src={items[currentIndex].image || "/placeholder.svg"}
            alt={items[currentIndex].title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1440px"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute top-4 left-4 z-10">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="border border-white/70 px-6 py-2 text-white"
            >
              {items[currentIndex].category || "Recent"}
            </motion.div>
          </div>
          <div className="absolute bottom-0 left-0 w-full p-6 pb-16 z-10">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-blue-300 text-sm mb-2"
            >
              {items[currentIndex].source} - {items[currentIndex].date}
            </motion.div>
            <motion.h2
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-white text-3xl md:text-4xl font-bold mb-4 max-w-2xl"
            >
              {items[currentIndex].title}
            </motion.h2>
            <motion.p
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-white/90 max-w-2xl"
            >
              {items[currentIndex].description}
            </motion.p>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center gap-2 z-20">
        <button
          onClick={handlePrevious}
          className="bg-gray-800/80 hover:bg-gray-700/80 text-white p-3 rounded-md focus:outline-none transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} />
        </button>
        {items.map((_, index) => (
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
    </div>
  );
}
