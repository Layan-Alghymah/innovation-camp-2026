import { useEffect, useId, useState } from "react";
import { Link, useRouter } from "wouter";
import { ChevronLeft, Home, RotateCcw, Sparkles, Trophy, Users } from "lucide-react";
import { InnerPageHeader } from "../components/InnerPageHeader";
import { InnerPageFooter } from "../components/InnerPageFooter";
import {
  getPreviousEditionGallery,
  getPreviousEditionWinners,
  type SupabaseGalleryImage,
  type SupabaseWinner,
} from "../services/previousEditionService";

// ─── Static fallback data ────────────────────────────────────────────────────

const STATIC_WINNERS = [
  {
    rank_label: "المركز الأول",
    project_name: "Face Smart Check",
    team_names: "فاطمة بارزيق، رهف العنزي\nإشراف د. هاجر المجاهد",
    description:
      "نظام ذكي للتحقق من الهوية وتسجيل الحضور باستخدام تقنيات التعرف على الوجه، كبديل للأنظمة التقليدية مثل البطاقات وبصمة الإصبع، بهدف تحسين الأمان وسرعة ودقة إدارة الحضور.",
    rank: 1,
    medal_type: "gold" as const,
    image_url: undefined as string | undefined,
    is_published: true,
    id: "static-1",
  },
  {
    rank_label: "المركز الثاني",
    project_name: "SolarAI-Lifespan",
    team_names: "سارة الجندول، أرام الدريويش\nإشراف د. هاجر المجاهد",
    description:
      "نظام ذكي يستخدم الذكاء الاصطناعي لتحليل بيانات الأداء اللحظي للألواح الشمسية والبطاريات بهدف التنبؤ بالعمر المتبقي لها، مما يدعم الصيانة الاستباقية ويقلل الأعطال غير المتوقعة.",
    rank: 2,
    medal_type: "silver" as const,
    image_url: undefined as string | undefined,
    is_published: true,
    id: "static-2",
  },
  {
    rank_label: "المركز الثالث",
    project_name: "EnergyTwin",
    team_names: "نادر عايد خلف الحربي",
    description:
      "نظام توأم رقمي ذكي لعرض أداء محطات الطاقة المتجددة لحظيًا باستخدام الذكاء الاصطناعي، لتحسين الكفاءة وتقليل التكاليف التشغيلية ودعم المراقبة الذكية.",
    rank: 3,
    medal_type: "bronze" as const,
    image_url: undefined as string | undefined,
    is_published: true,
    id: "static-3",
  },
];

const STATS = [
  { value: "200+", label: "مستفيد" },
  { value: "70+", label: "مبتكر" },
  { value: "20+", label: "مشروع مبتكر" },
] as const;

// ─── Components ───────────────────────────────────────────────────────────────

function GalleryItem({ label, src }: { label: string; src: string }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-[rgba(13,59,102,0.1)] bg-[var(--page-bg)] shadow-sm">
      {!failed && (
        <img
          src={src}
          alt=""
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          onError={() => setFailed(true)}
        />
      )}
      {failed && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-gradient-to-br from-[#0d3b66] to-[#1f5a96] p-3 text-center">
          <span className="text-xs font-bold text-white/60">صورة تنتظر الإضافة</span>
          <span className="text-sm font-bold text-white md:text-base">{label}</span>
        </div>
      )}
    </div>
  );
}

function HeroCeremonyImage({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className="flex aspect-[4/3] w-full items-center justify-center rounded-2xl border border-[rgba(13,59,102,0.1)] bg-gradient-to-br from-[#0d3b66] to-[#1f5a96] text-center shadow-[0_12px_40px_rgba(13,59,102,0.12)] md:aspect-[5/4] md:min-h-[280px]"
        role="img"
        aria-label={alt}
      >
        <div className="px-4">
          <Trophy className="mx-auto mb-2 h-10 w-10 text-[var(--brand-gold)]/80" aria-hidden />
          <p className="text-sm font-semibold text-white/90">صورة حفل التكريم</p>
          <p className="mt-1 text-xs text-white/55">أضف الملف في المسار المحدد للمعرض</p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-[rgba(13,59,102,0.1)] shadow-[0_12px_40px_rgba(13,59,102,0.12)]">
      <img
        src={src}
        alt={alt}
        className="aspect-[4/3] h-full w-full object-cover md:aspect-[5/4] md:min-h-[280px]"
        onError={() => setFailed(true)}
      />
    </div>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border border-[rgba(13,59,102,0.1)] bg-white px-6 py-8 text-center shadow-[0_4px_20px_rgba(13,59,102,0.06)]">
      <p className="text-3xl font-black text-[var(--brand-blue)] md:text-4xl lg:text-5xl">{value}</p>
      <p className="mt-2 text-sm font-semibold text-[var(--text-soft)] md:text-base">{label}</p>
    </div>
  );
}

