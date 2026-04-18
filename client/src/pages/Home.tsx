import { MouseEvent, useEffect, useMemo, useState } from "react";
import {
  ArrowUpLeft,
  BrainCircuit,
  ChevronDown,
  Clock3,
  Cpu,
  ExternalLink,
  Lightbulb,
  Menu,
  MessageCircle,
  Rocket,
  ShieldCheck,
  Sparkles,
  Waves,
  X,
  Zap,
} from "lucide-react";

/**
 * Design Philosophy: الضوء المؤسسي المتقدّم
 * This file enforces a premium Arabic RTL landing experience with luminous institutional futurism,
 * strong whitespace, elegant motion, dark-blue structural accents, warm gold highlights,
 * and calm interactive depth. Every section should reinforce clarity, credibility, and momentum.
 */

const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSc0XWW3H3j5poQf4fH5_gOz051nYu89ryXbJ0wflz16XUteow/viewform?usp=dialog";
const WHATSAPP_GROUP_URL =
  "https://chat.whatsapp.com/Gc4UdZvKfO3GcY7TXGUelN?mode=gi_t";

const HERO_IMAGE =
  "https://d2xsxph8kpxj0f.cloudfront.net/90499605/Eia45aG6sfMH4DLpNoeybB/innovation-camp-hero-reference-PogrRCtbqXrz9p9Y4yaY7y.webp";
const ABOUT_IMAGE =
  "https://d2xsxph8kpxj0f.cloudfront.net/90499605/Eia45aG6sfMH4DLpNoeybB/innovation-camp-about-visual-VrMf9t6tFpXt4bv93ya99F.webp";
const TRACKS_IMAGE =
  "https://d2xsxph8kpxj0f.cloudfront.net/90499605/Eia45aG6sfMH4DLpNoeybB/innovation-camp-tracks-visual-6vSs76tNfepErhzjDXiZK8.webp";
const CTA_IMAGE =
  "https://d2xsxph8kpxj0f.cloudfront.net/90499605/Eia45aG6sfMH4DLpNoeybB/innovation-camp-cta-visual-Vzo4YNiRNFXfcswQ7owXRp.webp";

const navItems = [
  { id: "hero", label: "الرئيسية" },
  { id: "about", label: "عن المعسكر" },
  { id: "objectives", label: "الأهداف" },
  { id: "activities", label: "الأنشطة" },
  { id: "tracks", label: "المسارات" },
  { id: "timeline", label: "الجدول الزمني" },
  { id: "requirements", label: "شروط المشاركة" },
  { id: "criteria", label: "معايير التقييم" },
  { id: "faq", label: "الأسئلة الشائعة" },
];

const objectives = [
  {
    title: "تحفيز الابتكار الرقمي",
    body: "تمكين المشاركين من تطوير حلول تقنية متقدمة تعزز كفاءة الخدمات وتحسن العمليات التشغيلية في بيئات العمل الحديثة.",
    icon: Lightbulb,
  },
  {
    title: "تعزيز مفاهيم الاستدامة",
    body: "توظيف التقنيات الحديثة لدعم حلول مبتكرة تنعكس على الأبعاد البيئية والاجتماعية والاقتصادية بصورة عملية قابلة للقياس.",
    icon: Waves,
  },
  {
    title: "تمكين الكفاءات الوطنية",
    body: "تنمية مهارات الابتكار وريادة الأعمال الرقمية من خلال ورش عمل متخصصة وتحديات تطبيقية تعزز الجاهزية التنفيذية.",
    icon: Rocket,
  },
  {
    title: "تحقيق التكامل المعرفي",
    body: "تعزيز التعاون البحثي والتقني بين الجهات ذات العلاقة لإيجاد حلول رقمية نوعية تدعم التحول الرقمي المؤسسي.",
    icon: BrainCircuit,
  },
  {
    title: "تحسين تجربة المستفيدين",
    body: "تطوير خدمات وتطبيقات ذكية ترفع مستوى الجودة وسهولة الوصول وتحقق تجربة استخدام أكثر كفاءة ووضوحًا.",
    icon: Sparkles,
  },
  {
    title: "بناء منظومة ابتكار مستدامة",
    body: "دعم تحويل الأفكار إلى مشاريع قابلة للتنفيذ داخل بيئة مؤسسية مستمرة تعزز الأثر وتفتح مسارات تطوير لاحقة.",
    icon: ShieldCheck,
  },
];

const activities = [
  {
    title: "تحديد التحديات",
    body: "جمع وتحليل المشكلات والفرص التحسينية داخل الجهات والإدارات المختلفة لتحديد المجالات التي تحتاج إلى حلول ابتكارية.",
  },
  {
    title: "ورش التحول الرقمي والابتكار المفتوح",
    body: "تنظيم ورش عمل تهدف إلى تعزيز فهم المشاركين لمفاهيم التحول الرقمي والابتكار المفتوح وتزويدهم بالمهارات اللازمة لتبني التقنيات الناشئة.",
  },
  {
    title: "طرح التحديات وتحفيز المبتكرين",
    body: "إقامة فعاليات تنافسية مثل المسابقات أو الهاكاثونات، حيث يتم عرض التحديات المحددة ودعوة المبتكرين لتقديم حلول نوعية ومبتكرة.",
  },
  {
    title: "تمكين الحلول المميزة ومتابعة تنفيذها",
    body: "اختيار الحلول المتميزة وتقديم الدعم اللازم لتطويرها وتنفيذها مع متابعة مستمرة لتحقيق أثر إيجابي ملموس على الخدمات المقدمة.",
  },
];

