/**
 * Components and utilities shared between NewsPage and NewsArticlePage.
 * Keeps category metadata, image placeholder, badge, and date rendering in one place.
 */

import {
  Calendar,
  Megaphone,
  Layers,
  CalendarDays,
  Users,
  Newspaper,
  BookOpen,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { NewsArticle } from "../data/news";

// ─── Category metadata ────────────────────────────────────────────────────────

export interface CategoryMeta {
  icon: LucideIcon;
  /** Tailwind gradient classes for placeholder image areas */
  imageBg: string;
  /** Tailwind badge bg + text classes */
  badgeCls: string;
}

const CATEGORY_META: Record<string, CategoryMeta> = {
  "إعلانات": {
    icon: Megaphone,
    imageBg: "bg-gradient-to-br from-[#0d3b66] to-[#1f5a96]",
    badgeCls: "bg-blue-50 text-blue-700",
  },
  "مسارات": {
    icon: Layers,
    imageBg: "bg-gradient-to-br from-[#0f4c75] to-[#1b8ac4]",
    badgeCls: "bg-sky-50 text-sky-700",
  },
  "فعاليات": {
    icon: CalendarDays,
    imageBg: "bg-gradient-to-br from-[#145a32] to-[#1e8449]",
    badgeCls: "bg-green-50 text-green-700",
  },
  "شراكات": {
    icon: Users,
    imageBg: "bg-gradient-to-br from-[#4a235a] to-[#7d3c98]",
    badgeCls: "bg-violet-50 text-violet-700",
  },
  "ورش عمل": {
    icon: BookOpen,
    imageBg: "bg-gradient-to-br from-[#1a3a4a] to-[#1f6f78]",
    badgeCls: "bg-teal-50 text-teal-700",
  },
};

const DEFAULT_META: CategoryMeta = {
  icon: Newspaper,
  imageBg: "bg-gradient-to-br from-[#0d3b66] to-[#3a7ab3]",
  badgeCls: "bg-slate-100 text-slate-600",
};

export function getCategoryMeta(category: string): CategoryMeta {
  return CATEGORY_META[category] ?? DEFAULT_META;
}

// ─── Shared components ────────────────────────────────────────────────────────

export function CategoryBadge({ category }: { category: string }) {
  const { badgeCls } = getCategoryMeta(category);
  return (
    <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold tracking-wide ${badgeCls}`}>
      {category}
    </span>
  );
}

export function DateLine({ date }: { date: string }) {
  const formatted = new Date(date).toLocaleDateString("ar-SA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-[var(--text-soft)]">
      <Calendar className="h-3.5 w-3.5 shrink-0" />
      {formatted}
    </span>
  );
}

/**
 * Renders a real cover image when `article.coverImage` is set,
 * or a branded gradient placeholder with a category icon otherwise.
 */
export function ArticleImage({
  article,
  className = "",
}: {
  article: NewsArticle;
  className?: string;
}) {
  const { icon: Icon, imageBg } = getCategoryMeta(article.category);

  if (article.coverImage) {
    return (
      <img
        src={article.coverImage}
        alt={article.title}
        className={`object-cover ${className}`}
        loading="lazy"
        decoding="async"
      />
    );
  }

  return (
    <div
      className={`flex items-center justify-center ${imageBg} ${className}`}
      aria-hidden="true"
    >
      <Icon className="h-14 w-14 text-white/20 md:h-20 md:w-20" />
    </div>
  );
}
