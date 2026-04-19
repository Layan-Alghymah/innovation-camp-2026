import { Sparkle } from "lucide-react";

interface AwardCardProps {
  place: string;
  amount: string;
  starColor: string;
  borderColor: string;
  size?: "large" | "medium";
}

export function AwardCard({ place, amount, starColor, borderColor, size = "medium" }: AwardCardProps) {
  const sizeClasses = size === "large"
    ? "px-16 py-10 min-w-[320px]"
    : "px-8 py-8";

  return (
    <div className={`
      relative rounded-2xl bg-slate-800 border-t-4 ${borderColor}
      ${sizeClasses}
      shadow-xl
      flex flex-col items-center text-center
    `}>
      <Sparkle className={`w-12 h-12 ${starColor} mb-4`} fill="currentColor" />
      <h3 className="text-xl font-bold text-white mb-3">{place}</h3>
      <p className={`text-3xl font-extrabold ${starColor}`}>
        {amount} ريال
      </p>
    </div>
  );
}
