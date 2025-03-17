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
import {
  fetchGlobalData,
  extractNavItems,
  extractSocialLinks,
  extractOgImageUrl,
} from "@/lib/api";

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

// Generate dynamic metadata
export async function generateMetadata(): Promise<Metadata> {
  const globalData = await fetchGlobalData();

  // Default fallback values if API fails
  const fallbackTitle = "Six and Fours | Sports News and Updates";
  const fallbackDescription =
    "Six and Fours provides the latest sports news, trending stories, and in-depth articles.";
  const fallbackUrl = "https://sixandfours.com";
  const fallbackOgImage = "/images/og-image.jpg"; // Fallback OG image path

  // Extract data from API response or use fallbacks
  const siteTitle = globalData?.data?.defaultSeo?.metaTitle || fallbackTitle;
  const siteDescription =
    globalData?.data?.defaultSeo?.metaDescription || fallbackDescription;
  const siteName = globalData?.data?.siteName || "Six and Fours";
  const faviconUrl = globalData?.data?.favicon?.url || "/favicon.ico";

  // Extract OG image URL using the helper function
  const ogImageUrl = extractOgImageUrl(globalData) || fallbackOgImage;

  // Ensure the OG image URL is absolute
  const absoluteOgImageUrl = ogImageUrl.startsWith("http")
    ? ogImageUrl
    : `${fallbackUrl}${ogImageUrl}`;

  // Get image dimensions if available
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
      apple: "/apple-icon.png", // Fallback or you can add this to Strapi too
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
  // Fetch global data for the header and footer
  const globalData = await fetchGlobalData();

  // Extract site name with fallback
  const siteName = globalData?.data?.siteName || "Six and Fours";

  // Extract and transform navigation items
  const navItems = extractNavItems(globalData);

  // Extract social links for footer
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
