import "./globals.css";
import type { Metadata } from "next";
import FooterV1 from "@/components/FooterV1";
import HeaderV1 from "@/components/HeaderV1";
import {
  Roboto,
  DM_Sans,
  Saira_Condensed,
  Noto_Sans_Old_Sogdian,
  Saira_Extra_Condensed,
} from "next/font/google";

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

// Default metadata for all pages
export const metadata: Metadata = {
  metadataBase: new URL("https://sixandfours.com"), // Replace with your actual domain
  title: {
    template: "%s | Six and Fours",
    default: "Six and Fours | Sports News and Updates",
  },
  description:
    "Six and Fours provides the latest sports news, trending stories, and in-depth articles.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${sairaExtraCondensed.variable} ${roboto.variable} ${notoSansOldSogdian.variable} ${sairaCondensed.variable} ${dmSans.variable}`}
      >
        <HeaderV1 />
        <main>{children}</main>
        <FooterV1 />
      </body>
    </html>
  );
}