const tracks = [
  {
    title: "الطاقة الذكية والاستدامة",
    summary:
      "حلول مبتكرة لتعزيز كفاءة الطاقة المتجددة وتحسين الأداء والتنبؤ بالأعطال ورفع كفاءة التشغيل والاستثمار في البنية التحتية للطاقة.",
    badge: "طاقة + ذكاء اصطناعي",
    challenges: [
      "التنبؤ بأعطال الألواح الشمسية والبطاريات باستخدام الذكاء الاصطناعي وتعلم الآلة.",
      "تحليل وتوقع أداء محطات الطاقة المتجددة وقراءة بيانات مصادر الطاقة بذكاء.",
      "قياس تراكم الأتربة وتحليل الإشعاع الشمسي لتحسين الإنتاجية وكفاءة الألواح.",
      "بناء منصات توصية ذكية للاستثمار الطاقي أو توزيع الطاقة بشكل ديناميكي حسب الطلب.",
    ],
  },
  {
    title: "الأصول الذكية والعمليات الميدانية",
    summary:
      "معالجة تحديات إدارة الأصول والبنية التحتية عبر دمج إنترنت الأشياء والدرون والرؤية الحاسوبية والروبوتات والأنظمة الرقمية المتكاملة.",
    badge: "أصول + عمليات ميدانية",
    challenges: [
      "استخدام الدرون للمراقبة الأمنية ومتابعة المنشآت والمواقع الحيوية.",
      "توظيف الروبوتات في تنظيف الألواح الشمسية والصيانة الاستباقية للأصول.",
      "تحليل الصور لتحديد مستوى الضرر والصيانة المطلوبة في الطرق أو المرافق.",
      "إنشاء منصة قيادة وتحكم موحدة تعرض حالة الأصول لحظيًا وتدعم القرار الميداني.",
    ],
  },
  {
    title: "الخدمات الرقمية وتجربة المستخدم",
    summary:
      "إعادة تصميم تجربة المستخدم والخدمات الرقمية بحلول ذكية وتفاعلية ترفع الكفاءة وتسهل الوصول إلى الخدمات باستخدام الذكاء الاصطناعي وVR/AR.",
    badge: "خدمات + تجربة مستخدم",
    challenges: [
      "التدريب على تركيب الألواح الشمسية باستخدام الواقع الافتراضي أو المعزز.",
      "إنشاء بطاقات تعريف رقمية وربطها بخدمات أو إجراءات عبر QR Code.",
      "تطوير Chatbot أو AI Copilot لخدمة الموظفين والإجابة على الاستفسارات بفعالية.",
      "بناء نظام توصيات ذكي يخصص الخدمات حسب سلوك المستخدم واحتياجه.",
    ],
  },
  {
    title: "البيانات والذكاء المؤسسي",
    summary:
      "استثمار البيانات كمورد استراتيجي عبر التحليل المتقدم والذكاء الاصطناعي لاستخلاص الرؤى ودعم القرار وتعزيز التكامل بين الأنظمة.",
    badge: "بيانات + ذكاء مؤسسي",
    challenges: [
      "جمع وتحليل البيانات المرتبطة بتطورات المدينة أو المؤسسة واستخراج مؤشرات قابلة للتنفيذ.",
      "تحليل الأخبار والمصادر المختلفة لاستخلاص رؤى استراتيجية تدعم صناع القرار.",
      "بناء محرك قرار ذكي يقدم توصيات مباشرة للإدارة بناءً على البيانات.",
      "تصميم منصة موحدة لدمج البيانات أو التنبؤ بالاتجاهات المستقبلية للمدينة أو السوق.",
    ],
  },
];

const timeline = [
  { date: "19 أبريل 2026", title: "إطلاق المعسكر وفتح الصفحة", body: "بدء الحملة التعريفية وإطلاق التجربة الرقمية الرسمية للمعسكر." },
  { date: "19–24 أبريل 2026", title: "التعريف بالمسارات والتحديات", body: "رفع الوعي بالمبادرة، وشرح المجالات الرئيسية والفرص الابتكارية المتاحة للمشاركين." },
  { date: "19–28 أبريل 2026", title: "فترة التسجيل", body: "استقبال طلبات المشاركة عبر نموذج التسجيل الخارجي المعتمد." },
  { date: "28 أبريل 2026", title: "إغلاق التسجيل", body: "إقفال التقديم والانتقال إلى مرحلة مراجعة الطلبات وإشعار المشاركين." },
  { date: "29–30 أبريل 2026", title: "فرز المشاركين وإشعار المقبولين", body: "مراجعة الطلبات وإبلاغ المشاركين المستوفين للشروط بالخطوات التالية." },
  { date: "1–4 مايو 2026", title: "الورش الافتراضية والتهيئة", body: "تهيئة المشاركين معرفيًا ومهاريًا قبل مرحلة التطوير العملي." },
  { date: "5–7 مايو 2026", title: "تطوير الأفكار والنماذج الأولية", body: "تحويل الأفكار إلى حلول أولية قابلة للعرض والمناقشة." },
  { date: "8–10 مايو 2026", title: "الإرشاد والتحسين", body: "جلسات مراجعة وتطوير وتحسين الحلول بناءً على التوجيه والتغذية الراجعة." },
  { date: "11 مايو 2026", title: "التحكيم الأولي والاستعداد للعرض", body: "تهيئة الفرق والعروض النهائية وصقل الرسائل التنفيذية للمشروع." },
  { date: "12–13 مايو 2026", title: "العروض النهائية والختام", body: "التحكيم النهائي، إبراز الحلول المميزة، واختتام المعسكر." },
];

