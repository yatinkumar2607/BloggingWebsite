"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Search, X } from "lucide-react";
import Image from "next/image";

const Header = () => {
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
    <header className="fixed w-full bg-[#00000091] backdrop-blur-[6.7px] text-white z-50">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-[66px]">
          <div className="flex items-center space-x-5">
            {/* Left - Mobile Menu Button */}
            <button
              className="md:hidden rounded-md hover:bg-white/10 focus:outline-none"
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Image
                  src="/images/Frame.svg"
                  alt="menu-icon"
                  width={24}
                  height={24}
                />
              )}
            </button>

            {/* Center - Logo */}
            <Link
              href="/"
              className="text-2xl md:text-3xl font-bold tracking-wider hover:text-blue-400 transition-colors font-saira-extra-condensed"
            >
              SIX AND FOURS
            </Link>
          </div>

          {/* Right - Search Icon (Visible only on Mobile) */}
          <button className="md:hidden rounded-md hover:bg-white/10 focus:outline-none">
            <Image
              src="images/Vector.svg"
              alt="search-icon"
              width={19}
              height={19}
            />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {navItems.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="text-gray-300 hover:text-white hover:bg-white/10 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden flex flex-col py-2 space-y-1">
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

export default Header;
