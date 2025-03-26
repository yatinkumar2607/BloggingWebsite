import React from "react";
import SliderPosts from "./SliderPosts";
import Table from "./Table";
import FolderSection from "./FolderSection";

interface SectionWrapperV2Props {
  headingCol1: string;
  headingCol2: string;
}

const SectionWrapperV2: React.FC<SectionWrapperV2Props> = ({
  headingCol1,
  headingCol2,
}) => {
  const iplTeams = [
    {
      position: 1,
      logo: "/images/rcb-logo.png", // Replace with actual logo path
      name: "Royal Challengers Bangalore",
      abbreviation: "RCB",
      matches: 38,
      wins: 29,
      losses: 29,
      ties: 6,
      nrr: "+0.888",
    },
    {
      position: 2,
      logo: "/images/csk-logo.png", // Replace with actual logo path
      name: "Chennai Super Kings",
      abbreviation: "CSK",
      matches: 38,
      wins: 29,
      losses: 29,
      ties: 6,
      nrr: "+0.888",
    },
    {
      position: 3,
      logo: "/images/lsg-logo.png", // Replace with actual logo path
      name: "Lucknow Super Giants",
      abbreviation: "LSG",
      matches: 38,
      wins: 29,
      losses: 29,
      ties: 6,
      nrr: "+0.888",
    },
    {
      position: 4,
      logo: "/images/gt-logo.png", // Replace with actual logo path
      name: "Gujarat Titans",
      abbreviation: "GT",
      matches: 38,
      wins: 29,
      losses: 29,
      ties: 6,
      nrr: "+0.888",
    },
    {
      position: 5,
      logo: "/images/kkr-logo.png", // Replace with actual logo path
      name: "Kolkata Knight Riders",
      abbreviation: "KKR",
      matches: 38,
      wins: 29,
      losses: 29,
      ties: 6,
      nrr: "+0.888",
    },
    {
      position: 6,
      logo: "/images/rr-logo.png", // Replace with actual logo path
      name: "Rajasthan Royals",
      abbreviation: "RR",
      matches: 38,
      wins: 29,
      losses: 29,
      ties: 6,
      nrr: "+0.888",
    },
    {
      position: 7,
      logo: "/images/mi-logo.png", // Replace with actual logo path
      name: "Mumbai Indians",
      abbreviation: "MI",
      matches: 38,
      wins: 29,
      losses: 29,
      ties: 6,
      nrr: "+0.888",
    },
    {
      position: 8,
      logo: "/images/dc-logo.png", // Replace with actual logo path
      name: "Delhi Capitals",
      abbreviation: "DC",
      matches: 38,
      wins: 29,
      losses: 29,
      ties: 6,
      nrr: "+0.888",
    },
    {
      position: 9,
      logo: "/images/srh-logo.png", // Replace with actual logo path
      name: "Sunrisers Hyderabad",
      abbreviation: "SRH",
      matches: 38,
      wins: 29,
      losses: 29,
      ties: 6,
      nrr: "+0.888",
    },
    {
      position: 10,
      logo: "/images/pk-logo.png", // Replace with actual logo path
      name: "Punjab Kings",
      abbreviation: "PK",
      matches: 38,
      wins: 29,
      losses: 29,
      ties: 6,
      nrr: "+0.888",
    },
  ];

  return (
    <section className="section">
      <div className="max-w-7xl w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[28px] sm:gap-[105px] px-5 sm:px-6 md:px-8 lg:px-10 pb-[96px]">
          <Table heading={headingCol1} teams={iplTeams} />
          <FolderSection heading={headingCol2} />
        </div>
      </div>
    </section>
  );
};

export default SectionWrapperV2;
