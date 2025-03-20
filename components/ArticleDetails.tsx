import React from "react";
import { Avatar } from "./ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import Image from "next/image";

const ArticleDetails = () => {
  return (
    <section className="section">
      <div className="max-w-7xl w-full mx-auto px-5 sm:px-6 md:px-8 lg:px-10 py-5 sm:py-6 md:py-8 lg:py-10 xl:py-11">
        <div className="flex items-center space-x-2 justify-between">
          <span className="flex items-center space-x-[6.45px]">
            <Avatar className="h-5 w-5">
              <AvatarImage
                src="/images/72b5e4c814f22287e66c59eabba5ba77.jpeg"
                alt="author-avatar"
                className="object-cover object-top"
                width={20}
                height={20}
              />
              {/* <AvatarFallback className="text-[#121212] font-saira-condensed font-bold">
              {initials}
            </AvatarFallback> */}
            </Avatar>
            <span className="font-noto-sans font-normal text-[12px] leading-[12px] text-[#b6b6b6]">
              Jesica koli
            </span>
          </span>
          <span className="flex items-center space-x-[6.2px]">
            <Image
              src="/images/Group 3370.svg"
              alt="calendar-icon"
              width={11}
              height={12}
            />
            <span className="font-noto-sans font-normal text-[12px] leading-[12px] text-[#b6b6b6]">
              02 december 2022
            </span>
          </span>
          <span className="flex items-center space-x-[6.2px]">
            <Image
              src="/images/Group 3349.svg"
              alt="calendar-icon"
              width={11}
              height={12}
            />
            <span className="font-noto-sans font-normal text-[12px] leading-[12px] text-[#b6b6b6]">
              3 min. to read
            </span>
          </span>
        </div>
      </div>
    </section>
  );
};

export default ArticleDetails;
