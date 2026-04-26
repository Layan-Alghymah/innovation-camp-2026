import { useEffect, useState } from "react";
import { Link, useRoute } from "wouter";
import { ArrowRight, ChevronLeft, Home, Newspaper } from "lucide-react";
import { InnerPageHeader } from "../components/InnerPageHeader";
import { InnerPageFooter } from "../components/InnerPageFooter";
import { ArticleImage, DateLine } from "../components/NewsShared";
import { getArticleBySlug, type NewsArticle } from "../data/news";
import { getNewsArticleBySlug, type SupabaseNewsArticle } from "../services/newsService";

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

function ArticleNotFound() {
  return (
    <div
      dir="rtl"
      className="flex min-h-screen flex-col overflow-x-hidden bg-[var(--page-bg)] text-[var(--brand-ink)]"
    >
      <InnerPageHeader activePage="news" />
      <main className="flex flex-1 flex-col items-center justify-center px-4 pt-[4.5rem] text-center">
        <Newspaper className="mb-5 h-14 w-14 text-[var(--text-soft)]/30" />
        <h1 className="mb-2 text-2xl font-black text-[var(--brand-ink)]">المقال غير موجود</h1>
        <p className="mb-8 max-w-sm text-sm leading-7 text-[var(--text-soft)]">
          لم يُعثر على هذا الخبر. ربما تمت إزالته أو أن الرابط غير صحيح.
        </p>
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-blue)] px-6 py-3 text-sm font-bold text-white transition hover:bg-[var(--brand-blue-2)]"
          >
            <ArrowRight className="h-4 w-4" />
            العودة إلى الأخبار
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-[rgba(13,59,102,0.18)] bg-white px-6 py-3 text-sm font-semibold text-[var(--brand-blue)] transition hover:shadow-md"
          >
            <Home className="h-4 w-4" />
            الرئيسية
          </Link>
        </div>
      </main>
      <InnerPageFooter />
    </div>
  );
}

export default function NewsArticlePage() {
  const [, params] = useRoute("/news/:slug");
  const slug = params?.slug ?? "";

  const localFallback = getArticleBySlug(slug);
  const [article, setArticle] = useState<NewsArticle | null>(localFallback ?? null);
  const [loading, setLoading] = useState(!localFallback);

  useEffect(() => {
    if (!slug) return;
    getNewsArticleBySlug(slug)
      .then((data) => {
        if (data) {
          setArticle(normalizeSupabase(data));
        } else if (!localFallback) {
          setArticle(null);
        }
      })
      .catch(() => {
        if (!localFallback) setArticle(null);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div
        dir="rtl"
        className="flex min-h-screen flex-col overflow-x-hidden bg-[var(--page-bg)] text-[var(--brand-ink)]"
      >
        <InnerPageHeader activePage="news" />
        <main className="flex flex-1 items-center justify-center pt-[4.5rem]">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[var(--brand-blue)] border-t-transparent" />
        </main>
        <InnerPageFooter />
      </div>
    );
  }

  if (!article) return <ArticleNotFound />;

  return (
    <div
      dir="rtl"
      className="flex min-h-screen flex-col overflow-x-hidden bg-[var(--page-bg)] text-[var(--brand-ink)]"
    >
      <InnerPageHeader activePage="news" />

      <main className="flex-1 pt-[4.5rem] md:pt-[5rem]">
        <div className="border-b border-[rgba(13,59,102,0.08)] bg-white">
          <div className="container mx-auto max-w-3xl px-4 py-8 md:py-10">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <nav aria-label="مسار التنقل" className="flex items-center gap-2 text-sm text-[var(--text-soft)]">
                <Link href="/" className="transition hover:text-[var(--brand-blue)]">
                  الرئيسية
                </Link>
                <ChevronLeft className="h-3.5 w-3.5 shrink-0" />
                <Link href="/news" className="transition hover:text-[var(--brand-blue)]">
                  الأخبار
                </Link>
                <ChevronLeft className="h-3.5 w-3.5 shrink-0" />
                <span className="line-clamp-1 max-w-[10rem] font-semibold text-[var(--brand-blue)] sm:max-w-xs">
                  {article.title}
                </span>
              </nav>

              <Link
                href="/news"
                className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[rgba(13,59,102,0.15)] bg-[var(--page-bg)] px-4 py-2 text-xs font-semibold text-[var(--brand-blue)] transition hover:border-[rgba(13,59,102,0.3)] hover:bg-white"
              >
                <ArrowRight className="h-3.5 w-3.5" />
                كل الأخبار
              </Link>
            </div>

            <div className="mb-4">
              <DateLine date={article.date} />
            </div>

            <h1 className="text-balance text-2xl font-black leading-snug text-[var(--brand-ink)] md:text-4xl">
              {article.title}
            </h1>

            <p className="mt-4 text-base leading-8 text-[var(--text-soft)] md:text-lg md:leading-9">
              {article.summary}
            </p>
          </div>
        </div>

        {article.image && (
          <div className="container mx-auto max-w-3xl px-4 pt-8 md:pt-10">
            <div className="overflow-hidden rounded-2xl shadow-[0_4px_28px_rgba(13,59,102,0.1)]">
              <div className="aspect-video w-full">
                <ArticleImage article={article} className="h-full w-full" />
              </div>
            </div>
          </div>
        )}

        <div className="container mx-auto max-w-3xl px-4 py-10 md:py-14">
          <article className="space-y-6">
            {article.content.map((para, i) => (
              <p key={i} className="text-base leading-[2] text-[var(--brand-ink)] md:text-[1.05rem]">
                {para}
              </p>
            ))}
          </article>

          {/* صور إضافية */}
          {article.extraImages && article.extraImages.length > 0 && (
            <div className="mt-12">
              <div className="mb-6 flex items-center gap-3">
                <span className="h-5 w-1 shrink-0 rounded-full bg-[var(--brand-gold)]" aria-hidden="true" />
                <h2 className="text-lg font-bold text-[var(--brand-ink)]">صور الخبر</h2>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {article.extraImages.map((src, i) => (
                  <div
                    key={i}
                    className="overflow-hidden rounded-xl shadow-[0_2px_16px_rgba(13,59,102,0.08)]"
                  >
                    <img
                      src={src}
                      alt={`${article.title} — صورة ${i + 1}`}
                      className="aspect-video w-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-12 flex flex-wrap items-center gap-3 border-t border-[rgba(13,59,102,0.08)] pt-8">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-blue)] px-6 py-3 text-sm font-bold text-white transition hover:bg-[var(--brand-blue-2)]"
            >
              <ArrowRight className="h-4 w-4" />
              العودة إلى الأخبار
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-[rgba(13,59,102,0.15)] bg-white px-6 py-3 text-sm font-semibold text-[var(--text-soft)] transition hover:border-[rgba(13,59,102,0.25)] hover:text-[var(--brand-blue)]"
            >
              <Home className="h-4 w-4" />
              الرئيسية
            </Link>
          </div>
        </div>
      </main>

      <InnerPageFooter />
    </div>
  );
}