const requirements = [
  "التسجيل وإبداء الرغبة في المشاركة خلال الفترة المحددة وقبل 28 أبريل 2026.",
  "المشاركة الفعّالة في جميع الورش الافتراضية المصاحبة لمسار المعسكر.",
  "الالتزام بحضور الورش الحضورية وفق الجدول والتحديثات الصادرة من الفريق التشغيلي.",
  "تسليم جميع متطلبات ومراحل المشروع في الأوقات المحددة.",
  "الالتزام بالتعليمات والتنبيهات والتحديثات المقدمة طوال فترة المعسكر.",
];

const criteria = [
  "وضوح المشكلة وأهميتها.",
  "الابتكار والأصالة والابتعاد عن الحلول التقليدية أو المكررة.",
  "القيمة والأثر للمستفيدين أو الجهات المستهدفة.",
  "القابلية للتطبيق على أرض الواقع ووضوح المتطلبات التشغيلية.",
  "جودة النموذج الأولي أو العرض العملي للحل.",
  "توظيف التقنيات الناشئة مثل الذكاء الاصطناعي وإنترنت الأشياء بفعالية.",
  "قابلية التوسع والاستدامة ووضوح نموذج العمل المستقبلي.",
  "جودة العرض التقديمي وتكامل عناصر المشروع وجاهزية الفريق للتحكيم.",
];

const technologies = [
  "الذكاء الاصطناعي",
  "إنترنت الأشياء",
  "تحليل البيانات والبيانات الضخمة",
  "الرؤية الحاسوبية",
  "الحوسبة السحابية",
  "الواقع الافتراضي والمعزز",
  "الروبوتات والدرون",
  "تقنيات التحقق والهوية الرقمية",
];

const audience = [
  "منسوبو الجهتين من الطلاب، بوصفهم الفئة الأكاديمية الأكثر قربًا من التعلم التطبيقي وتطوير الحلول الرقمية والابتكارية.",
  "منسوبو الجهتين من أعضاء هيئة التدريس، بما يعزز البعد المعرفي والبحثي ويدعم بناء حلول أكثر نضجًا وقابلية للتطوير.",
  "منسوبو المدينة والجهات التابعة لها من الموظفين، بوصفهم الفئة المهنية الأقرب إلى التحديات التشغيلية والخدمية الواقعية.",
  "المشاركون من هذه الفئات الذين يملكون اهتمامًا بالابتكار الرقمي، والتقنيات الناشئة، وبناء حلول عملية ذات أثر مؤسسي.",
];

const awards = [
  {
    title: "حلول متميزة قابلة للتمكين",
    body: "يركز المعسكر على إبراز الحلول النوعية القابلة للتنفيذ والتطوير، مع منحها مساحة أكبر للتمكين والمتابعة بعد مرحلة العرض النهائي.",
  },
  {
    title: "فرص تطوير واحتضان لاحقة",
    body: "المخرجات القوية لا تُقيَّم فقط من زاوية المنافسة، بل من زاوية الجاهزية للتطوير والتوسّع وتحقيق أثر مؤسسي ملموس.",
  },
  {
    title: "تميّز في الأثر والابتكار",
    body: "الحلول التي تجمع بين القيمة، والابتكار، والقابلية للتطبيق تحظى بفرصة أكبر للظهور والتقدير داخل منظومة الابتكار المرتبطة بالمعسكر.",
  },
];

const faqItems = [
  {
    q: "ما هو معسكر الابتكار الرقمي والمفتوح (2) - 2026؟",
    a: "هو مبادرة تفاعلية تهدف إلى تمكين المشاركين من تطوير حلول نوعية في مجالات التحول الرقمي، والطاقة، والخدمات، والبيانات ضمن بيئة ابتكار تطبيقية ومؤسسية.",
  },
  {
    q: "من الفئات المستهدفة بالمشاركة؟",
    a: "يستهدف المعسكر منسوبي الجهتين من الطلاب وأعضاء هيئة التدريس وموظفي المدينة والجهات التابعة لها، مع التركيز على من لديهم اهتمام ببناء حلول رقمية وابتكارية ذات أثر عملي.",
  },
  {
    q: "هل يتم التسجيل داخل الموقع؟",
    a: "لا. جميع أزرار التسجيل تنقل مباشرة إلى نموذج Google Form الخارجي المعتمد، ولا توجد أي استمارة تسجيل داخلية داخل الموقع.",
  },
  {
    q: "ما آخر موعد للتسجيل؟",
    a: "بحسب المحتوى المعتمد، آخر موعد للتسجيل هو 28 أبريل 2026، مع ضرورة متابعة أي تحديثات تشغيلية رسمية مرتبطة بالمعسكر.",
  },
  {
    q: "هل يتطلب المعسكر حضور ورش أو مراحل تنفيذية؟",
    a: "نعم. المشاركة الفعالة في الورش الافتراضية والالتزام بالورش الحضورية والتسليمات المرحلية جزء أساسي من تجربة المعسكر ومتطلباته.",
  },
  {
    q: "كيف يتم تقييم المشاريع؟",
    a: "يتم التقييم بناءً على وضوح المشكلة، والأصالة، والأثر، والقابلية للتطبيق، وجودة النموذج الأولي، واستخدام التقنيات الناشئة، وقابلية التوسع، وجودة العرض وجاهزية الفريق.",
  },
];

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

function useCountdown(targetDate: string) {
  const target = useMemo(() => new Date(targetDate).getTime(), [targetDate]);
  const calculate = () => {
    const now = new Date().getTime();
    const diff = target - now;

    if (diff <= 0) {
      return { finished: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      finished: false,
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculate);

  useEffect(() => {
    const interval = window.setInterval(() => setTimeLeft(calculate()), 1000);
    return () => window.clearInterval(interval);
  }, [target]);

  return timeLeft;
}

function scrollToId(id: string) {
  const section = document.getElementById(id);

  if (!section) {
    return;
  }

  const headerOffset = window.innerWidth >= 1024 ? 116 : 96;
  const top = section.getBoundingClientRect().top + window.scrollY - headerOffset;

  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const next = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, next)));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return progress;
}

