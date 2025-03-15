import Image from "next/image";

interface HeroSectionProps {
  tag: string;
  date: string;
  image: string;
  title: string;
}

export default function HeroSection({
  tag,
  date,
  image,
  title,
}: HeroSectionProps) {
  return (
    <section className="relative min-h-[460px] lg:min-h-[500px] xl:min-h-[583px]">
      <div className="absolute inset-0">
        <Image
          src={image}
          alt="Hero background"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>
      <div className="relative px-5 sm:px-6 pt-[66px] sm:pt-[72px] md:pt-[88px] lg:pt-[100px] xl:pt-[113px] pb-[15px] sm:pb-[20px] md:pb-[30px] lg:pb-[40px] xl:pb-[68px] flex flex-col min-h-[460px] lg:min-h-[500px] xl:min-h-[583px] text-[#d9d9d9]">
        <div className="pt-5 sm:pt-4 md:pt-3 lg:pt-2 xl:pt-1 flex flex-col justify-between h-full w-auto">
          <span className="flex">
            <span className="font-roboto font-medium text-sm sm:text-base md:text-[18px] lg:text-[20px] text-[#d9d9d9] px-[16.85px] sm:px-[18px] py-[3.85px]  border-[0.65px] border-[#d9d9d9]">
              {tag}
            </span>
          </span>
        </div>
        <div className="space-y-[10px] sm:space-y-[12px] flex-1 flex flex-col justify-end">
          <span className="font-nato-sans text-[14px] sm:text-[16px] md:text-[18px] font-normal text-[#d9d9d9]">
            {date}
          </span>
          <h1 className="uppercase font-saira-condensed font-bold text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px] leading-[34px] lg:leading-[36px] text-[#d9d9d9]">
            {title}
          </h1>
        </div>
      </div>
    </section>
  );
}
