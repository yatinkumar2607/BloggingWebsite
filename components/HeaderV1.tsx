"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { X } from "lucide-react";

const HeaderV1 = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Static navigation items (can be replaced with API later)
  const navItems = [
    { label: "Home", href: "/" },
    { label: "Trending", href: "/trending" },
    { label: "Recent", href: "/recent" },
    { label: "Articles", href: "/articles" },
    { label: "About", href: "/about" },
  ];

  /*
  // 🚀 Uncomment this when API is ready!
  import { useEffect, useState } from "react";

  useEffect(() => {
    const fetchNavItems = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/navigation`);
        const data = await res.json();
        setNavItems(data || []);
      } catch (error) {
        console.error("Failed to fetch navigation items:", error);
      }
    };

    fetchNavItems();
  }, []);
  */

  return (
    <header className="fixed w-full backdrop-blur-[6.7px] bg-[#00000091] z-50">
      <div className="max-w-7xl w-full mx-auto px-5 sm:px-6 md:px-8 lg:px-10">
        <div className="flex items-center justify-between h-[66px] sm:h-[72px] md:h-[88px] lg:h-[100px] xl:h-[113px]">
          <div className="flex items-center space-x-5 sm:space-x-6 md:space-x-7 lg:space-x-0">
            <button
              className="lg:hidden rounded-md"
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-[#d9d9d9]" />
              ) : (
                <Image
                  src="/images/Frame.svg"
                  alt="menu-icon"
                  width={24}
                  height={24}
                />
              )}
            </button>
            <Link
              href="/"
              className="text-[24px] leading-[22px] sm:text-[28px] sm:leading-[23px] md:text-[36px] md:leading-[42px] lg:text-[48px] lg:leading-[64px] xl:text-[64px] xl:leading-[74px] font-bold text-white font-saira-extra-condensed uppercase"
            >
              Six and Fours
            </Link>
          </div>
          <button className="lg:hidden rounded-md hover:bg-white/10 focus:outline-none">
            <Image
              src="images/Vector.svg"
              alt="search-icon"
              width={19}
              height={19}
            />
          </button>
          <nav className="hidden lg:flex items-center space-x-[19px]">
            {navItems.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="font-noto-sans font-semibold text-[14px] leading-[38px] xl:text-[16px] xl:leading-[42px] text-white p-[8px] xl:p-[10px]"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
        {isMenuOpen && (
          <div className="lg:hidden flex flex-col py-2 space-y-1">
            {navItems.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default HeaderV1;