function WinnerFlipCard({
  winner,
  place,
  coverSrc,
  medalSrc,
  featured,
}: {
  winner: SupabaseWinner;
  place: 1 | 2 | 3;
  coverSrc: string;
  medalSrc: string;
  featured?: boolean;
}) {
  const [flipped, setFlipped] = useState(false);
  const [coverOk, setCoverOk] = useState(true);
  const headingId = useId();

  const glowWrap = featured
    ? "rounded-[1.2rem] bg-[linear-gradient(135deg,rgba(239,153,45,0.35),rgba(242,168,72,0.22))] p-[3px] shadow-[0_0_44px_rgba(255,200,0,0.2),0_16px_48px_rgba(239,153,45,0.18)]"
    : "";

  const innerRadius = featured ? "rounded-[1.05rem]" : "rounded-2xl";

  return (
    <div className={`mx-auto w-full max-w-md [perspective:1000px] ${glowWrap}`}>
      <div className={`h-[30rem] w-full sm:h-[32rem] ${featured ? innerRadius : ""}`}>
        <button
          type="button"
          aria-labelledby={headingId}
          aria-pressed={flipped}
          aria-label={flipped ? "إظهار وجه البطاقة" : "عرض وصف فكرة المشروع"}
          onClick={() => setFlipped((f) => !f)}
          className={`relative h-full w-full cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-blue)]/40 focus-visible:ring-offset-2 ${!featured ? innerRadius : ""}`}
        >
          <div
            className={`relative h-full w-full [transform-style:preserve-3d] transition-transform duration-700 [will-change:transform] ease-in-out ${!featured ? innerRadius : ""}`}
            style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
          >
            {/* الوجه الأمامي */}
            <div
              className={`absolute inset-0 flex h-full w-full flex-col [backface-visibility:hidden] border border-[rgba(13,59,102,0.1)] bg-gradient-to-br from-white to-[#e8f0f9] px-5 pb-4 pt-6 shadow-[0_8px_32px_rgba(13,59,102,0.08)] sm:px-6 sm:pb-5 sm:pt-7 ${innerRadius}`}
              style={{ WebkitBackfaceVisibility: "hidden" }}
            >
              <div className="flex flex-1 flex-col items-center text-center">
                {/* ── Medal image ─────────────────────────────── */}
                <img
                  src={medalSrc}
                  alt={winner.rank_label}
                  className="mx-auto mt-1 h-16 w-16 object-contain drop-shadow-md sm:h-20 sm:w-20"
                />
                {/* ─────────────────────────────────────────── */}

                <h3 id={headingId} className="mt-4 text-lg font-black leading-snug text-[var(--brand-ink)] sm:text-xl">
                  {winner.project_name}
                </h3>
                <p className="mt-1 text-[11px] font-semibold text-[var(--text-soft)]">{winner.rank_label}</p>

                <div className="mt-4 w-full border-t border-[rgba(13,59,102,0.08)] pt-4">
                  <p className="mx-auto max-w-xs whitespace-pre-line text-center text-xs leading-7 text-[var(--brand-ink)] sm:text-sm">
                    {winner.team_names}
                  </p>
                </div>

                <div className="mt-3 w-full">
                  <div className="relative mx-auto w-full overflow-hidden rounded-xl border border-[rgba(13,59,102,0.12)] bg-[#f0f6fc]">
                    <div className="h-32 w-full sm:h-36">
                      {coverOk && coverSrc ? (
                        <img
                          src={coverSrc}
                          alt=""
                          className="h-full w-full object-contain"
                          onError={() => setCoverOk(false)}
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#0d3b66]/10 to-[#1f5a96]/10">
                          <span className="text-xs font-bold text-[var(--text-soft)]">صورة المشروع</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-auto flex justify-center pt-4">
                  <RotateCcw className="h-4 w-4 text-[var(--brand-blue)]/55" aria-hidden />
                </div>
              </div>
            </div>

            {/* الوجه الخلفي */}
            <div
              className={`absolute inset-0 flex h-full w-full flex-col [backface-visibility:hidden] border border-[rgba(13,59,102,0.12)] bg-gradient-to-br from-[#0d3b66] to-[#1f5a96] px-5 pb-4 pt-6 text-white shadow-[0_8px_32px_rgba(13,59,102,0.2)] sm:px-6 sm:pb-5 sm:pt-7 [transform:rotateY(180deg)] ${innerRadius}`}
              style={{ WebkitBackfaceVisibility: "hidden" }}
            >
              <p className="text-center text-sm font-bold text-amber-200/95">فكرة المشروع</p>
              <p className="mt-4 flex-1 overflow-y-auto text-center text-sm leading-8 [direction:rtl]">
                {winner.description}
              </p>
              <div className="mt-3 flex justify-center border-t border-white/15 pt-3">
                <RotateCcw className="h-4 w-4 text-white/55" aria-hidden />
              </div>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}

function SectionTitle({ children }: { children: string }) {
  return (
    <div className="mb-8 flex items-center gap-3">
      <span className="h-6 w-1 shrink-0 rounded-full bg-[var(--brand-gold)]" aria-hidden />
      <h2 className="text-xl font-bold text-[var(--brand-ink)] md:text-2xl">{children}</h2>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PreviousEditionPage() {
  const { base } = useRouter();
  const heroCeremonySrc = `${base}gallery-2025/التكريم.jpg`;

  const [winners, setWinners] = useState<SupabaseWinner[]>(STATIC_WINNERS);
  const [gallery, setGallery] = useState<SupabaseGalleryImage[]>([]);
  const [useStaticGallery, setUseStaticGallery] = useState(true);

  useEffect(() => {
    document.title = "النسخة السابقة | هاكثون الابتكار الرقمي والمفتوح 2025";
  }, []);

  useEffect(() => {
    getPreviousEditionWinners()
      .then((data) => {
        if (data.length > 0) setWinners(data);
      })
      .catch(() => {});

    getPreviousEditionGallery()
      .then((data) => {
        if (data.length > 0) {
          setGallery(data);
          setUseStaticGallery(false);
        }
      })
      .catch(() => {});
  }, []);

  const staticGalleryItems = [
    { id: "award", label: "التكريم", src: `${base}gallery-2025/التكريم.jpg` },
    { id: "expo-01", label: "عرض المشاريع", src: `${base}gallery-2025/عرض المشاريع1.jpg` },
    { id: "expo-02", label: "عرض المشاريع", src: `${base}gallery-2025/عرض المشاريع2.jpg` },
    { id: "expo-03", label: "عرض المشاريع", src: `${base}gallery-2025/عرض المشاريع3.jpg` },
    { id: "expo-04", label: "عرض المشاريع", src: `${base}gallery-2025/عرض المشاريع4.jpg` },
  ];

  // Determine winner cover src (Supabase image_url or static fallback)
  function getWinnerCover(winner: SupabaseWinner, fallbackBase: string): string {
    if (winner.image_url) return winner.image_url;
    const map: Record<number, string> = {
      1: `${fallbackBase}gallery-2025/winner1.jpg`,
      2: `${fallbackBase}gallery-2025/winner2.jpg`,
      3: `${fallbackBase}gallery-2025/winner3.jpg`,
    };
    return map[winner.rank] ?? "";
  }

  // Sort winners by rank and take top 3
  const sortedWinners = [...winners].sort((a, b) => a.rank - b.rank).slice(0, 3);
  const winner1 = sortedWinners.find((w) => w.rank === 1) ?? sortedWinners[0];
  const winner2 = sortedWinners.find((w) => w.rank === 2) ?? sortedWinners[1];
  const winner3 = sortedWinners.find((w) => w.rank === 3) ?? sortedWinners[2];

  return (
    <div
      dir="rtl"
      className="flex min-h-screen flex-col overflow-x-hidden bg-[var(--page-bg)] text-[var(--brand-ink)]"
    >
      <InnerPageHeader activePage="previousEdition" />

      <main className="flex-1 pt-[4.5rem] md:pt-[5rem]">
        <section className="border-b border-[rgba(13,59,102,0.08)] bg-gradient-to-b from-white to-[#f0f6fc]">
          <div className="container mx-auto px-4 py-10 md:py-14">
            <nav
              className="mb-6 flex flex-wrap items-center gap-2 text-sm text-[var(--text-soft)]"
              aria-label="مسار التنقل"
            >
              <Link href="/" className="inline-flex items-center gap-1 transition hover:text-[var(--brand-blue)]">
                <Home className="h-4 w-4" />
                الرئيسية
              </Link>
              <ChevronLeft className="h-3.5 w-3.5" aria-hidden />
              <span className="font-semibold text-[var(--brand-blue)]">النسخة السابقة</span>
            </nav>

            <div className="flex flex-col-reverse items-stretch gap-8 md:flex-row md:items-center md:gap-10 lg:gap-14">
              <div className="min-w-0 flex-1 text-right">
                <p className="text-sm font-bold text-[var(--brand-gold)]">النسخة السابقة</p>
                <h1 className="mt-1 text-3xl font-black leading-tight text-[var(--brand-ink)] md:text-4xl lg:text-[2.75rem] lg:leading-tight">
                  هاكثون الابتكار الرقمي والمفتوح 2025
                </h1>
                <p className="mt-6 max-w-2xl text-pretty text-base leading-9 text-[var(--text-soft)] md:ml-0 md:text-lg md:leading-9">
                  مثّلت النسخة السابقة من هاكثون الابتكار الرقمي والمفتوح بيئة ابتكارية محفزة لتطوير حلول رقمية متقدمة، ركزت
                  على توظيف التقنيات الحديثة مثل الذكاء الاصطناعي، وإنترنت الأشياء، وتحليل البيانات، بهدف دعم التحول الرقمي
                  وتحسين الخدمات وتطوير حلول قابلة للتطبيق.
                </p>
                <div className="mt-8 flex flex-wrap justify-end gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[rgba(13,59,102,0.07)] px-3 py-1.5 text-xs font-semibold text-[var(--brand-ink)]">
                    <Trophy className="h-3.5 w-3.5 text-[var(--brand-gold)]" aria-hidden />
                    الفرق المشاركة
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[rgba(13,59,102,0.07)] px-3 py-1.5 text-xs font-semibold text-[var(--brand-ink)]">
                    <Users className="h-3.5 w-3.5 text-[var(--brand-blue)]" aria-hidden />
                    2025
                  </span>
                </div>
              </div>

              <div className="w-full shrink-0 md:w-[min(44%,420px)] lg:w-[min(40%,440px)]">
                <HeroCeremonyImage src={heroCeremonySrc} alt="حفل تكريم الفائزين — هاكثون 2025" />
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12 md:py-16" aria-label="مؤشرات التأثير">
          <SectionTitle>مؤشرات أثر النسخة 2025</SectionTitle>
          <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
            {STATS.map((s) => (
              <StatCard key={s.label} value={s.value} label={s.label} />
            ))}
          </div>
        </section>

        <section className="border-y border-[rgba(13,59,102,0.08)] bg-white py-12 md:py-16" aria-label="الفائزون">
          <div className="container mx-auto px-4">
            <div className="mb-10 text-center">
              <Sparkles className="mx-auto mb-3 h-8 w-8 text-[var(--brand-gold)]" aria-hidden />
              <h2 className="text-2xl font-black text-[var(--brand-ink)] md:text-3xl">الفائزون</h2>
              <p className="mt-2 text-sm text-[var(--text-soft)]">استخدم البطاقة لقراءة وصف الفكرة</p>
            </div>

            <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-6 lg:gap-8">
              {winner2 && (
                <div className="order-2 md:order-none md:col-start-1">
                  <WinnerFlipCard
                    winner={winner2}
                    place={2}
                    coverSrc={getWinnerCover(winner2, base)}
                    medalSrc={`${base}gallery-2025/second-prize.png`}
                  />
                </div>
              )}
              {winner1 && (
                <div className="order-1 md:order-none md:col-start-2">
                  <WinnerFlipCard
                    winner={winner1}
                    place={1}
                    coverSrc={getWinnerCover(winner1, base)}
                    medalSrc={`${base}gallery-2025/winner.png`}
                    featured
                  />
                </div>
              )}
              {winner3 && (
                <div className="order-3 md:order-none md:col-start-3">
                  <WinnerFlipCard
                    winner={winner3}
                    place={3}
                    coverSrc={getWinnerCover(winner3, base)}
                    medalSrc={`${base}gallery-2025/medal.png`}
                  />
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12 md:py-16" aria-label="المعرض المصور">
          <SectionTitle>لقطات من المعرض وحفل التكريم</SectionTitle>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {useStaticGallery
              ? staticGalleryItems.map((g) => <GalleryItem key={g.id} label={g.label} src={g.src} />)
              : gallery.map((g) => <GalleryItem key={g.id} label={g.title} src={g.image_url} />)}
          </div>
        </section>

        <section className="border-t border-[rgba(13,59,102,0.1)] bg-[#f0f6fc] py-10">
          <div className="container mx-auto flex flex-col items-center gap-3 px-4 text-center sm:flex-row sm:justify-center">
            <Link
              href="/"
              className="inline-flex w-full max-w-xs items-center justify-center gap-2 rounded-full border border-[rgba(13,59,102,0.18)] bg-white px-6 py-3 text-sm font-bold text-[var(--brand-blue)] shadow-sm transition hover:shadow-md sm:w-auto"
            >
              <Home className="h-4 w-4" />
              العودة للصفحة الرئيسية
            </Link>
            <Link
              href="/news"
              className="inline-flex w-full max-w-xs items-center justify-center gap-2 rounded-full bg-[var(--brand-blue)] px-6 py-3 text-sm font-bold text-white transition hover:bg-[var(--brand-blue-2)] sm:w-auto"
            >
              الأخبار
            </Link>
          </div>
        </section>
      </main>

      <InnerPageFooter />
    </div>
  );
}
