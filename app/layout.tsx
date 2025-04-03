import {
  fetchGlobalData,
  extractNavItems,
  extractOgImageUrl,
  extractSocialLinks,
} from "@/lib/api";
import "./globals.css";
import {
  Roboto,
  DM_Sans,
  Saira_Condensed,
  Noto_Sans_Old_Sogdian,
  Saira_Extra_Condensed,
} from "next/font/google";
import type React from "react";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
export const revalidate = 0;

const sairaExtraCondensed = Saira_Extra_Condensed({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-saira-extra-condensed",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const sairaCondensed = Saira_Condensed({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-saira-condensed",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const roboto = Roboto({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["100", "300", "400", "500", "700", "900"],
});

const notoSansOldSogdian = Noto_Sans_Old_Sogdian({
  display: "swap",
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-noto-sans-old-sogdian",
});

const dmSans = DM_Sans({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  const globalData = await fetchGlobalData();

  const fallbackTitle = "Cricket Blogger | Sports News and Updates";
  const fallbackDescription =
    "Cricket Blogger provides the latest sports news, trending stories, and in-depth articles.";
  const fallbackUrl = "https://cricketblogger.com";
  const fallbackOgImage = "/images/og-image.jpg";

  const siteTitle = globalData?.data?.defaultSeo?.metaTitle || fallbackTitle;
  const siteDescription =
    globalData?.data?.defaultSeo?.metaDescription || fallbackDescription;
  const siteName = globalData?.data?.siteName || "Cricket Blogger";
  const faviconUrl = globalData?.data?.favicon?.url || "/favicon.ico";

  const ogImageUrl = extractOgImageUrl(globalData) || fallbackOgImage;

  const absoluteOgImageUrl = ogImageUrl.startsWith("http")
    ? ogImageUrl
    : `${fallbackUrl}${ogImageUrl}`;

  const ogImageWidth =
    globalData?.data?.defaultSeo?.shareImage?.formats?.large?.width || 1000;
  const ogImageHeight =
    globalData?.data?.defaultSeo?.shareImage?.formats?.large?.height || 665;

  return {
    metadataBase: new URL(fallbackUrl),
    title: {
      template: `%s | ${siteName}`,
      default: siteTitle,
    },
    description: siteDescription,
    icons: {
      icon: faviconUrl,
      apple: faviconUrl,
    },
    openGraph: {
      title: siteTitle,
      description: siteDescription,
      siteName: siteName,
      type: "website",
      images: [
        {
          url: absoluteOgImageUrl,
          width: ogImageWidth,
          height: ogImageHeight,
          alt: siteName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: siteTitle,
      description: siteDescription,
      images: [absoluteOgImageUrl],
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const globalData = await fetchGlobalData();

  const siteName = globalData?.data?.siteName || "Cricket Blogger";

  const navItems = extractNavItems(globalData);

  const socialLinks = extractSocialLinks(globalData);

  return (
    <html lang="en">
      <body
        className={`${sairaExtraCondensed.variable} ${roboto.variable} ${notoSansOldSogdian.variable} ${sairaCondensed.variable} ${dmSans.variable} flex flex-col min-h-screen bg-[#121212]`}
      >
        <Header navItems={navItems} siteName={siteName} />
        <main className="flex-1">{children}</main>
        <Footer socialLinks={socialLinks} />
      </body>
    </html>
  );
}
