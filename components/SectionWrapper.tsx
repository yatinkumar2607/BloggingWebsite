import React from "react";
import PostList from "./PostList";
import SectionHeading from "./SectionHeading";

interface Post {
  date: string;
  title: string;
  excerpt: string;
  authorName: string;
  authorImage: string;
  readMoreUrl: string;
  featuredImage: string;
}

interface SectionWrapperProps {
  sliderHeading: string;
  columns?: number;
  postList?: Post[];
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ sliderHeading }) => {
  return (
    <section className="section">
      <div className="max-w-7xl w-full mx-auto px-5 sm:px-6 md:px-8 lg:px-10 py-5 sm:py-6 md:py-8 lg:py-10 xl:py-11">
        <div className="space-y-[10px] sm:space-y-[14px] md:space-y-[18px] lg:space-y-[20px]">
          <SectionHeading heading={sliderHeading} />
          <PostList />
        </div>
      </div>
    </section>
  );
};

export default SectionWrapper;
