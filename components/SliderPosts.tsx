import React from "react";
import BlogCard from "./BlogCard";

interface SliderPostsProps {
  heading: string;
}

const SliderPosts: React.FC<SliderPostsProps> = ({ heading }) => {
  return (
    <div className="max-w-7xl w-full mx-auto px-5 sm:px-6 md:px-8 lg:px-10 py-5 sm:py-6 md:py-8 lg:py-10 xl:py-11">
      <div className="space-y-[10px] sm:space-y-[14px] md:space-y-[18px] lg:space-y-[20px]">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <h2 className="font-saira-condensed text-[#d9d9d9] text-[24px] sm:text-[28px] leading-[34px] font-bold">
            {heading}
          </h2>
          <span className="flex-1 bg-[#2a2a2a] h-[5px]"></span>
        </div>
        <div className="grid grid-cols-1 gap-[26px]">
          <BlogCard
            featuredImage="/images/9a679af59a3678412acbe0c5b79c5c31.jpeg"
            authorName="Jake Will"
            authorImage="/images/unsplash_B5PLtlpR7YA.png"
            date="04 June 2023"
            title="5 Exercises Basketball Players Should Be Using To Develop Strength"
            excerpt="This article was written by Jake Willhoite from Healthlisted.com Strength in basketball isn't all about a massive body mass or ripped muscles."
            readMoreUrl="/blog/basketball-strength-exercises"
          />
          <BlogCard
            featuredImage="/images/9a679af59a3678412acbe0c5b79c5c31.jpeg"
            authorName="Jake Will"
            authorImage="/images/unsplash_B5PLtlpR7YA.png"
            date="04 June 2023"
            title="5 Exercises Basketball Players Should Be Using To Develop Strength"
            excerpt="This article was written by Jake Willhoite from Healthlisted.com Strength in basketball isn't all about a massive body mass or ripped muscles."
            readMoreUrl="/blog/basketball-strength-exercises"
          />
          <BlogCard
            featuredImage="/images/9a679af59a3678412acbe0c5b79c5c31.jpeg"
            authorName="Jake Will"
            authorImage="/images/unsplash_B5PLtlpR7YA.png"
            date="04 June 2023"
            title="5 Exercises Basketball Players Should Be Using To Develop Strength"
            excerpt="This article was written by Jake Willhoite from Healthlisted.com Strength in basketball isn't all about a massive body mass or ripped muscles."
            readMoreUrl="/blog/basketball-strength-exercises"
          />
        </div>
      </div>
    </div>
  );
};

export default SliderPosts;
