"use client";

import Image from "next/image";

interface FireIconProps {
  active?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "default" | "intense" | "crazy";
}

export default function FireIcon({
  active = false,
  size = "md",
  variant = "default",
}: FireIconProps) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  const sizePixels = {
    sm: 24,
    md: 32,
    lg: 48,
    xl: 64,
  };

  const getScaleClass = () => {
    if (variant === "crazy") return "scale-125";
    if (active || variant === "intense") return "scale-110";
    return "scale-100";
  };

  return (
    <div className={`relative inline-block ${sizeClasses[size]}`}>
      {/* Animated Fire WebP */}
      <div
        className={`absolute inset-0 transition-transform duration-300 ${getScaleClass()}`}
      >
        <Image
          src="/fire-animation.webp"
          alt="Fire"
          width={sizePixels[size]}
          height={sizePixels[size]}
          className="w-full h-full object-contain"
          unoptimized
        />
      </div>

      {/* Glow effect for active/intense states */}
      {(active || variant === "intense" || variant === "crazy") && (
        <div className="absolute inset-0 bg-gradient-radial from-orange-400/40 via-orange-500/20 to-transparent rounded-full blur-lg animate-pulse" />
      )}

      {/* Sparkles for active state */}
      {active && (
        <>
          <div
            className="absolute -top-2 left-1/2 w-1.5 h-1.5 bg-yellow-300 rounded-full animate-ping"
            style={{ animationDuration: "0.8s" }}
          />
          <div
            className="absolute -top-3 left-1/3 w-1 h-1 bg-orange-400 rounded-full animate-ping"
            style={{ animationDuration: "1s", animationDelay: "0.3s" }}
          />
          <div
            className="absolute -top-2 right-1/3 w-1 h-1 bg-red-400 rounded-full animate-ping"
            style={{ animationDuration: "1.2s", animationDelay: "0.6s" }}
          />
        </>
      )}

      {/* Extra particles for crazy variant */}
      {variant === "crazy" && (
        <>
          <div
            className="absolute top-0 left-1/4 w-0.5 h-0.5 bg-orange-300 rounded-full"
            style={{ animation: "particle-rise 1.5s ease-out infinite" }}
          />
          <div
            className="absolute top-0 right-1/4 w-0.5 h-0.5 bg-yellow-300 rounded-full"
            style={{
              animation: "particle-rise 1.8s ease-out infinite",
              animationDelay: "0.3s",
            }}
          />
          <div
            className="absolute top-0 left-1/2 w-0.5 h-0.5 bg-red-300 rounded-full"
            style={{
              animation: "particle-rise 1.3s ease-out infinite",
              animationDelay: "0.6s",
            }}
          />
        </>
      )}
    </div>
  );
}
