import HeroSection from "@/components/HeroSection";
import NewsSlider from "@/components/NewsSlider";
import SectionWrapper from "@/components/SectionWrapper";

export default function Home() {
  return (
    <>
      <HeroSection
        image="/images/dec5f05fce3ccef2b5c1d1d3b1dfedb8.jpeg"
        tag="Cycling"
        date="Debits - 03 June 2023"
        title="Discover the member benifts of USA Cycling!"
      />
      <SectionWrapper sliderHeading="Trending" />
      <NewsSlider />
      <SectionWrapper sliderHeading="Recent" />
      <SectionWrapper sliderHeading="Top Articles" />
    </>
  );
}
