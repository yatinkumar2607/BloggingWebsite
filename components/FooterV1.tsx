"use client";

import type React from "react";

import { useState } from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  ArrowRight,
  MoveUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";

export default function FooterV1() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Subscribing email:", email);
    setEmail("");
  };

  return (
    <footer className="w-full bg-[#121212] pt-[35px] px-4 pb-[25px]">
      <div className="max-w-7xl w-full mx-auto space-y-[16px]">
        <div className="bg-lighter/30 relative py-[18px] px-[22px] overflow-hidden">
          <div className="absolute -right-5">
            <Image
              src="/images/e25d0c33a53a19b554dd3e8a9c8cf7c1.png"
              alt="search-icon"
              width={172}
              height={136}
            />
          </div>
          <div className="space-y-4 w-[60%]">
            <div>
              <h3 className="text-[24px] leading-[34px] font-black tracking-tight font-saira-condensed upppercase">
                NEWSLETTER
              </h3>
              <h3 className="text-[24px] leading-[34px] font-black text-zinc-400 font-saira-condensed upppercase">
                SUBSCRIPTION
              </h3>
            </div>
            <div>
              <form onSubmit={handleSubmit} className="flex w-full">
                <Input
                  type="email"
                  placeholder="aree99@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-[#303030] border-white rounded-s-sm rounded-e-none py-[7.5px] pl-[6px] text-[12px] leading-[16px] h-[31px]"
                  required
                />
                <button
                  type="submit"
                  className="bg-white rounded-e-sm hover:bg-zinc-200 w-[31px] h-[31px] flex items-center justify-center"
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
            className="w-[30px] h-[30px] rounded-sm bg-[#d9d9d936] flex items-center justify-center"
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
            className="w-[30px] h-[30px] rounded-sm bg-[#d9d9d936] flex items-center justify-center"
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
            className="w-[30px] h-[30px] rounded-full bg-[#d9d9d936] flex items-center justify-center"
          >
            <Image
              src="/images/twitter.svg"
              alt="facebook-icon"
              width={16}
              height={13}
            />
          </Link>
        </div>
        {/* <div className="flex flex-col md:flex-row gap-6 items-center">
          Newsletter Section
          <div className="flex-1 w-full space-y-4 relative">
            <div className="absolute">
              <Image
                src="/images/e25d0c33a53a19b554dd3e8a9c8cf7c1.png"
                alt="footer-image"
                width={156}
                height={122}
              />
            </div>
            <div className="space-y-2">
              <h2 className="text-4xl font-bold tracking-tight">NEWSLETTER</h2>
              <h3 className="text-3xl font-bold text-zinc-400">SUBSCRIPTION</h3>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex w-full max-w-md gap-2"
            >
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-zinc-700 border-zinc-600 text-white placeholder:text-zinc-400"
                required
              />
             
          </div>

          Image Section
          <div className="">
            <Image
              src="/images/e25d0c33a53a19b554dd3e8a9c8cf7c1.png"
              alt="Sports Player"
              width={200}
              height={200}
              className="object-cover"
            />
          </div>
        </div>

        Social Media Icons
         */}
      </div>
    </footer>
  );
}
