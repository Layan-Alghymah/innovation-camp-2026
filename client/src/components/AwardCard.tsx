interface AwardCardProps {
  place: string;
  amount: string;
  tier: "first" | "second" | "third";
  size?: "large" | "medium";
}

const tierStyles: Record<
  AwardCardProps["tier"],
  { bar: string; amount: string; ring: string }
> = {
  first: {
    bar: "bg-[linear-gradient(90deg,var(--brand-gold),var(--brand-orange))]",
    amount: "text-[var(--brand-gold)]",
    ring: "ring-[rgba(242,168,72,0.2)]",
  },
  second: {
    bar: "bg-[linear-gradient(90deg,rgba(125,214,255,0.35),rgba(13,59,102,0.55))]",
    amount: "text-[#d4e8fc]",
    ring: "ring-[rgba(125,214,255,0.12)]",
  },
  third: {
    bar: "bg-[linear-gradient(90deg,rgba(219,127,44,0.55),rgba(242,168,72,0.45))]",
    amount: "text-[var(--brand-orange)]",
    ring: "ring-[rgba(219,127,44,0.15)]",
  },
};

export function AwardCard({ place, amount, tier, size = "medium" }: AwardCardProps) {
  const t = tierStyles[tier];
  const sizeClasses =
    size === "large" ? "px-10 py-9 sm:px-14 sm:py-10" : "px-8 py-7";

  return (
    <div
      className={`relative overflow-hidden rounded-[28px] border border-white/15 bg-[rgba(6,32,58,0.42)] shadow-[0_20px_50px_rgba(0,35,55,0.28)] ring-1 ring-white/10 backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:border-white/22 hover:bg-[rgba(6,32,58,0.5)] hover:shadow-[0_24px_58px_rgba(0,35,55,0.32)] ${t.ring} ${sizeClasses}`}
    >
      <div className={`absolute inset-x-0 top-0 h-1 ${t.bar}`} aria-hidden />
      <div className="flex flex-col items-center text-center">
        <p className="text-xs font-bold uppercase tracking-wide text-white/55 sm:text-sm">{place}</p>
        <p className={`mt-3 text-3xl font-black tabular-nums sm:text-4xl ${t.amount}`}>
          {amount}{" "}
          <span className="text-lg font-bold text-white/80 sm:text-xl">ريال</span>
        </p>
      </div>
    </div>
  );
}
