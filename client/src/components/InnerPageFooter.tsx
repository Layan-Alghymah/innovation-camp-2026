import { Link, useRouter } from "wouter";
import { MessageCircle } from "lucide-react";

const WHATSAPP_GROUP_URL =
  "https://chat.whatsapp.com/Gc4UdZvKfO3GcY7TXGUelN?mode=gi_t";

/**
 * Footer for inner pages (News, etc.).
 * Section links navigate back to Home at the correct anchor using a full path.
 * Route links (e.g. /news) use Wouter <Link> for client-side navigation.
 */
export function InnerPageFooter() {
  const { base } = useRouter();

  return (
    <footer
      id="footer"
      className="mt-auto border-t border-[rgba(13,59,102,0.12)] bg-[linear-gradient(180deg,#f0f6fc_0%,#e4edf6_100%)] py-12 text-[var(--brand-ink)]"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h2 className="mb-3 text-xl font-bold text-[var(--brand-blue)]">
              معسكر الابتكار الرقمي والمفتوح 2026
            </h2>
            <p className="text-sm leading-relaxed text-[var(--text-soft)]">
              بالتعاون بين جامعة المجمعة ومدينة الملك عبدالله للطاقة الذرية والمتجددة (K·A·CARE)
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-base font-bold text-[var(--brand-blue)]">روابط سريعة</h3>
            <ul className="space-y-2 text-sm text-[var(--text-soft)]">
              <li>
                <a
                  href={`${base}/#about`}
                  className="transition hover:text-[var(--brand-ink)]"
                >
                  عن المعسكر
                </a>
              </li>
              <li>
                <a
                  href={`${base}/#tracks`}
                  className="transition hover:text-[var(--brand-ink)]"
                >
                  المسارات
                </a>
              </li>
              <li>
                <a
                  href={`${base}/#timeline`}
                  className="transition hover:text-[var(--brand-ink)]"
                >
                  الجدول الزمني
                </a>
              </li>
              <li>
                <a
                  href={`${base}/#faq`}
                  className="transition hover:text-[var(--brand-ink)]"
                >
                  الأسئلة الشائعة
                </a>
              </li>
              <li>
                <Link
                  href="/news"
                  className="transition hover:text-[var(--brand-ink)]"
                >
                  الأخبار
                </Link>
              </li>
              <li>
                <Link
                  href="/previous-edition"
                  className="transition hover:text-[var(--brand-ink)]"
                >
                  النسخة السابقة
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-base font-bold text-[var(--brand-blue)]">تواصل معنا</h3>
            <a
              href={WHATSAPP_GROUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand-blue)] transition hover:text-[var(--brand-ink)]"
            >
              <MessageCircle className="h-4 w-4 shrink-0" />
              قروب الاستفسارات
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-[rgba(13,59,102,0.1)] pt-6 text-center text-sm text-[var(--text-soft)]">
          © 2026 معسكر الابتكار الرقمي والمفتوح — جميع الحقوق محفوظة
        </div>
      </div>
    </footer>
  );
}
