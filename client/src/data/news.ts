/**
 * NEWS DATA SOURCE — معسكر الابتكار الرقمي والمفتوح 2026
 * =========================================================
 * This file is the single source of truth for all news content.
 * Pages read from this file only — no content is hardcoded in markup.
 *
 * ── HOW TO ADD A NEW ARTICLE ─────────────────────────────────────────────────
 *
 * Copy the block below, paste it at the TOP of the newsArticles array
 * (newest articles first), and fill in the fields:
 *
 *   {
 *     slug: "my-article-slug",          // URL: /news/my-article-slug
 *     title: "عنوان المقال",
 *     summary: "ملخص قصير — يظهر في بطاقة الخبر وأعلى صفحة المقال.",
 *     date: "2026-05-01",               // Shown in UI (ISO or Arabic)
 *     dateISO: "2026-05-01",            // YYYY-MM-DD — sorting only (required)
 *     category: "إعلانات",             // see CATEGORIES below
 *     coverImage: "/images/photo.jpg",  // OPTIONAL — omit to use the category gradient
 *     content: [                        // one string per paragraph
 *       "الفقرة الأولى.",
 *       "الفقرة الثانية مع **نص عريض** داخلها.",
 *     ],
 *     attachments: [                    // OPTIONAL
 *       { label: "اسم الملف", url: "/files/doc.pdf", type: "pdf" },
 *     ],
 *     externalLinks: [                  // OPTIONAL
 *       { label: "رابط على منصة X", url: "https://x.com/...", type: "tweet" },
 *       { label: "رابط موقع",        url: "https://...",      type: "website" },
 *     ],
 *   },
 *
 * ── FEATURED ARTICLE ─────────────────────────────────────────────────────────
 *   The article with the latest `dateISO` is featured automatically.
 *   Use getAllNews() — first item is featured; there is no featured flag in data.
 *
 * ── CATEGORIES ───────────────────────────────────────────────────────────────
 *   "إعلانات"  |  "فعاليات"  |  "ورش عمل"  |  "شراكات"  |  "مسارات"
 *   Adding a new category? Also add it to CATEGORY_META in NewsShared.tsx.
 *
 * ── ATTACHMENT TYPES ─────────────────────────────────────────────────────────
 *   "pdf"  |  "doc"  |  "link"
 *
 * ── EXTERNAL LINK TYPES ──────────────────────────────────────────────────────
 *   "tweet"  |  "website"  |  "video"
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export interface NewsAttachment {
  label: string;
  url: string;
  type: "pdf" | "doc" | "link";
}

export interface NewsExternalLink {
  label: string;
  url: string;
  type: "tweet" | "website" | "video";
}

export interface NewsArticle {
  /** URL slug — must be unique across all articles. */
  slug: string;
  title: string;
  /** Short teaser shown on listing cards and at the top of the detail page. */
  summary: string;
  /** Shown in the UI (`DateLine`). May be Arabic text if you keep `dateISO` for machine sorting. */
  date: string;
  /** ISO "YYYY-MM-DD" — used for sorting only (newest first via getAllNews). */
  dateISO: string;
  /** Must match a key in CATEGORY_META (NewsShared.tsx) for correct icon and colour. */
  category: string;
  /**
   * Article body. Each string in the array is one paragraph.
   * Inline bold: wrap text in **double asterisks**.
   */
  content: string[];
  /** Relative path or absolute URL to a cover image. Omit to show the category gradient. */
  coverImage?: string;
  attachments?: NewsAttachment[];
  externalLinks?: NewsExternalLink[];
}

// ─── Articles ─────────────────────────────────────────────────────────────────
// Keep newest articles at the top of this array for easier maintenance.

