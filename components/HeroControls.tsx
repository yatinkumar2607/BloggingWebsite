"use client";

import { useState, useEffect } from "react";

interface HeroControlsProps {
  totalSlides: number;
}

export default function HeroControls({ totalSlides }: HeroControlsProps) {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);

    return () => clearInterval(interval);
  }, [totalSlides]);

  return (
    <div className="flex justify-center space-x-2">
      {Array.from({ length: totalSlides }).map((_, index) => (
        <div
          key={index}
          className={`w-2 h-2 rounded-full transition-all ${
            index === activeSlide ? "bg-white w-4" : "bg-white/50"
          }`}
          aria-label={`Slide ${index + 1}`}
        />
      ))}
    </div>
  );
}
