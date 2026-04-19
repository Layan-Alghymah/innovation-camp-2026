import { type ReactNode } from "react";

interface SectionTitleProps {
  children: ReactNode;
  className?: string;
}

export function SectionTitle({ children, className = "" }: SectionTitleProps) {
  return (
    <div className={`flex justify-center mb-8 ${className}`}>
      <div className="inline-flex items-center gap-3 rounded-full bg-white shadow-sm border border-slate-100 px-6 py-2.5">
        <span className="w-2.5 h-2.5 rounded-full bg-amber-500 flex-shrink-0"></span>
        <h2 className="text-xl md:text-2xl font-bold text-[#1e3a5f]">
          {children}
        </h2>
      </div>
    </div>
  );
}
