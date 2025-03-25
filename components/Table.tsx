"use client";

import type React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface TeamData {
  position: number;
  logo: string;
  name: string;
  abbreviation: string;
  matches: number;
  wins: number;
  losses: number;
  ties: number;
  nrr: string;
}

interface StandingsTableProps {
  heading: string;
  teams: TeamData[];
}

const StandingsTable: React.FC<StandingsTableProps> = ({
  heading,
  teams = [],
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const rowVariants = {
    hidden: {
      opacity: 0,
      x: -10,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1.0],
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="max-w-7xl w-full mx-auto">
      <div className="space-y-[10px] sm:space-y-[14px] md:space-y-[18px] lg:space-y-[20px]">
        <motion.div
          className="flex items-center space-x-2 sm:space-x-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: {},
            visible: {},
          }}
        >
          <motion.h2
            className="font-saira-condensed text-[#d9d9d9] text-[24px] sm:text-[28px] leading-[34px] font-bold"
            variants={headerVariants}
          >
            {heading}
          </motion.h2>
          <motion.span
            className="flex-1 bg-[#2a2a2a] h-[5px] mt-1.5"
            variants={{
              hidden: { scaleX: 0, originX: 0 },
              visible: {
                scaleX: 1,
                transition: {
                  duration: 0.7,
                  ease: "easeInOut",
                  delay: 0.2,
                },
              },
            }}
          ></motion.span>
        </motion.div>
        <motion.div
          className="w-full overflow-x-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          <table className="w-full border-collapse bg-[#353535]">
            <motion.thead variants={headerVariants}>
              <tr className=" text-white flex items-center justify-between pb-4">
                <th className="text-left py-1 px-2 sm:px-4 font-semibold text-[14px] leading-[14px] sm:text-base font-noto-sans min-w-[150px]">
                  Franchises
                </th>
                <th className="py-1 px-2 sm:px-4 font-semibold text-[14px] leading-[14px] sm:text-base font-noto-sans text-center">
                  M
                </th>
                <th className="py-1 px-2 sm:px-4 font-semibold text-[14px] leading-[14px] sm:text-base font-noto-sans text-center">
                  W
                </th>
                <th className="py-1 px-2 sm:px-4 font-semibold text-[14px] leading-[14px] sm:text-base font-noto-sans text-center">
                  L
                </th>
                <th className="py-1 px-2 sm:px-4 font-semibold text-[14px] leading-[14px] sm:text-base font-noto-sans text-center">
                  TIE
                </th>
                <th className="py-1 px-2 sm:px-4 font-semibold text-[14px] leading-[14px] sm:text-base font-noto-sans text-center">
                  NRR
                </th>
              </tr>
            </motion.thead>
            <motion.tbody variants={containerVariants}>
              {teams.map((team, index) => (
                <motion.tr
                  key={team.position}
                  className={`${
                    index % 2 === 0 ? "bg-[#353535]" : "bg-[#252525]"
                  } flex items-center justify-between`}
                  variants={rowVariants}
                  custom={index}
                >
                  <td className="py-[7px] w-auto sm:py-3 px-2 sm:px-4 min-w-[150px] text-[14px] leading-[14px] font-noto-sans">
                    <div className="flex items-center space-x-3">
                      <span className="text-white text-[14px] leadin-[14px] sm:text-[13px] font-semibold">
                        {team.position}
                      </span>
                      <div className="relative w-4 sm:w-[25px] h-4 sm:h-[25px] overflow-hidden rounded-full">
                        <Image
                          src="/images/b1bce8c09c8c4ed93e17200a05c71ec5.png"
                          alt={team.name}
                          width={40}
                          height={40}
                          className="object-contain"
                        />
                      </div>
                      <span className="text-white text-[14px] sm:text-[13px] font-semibold">
                        {team.abbreviation}
                      </span>
                    </div>
                  </td>
                  <td className="py-[7px] w-auto sm:py-3 px-2 sm:px-4 text-white text-center text-[14px] sm:text-base leading-[14px] font-noto-sans">
                    {team.matches}
                  </td>
                  <td className="py-[7px] w-auto sm:py-3 px-2 sm:px-4 text-white text-center text-[14px] sm:text-base leading-[14px] font-noto-sans">
                    {team.wins}
                  </td>
                  <td className="py-[7px] w-auto sm:py-3 px-2 sm:px-4 text-white text-center text-[14px] sm:text-base leading-[14px] font-noto-sans">
                    {team.losses}
                  </td>
                  <td className="py-[7px] w-auto sm:py-3 px-2 sm:px-4 text-white text-center text-[14px] sm:text-base leading-[14px] font-noto-sans">
                    {team.ties}
                  </td>
                  <td className="py-[7px] w-auto sm:py-3 px-2 sm:px-4 text-white text-center text-[14px] sm:text-base leading-[14px] font-noto-sans">
                    {team.nrr}
                  </td>
                </motion.tr>
              ))}
            </motion.tbody>
          </table>
        </motion.div>
      </div>
    </div>
  );
};

export default StandingsTable;
