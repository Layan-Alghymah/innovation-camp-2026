import type { ReactNode } from "react";
import { Link, useRoute } from "wouter";
import {
  ChevronLeft,
  ArrowRight,
  FileText,
  FileDown,
  ExternalLink,
  Globe,
  Video,
  Twitter,
  Home,
  Newspaper,
} from "lucide-react";
import { InnerPageHeader } from "../components/InnerPageHeader";
import { InnerPageFooter } from "../components/InnerPageFooter";
import {
  ArticleImage,
  CategoryBadge,
  DateLine,
} from "../components/NewsShared";
import {
  getArticleBySlug,
  getRelatedArticles,
  type NewsArticle,
  type NewsAttachment,
  type NewsExternalLink,
} from "../data/news";

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Renders the article body from a string[].
 * Each element is one paragraph. Supports **text** for inline bold.
 */
function ArticleBody({ content }: { content: string[] }) {
  return (
    <div className="space-y-6">
      {content.map((para, i) => (
        <p key={i} className="text-base leading-[2] text-[var(--brand-ink)] md:text-[1.05rem]">
          {renderInline(para)}
        </p>
      ))}
    </div>
  );
}

function renderInline(text: string): ReactNode {
  // Split on **…** markers
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="font-bold text-[var(--brand-ink)]">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

// ─── Attachments ──────────────────────────────────────────────────────────────

function attachmentIcon(type: NewsAttachment["type"]) {
  if (type === "pdf") return <FileDown className="h-4 w-4 shrink-0 text-red-500" />;
  if (type === "doc") return <FileText className="h-4 w-4 shrink-0 text-blue-500" />;
  return <ExternalLink className="h-4 w-4 shrink-0 text-[var(--text-soft)]" />;
}

function externalLinkIcon(type: NewsExternalLink["type"]) {
  if (type === "tweet") return <Twitter className="h-4 w-4 shrink-0 text-sky-500" />;
  if (type === "video") return <Video className="h-4 w-4 shrink-0 text-rose-500" />;
  return <Globe className="h-4 w-4 shrink-0 text-[var(--brand-blue)]" />;
}

function AttachmentsSection({ attachments }: { attachments: NewsAttachment[] }) {
  return (
    <div className="rounded-xl border border-[rgba(13,59,102,0.1)] bg-white p-5 md:p-6">
      <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-[var(--text-soft)]">
        المرفقات
      </h2>
      <ul className="space-y-2.5">
        {attachments.map((a, i) => (
          <li key={i}>
            <a
              href={a.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex w-full items-center gap-3 rounded-lg border border-[rgba(13,59,102,0.08)] bg-[var(--page-bg)] px-4 py-3 text-sm font-semibold text-[var(--brand-ink)] transition hover:border-[rgba(13,59,102,0.2)] hover:bg-white hover:text-[var(--brand-blue)]"
            >
              {attachmentIcon(a.type)}
              <span className="flex-1 text-right">{a.label}</span>
              <ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-60" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ExternalLinksSection({ links }: { links: NewsExternalLink[] }) {
  return (
    <div className="rounded-xl border border-[rgba(13,59,102,0.1)] bg-white p-5 md:p-6">
      <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-[var(--text-soft)]">
        روابط ذات صلة
      </h2>
      <ul className="space-y-2.5">
        {links.map((l, i) => (
          <li key={i}>
            <a
              href={l.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex w-full items-center gap-3 rounded-lg border border-[rgba(13,59,102,0.08)] bg-[var(--page-bg)] px-4 py-3 text-sm font-semibold text-[var(--brand-ink)] transition hover:border-[rgba(13,59,102,0.2)] hover:bg-white hover:text-[var(--brand-blue)]"
            >
              {externalLinkIcon(l.type)}
              <span className="flex-1 text-right">{l.label}</span>
              <ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-60" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Related articles ─────────────────────────────────────────────────────────

function RelatedCard({ article }: { article: NewsArticle }) {
  return (
    <Link href={`/news/${article.slug}`} className="group block">
      <article className="flex h-full flex-col overflow-hidden rounded-xl border border-[rgba(13,59,102,0.08)] bg-white transition-shadow hover:shadow-[0_4px_20px_rgba(13,59,102,0.1)]">
        <div className="aspect-video w-full overflow-hidden">
          <ArticleImage
            article={article}
            className="h-full w-full transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
        <div className="flex flex-1 flex-col p-4">
          <div className="mb-2 flex items-center justify-between gap-2">
            <CategoryBadge category={article.category} />
            <DateLine date={article.date} />
          </div>
          <h3 className="text-sm font-bold leading-snug text-[var(--brand-ink)] transition-colors group-hover:text-[var(--brand-blue)] md:text-base line-clamp-2">
            {article.title}
          </h3>
        </div>
      </article>
    </Link>
  );
}

function RelatedSection({ current }: { current: NewsArticle }) {
  const related = getRelatedArticles(current);
  if (related.length === 0) return null;

  return (
    <section className="border-t border-[rgba(13,59,102,0.08)] bg-white py-12 md:py-14">
      <div className="container mx-auto px-4">
        <div className="mb-7 flex items-center gap-3">
          <span className="h-5 w-1 shrink-0 rounded-full bg-[var(--brand-gold)]" aria-hidden="true" />
          <h2 className="text-lg font-bold text-[var(--brand-ink)] md:text-xl">
            مقالات ذات صلة
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((a) => (
            <RelatedCard key={a.slug} article={a} />
          ))}
        </div>

        {/* Back to all news — visible after reading related articles */}
        <div className="mt-10 flex justify-center border-t border-[rgba(13,59,102,0.07)] pt-8">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 rounded-full border border-[rgba(13,59,102,0.18)] bg-[var(--page-bg)] px-7 py-3 text-sm font-semibold text-[var(--brand-blue)] transition hover:border-[rgba(13,59,102,0.3)] hover:bg-white hover:shadow-md"
          >
            <ArrowRight className="h-4 w-4" />
            جميع الأخبار
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Not-found state ──────────────────────────────────────────────────────────

function ArticleNotFound() {
  return (
    <div
      dir="rtl"
      className="flex min-h-screen flex-col overflow-x-hidden bg-[var(--page-bg)] text-[var(--brand-ink)]"
    >
      <InnerPageHeader activePage="news" />
      <main className="flex flex-1 flex-col items-center justify-center px-4 pt-[4.5rem] text-center">
        <Newspaper className="mb-5 h-14 w-14 text-[var(--text-soft)]/30" />
        <h1 className="mb-2 text-2xl font-black text-[var(--brand-ink)]">
          المقال غير موجود
        </h1>
        <p className="mb-8 max-w-xs text-sm leading-7 text-[var(--text-soft)]">
          لم يُعثر على هذا المقال. ربما تم حذفه أو أن الرابط غير صحيح.
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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function NewsArticlePage() {
  const [, params] = useRoute("/news/:slug");
  const article = getArticleBySlug(params?.slug ?? "");

  if (!article) return <ArticleNotFound />;

  const hasAttachments = (article.attachments?.length ?? 0) > 0;
  const hasExternalLinks = (article.externalLinks?.length ?? 0) > 0;
  const hasSidebar = hasAttachments || hasExternalLinks;

  return (
    <div
      dir="rtl"
      className="flex min-h-screen flex-col overflow-x-hidden bg-[var(--page-bg)] text-[var(--brand-ink)]"
    >
      <InnerPageHeader activePage="news" />

      <main className="flex-1 pt-[4.5rem] md:pt-[5rem]">

        {/* ── Article header band ─────────────────────────────────── */}
        <div className="border-b border-[rgba(13,59,102,0.08)] bg-white">
          <div className="container mx-auto max-w-5xl px-4 py-8 md:py-10">

            {/* Breadcrumb + back link */}
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
                <span className="line-clamp-1 max-w-[160px] font-semibold text-[var(--brand-blue)] sm:max-w-xs">
                  {article.title}
                </span>
              </nav>

              {/* Prominent back link */}
              <Link
                href="/news"
                className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[rgba(13,59,102,0.15)] bg-[var(--page-bg)] px-4 py-2 text-xs font-semibold text-[var(--brand-blue)] transition hover:border-[rgba(13,59,102,0.3)] hover:bg-white"
              >
                <ArrowRight className="h-3.5 w-3.5" />
                كل الأخبار
              </Link>
            </div>

            {/* Meta row */}
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <CategoryBadge category={article.category} />
              <DateLine date={article.date} />
            </div>

            {/* Title */}
            <h1 className="text-balance text-2xl font-black leading-snug text-[var(--brand-ink)] md:text-[1.9rem] lg:text-4xl">
              {article.title}
            </h1>

            {/* Lead / summary */}
            <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--text-soft)] md:text-lg md:leading-9">
              {article.summary}
            </p>
          </div>
        </div>

        {/* ── Hero image ──────────────────────────────────────────── */}
        <div className="container mx-auto max-w-5xl px-4 pt-8 md:pt-10">
          <div className="overflow-hidden rounded-2xl shadow-[0_4px_28px_rgba(13,59,102,0.1)]">
            <div className="aspect-video w-full">
              <ArticleImage
                article={article}
                className="h-full w-full"
              />
            </div>
          </div>
        </div>

        {/* ── Body + sidebar ──────────────────────────────────────── */}
        <div className="container mx-auto max-w-5xl px-4 py-10 md:py-14">
          <div className={`flex gap-10 ${hasSidebar ? "flex-col lg:flex-row" : ""}`}>

            {/* Article body */}
            <article className="min-w-0 flex-1">
              <ArticleBody content={article.content} />

              {/* Back navigation */}
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
            </article>

            {/* Sidebar: attachments + external links */}
            {hasSidebar && (
              <aside className="flex w-full shrink-0 flex-col gap-5 lg:w-72 xl:w-80">
                {hasAttachments && (
                  <AttachmentsSection attachments={article.attachments!} />
                )}
                {hasExternalLinks && (
                  <ExternalLinksSection links={article.externalLinks!} />
                )}
              </aside>
            )}
          </div>
        </div>

        {/* ── Related articles ────────────────────────────────────── */}
        <RelatedSection current={article} />
      </main>

      <InnerPageFooter />
    </div>
  );
}
