import { useEffect, useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, ChevronLeft, Newspaper } from "lucide-react";
import { InnerPageHeader } from "../components/InnerPageHeader";
import { InnerPageFooter } from "../components/InnerPageFooter";
import { ArticleImage, DateLine } from "../components/NewsShared";
import { getAllNews, type NewsArticle } from "../data/news";
import { getNewsArticles, type SupabaseNewsArticle } from "../services/newsService";

function normalizeSupabase(a: SupabaseNewsArticle): NewsArticle {
  return {
    slug: a.slug,
    title: a.title,
    date: a.date,
    dateISO: a.date_iso,
    summary: a.summary,
    content: Array.isArray(a.content) ? a.content : [],
    image: a.main_image_url,
    extraImages: a.extra_images,
  };
}

function FeaturedArticle({ article }: { article: NewsArticle }) {
  return (
    <Link href={`/news/${article.slug}`} className="group block">
      <article className="overflow-hidden rounded-2xl border border-[rgba(13,59,102,0.1)] bg-white shadow-[0_4px_24px_rgba(13,59,102,0.08)] transition-shadow duration-300 hover:shadow-[0_8px_40px_rgba(13,59,102,0.14)]">
        <div className="flex flex-col lg:flex-row">
          <div className="aspect-video w-full shrink-0 overflow-hidden lg:aspect-auto lg:w-[42%]">
            <ArticleImage
              article={article}
              className="h-full w-full transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>

          <div className="flex flex-1 flex-col justify-between p-7 md:p-9 lg:p-10">
            <div>
              <div className="mb-4">
                <span className="rounded-full bg-[rgba(242,168,72,0.15)] px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-[var(--brand-orange)]">
                  أبرز الأخبار
                </span>
              </div>

              <h3 className="mb-4 text-2xl font-black leading-snug text-[var(--brand-ink)] transition-colors duration-300 group-hover:text-[var(--brand-blue)] md:text-3xl lg:text-[1.75rem] xl:text-3xl">
                {article.title}
              </h3>

              <p className="line-clamp-4 text-sm leading-8 text-[var(--text-soft)] md:text-base md:leading-8">
                {article.summary}
              </p>
            </div>

            <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-[rgba(13,59,102,0.07)] pt-6">
              <DateLine date={article.date} />

              <span className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-blue)] px-5 py-2.5 text-sm font-bold text-white transition-colors duration-300 group-hover:bg-[var(--brand-blue-2)]">
                اقرأ المزيد
                <ArrowLeft className="h-4 w-4" />
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

function NewsCard({ article }: { article: NewsArticle }) {
  return (
    <Link href={`/news/${article.slug}`} className="group block h-full">
      <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-[rgba(13,59,102,0.08)] bg-white shadow-[0_2px_16px_rgba(13,59,102,0.06)] transition-shadow duration-300 hover:shadow-[0_6px_32px_rgba(13,59,102,0.12)]">
        <div className="aspect-video w-full shrink-0 overflow-hidden">
          <ArticleImage
            article={article}
            className="h-full w-full transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>

        <div className="flex flex-1 flex-col p-5 md:p-6">
          <div className="mb-3 flex flex-wrap items-center justify-end gap-2">
            <DateLine date={article.date} />
          </div>

          <h3 className="mb-3 flex-1 text-base font-bold leading-snug text-[var(--brand-ink)] transition-colors duration-300 group-hover:text-[var(--brand-blue)] md:text-[1.05rem]">
            {article.title}
          </h3>

          <p className="mb-5 line-clamp-2 text-sm leading-7 text-[var(--text-soft)]">{article.summary}</p>

          <div className="mt-auto border-t border-[rgba(13,59,102,0.06)] pt-4">
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--brand-blue)]">
              التفاصيل
              <ChevronLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <div className="mb-8 flex items-center gap-3">
      <span className="h-6 w-1 shrink-0 rounded-full bg-[var(--brand-gold)]" aria-hidden="true" />
      <h2 className="text-xl font-bold text-[var(--brand-ink)] md:text-2xl">{children}</h2>
    </div>
  );
}

export default function NewsPage() {
  const [articles, setArticles] = useState<NewsArticle[]>(() => getAllNews());

  useEffect(() => {
    getNewsArticles()
      .then((data) => {
        if (data.length > 0) {
          const normalized = data.map(normalizeSupabase);
          normalized.sort(
            (a, b) => new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime(),
          );
          setArticles(normalized);
        }
      })
      .catch(() => {
        // keep static fallback
      });
  }, []);

  const sorted = [...articles].sort(
    (a, b) => new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime(),
  );
  const featured = sorted[0];
  const grid = sorted.slice(1);
  const isEmpty = sorted.length === 0;

  return (
    <div
      dir="rtl"
      className="flex min-h-screen flex-col overflow-x-hidden bg-[var(--page-bg)] text-[var(--brand-ink)]"
    >
      <InnerPageHeader activePage="news" />

      <main className="flex-1 pt-[4.5rem] md:pt-[5rem]">
        <div className="border-b border-[rgba(13,59,102,0.08)] bg-white">
          <div className="container mx-auto px-4 py-10 md:py-12">
            <nav
              aria-label="مسار التنقل"
              className="mb-5 flex items-center gap-2 text-sm text-[var(--text-soft)]"
            >
              <Link href="/" className="transition hover:text-[var(--brand-blue)]">
                الرئيسية
              </Link>
              <ChevronLeft className="h-3.5 w-3.5 shrink-0" />
              <span className="font-semibold text-[var(--brand-blue)]">الأخبار</span>
            </nav>

            <div className="flex items-center gap-3">
              <span className="h-9 w-1 shrink-0 rounded-full bg-[var(--brand-gold)]" aria-hidden="true" />
              <h1 className="text-3xl font-black text-[var(--brand-ink)] md:text-4xl">أخبار المعسكر</h1>
            </div>

            <p className="mt-3 max-w-2xl text-base leading-8 text-[var(--text-soft)]">
              آخر المستجدات والإعلانات والفعاليات المتعلقة بمعسكر الابتكار الرقمي والمفتوح 2026 — بالتعاون بين جامعة
              المجمعة و K·A·CARE.
            </p>
          </div>
        </div>

        {isEmpty ? (
          <div className="container mx-auto px-4 py-24 text-center">
            <Newspaper className="mx-auto mb-4 h-12 w-12 text-[var(--text-soft)]/40" />
            <p className="text-lg font-semibold text-[var(--text-soft)]">لا توجد أخبار متاحة حالياً.</p>
            <p className="mt-2 text-sm text-[var(--text-soft)]/70">تابعونا للاطلاع على آخر المستجدات.</p>
          </div>
        ) : (
          <div className="container mx-auto space-y-14 px-4 py-12 md:space-y-20 md:py-16">
            {featured && (
              <section aria-label="أبرز الأخبار">
                <SectionLabel>أبرز الأخبار</SectionLabel>
                <FeaturedArticle article={featured} />
              </section>
            )}

            {grid.length > 0 && (
              <section aria-label="المزيد من الأخبار">
                <SectionLabel>المزيد من الأخبار</SectionLabel>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {grid.map((article) => (
                    <NewsCard key={article.slug} article={article} />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </main>

      <InnerPageFooter />
    </div>
  );
}