function useActiveSection(ids: string[]) {
  const [activeId, setActiveId] = useState(ids[0]);

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-30% 0px -45% 0px",
        threshold: [0.15, 0.3, 0.55],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}

function ScrollProgressBar() {
  const progress = useScrollProgress();
  return (
    <div className="fixed inset-x-0 top-0 z-[70] h-1 bg-white/30 backdrop-blur-sm">
      <div
        className="h-full bg-[linear-gradient(90deg,var(--brand-gold),var(--brand-orange))] shadow-[0_0_18px_rgba(242,168,72,0.5)] transition-[width] duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

function SectionEyebrow({ children }: { children: string }) {
  return (
    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[rgba(13,59,102,0.12)] bg-white/80 px-4 py-2 text-sm font-semibold text-[var(--brand-blue)] shadow-sm backdrop-blur">
      <span className="h-2 w-2 rounded-full bg-[var(--brand-gold)]" />
      {children}
    </div>
  );
}

function SectionHeading({ title, body }: { title: string; body: string }) {
  return (
    <div className="mx-auto mb-14 max-w-3xl text-center">
      <SectionEyebrow>{title}</SectionEyebrow>
      <h2 className="text-balance text-3xl font-bold leading-[1.25] text-[var(--brand-ink)] md:text-5xl">
        {title}
      </h2>
      <p className="mt-5 text-base leading-8 text-[var(--text-soft)] md:text-lg">{body}</p>
    </div>
  );
}

function PrimaryButton({ children, href, className = "" }: { children: string; href: string; className?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,var(--brand-gold),var(--brand-orange))] px-6 py-3.5 text-sm font-bold text-white shadow-[0_16px_40px_rgba(239,153,45,0.28)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(239,153,45,0.38)] ${className}`}
    >
      <ExternalLink className="h-4 w-4" />
      {children}
    </a>
  );
}

function SecondaryButton({ children, to }: { children: string; to: string }) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    scrollToId(to);
  };

  return (
    <a
      href={`#${to}`}
      onClick={handleClick}
      className="inline-flex items-center justify-center gap-2 rounded-full border border-[rgba(13,59,102,0.18)] bg-white/85 px-6 py-3.5 text-sm font-bold text-[var(--brand-blue)] shadow-[0_12px_30px_rgba(13,59,102,0.08)] transition duration-300 hover:-translate-y-1 hover:border-[rgba(13,59,102,0.3)] hover:bg-white"
    >
      <ArrowUpLeft className="h-4 w-4" />
      {children}
    </a>
  );
}

