import { Calendar, Newspaper } from "lucide-react";
import type { NewsArticle } from "../data/news";

export function DateLine({ date }: { date: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-[var(--text-soft)]">
      <Calendar className="h-3.5 w-3.5 shrink-0" />
      {date}
    </span>
  );
}

/** صورة الغلاف عند توفر `image`، وإلا خلفية متدرجة مع أيقونة. */
export function ArticleImage({
  article,
  className = "",
}: {
  article: Pick<NewsArticle, "title" | "image">;
  className?: string;
}) {
  if (article.image) {
    return (
      <img
        src={article.image}
        alt={article.title}
        className={`object-cover ${className}`}
        loading="lazy"
        decoding="async"
      />
    );
  }

  return (
    <div
      className={`flex items-center justify-center bg-gradient-to-br from-[#0d3b66] to-[#3a7ab3] ${className}`}
      aria-hidden="true"
    >
      <Newspaper className="h-14 w-14 text-white/20 md:h-20 md:w-20" />
    </div>
  );
}
