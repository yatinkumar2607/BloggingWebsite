"use client";

import type React from "react";

import { useState } from "react";
import { Facebook, Instagram, Twitter, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Subscribing email:", email);
    setEmail("");
  };

  return (
    <footer className="w-full bg-zinc-800 text-white p-6">
      <div className="container mx-auto max-w-screen-xl">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          {/* Newsletter Section */}
          <div className="flex-1 w-full space-y-4 relative">
            {/* <div className="absolute">
              <Image
                src="/images/e25d0c33a53a19b554dd3e8a9c8cf7c1.png"
                alt="footer-image"
                width={156}
                height={122}
              />
            </div> */}
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
              <Button
                type="submit"
                variant="ghost"
                size="icon"
                className="bg-white hover:bg-zinc-200"
              >
                <ArrowRight className="h-4 w-4 text-zinc-800" />
              </Button>
            </form>
          </div>

          {/* Image Section */}
          {/* <div className="">
            <Image
              src="/images/e25d0c33a53a19b554dd3e8a9c8cf7c1.png"
              alt="Sports Player"
              width={200}
              height={200}
              className="object-cover"
            />
          </div> */}
        </div>

        {/* Social Media Icons */}
        <div className="flex items-center space-x-[14px]">
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
      </div>
    </footer>
  );
}
