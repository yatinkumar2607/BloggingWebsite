import React from "react";
import SliderPosts from "./SliderPosts";

interface SectionWrapperProps {
  sliderHeading: string;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ sliderHeading }) => {
  return (
    <section className="section px-5 bg-[#121212]">
      <SliderPosts heading={sliderHeading} />
    </section>
  );
};

export default SectionWrapper;
