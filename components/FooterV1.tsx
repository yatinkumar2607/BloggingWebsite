"use client";

import Link from "next/link";
import type React from "react";
import Image from "next/image";
import { useState } from "react";
import { MoveUpRight } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function FooterV1() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Subscribing email:", email);
    setEmail("");
  };

  return (
    <footer className="w-full bg-[#121212] pt-[35px] px-4 sm:px-6 md:px-8 lg:px-10 pb-[25px] sm:pb-[32px] md:pb-[40px] lg:pb-[55px] xl:pb-[70px]">
      <div className="max-w-7xl w-full mx-auto space-y-[16px]">
        <div className="bg-lighter/30 relative py-[18px] sm:py-[30px] md:py-[45px] lg:py-[60px] xl:py-[82px] px-[22px] sm:px-[36px] md:px-[50px] lg:px-[65px] xl:px-[77px] overflow-hidden rounded-[6px]">
          <div className="absolute -right-4 sm:-right-3 w-[155px] sm:w-[180px] md:w-[300px] lg:w-[420px] xl:w-[550px] h-[122px] sm:h-[170px] md:h-[260px] lg:h-[370px] xl:h-[450px] bottom-0">
            <Image
              src="/images/e25d0c33a53a19b554dd3e8a9c8cf7c1.png"
              alt="search-icon"
              fill
              sizes="100vw"
              objectFit="cover"
              objectPosition="top"
            />
          </div>
          <div className="space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10 w-[60%]">
            <div>
              <h3 className="text-[24px] sm:text-[28px] md:text-[40px] lg:text-[52px] xl:text-[60px] leading-[34px] md:leading-[42px] lg:leading-[58px] xl:leading-[60px] font-black tracking-tight font-saira-condensed upppercase">
                NEWSLETTER
              </h3>
              <h3 className="text-[24px] sm:text-[28px] md:text-[40px] lg:text-[52px] xl:text-[60px] leading-[34px] md:leading-[42px] lg:leading-[58px] xl:leading-[60px] font-black text-zinc-400 font-saira-condensed upppercase">
                SUBSCRIPTION
              </h3>
            </div>
            <div className="max-w-[585px]">
              <form onSubmit={handleSubmit} className="flex w-full">
                <Input
                  type="email"
                  placeholder="aree99@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-[#303030] border-white rounded-s-sm rounded-e-none py-[7.5px] sm:py-[8px] pl-[6px] sm:pl-[10px] text-[12px] sm:text-[16px] md:text-[18px] lg:text-[21px] leading-[16px] sm:leading-[20px] md:leading-[22px] lg:leading-[28px] h-[31px] sm:h-[38px] md:h-[42px] lg:h-[58px]"
                  required
                />
                <button
                  type="submit"
                  className="bg-white rounded-e-sm hover:bg-zinc-200 w-[31px] sm:w-[38px] md:w-[42px] lg:w-[85px] h-[31px] sm:h-[38px] md:h-[42px] lg:h-[58px] flex items-center justify-center"
                >
                  <MoveUpRight className="text-[#84878b] w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-[14px] ">
          <Link
            href="/"
            className="w-[30px] sm:w-[34px] md:w-[40px] lg:w-[50px] xl:w-[55px] h-[30px] sm:h-[34px] md:h-[40px] lg:h-[50px] xl:h-[55px] rounded-sm bg-[#d9d9d936] flex items-center justify-center"
          >
            <Image
              src="/images/facebook.svg"
              alt="facebook-icon"
              width={11}
              height={22}
            />
          </Link>
          <Link
            href="/"
            className="w-[30px] sm:w-[34px] md:w-[40px] lg:w-[50px] xl:w-[55px] sm:h-[34px] md:h-[40px] lg:h-[50px] xl:h-[55px] rounded-sm bg-[#d9d9d936] flex items-center justify-center"
          >
            <Image
              src="/images/instagram.svg"
              alt="facebook-icon"
              width={17}
              height={17}
            />
          </Link>
          <Link
            href="/"
            className="w-[30px] sm:w-[34px] md:w-[40px] lg:w-[50px] xl:w-[55px] h-[30px] sm:h-[34px] md:h-[40px] lg:h-[50px] xl:h-[55px] rounded-full bg-[#d9d9d936] flex items-center justify-center"
          >
            <Image
              src="/images/twitter.svg"
              alt="facebook-icon"
              width={16}
              height={13}
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}