function Header() {
  const ids = navItems.map((item) => item.id);
  const activeId = useActiveSection(ids);
  const [open, setOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <>
      <header className="fixed inset-x-0 top-1 z-[60] px-3 md:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between rounded-[26px] border border-white/60 bg-white/72 px-4 py-3 shadow-[0_22px_70px_rgba(13,59,102,0.12)] backdrop-blur-xl md:px-6">
          <button
            onClick={() => setOpen(!open)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(13,59,102,0.12)] bg-white text-[var(--brand-blue)] xl:hidden"
            aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <nav className="hidden items-center gap-0.5 xl:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`whitespace-nowrap rounded-full px-3 py-2.5 text-sm font-semibold transition duration-300 ${
                  activeId === item.id
                    ? "bg-[rgba(13,59,102,0.08)] text-[var(--brand-blue)]"
                    : "text-[var(--text-soft)] hover:bg-[rgba(13,59,102,0.05)] hover:text-[var(--brand-blue)]"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <PrimaryButton href={GOOGLE_FORM_URL} className="hidden xl:inline-flex">
              سجل الآن
            </PrimaryButton>
            <div className="text-right">
              <div className="text-sm font-semibold text-[var(--text-soft)]">معسكر الابتكار الرقمي والمفتوح</div>
              <div className="text-lg font-extrabold text-[var(--brand-ink)]">2026</div>
            </div>
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-x-3 top-20 z-50 rounded-[28px] border border-white/60 bg-white/95 p-4 shadow-[0_26px_90px_rgba(13,59,102,0.16)] backdrop-blur-xl xl:hidden">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`rounded-2xl px-4 py-3 text-right text-sm font-semibold transition ${
                  activeId === item.id
                    ? "bg-[rgba(13,59,102,0.08)] text-[var(--brand-blue)]"
                    : "text-[var(--brand-ink)] hover:bg-[rgba(13,59,102,0.04)]"
                }`}
              >
                {item.label}
              </button>
            ))}
            <PrimaryButton href={GOOGLE_FORM_URL} className="mt-2 w-full">
              الانتقال إلى التسجيل
            </PrimaryButton>
          </div>
        </div>
      )}
    </>
  );
}

function HeroSection() {
  const countdown = useCountdown("2026-05-12T18:00:00+03:00");

  const units = [
    { label: "يوم", value: countdown.days },
    { label: "ساعة", value: countdown.hours },
    { label: "دقيقة", value: countdown.minutes },
    { label: "ثانية", value: countdown.seconds },
  ];

  return (
    <section id="hero" className="relative overflow-hidden px-3 pb-8 pt-24 md:px-6 md:pt-28 lg:pt-32">
      <div className="hero-shell mx-auto max-w-7xl overflow-hidden rounded-[38px] border border-white/60 shadow-[0_35px_120px_rgba(13,59,102,0.14)]">
        <div className="absolute inset-0">
          <img
            src={HERO_IMAGE}
            alt="بيئة ابتكار رقمية متقدمة"
            className="h-full w-full object-cover"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,25,45,0.52),rgba(7,25,45,0.74))] md:bg-[linear-gradient(180deg,rgba(7,25,45,0.42),rgba(7,25,45,0.64))]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_46%)]" />
        </div>

        <div className="relative z-10 flex min-h-[78svh] flex-col justify-between px-4 py-10 text-white sm:min-h-[82svh] sm:px-6 sm:py-12 md:px-10 md:py-14 lg:min-h-[88svh] lg:px-16">
          <div className="flex justify-end">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-md">
              <Zap className="h-4 w-4 text-[var(--brand-gold)]" />
              تجربة رقمية مؤسسية بطابع ابتكاري متقدم
            </div>
          </div>

          <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
            <p className="mb-4 text-sm font-semibold tracking-[0.24em] text-white/78 md:text-base">
              معسكر الابتكار الرقمي والمفتوح (2)
            </p>
            <h1 className="max-w-4xl text-balance text-[clamp(2.35rem,8vw,5.75rem)] font-black leading-[1.12] sm:leading-[1.16]">
              منصة ابتكار عربية تبني حلولًا نوعية في الطاقة والخدمات والبيانات والعمليات الذكية
            </h1>
            <p className="mt-6 max-w-3xl text-sm leading-7 text-white/88 sm:text-base sm:leading-8 md:text-xl md:leading-9">
              تجربة تفاعلية تستهدف طلبة الجامعات والمطورين والمبتكرين، وتربط بين التحول الرقمي، والاستدامة، والبحث التطبيقي، والابتكار المفتوح ضمن رحلة عملية تمتد من الفكرة إلى الحل القابل للتنفيذ.
            </p>

            <div className="mt-10 grid w-full max-w-4xl grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
              {units.map((unit) => (
                <div
                  key={unit.label}
                  className="rounded-[24px] border border-white/18 bg-white/12 px-3 py-4 shadow-[0_22px_50px_rgba(0,0,0,0.14)] backdrop-blur-xl sm:rounded-[28px] sm:px-4 sm:py-5"
                >
                  <div className="text-3xl font-black tabular-nums sm:text-4xl md:text-6xl">{formatNumber(unit.value)}</div>
                  <div className="mt-2 text-sm font-semibold text-white/76 md:text-base">{unit.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex w-full max-w-2xl flex-col items-stretch gap-4 sm:items-center md:flex-row md:justify-center">
              <PrimaryButton href={GOOGLE_FORM_URL} className="w-full sm:w-auto">سجّل عبر النموذج الخارجي</PrimaryButton>
              <SecondaryButton to="tracks">استكشف المسارات</SecondaryButton>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm leading-6 text-white/78">
              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md">RTL عربي كامل</span>
              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md">تسجيل خارجي فقط</span>
              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md">19 أبريل — 13 مايو 2026</span>
            </div>
          </div>

          <div className="mt-10 flex justify-center">
            <button
              onClick={() => scrollToId("about")}
              className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/10 px-4 py-2 text-sm font-semibold text-white/82 backdrop-blur-md transition hover:bg-white/14"
            >
              <Clock3 className="h-4 w-4" />
              ابدأ الرحلة
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="section-block section-fade-up">
      <div className="container grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <SectionEyebrow>عن المعسكر</SectionEyebrow>
          <h2 className="text-3xl font-bold leading-[1.25] text-[var(--brand-ink)] md:text-5xl">
            مساحة تطبيقية تجمع بين الابتكار المفتوح والتحول الرقمي والاستدامة
          </h2>
          <p className="mt-6 text-base leading-8 text-[var(--text-soft)] md:text-lg">
            يأتي معسكر الابتكار الرقمي والمفتوح بوصفه امتدادًا لجهود تستهدف تعزيز ثقافة الابتكار وتطوير الحلول الرقمية النوعية، عبر بيئة عمل تعاونية تجمع بين التفكير التصميمي، وريادة الأعمال التقنية، والتطبيق العملي، بما يساعد المشاركين على الانتقال من الأفكار الأولية إلى مشروعات أكثر جاهزية للتنفيذ.
          </p>
          <p className="mt-4 text-base leading-8 text-[var(--text-soft)] md:text-lg">
            يركز المعسكر على توظيف التقنيات الحديثة مثل الذكاء الاصطناعي، وإنترنت الأشياء، وتحليل البيانات، بما يسهم في رفع كفاءة العمليات، وتحسين تجربة المستفيدين، وتعزيز مفاهيم الاستدامة والابتكار المؤسسي في مجالات حيوية متنوعة.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { value: "4", label: "مسارات رئيسية" },
              { value: "10", label: "مراحل زمنية" },
              { value: "6", label: "أهداف محورية" },
            ].map((item) => (
              <div key={item.label} className="rounded-[24px] border border-[rgba(13,59,102,0.08)] bg-white px-5 py-5 shadow-[0_18px_48px_rgba(13,59,102,0.06)]">
                <div className="text-3xl font-black text-[var(--brand-blue)]">{item.value}</div>
                <div className="mt-2 text-sm font-semibold text-[var(--text-soft)]">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[34px] border border-white/70 bg-white shadow-[0_30px_90px_rgba(13,59,102,0.10)]">
          <img src={ABOUT_IMAGE} alt="بيئة بحث وتطوير وتقنيات نظيفة" className="h-full w-full object-cover" loading="lazy" decoding="async" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.08))]" />
        </div>
      </div>
    </section>
  );
}

function ObjectivesSection() {
  return (
    <section id="objectives" className="section-block section-fade-up bg-[linear-gradient(180deg,rgba(13,59,102,0.03),transparent_55%)]">
      <div className="container">
        <SectionHeading
          title="الأهداف"
          body="صُممت أهداف المعسكر لتشكّل إطارًا عمليًا يربط بين الابتكار، والاستدامة، والجاهزية التنفيذية، مع منح المشاركين رحلة واضحة من التعلّم إلى بناء الحلول."
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {objectives.map((item, index) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="group rounded-[30px] border border-[rgba(13,59,102,0.08)] bg-white px-6 py-6 shadow-[0_20px_60px_rgba(13,59,102,0.06)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_70px_rgba(13,59,102,0.11)]">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(13,59,102,0.12),rgba(242,168,72,0.12))] text-[var(--brand-blue)]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="text-sm font-bold text-[var(--brand-gold)]">{formatNumber(index + 1)}</div>
                </div>
                <h3 className="mt-6 text-xl font-bold text-[var(--brand-ink)]">{item.title}</h3>
                <p className="mt-3 text-base leading-8 text-[var(--text-soft)]">{item.body}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ActivitiesSection() {
  return (
    <section id="activities" className="section-block section-fade-up">
      <div className="container">
        <SectionHeading
          title="أنشطة المعسكر"
          body="تنتظم تجربة المعسكر في سلسلة أنشطة مترابطة تبدأ من تشخيص التحديات وتنتهي بتمكين الحلول المتميزة ومتابعة تطويرها."
        />
        <div className="grid gap-6 lg:grid-cols-4">
          {activities.map((activity, index) => (
            <article key={activity.title} className="relative overflow-hidden rounded-[30px] border border-[rgba(13,59,102,0.08)] bg-white p-6 shadow-[0_20px_60px_rgba(13,59,102,0.06)]">
              <div className="absolute left-5 top-5 text-6xl font-black text-[rgba(13,59,102,0.05)]">{formatNumber(index + 1)}</div>
              <div className="relative">
                <div className="mb-4 inline-flex rounded-full border border-[rgba(242,168,72,0.2)] bg-[rgba(242,168,72,0.08)] px-3 py-1 text-xs font-bold text-[var(--brand-orange)]">
                  المرحلة {formatNumber(index + 1)}
                </div>
                <h3 className="text-xl font-bold text-[var(--brand-ink)]">{activity.title}</h3>
                <p className="mt-3 text-base leading-8 text-[var(--text-soft)]">{activity.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function TracksSection() {
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <section id="tracks" className="section-block section-fade-up">
      <div className="container">
        <SectionHeading
          title="المسارات"
          body="تمثل المسارات الأربعة المجالات الرئيسية للمعسكر، وتعرض تحديات تطبيقية متنوعة تفتح المجال لبناء حلول واقعية ذات أثر واضح وقابلية للتوسع."
        />

        <div className="mb-8 overflow-hidden rounded-[34px] border border-white/70 shadow-[0_30px_90px_rgba(13,59,102,0.10)]">
          <img src={TRACKS_IMAGE} alt="المسارات التقنية والابتكارية للمعسكر" className="h-[220px] w-full object-cover sm:h-[260px] md:h-[340px]" loading="lazy" decoding="async" />
        </div>

        <div className="grid gap-5 xl:grid-cols-2">
          {tracks.map((track, index) => {
            const isOpen = expanded === index;
            return (
              <article
                key={track.title}
                className={`group rounded-[30px] border px-6 py-6 transition duration-300 ${
                  isOpen
                    ? "border-[rgba(13,59,102,0.18)] bg-white shadow-[0_28px_80px_rgba(13,59,102,0.10)]"
                    : "border-[rgba(13,59,102,0.08)] bg-white/92 shadow-[0_18px_55px_rgba(13,59,102,0.05)] hover:-translate-y-1 hover:shadow-[0_26px_75px_rgba(13,59,102,0.09)]"
                }`}
              >
                <button
                  onClick={() => setExpanded(isOpen ? null : index)}
                  className="w-full text-right"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="rounded-full border border-[rgba(242,168,72,0.22)] bg-[rgba(242,168,72,0.08)] px-3 py-1 text-xs font-bold text-[var(--brand-orange)]">
                      {track.badge}
                    </div>
                    <ChevronDown className={`h-5 w-5 text-[var(--brand-blue)] transition duration-300 ${isOpen ? "rotate-180" : ""}`} />
                  </div>
                  <h3 className="mt-5 text-2xl font-bold text-[var(--brand-ink)]">{track.title}</h3>
                  <p className="mt-3 text-base leading-8 text-[var(--text-soft)]">{track.summary}</p>
                </button>

                <div className={`grid transition-all duration-500 ${isOpen ? "grid-rows-[1fr] pt-5" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <div className="rounded-[24px] border border-[rgba(13,59,102,0.08)] bg-[var(--surface-alt)] p-5">
                      <div className="mb-4 text-sm font-bold text-[var(--brand-blue)]">أمثلة التحديات المقترحة</div>
                      <div className="space-y-3">
                        {track.challenges.map((challenge) => (
                          <div key={challenge} className="flex items-start gap-3 rounded-2xl bg-white px-4 py-3 text-sm leading-7 text-[var(--text-soft)] shadow-sm">
                            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--brand-gold)]" />
                            <span>{challenge}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function TimelineSection() {
  const [visible, setVisible] = useState(4);

  useEffect(() => {
    const cards = Array.from(document.querySelectorAll(".timeline-card"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const raw = Number((entry.target as HTMLElement).dataset.index || 0);
            setVisible((prev) => Math.max(prev, raw + 1));
          }
        });
      },
      { rootMargin: "-15% 0px -25% 0px", threshold: 0.25 },
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="timeline" className="section-block section-fade-up bg-[linear-gradient(180deg,rgba(13,59,102,0.03),transparent_65%)]">
      <div className="container">
        <SectionHeading
          title="الجدول الزمني"
          body="رحلة زمنية من عشر مراحل تمتد من إطلاق المعسكر إلى العروض النهائية والختام، مع انتقالات واضحة بين التسجيل، والتهيئة، والتطوير، والتحكيم."
        />

        <div className="relative mx-auto max-w-5xl">
          <div className="absolute right-5 top-0 hidden h-full w-px bg-[rgba(13,59,102,0.10)] md:block" />
          <div
            className="absolute right-5 top-0 hidden w-px bg-[linear-gradient(180deg,var(--brand-gold),var(--brand-orange))] shadow-[0_0_25px_rgba(242,168,72,0.5)] transition-all duration-700 md:block"
            style={{ height: `${Math.min(100, visible * 10)}%` }}
          />

          <div className="space-y-5 md:space-y-8">
            {timeline.map((item, index) => (
              <article
                key={`${item.date}-${item.title}`}
                data-index={index}
                className="timeline-card relative md:pr-16"
              >
                <div className="absolute right-[11px] top-8 hidden h-3 w-3 rounded-full border-4 border-white bg-[var(--brand-gold)] shadow-[0_0_0_8px_rgba(242,168,72,0.12)] md:block" />
                <div className="rounded-[30px] border border-[rgba(13,59,102,0.08)] bg-white p-6 shadow-[0_20px_60px_rgba(13,59,102,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(13,59,102,0.10)]">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div className="rounded-full border border-[rgba(242,168,72,0.2)] bg-[rgba(242,168,72,0.08)] px-4 py-2 text-sm font-bold text-[var(--brand-orange)]">
                      {item.date}
                    </div>
                    <div className="text-sm font-semibold text-[var(--brand-blue)]">المرحلة {formatNumber(index + 1)}</div>
                  </div>
                  <h3 className="mt-5 text-2xl font-bold text-[var(--brand-ink)]">{item.title}</h3>
                  <p className="mt-3 text-base leading-8 text-[var(--text-soft)]">{item.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ListCardSection({
  id,
  title,
  body,
  items,
  columns = 2,
}: {
  id: string;
  title: string;
  body: string;
  items: string[];
  columns?: 1 | 2 | 4;
}) {
  const className =
    columns === 4
      ? "grid gap-4 md:grid-cols-2 xl:grid-cols-4"
      : columns === 1
        ? "grid gap-4"
        : "grid gap-4 md:grid-cols-2";

  return (
    <section id={id} className="section-block section-fade-up">
      <div className="container">
        <SectionHeading title={title} body={body} />
        <div className={className}>
          {items.map((item) => (
            <article key={item} className="rounded-[26px] border border-[rgba(13,59,102,0.08)] bg-white px-5 py-5 shadow-[0_16px_45px_rgba(13,59,102,0.05)]">
              <div className="flex items-start gap-3 text-base leading-8 text-[var(--text-soft)]">
                <span className="mt-3 h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--brand-gold)]" />
                <span>{item}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function AwardsSection() {
  return (
    <section id="awards" className="section-block section-fade-up">
      <div className="container">
        <SectionHeading
          title="الجوائز وفرص التمكين"
          body="يركز المعسكر على إبراز الحلول المميزة ذات الجاهزية التنفيذية والأثر العملي، مع منحها مساحة أكبر للتمكين والتطوير بعد العروض النهائية."
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {awards.map((item, index) => (
            <article key={item.title} className="relative overflow-hidden rounded-[32px] border border-[rgba(13,59,102,0.08)] bg-white p-6 shadow-[0_20px_60px_rgba(13,59,102,0.06)]">
              <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,var(--brand-gold),var(--brand-orange))]" />
              <div className="mb-5 inline-flex rounded-full border border-[rgba(13,59,102,0.08)] bg-[var(--surface-alt)] px-3 py-1 text-xs font-bold text-[var(--brand-blue)]">
                مستوى {formatNumber(index + 1)}
              </div>
              <h3 className="text-2xl font-bold text-[var(--brand-ink)]">{item.title}</h3>
              <p className="mt-3 text-base leading-8 text-[var(--text-soft)]">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="section-block section-fade-up bg-[linear-gradient(180deg,rgba(13,59,102,0.03),transparent_75%)]">
      <div className="container max-w-4xl">
        <SectionHeading
          title="الأسئلة الشائعة"
          body="إجابات مختصرة وواضحة تساعدك على فهم آلية المشاركة، والتسجيل، وطبيعة المسارات، ومتطلبات التقييم داخل المعسكر."
        />

        <div className="space-y-4">
          {faqItems.map((item, index) => {
            const open = openIndex === index;
            return (
              <article key={item.q} className="rounded-[28px] border border-[rgba(13,59,102,0.08)] bg-white shadow-[0_16px_45px_rgba(13,59,102,0.05)]">
                <button
                  onClick={() => setOpenIndex(open ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-right"
                  aria-expanded={open}
                >
                  <ChevronDown className={`h-5 w-5 shrink-0 text-[var(--brand-blue)] transition duration-300 ${open ? "rotate-180" : ""}`} />
                  <div className="text-lg font-bold leading-8 text-[var(--brand-ink)]">{item.q}</div>
                </button>
                <div className={`grid transition-all duration-500 ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <div className="border-t border-[rgba(13,59,102,0.06)] px-6 py-5 text-base leading-8 text-[var(--text-soft)]">
                      {item.a}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function RegistrationSection() {
  return (
    <section id="registration" className="section-block section-fade-up pt-8">
      <div className="container">
        <div className="relative overflow-hidden rounded-[38px] border border-white/70 shadow-[0_30px_100px_rgba(13,59,102,0.12)]">
          <img src={CTA_IMAGE} alt="مشهد مستقبلي يدعم الدعوة للتسجيل" className="absolute inset-0 h-full w-full object-cover" loading="lazy" decoding="async" />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(7,25,45,0.80),rgba(13,59,102,0.65),rgba(255,255,255,0.12))]" />
          <div className="relative z-10 mx-auto max-w-4xl px-6 py-14 text-center text-white md:px-10 md:py-20">
            <SectionEyebrow>التسجيل</SectionEyebrow>
            <h2 className="text-balance text-3xl font-black leading-[1.25] md:text-5xl">
              هل أنت جاهز لتطوير حل رقمي نوعي داخل بيئة ابتكار تطبيقية؟
            </h2>
            <p className="mt-5 text-base leading-8 text-white/84 md:text-lg">
              التسجيل يتم حصريًا عبر نموذج Google Form الخارجي المعتمد. لا توجد أي استمارة داخلية داخل الموقع، وجميع الدعوات إلى الإجراء تنقلك مباشرة إلى صفحة التسجيل الرسمية.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-4 md:flex-row">
              <PrimaryButton href={GOOGLE_FORM_URL}>الانتقال إلى نموذج التسجيل</PrimaryButton>
              <SecondaryButton to="timeline">راجع الجدول الزمني أولًا</SecondaryButton>
            </div>
            <div className="mt-5 flex justify-center">
              <a
                href={WHATSAPP_GROUP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white/92 backdrop-blur-md transition duration-300 hover:bg-white/16"
              >
                <MessageCircle className="h-4 w-4 shrink-0" />
                <span>انضم إلى قروب الاستفسارات</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="footer" className="pb-10 pt-8">
      <div className="container">
        <div className="rounded-[34px] border border-[rgba(13,59,102,0.08)] bg-white px-6 py-8 shadow-[0_20px_60px_rgba(13,59,102,0.06)] md:px-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-end">
            <div>
              <div className="text-sm font-semibold text-[var(--text-soft)]">معسكر الابتكار الرقمي والمفتوح (2)</div>
              <div className="mt-2 text-3xl font-black text-[var(--brand-ink)]">2026</div>
              <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--text-soft)]">
                موقع عربي RTL مصمم لتقديم تجربة تعريفية راقية وتفاعلية حول المعسكر، مع إبراز المسارات، والجدول الزمني، ومتطلبات المشاركة، وربط المستخدم مباشرة بالتسجيل الخارجي المعتمد.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <div className="mb-3 text-sm font-bold text-[var(--brand-blue)]">تنقل سريع</div>
                <div className="space-y-2 text-sm text-[var(--text-soft)]">
                  {navItems.slice(0, 5).map((item) => (
                    <button key={item.id} onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" })} className="block hover:text-[var(--brand-blue)]">
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div className="mb-3 text-sm font-bold text-[var(--brand-blue)]">إجراء مباشر</div>
                <div className="space-y-3">
                  <PrimaryButton href={GOOGLE_FORM_URL} className="w-full">سجل الآن</PrimaryButton>
                  <p className="text-sm leading-7 text-[var(--text-soft)]">
                    جميع عمليات التسجيل تتم خارجيًا عبر Google Form، وتفتح في تبويب جديد لضمان وضوح المسار وعدم جمع أي بيانات داخل الموقع.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function RevealObserver() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll(".section-fade-up"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -10% 0px" },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return null;
}

export default function Home() {
  return (
    <div dir="rtl" className="min-h-screen bg-[var(--page-bg)] text-[var(--brand-ink)]">
      <RevealObserver />
      <ScrollProgressBar />
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ObjectivesSection />
        <ActivitiesSection />
        <TracksSection />
        <TimelineSection />
        <ListCardSection
          id="requirements"
          title="شروط المشاركة"
          body="المشاركة في المعسكر ترتبط بالالتزام الزمني والتفاعل الفعّال مع الأنشطة والورش والتسليمات خلال كامل الرحلة التنفيذية."
          items={requirements}
          columns={2}
        />
        <ListCardSection
          id="criteria"
          title="معايير التقييم"
          body="تعتمد المشاريع المقدمة على مجموعة معايير أساسية تركّز على القيمة، والابتكار، والقابلية للتطبيق، وجودة العرض والتنفيذ."
          items={criteria}
          columns={4}
        />
        <ListCardSection
          id="technologies"
          title="التقنيات الداعمة"
          body="يشجع المعسكر على توظيف تقنيات حديثة تمكّن المشاركين من تحويل الأفكار إلى حلول ذكية ذات أثر واضح في البيئات المؤسسية والتطبيقية."
          items={technologies}
          columns={4}
        />
        <ListCardSection
          id="audience"
          title="الفئات المستهدفة"
          body="يعرّف هذا القسم الجمهور المستهدف بصورة صريحة، بحيث يشعر الزائر سريعًا أن المعسكر موجّه إليه إذا كان من منسوبي الجهتين من الطلاب أو أعضاء هيئة التدريس أو موظفي المدينة والجهات التابعة لها، ضمن إطار يجمع بين البعد الأكاديمي والمهني والابتكاري."
          items={audience}
          columns={2}
        />
        <AwardsSection />
        <FaqSection />
        <RegistrationSection />
      </main>
      <Footer />
    </div>
  );
}
