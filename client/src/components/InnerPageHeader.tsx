import { useState } from "react";
import { Link, useRouter } from "wouter";
import { Menu, X, ExternalLink } from "lucide-react";

const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSc0XWW3H3j5poQf4fH5_gOz051nYu89ryXbJ0wflz16XUteow/viewform?usp=dialog";

interface InnerPageHeaderProps {
  /** The route key of the current page, used to highlight the active nav link. */
  activePage: "home" | "news" | "previousEdition";
}

const navLinks = [
  { href: "/", label: "الرئيسية", page: "home" as const },
  { href: "/news", label: "الأخبار", page: "news" as const },
  { href: "/previous-edition", label: "النسخة السابقة", page: "previousEdition" as const },
];

export function InnerPageHeader({ activePage }: InnerPageHeaderProps) {
  const { base } = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[60] w-full border-b border-[rgba(13,59,102,0.1)] bg-white/[0.93] shadow-[0_6px_28px_rgba(13,59,102,0.07)] backdrop-blur-md supports-[backdrop-filter]:bg-white/88">
        <div className="flex w-full items-center justify-between gap-2 px-2 py-2 sm:gap-3 sm:px-3 sm:py-2.5 md:gap-5 md:px-5 md:py-3.5 lg:px-6">

          {/* Logo — right side (RTL) */}
          <div className="flex shrink-0 items-center">
            <Link
              href="/"
              className="flex h-11 w-[min(168px,42vw)] max-w-[42vw] items-center justify-end rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-blue)]/35 sm:h-12 sm:w-[min(188px,40vw)] md:h-[3.35rem] md:w-[min(204px,38vw)]"
              aria-label="العودة إلى الرئيسية"
            >
              <img
                src={`${base}/logo_one.png`}
                alt="مدينة الملك عبدالله للطاقة الذرية والمتجددة"
                className="h-full w-full max-h-full object-contain object-right"
                width={200}
                height={56}
                decoding="async"
              />
            </Link>
          </div>

          {/* Center: nav + mobile toggle */}
          <div className="flex min-w-0 flex-1 items-center justify-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[rgba(13,59,102,0.1)] bg-white text-[var(--brand-blue)] transition hover:bg-[rgba(13,59,102,0.04)] sm:h-10 sm:w-10 xl:hidden"
              aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            <nav className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 xl:flex xl:px-1">
              {navLinks.map((link) => (
                <Link
                  key={link.page}
                  href={link.href}
                  className={`shrink-0 whitespace-nowrap rounded-full px-3 py-2 text-sm font-semibold transition duration-300 lg:px-4 lg:py-2.5 ${
                    activePage === link.page
                      ? "bg-[rgba(13,59,102,0.08)] text-[var(--brand-blue)]"
                      : "text-[var(--text-soft)] hover:bg-[rgba(13,59,102,0.05)] hover:text-[var(--brand-blue)]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Logo — left side (RTL) + register button */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <a
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,var(--brand-gold),var(--brand-orange))] px-4 py-2.5 text-xs font-bold text-white shadow-[0_16px_40px_rgba(239,153,45,0.28)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(239,153,45,0.38)] xl:inline-flex lg:px-5 lg:text-sm"
            >
              <ExternalLink className="h-4 w-4" />
              سجّل الآن
            </a>
            <Link
              href="/"
              className="flex size-[3.25rem] shrink-0 items-center justify-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-blue)]/35 sm:size-14 md:size-[3.75rem]"
              aria-label="جامعة المجمعة — الرئيسية"
            >
              <img
                src={`${base}/logo_two.png`}
                alt="جامعة المجمعة"
                className="h-full w-full object-contain"
                width={180}
                height={180}
                decoding="async"
              />
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile dropdown menu */}
      {open && (
        <div className="fixed inset-x-0 top-[3.65rem] z-50 max-h-[min(78vh,calc(100dvh-4.25rem))] overflow-y-auto border-y border-[rgba(13,59,102,0.08)] bg-white/97 px-3 py-4 shadow-[0_20px_60px_rgba(13,59,102,0.14)] backdrop-blur-xl sm:top-[4.15rem] md:top-[4.35rem] xl:hidden">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.page}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`rounded-2xl px-4 py-3 text-right text-sm font-semibold transition ${
                  activePage === link.page
                    ? "bg-[rgba(13,59,102,0.08)] text-[var(--brand-blue)]"
                    : "text-[var(--brand-ink)] hover:bg-[rgba(13,59,102,0.04)]"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,var(--brand-gold),var(--brand-orange))] px-6 py-3.5 text-sm font-bold text-white shadow-[0_16px_40px_rgba(239,153,45,0.28)]"
            >
              <ExternalLink className="h-4 w-4" />
              الانتقال إلى التسجيل
            </a>
          </div>
        </div>
      )}
    </>
  );
}
