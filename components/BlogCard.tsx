import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

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
  const initials = authorName
    .split(" ")
    .map((name) => name[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <Card className="text-white max-w-md mx-auto overflow-hidden border-none rounded-none bg-[#121212] space-y-[23px]">
      <div className="relative w-full h-44 rounded-[6px] overflow-hidden">
        <Image
          src={featuredImage}
          alt={title}
          fill
          className="object-cover"
          priority
        />
      </div>
      <CardContent className="p-0 space-y-[14px]">
        <div className="flex items-center space-x-4">
          <Avatar className="h-11 w-11">
            <AvatarImage src={authorImage} alt={`${authorName} avatar`} />
            {/* <AvatarFallback className="text-[#121212] font-saira-condensed font-bold">
              {initials}
            </AvatarFallback> */}
          </Avatar>
          <span className="text-[14px] leading-[22px] font-noto-sans text-[#d9d9d9]">
            {authorName}
          </span>
        </div>
        <div className="font-noto-sans font-normal text-[14px] text-[#ffffff]/60">
          {date}
        </div>
        <div className="space-y-[12px] text-[#9e9e9e] font-noto-sans text-[14px] leading-[22px] font-normal">
          <h3 className="text-[18px] leading-[24px] font-semibold text-[#d9d9d9] font-noto-sans">
            {title}
          </h3>
          <p>{excerpt}</p>
        </div>
        <div className="flex justify-end">
          <Link
            href="/"
            className="border-[0.75px] border-lighter rounded-sm px-[10px] py-[6px] font-dm-sans text-[14px] leadin-[14px] font-normal"
          >
            Read More
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
