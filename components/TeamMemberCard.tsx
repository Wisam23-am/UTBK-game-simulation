"use client";

import { useState } from "react";
import Image from "next/image";

interface TeamMember {
  id: number;
  name: string;
  role?: string;
  major: string;
  image: string;
}

interface TeamMemberCardProps {
  member: TeamMember;
  index: number;
}

const gradients = [
  "from-[#3F72AF] to-[#112D4E]",
  "from-[#112D4E] to-[#3F72AF]",
  "from-[#3F72AF] via-[#112D4E] to-[#3F72AF]",
  "from-[#DBE2EF] to-[#3F72AF]",
];

const accentColors = [
  "text-[#3F72AF]",
  "text-[#112D4E]",
  "text-[#3F72AF]",
  "text-[#112D4E]",
];

export default function TeamMemberCard({ member, index }: TeamMemberCardProps) {
  const [imageError, setImageError] = useState(false);

  const gradientClass = gradients[index % gradients.length];
  const accentColor = accentColors[index % accentColors.length];

  return (
    <div className="bg-gradient-to-br from-[#F9F7F7] to-[#DBE2EF] rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-4 text-center relative overflow-visible transform hover:-translate-y-2 group border-2 border-[#3F72AF]/20 hover:border-[#3F72AF]/60">
      {/* Gradient glow effect on hover (outside card) */}
      <div
        className={`absolute -inset-1 bg-gradient-to-br ${gradientClass} rounded-2xl opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500 -z-10`}
      ></div>

      {/* Foto 4x6 (aspect ratio 2:3) */}
      <div className="relative w-full aspect-[2/3] rounded-xl overflow-hidden mb-4 shadow-md group-hover:shadow-xl transition-shadow duration-300">
        {!imageError ? (
          <>
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:brightness-110"
              onError={() => setImageError(true)}
            />
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </>
        ) : (
          // Fallback: Avatar with initials
          <div
            className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${gradientClass} relative`}
          >
            <div className="text-6xl font-bold text-white animate-pulse">
              {member.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </div>
            {/* Animated circles */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 border-4 border-white/20 rounded-full animate-ping"></div>
            </div>
          </div>
        )}
      </div>

      {/* Content with slide-up animation on hover */}
      <div className="relative z-10">
        {/* Nama */}
        <h3
          className={`text-lg font-bold text-[#112D4E] group-hover:${accentColor} transition-colors duration-300 mb-1`}
        >
          {member.name}
        </h3>

        {/* Role badge dengan gradient */}
        {member.role && (
          <div className="inline-block mb-2">
            <span
              className={`text-xs font-semibold text-white bg-gradient-to-r ${gradientClass} px-3 py-1.5 rounded-full shadow-md group-hover:shadow-lg transition-shadow duration-300`}
            >
              {member.role}
            </span>
          </div>
        )}

        {/* Jurusan with icon */}
        <div className="flex flex-col items-center justify-center gap-1 text-[#3F72AF] group-hover:text-[#112D4E] transition-colors duration-300">
          {member.major.includes("PSDKU") ? (
            <>
              <p className="text-sm font-medium">
                {member.major.split("PSDKU")[0].trim()}
              </p>
              <p className="text-xs font-medium text-[#3F72AF]/70">
                PSDKU{member.major.split("PSDKU")[1]}
              </p>
            </>
          ) : (
            <p className="text-sm font-medium">{member.major}</p>
          )}
        </div>
      </div>

      {/* Bottom accent line */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${gradientClass} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-2xl`}
      ></div>
    </div>
  );
}
