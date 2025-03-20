"use client";

export default function trendingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="pt-[66px] sm:pt-[72px] md:pt-[88px] lg:pt-[100px] xl:pt-[113px]">
      {children}
    </div>
  );
}