export const newsArticles: NewsArticle[] = [
  // ── 3 ── الورشة الأولى: مسار الطاقة الذكية والاستدامة ─────────────────────
  {
    slug: "alwarsha-aloula-altaqa-aldhakiyya",
    title: "الورشة الأولى: مسار الطاقة الذكية والاستدامة",
    summary:
      "نفّذ المعسكر ورشته الأولى لفرق مسار الطاقة الذكية والاستدامة، واستعرض خلالها مختصّون من مدينة K·A·CARE التحديات التشغيلية في قطاع الطاقة المتجددة وفرص الحلول الرقمية في رفع كفاءة الشبكة وخفض الانبعاثات.",
    date: "2026-04-21",
    dateISO: "2026-04-21",
    category: "ورش عمل",
    content: [
      "نفّذ معسكر الابتكار الرقمي والمفتوح 2026 ورشته الأولى يوم الثلاثاء الموافق الحادي والعشرين من أبريل 2026، وكانت مخصصة لفرق مسار الطاقة الذكية والاستدامة بوصفه أحد المسارات الرئيسية التي يتنافس فيها المشاركون خلال المعسكر.",
      "قدّم الورشةَ مختصّان من مدينة الملك عبدالله للطاقة الذرية والمتجددة، واستعرضا منظومة تحديات قطاع الطاقة المتجددة في السياق التشغيلي للمدينة، شاملةً فرص توظيف الحلول البرمجية في رفع كفاءة الشبكة، وخفض معدلات الانبعاثات، وتحسين إدارة عمليات المنشآت.",
      "تنظيمياً، انقسمت الورشة إلى شقّين: **الأول نظري** تناول الأطر التقنية المعتمدة في قياس الأثر البيئي ومعايير إعداد تقارير الاستدامة، و**الثاني تطبيقي** أجرت فيه الفرق تحليلاً أولياً لسيناريوهات مستمدة من بيانات تشغيلية فعلية قدّمتها المدينة.",
      "انتهت الورشة بتحديد الفرق لمحاور الحلول المقترحة وفق منهجية واضحة تشمل: تعريف المشكلة، ومؤشرات الأثر القابلة للقياس، وعناصر النموذج الأولي التي ستُقدَّم في العرض المرحلي الأول.",
    ],
    attachments: [
      {
        label: "مواد الورشة الأولى (PDF)",
        url: "#",
        type: "pdf",
      },
    ],
    externalLinks: [
      {
        label: "تغطية الورشة على منصة X",
        url: "#",
        type: "tweet",
      },
    ],
  },

  // ── 2 ── اللقاء التعريفي ───────────────────────────────────────────────────
  {
    slug: "alliqa-altaarifi-2026",
    title: "انعقاد اللقاء التعريفي للفرق المشاركة في المعسكر",
    summary:
      "عُقد اللقاء التعريفي للفرق المشاركة في اليوم الأول من المعسكر، وشمل شرح هيكل البرنامج ومسارات التطوير وآليات التقييم، وأُتيحت فيه فرصة التعارف المباشر بين المشاركين والموجهين التقنيين.",
    date: "2026-04-20",
    dateISO: "2026-04-20",
    category: "فعاليات",
    content: [
      "أُقيم اللقاء التعريفي للفرق المشاركة في معسكر الابتكار الرقمي والمفتوح 2026 خلال اليوم الأول من انطلاق الفعاليات، وضم ممثلي جميع الفرق إلى جانب فريق التنظيم والموجهين التقنيين من جامعة المجمعة ومدينة الملك عبدالله للطاقة الذرية والمتجددة.",
      "قُدِّم خلال اللقاء استعراض شامل لهيكل المعسكر، يتضمن الجدول الزمني لورش العمل، والنقاط المرحلية للتسليم، ومعايير تقييم المشاريع أمام لجنة التحكيم النهائية. كما أُوضحت طبيعة التحديات المتاحة ضمن كل مسار من المسارات الأربعة.",
      "تضمّن اللقاء كذلك جلسةً تعريفيةً بالموارد والأدوات التقنية المتاحة للفرق طوال فترة المعسكر، تشمل منصات التطوير والبيانات المفتوحة والمراجع التقنية التي أعدّها المنظمون دعماً لعمل الفرق.",
      "في ختام اللقاء، أُتيح للمشاركين التفاعل المباشر مع الموجهين لطرح الأسئلة والاستيضاح، في مستهل تجربة تعاونية تمتد ثلاثة أسابيع.",
    ],
    attachments: [
      {
        label: "دليل المشارك",
        url: "#",
        type: "pdf",
      },
      {
        label: "معايير التقييم",
        url: "#",
        type: "pdf",
      },
    ],
  },

  // ── 1 ── إطلاق المعسكر ────────────────────────────────────────────────────
  {
    slug: "itlaq-almaasar-2026",
    title: "انطلاق معسكر الابتكار الرقمي والمفتوح في نسخته الثانية",
    summary:
      "أطلقت جامعة المجمعة ومدينة الملك عبدالله للطاقة الذرية والمتجددة فعاليات معسكر الابتكار الرقمي والمفتوح 2026، بمشاركة كوادر وطنية تتنافس على تطوير حلول رقمية لتحديات حقيقية في قطاعات الطاقة والاستدامة والتحول الرقمي.",
    date: "2026-04-20",
    dateISO: "2026-04-20",
    category: "إعلانات",
    content: [
      "انطلقت رسمياً فعاليات معسكر الابتكار الرقمي والمفتوح 2026 يوم الاثنين الموافق العشرين من أبريل 2026 في حرم جامعة المجمعة بمحافظة المجمعة، بحضور عدد من مسؤولي الجامعة وممثلين عن مدينة الملك عبدالله للطاقة الذرية والمتجددة (K·A·CARE)، ونخبة من الكوادر الوطنية المشاركة.",
      "يندرج المعسكر في إطار الشراكة الاستراتيجية بين المؤسستين، ويهدف إلى تمكين المنسوبين من بناء حلول رقمية قابلة للتطبيق تعالج تحديات فعلية في مجالات الطاقة المتجددة، والخدمات المؤسسية، والاستدامة البيئية، بما ينسجم مع أهداف التحول الرقمي الوطني ضمن رؤية المملكة 2030.",
      "تتوزع الفرق المشاركة على أربعة مسارات تقنية متخصصة: **الطاقة الذكية والاستدامة**، و**الذكاء الاصطناعي وتحليل البيانات**، و**إنترنت الأشياء وتقنيات الرصد**، و**تحسين العمليات الرقمية**. وتعمل كل فرقة تحت إشراف موجّه تقني مختص طوال مدة المعسكر.",
      "تمتد فعاليات المعسكر على مدى ثلاثة أسابيع، تتضمن ورش عمل تقنية ومتخصصة، وجلسات إرشاد فردية، وعروضاً مرحلية أمام المنظمين، وتُختتم بعروض المشاريع النهائية وحفل توزيع الجوائز في الثالث عشر من مايو 2026.",
    ],
    attachments: [
      {
        label: "البيان الصحفي الرسمي (PDF)",
        url: "#",
        type: "pdf",
      },
    ],
    externalLinks: [
      {
        label: "إعلان الانطلاق على منصة X",
        url: "#",
        type: "tweet",
      },
    ],
  },
];

