"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useState } from "react";

interface BlogCardProps {
  featuredImage: string;
  authorName: string;
  authorImage?: string;
  date: string;
  title: string;
  excerpt: string;
  readMoreUrl: string;
}

export default function BlogCard({
  featuredImage,
  authorName,
  authorImage,
  date,
  title,
  excerpt,
  readMoreUrl,
}: BlogCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const initials = authorName
    .split(" ")
    .map((name) => name[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <Link href={readMoreUrl} passHref>
      <div
        className="group relative h-full cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Card
          className={`text-white mx-auto overflow-hidden border-none rounded-none bg-transparent space-y-[23px] h-full transition-all duration-300 ease-in-out ${
            isHovered ? "transform -translate-y-2" : ""
          }`}
        >
          <div className="relative w-full h-44 sm:h-52 rounded-[6px] overflow-hidden">
            <Image
              src={featuredImage || "/placeholder.svg"}
              alt={title}
              fill
              className={`object-cover transition-transform duration-500 ease-in-out ${
                isHovered ? "scale-105" : "scale-100"
              }`}
              priority
            />
            <div
              className={`absolute inset-0 bg-black transition-opacity duration-300 ${
                isHovered ? "opacity-30" : "opacity-0"
              }`}
            ></div>
          </div>
          <CardContent className="p-0 space-y-[14px]">
            <div className="flex items-center space-x-4">
              <Avatar className="h-11 w-11">
                <AvatarImage src={authorImage} alt={`${authorName} avatar`} />
                <AvatarFallback className="text-[#121212] font-saira-condensed font-bold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <span className="text-[14px] leading-[22px] font-noto-sans text-[#d9d9d9]">
                {authorName}
              </span>
            </div>
            <div className="space-y-[12px] text-[#9e9e9e] font-noto-sans text-[14px] leading-[22px] font-normal">
              <h3
                className={`text-[18px] leading-[24px] font-semibold font-noto-sans transition-colors duration-300 ${
                  isHovered ? "text-white" : "text-[#d9d9d9]"
                }`}
              >
                {title}
              </h3>
              <p>{excerpt}</p>
            </div>
            <div className="flex justify-end">
              <span
                className={`border-[0.75px] border-lighter rounded-sm px-[10px] py-[6px] font-dm-sans text-[14px] leading-[14px] font-normal transition-all duration-300 ${
                  isHovered
                    ? "bg-white text-[#121212]"
                    : "bg-transparent text-white"
                }`}
                onClick={(e) => e.preventDefault()}
              >
                Read More
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </Link>
  );
}
