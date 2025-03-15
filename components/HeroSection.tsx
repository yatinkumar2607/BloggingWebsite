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
    <section className="relative min-h-[460px]">
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
      <div className="relative px-5 pt-[66px] pb-[15px] flex flex-col min-h-[460px] text-[#d9d9d9]">
        <div className="pt-5 flex flex-col justify-between h-full w-auto">
          <span className="flex">
            <span className="font-roboto font-medium text-sm text-[#d9d9d9] leading-4 px-[16.85px] py-[3.85px] border-[0.65px] border-[#d9d9d9]">
              {tag}
            </span>
          </span>
        </div>
        <div className="space-y-[10px] flex-1 flex flex-col justify-end">
          <span className="font-nato-sans text-[14px] leading-[22px] font-normal text-[#d9d9d9]">
            {date}
          </span>
          <h1 className="uppercase font-saira-condensed font-bold text-[24px] leading-[34px] text-[#d9d9d9]">
            {title}
          </h1>
        </div>
      </div>
    </section>
  );
}