// ─── Query functions ──────────────────────────────────────────────────────────
// All data access in pages goes through these functions.
// To migrate to an API, replace the implementations here without touching pages.

/** Sort key: ISO string for reliable ordering. */
function newsSortISO(a: NewsArticle): string {
  return a.dateISO;
}

function compareNewsNewestFirst(a: NewsArticle, b: NewsArticle): number {
  return new Date(newsSortISO(b)).getTime() - new Date(newsSortISO(a)).getTime();
}

/**
 * All articles sorted newest → oldest by `dateISO`.
 * Returns a new array; does not mutate `newsArticles`.
 */
export function getAllNews(): NewsArticle[] {
  return [...newsArticles].sort(compareNewsNewestFirst);
}

function byDateDesc(articles: NewsArticle[]): NewsArticle[] {
  return [...articles].sort(compareNewsNewestFirst);
}

/**
 * The featured article is always the latest-dated item (first entry from getAllNews).
 */
export function getFeaturedArticle(): NewsArticle | undefined {
  const sorted = getAllNews();
  return sorted[0];
}

/**
 * All articles except the featured one, same newest-first order as getAllNews.
 * Populates the news grid below the featured card on /news.
 */
export function getGridArticles(): NewsArticle[] {
  const [, ...rest] = getAllNews();
  return rest;
}

/**
 * Looks up a single article by slug.
 * Returns undefined if the slug is not found.
 */
export function getArticleBySlug(slug: string): NewsArticle | undefined {
  return newsArticles.find((a) => a.slug === slug);
}

/**
 * Returns related articles for a given article.
 * Same-category articles first, then most-recent others.
 * The current article is always excluded. Maximum `limit` results.
 */
export function getRelatedArticles(current: NewsArticle, limit = 3): NewsArticle[] {
  const others = newsArticles.filter((a) => a.slug !== current.slug);
  const sameCategory = others.filter((a) => a.category === current.category);
  const rest = byDateDesc(others.filter((a) => a.category !== current.category));
  return [...sameCategory, ...rest].slice(0, limit);
}
