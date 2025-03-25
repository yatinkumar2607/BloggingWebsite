"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import type { NavItem } from "@/lib/api";
import { usePathname } from "next/navigation";

interface HeaderProps {
  siteName: string;
  navItems: NavItem[];
}

export default function Header({ navItems, siteName }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu when navigating
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Function to check if a link is active
  const isLinkActive = (href: string): boolean => {
    // Handle home page special case
    if (href === "/" && pathname === "/") {
      return true;
    }

    // Special case for category pages like /articles/category/trending
    if (pathname.includes("/articles/category/")) {
      // For category links, check exact match with the category slug
      const categorySlug = pathname.split("/").pop(); // Get the last segment (the slug)

      // If href is exactly the category slug, it's active
      if (href === categorySlug) {
        return true;
      }

      // If href is /articles and we're on a category page, it should not be active
      if (href === "/articles") {
        return false;
      }
    }

    // For other pages, check if pathname starts with href
    // But ensure we're matching complete segments to avoid partial matches
    if (href !== "/") {
      // Remove trailing slash from href if it exists
      const normalizedHref = href.endsWith("/") ? href.slice(0, -1) : href;

      // Check if pathname is exactly the href or starts with href followed by a slash
      return (
        pathname === normalizedHref || pathname.startsWith(`${normalizedHref}/`)
      );
    }

    return false;
  };

  return (
    <header className="fixed w-full backdrop-blur-[6.7px] bg-[#00000091] z-50">
      <div className="max-w-7xl w-full mx-auto px-5 sm:px-6 md:px-8 lg:px-10">
        <div className="flex items-center justify-between h-[66px] sm:h-[72px] md:h-[88px] lg:h-[100px] xl:h-[113px]">
          <div className="flex items-center space-x-5 sm:space-x-6 md:space-x-7 lg:space-x-0">
            <button
              className="lg:hidden rounded-md"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
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
              {siteName}
            </Link>
          </div>
          <button
            className="lg:hidden rounded-md hover:bg-white/10 focus:outline-none"
            aria-label="Search"
          >
            <Image
              src="/images/Vector.svg"
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
                className={`font-noto-sans font-semibold text-[14px] leading-[38px] xl:text-[16px] xl:leading-[42px] p-[8px] xl:p-[10px] ${
                  isLinkActive(href) ? "text-white" : "text-white/60"
                }`}
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
                className={`font-noto-sans font-semibold text-[14px] leading-[38px] xl:text-[16px] xl:leading-[42px] p-[8px] xl:p-[10px] ${
                  isLinkActive(href) ? "text-white" : "text-white/60"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
