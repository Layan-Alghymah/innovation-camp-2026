import { type ComponentType, MouseEvent, useEffect, useMemo, useState } from "react";
import { SectionTitle } from "../components/SectionTitle";
import { AwardCard } from "../components/AwardCard";
import {
  ArrowUpLeft,
  BarChart3,
  Bot,
  Brain,
  Briefcase,
  Calendar,
  CheckCircle,
  ChevronDown,
  Clock3,
  Cloud,
  ExternalLink,
  GraduationCap,
  Glasses,
  Layers,
  Leaf,
  Lightbulb,
  Link2,
  MapPin,
  Menu,
  MessageCircle,
  Monitor,
  Network,
  Package,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Wifi,
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
const navItems = [
  { id: "hero", label: "الرئيسية" },
  { id: "about", label: "عن المعسكر" },
  { id: "objectives", label: "الأهداف" },
  { id: "tracks", label: "المسارات" },
  { id: "awards", label: "الجوائز" },
  { id: "timeline", label: "الجدول الزمني" },
  { id: "requirements", label: "شروط المشاركة" },
  { id: "criteria", label: "معايير التقييم" },
  { id: "faq", label: "الأسئلة الشائعة" },
];

const objectives = [
  {
    title: "تحفيز الابتكار الرقمي",
    description: "تمكين منسوبي المدينة والجامعة من تطوير حلول تقنية متقدمة تعزز كفاءة الخدمات وتحسين العمليات التشغيلية.",
    icon: Lightbulb,
  },
  {
    title: "تعزيز مفاهيم الاستدامة",
    description: "توظيف التقنيات الحديثة لدعم حلول مبتكرة تسهم في تطبيق مفاهيم وركائز الاستدامة (البيئية، الاجتماعية، الاقتصادية).",
    icon: Leaf,
  },
  {
    title: "تمكين الكفاءات الوطنية",
    description: "تنمية مهارات الابتكار وريادة الأعمال الرقمية لدى المشاركين عبر ورش عمل وتحديات عملية.",
    icon: Users,
  },
  {
    title: "تحقيق التكامل المعرفي",
    description: "تعزيز التعاون البحثي والتقني بين المدينة والجامعة لإيجاد حلول رقمية نوعية تدعم التحول الرقمي.",
    icon: Network,
  },
  {
    title: "تحسين تجربة المستفيدين",
    description: "تطوير تطبيقات وخدمات ذكية تسهم في رفع مستوى الجودة وتحقيق تجربة استخدام متميزة.",
    icon: Sparkles,
  },
  {
    title: "بناء منظومة ابتكار مستدامة",
    description: "تمكين وبناء بيئة ابتكارية مستدامة داخل المدينة والجامعة تدعم توليد الأفكار وتحويلها إلى مشاريع قابلة للتنفيذ.",
    icon: TrendingUp,
  },
];


const tracks = [
  {
    id: 1,
    title: "المسار الأول: الطاقة وذكاء اصطناعي",
    description: "يركّز هذا المسار على تطوير حلول مبتكرة لتعزيز كفاءة الطاقة المتجددة، عبر استخدام الذكاء الاصطناعي والتحليلات التنبؤية لتحسين الأداء، تقليل الأعطال، ورفع كفاءة التشغيل والاستثمار في البنية التحتية للطاقة.",
    challenges: [
      "تحديد العمر الافتراضي للألواح الشمسية والبطاريات باستخدام الذكاء الاصطناعي",
      "التنبؤ بالأعطال في الألواح الشمسية باستخدام تعلم الآلة",
      "تحليل وتوقع أداء محطات الطاقة المتجددة",
      "تحليل بيانات مصادر الطاقة المتجددة (أطلس الطاقة)",
      "تقييم أداء الأنظمة الكهروضوئية الصغيرة الموزعة",
      "تصميم احتياج المباني للألواح الشمسية بناءً على تحليل البيانات",
      "استخدام الطباعة ثلاثية الأبعاد لتصنيع نماذج الألواح أو مكونات توربينات الرياح",
      "قياس تراكم الأتربة وتأثيره على كفاءة الألواح",
      "قياس وتحليل الإشعاع الشمسي لتحسين الإنتاجية",
      "نظام رقمي يحاكي \"توأم رقمي\" لمحطة طاقة كاملة لتجربة سيناريوهات الأداء",
      "منصة توصيات ذكية تقترح أفضل استثمار للطاقة لكل مبنى أو حي",
      "استخدام الذكاء التوليدي لإنشاء خطط توزيع طاقة ديناميكية حسب الطلب",
    ],
  },
  {
    id: 2,
    title: "المسار الثاني: الأصول الذكية والعمليات الميدانية",
    description: "يعالج هذا المسار تحديات إدارة الأصول والبنية التحتية عبر دمج التقنيات الذكية مثل إنترنت الأشياء، الدرون، والرؤية الحاسوبية لتحسين عمليات المراقبة، الصيانة، والتشغيل الميداني بشكل أكثر كفاءة واستباقية.",
    challenges: [
      "استخدام الدرون للحراسات الأمنية ومراقبة المنشآت",
      "تنظيف الألواح الشمسية باستخدام الروبوتات",
      "تحليل صور الطرق لتحديد مستوى الضرر والصيانة المطلوبة",
      "استخدام الكاميرات الذكية للمراقبة وتحليل المواقع",
      "استخدام الواقع المعزز لمحاكاة تجارب ميدانية أو حل مشاكل المواقع",
      "ربط بيانات الأجهزة والمستشعرات لتحسين عمليات القياس",
      "إدارة وصيانة الأصول عبر أنظمة رقمية متكاملة",
      "روبوتات ذاتية التنقل تقوم بالصيانة الاستباقية للأصول",
      "نظام تنبيه ذكي يدمج بيانات الطقس والأصول لتوقع الأعطال قبل حدوثها",
      "منصة تحكم موحدة (Command Center) تعرض حالة جميع الأصول لحظياً",
    ],
  },
  {
    id: 3,
    title: "المسار الثالث: الخدمات الرقمية وتجربة المستخدم",
    description: "يهدف هذا المسار إلى إعادة تصميم تجربة المستخدم والخدمات الرقمية من خلال حلول ذكية وتفاعلية ترفع كفاءة العمليات وتسهل الوصول للخدمات، سواء للموظفين أو المستفيدين، باستخدام تقنيات مثل الذكاء الاصطناعي وAR/VR.",
    challenges: [
      "التدريب على تركيب الألواح الشمسية باستخدام الواقع الافتراضي/المعزز",
      "إنشاء بطاقات تعريف رقمية وربطها عبر QR Code",
      "تطوير Chatbot لخدمة الموظفين والإجابة على الاستفسارات",
      "تسجيل الحضور باستخدام التعرف على الوجه",
      "استخدام الأجهزة الذكية (مثل الساعات) لتحليل بيانات الموظفين",
      "تسهيل الوصول للخدمات والإجراءات عبر منصات ذكية",
      "مساعد افتراضي شامل (Copilot AI) لكل موظف داخل المؤسسة",
      "تجربة \"ميتافيرس مؤسسي\" للتدريب والتعاون عن بُعد",
      "نظام توصيات ذكي يخصص الخدمات حسب سلوك المستخدم",
    ],
  },
  {
    id: 4,
    title: "المسار الرابع: البيانات والذكاء المؤسسي",
    description: "يركّز هذا المسار على استثمار البيانات كمورد استراتيجي من خلال التحليل المتقدم والذكاء الاصطناعي لاستخلاص الرؤى، دعم اتخاذ القرار، وتعزيز التكامل بين الأنظمة المختلفة داخل المدينة أو المؤسسة.",
    challenges: [
      "جمع وتحليل البيانات المرتبطة بتطورات المدينة",
      "تحليل الأخبار والمصادر المختلفة لاستخراج رؤى استراتيجية",
      "استخراج القيمة من البيانات لدعم قطاعات الأعمال",
      "متابعة وتحليل وسائل التواصل الاجتماعي",
      "استخدام الحوسبة السحابية لتخزين وإدارة البيانات",
      "التحقق من الهوية باستخدام تقنية البلوكتشين",
      "استخدام الذكاء التوليدي في تخطيط الموارد المؤسسية",
      "\"محرك قرار ذكي\" يقدم توصيات مباشرة للإدارة بناءً على البيانات",
      "منصة موحدة لدمج جميع بيانات المدينة (Urban Data Platform)",
      "نظام ذكاء اصطناعي يتنبأ بالاتجاهات المستقبلية للمدينة أو السوق",
    ],
  },
];

const timeline = [
  {
    date: "19 أبريل 2026",
    title: "الإعلان وبداية التسجيل",
    type: "launch" as const,
  },
  {
    date: "20 أبريل 2026",
    title: "اللقاء التعريفي وورشة التعريف بالمعسكر",
    type: "workshop" as const,
  },
  {
    date: "22 أبريل 2026",
    title: "ورشة مسار الطاقة الذكية والاستدامة",
    type: "workshop" as const,
  },
  {
    date: "26 أبريل 2026",
    title: "ورشة مسار الأصول الذكية والعمليات الميدانية",
    type: "workshop" as const,
  },
  {
    date: "27 أبريل 2026",
    title: "ورشة مسار الخدمات الرقمية وتجربة المستفيد",
    type: "workshop" as const,
  },
  {
    date: "28 أبريل 2026",
    title: "ورشة مسار البيانات والذكاء المؤسسي",
    type: "workshop" as const,
  },
  {
    date: "28 أبريل 2026",
    title: "إغلاق التسجيل",
    type: "deadline" as const,
  },
  {
    date: "3 مايو 2026",
    title: "ورشة تطوير الأفكار وبناء النماذج الأولية",
    type: "workshop" as const,
  },
  {
    date: "4 مايو 2026",
    title: "ورشة بناء نموذج العمل التجاري",
    type: "workshop" as const,
  },
  {
    date: "5 مايو 2026",
    title: "بناء العروض النهائية (Pitching)",
    type: "workshop" as const,
  },
  {
    date: "12–13 مايو 2026",
    title: "عروض المشاريع والتحكيم",
    type: "final" as const,
  },
  {
    date: "يحدد لاحقاً",
    title: "المعرض الختامي",
    type: "closing" as const,
  },
];

const requirements = [
  "التسجيل وإبداء الرغبة في المشاركة خلال الفترة المحددة وقبل 28 أبريل 2026.",
  "المشاركة الفعّالة في جميع الورش الافتراضية المصاحبة لمسار المعسكر.",
  "الالتزام بحضور الورش الحضورية وفق الجدول والتحديثات الصادرة من الفريق التشغيلي.",
  "تسليم جميع متطلبات ومراحل المشروع في الأوقات المحددة.",
  "الالتزام بالتعليمات والتنبيهات والتحديثات المقدمة طوال فترة المعسكر.",
];

const criteria = [
  { label: "الابتكار والأصالة", icon: Lightbulb },
  { label: "القابلية للتطبيق", icon: CheckCircle },
  { label: "نموذج العمل والاستدامة", icon: TrendingUp },
  { label: "جودة العرض والتقديم", icon: Monitor },
  { label: "القيمة والأثر", icon: Target },
  { label: "استخدام التقنيات الناشئة", icon: Zap },
  { label: "التكامل والجاهزية", icon: Layers },
  { label: "جودة النموذج الأولي", icon: Package },
];

const technologies = [
  { name: "الذكاء الاصطناعي والذكاء التوليدي", icon: Brain, color: "text-purple-500" },
  { name: "إنترنت الأشياء (IoT)", icon: Wifi, color: "text-blue-500" },
  { name: "الواقع الافتراضي والمعزز (VR/AR)", icon: Glasses, color: "text-pink-500" },
  { name: "الحوسبة السحابية", icon: Cloud, color: "text-sky-500" },
  { name: "تحليل البيانات", icon: BarChart3, color: "text-emerald-500" },
  { name: "البلوكتشين", icon: Link2, color: "text-amber-500" },
  { name: "الروبوتات والدرون", icon: Bot, color: "text-red-500" },
];

interface AudienceItem {
  title: string;
  icon: ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
}

const audience: AudienceItem[] = [
  {
    title: "طلاب وطالبات وأعضاء هيئة التدريس بجامعة المجمعة",
    icon: GraduationCap,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    title: "منسوبي المدينة والجهات التابعة لها من الموظفين",
    icon: Briefcase,
    color: "text-emerald-500",
    bgColor: "bg-emerald-50",
  },
  {
    title: "المهتمون بريادة الأعمال والابتكار",
    icon: Lightbulb,
    color: "text-amber-500",
    bgColor: "bg-amber-50",
  },
];

const faqItems = [
  {
    q: "من يمكنه المشاركة في المعسكر؟",
    a: "المعسكر مفتوح لمنسوبي جامعة المجمعة ومدينة الملك عبدالله للطاقة الذرية والمتجددة من الطلاب وأعضاء هيئة التدريس وموظفي المدينة والجهات التابعة لها، والمهتمين بالابتكار الرقمي وبناء الحلول التقنية.",
  },
  {
    q: "هل المعسكر حضوري؟",
    a: "المعسكر يتضمن ورشات أونلاين، ويوم عرض المشاريع يتطلب حضور.",
  },
  {
    q: "كم عدد أعضاء الفريق؟",
    a: "يتكون الفريق من 2 إلى 5 أعضاء.",
  },
  {
    q: "كيف يتم التقييم؟",
    a: "يتم التقييم بحسب معايير التقييم المعتمدة المذكورة، وتشمل وضوح المشكلة، والابتكار، والقيمة والأثر، والقابلية للتطبيق، وجودة النموذج الأولي، واستخدام التقنيات الناشئة، وقابلية التوسع، وجودة العرض وتكامل المشروع.",
  },
  {
    q: "من يملك حقوق الفكرة؟",
    a: "حقوق الفكرة تعود لصاحبها.",
  },
  {
    q: "بماذا يتميز هذا المعسكر؟",
    a: "يمتاز المعسكر بربطه بين التحول الرقمي والابتكار المفتوح والاستدامة، وبتقديمه تحديات تطبيقية واقعية، وورش عمل متخصصة، وإرشاد يساعد على تحويل الأفكار إلى حلول قابلة للتنفيذ داخل بيئة مؤسسية.",
  },
  {
    q: "هل يوجد ورش عمل؟",
    a: "نعم، يتضمن المعسكر ورش عمل (أونلاين) متخصصة في التحول الرقمي والابتكار المفتوح لتهيئة المشاركين وتزويدهم بالمهارات اللازمة لتطوير الحلول.",
  },
  {
    q: "هل الحضور إلزامي؟",
    a: "نعم، الحضور إلزامي للورشات الأونلاين، وليوم عرض المشاريع (حضوري).",
  },
  {
    q: "أين يقام المعسكر؟",
    a: "المعسكر التدريبي يقدم عبر ورشات أونلاين.",
  },
  {
    q: "هل التقديم فردي أو جماعي؟",
    a: "متاح التقديم الفردي والجماعي.",
  },
  {
    q: "كيف يتم التقديم على البرنامج؟",
    a: "يتم التقديم عبر خانة «سجل الآن».",
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

  const headerOffset = window.innerWidth >= 1024 ? 128 : 108;
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

function useActiveSection(ids: readonly string[]) {
  const [activeId, setActiveId] = useState(ids[0] ?? "hero");

  useEffect(() => {
    if (ids.length === 0) {
      return;
    }

    /** يطابق إزاحة scrollToId حتى يتطابق «القسم النشط» مع ما يراه المستخدم تحت الهيدر */
    const headerActivationOffset = () => (window.innerWidth >= 1024 ? 128 : 108);

    const computeActive = () => {
      const line = window.scrollY + headerActivationOffset() + 1;
      let next = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const sectionTop = el.getBoundingClientRect().top + window.scrollY;
        if (sectionTop <= line) {
          next = id;
        }
      }
      setActiveId((prev) => (prev === next ? prev : next));
    };

    computeActive();
    window.addEventListener("scroll", computeActive, { passive: true });
    window.addEventListener("resize", computeActive);
    return () => {
      window.removeEventListener("scroll", computeActive);
      window.removeEventListener("resize", computeActive);
    };
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
  const sectionIds = useMemo(() => navItems.map((item) => item.id), []);
  const activeId = useActiveSection(sectionIds);
  const [open, setOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[60] w-full max-w-[100vw] overflow-x-hidden border-b border-[rgba(13,59,102,0.1)] bg-white/[0.93] shadow-[0_6px_28px_rgba(13,59,102,0.07)] backdrop-blur-md supports-[backdrop-filter]:bg-white/88">
        <div className="flex w-full min-w-0 max-w-[100vw] items-center justify-between gap-2 px-2 py-2 sm:gap-3 sm:px-3 sm:py-2.5 md:gap-5 md:px-5 md:py-3.5 lg:px-6">
          {/* الجهة اليمنى (RTL): logo_one — المدينة */}
          <div className="flex shrink-0 items-center">
            <a
              href="#hero"
              className="flex h-11 w-[min(168px,42vw)] max-w-[42vw] items-center justify-end rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-blue)]/35 sm:h-12 sm:w-[min(188px,40vw)] md:h-[3.35rem] md:w-[min(204px,38vw)]"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("hero");
              }}
            >
              <img
                src="/logo_one.png"
                alt="مدينة الملك عبدالله للطاقة الذرية والمتجددة"
                className="h-full w-full max-h-full object-contain object-right"
                width={200}
                height={56}
                decoding="async"
              />
            </a>
          </div>

          <div className="flex min-w-0 flex-1 items-center justify-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[rgba(13,59,102,0.1)] bg-white text-[var(--brand-blue)] transition hover:bg-[rgba(13,59,102,0.04)] sm:h-10 sm:w-10 xl:hidden"
              aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            <nav className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 overflow-x-auto overflow-y-visible xl:flex xl:px-1">
              {navItems.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`shrink-0 whitespace-nowrap rounded-full px-2.5 py-2 text-[12px] font-semibold transition duration-300 sm:text-[13px] lg:px-3 lg:py-2.5 lg:text-sm ${
                    activeId === item.id
                      ? "bg-[rgba(13,59,102,0.08)] text-[var(--brand-blue)]"
                      : "text-[var(--text-soft)] hover:bg-[rgba(13,59,102,0.05)] hover:text-[var(--brand-blue)]"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          {/* الجهة اليسرى (RTL): التسجيل + logo_two — الجامعة */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <PrimaryButton href={GOOGLE_FORM_URL} className="hidden px-4 py-2.5 text-xs xl:inline-flex lg:px-5 lg:text-sm">
              سجّل الآن
            </PrimaryButton>
            <a
              href="#hero"
              className="flex size-[3.25rem] shrink-0 items-center justify-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-blue)]/35 sm:size-14 md:size-[3.75rem]"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("hero");
              }}
            >
              <img
                src="/logo_two.png"
                alt="جامعة المجمعة"
                className="h-full w-full object-contain"
                width={180}
                height={180}
                decoding="async"
              />
            </a>
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-x-0 top-[3.65rem] z-50 mx-0 max-h-[min(78vh,calc(100dvh-4.25rem))] overflow-y-auto border-y border-[rgba(13,59,102,0.08)] bg-white/97 px-3 py-4 shadow-[0_20px_60px_rgba(13,59,102,0.14)] backdrop-blur-xl sm:top-[4.15rem] md:top-[4.35rem] xl:hidden">
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
  const countdown = useCountdown("2026-04-28T23:59:00+03:00");

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
          <div className="flex justify-end" />

          <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
            <h1 className="max-w-4xl text-balance text-[clamp(2.35rem,8vw,5.75rem)] font-black leading-[1.12] sm:leading-[1.16]">
              معسكر الابتكار الرقمي والمفتوح (2)
            </h1>
            <p className="mt-6 max-w-3xl text-sm leading-7 text-white/88 sm:text-base sm:leading-8 md:text-xl md:leading-9">
              معسكر يهدف إلى تمكين الكفاءات الوطنية من تطوير حلول رقمية مبتكرة تدعم التحول الرقمي والاستدامة
            </p>

            <p className="mt-8 text-sm font-semibold tracking-wide text-white/70">
              الوقت المتبقي على إغلاق التسجيل
            </p>
            <div className="mt-3 grid w-full max-w-4xl grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
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
            <PrimaryButton 
            href={GOOGLE_FORM_URL} 
            className="w-full sm:w-auto" 
            onClick={() => { 
              if (typeof window !== "undefined" && (window as any).gtag) { 
                 (window as any).gtag("event", "register_click"); }}}
            >سجل الآن
            </PrimaryButton>
              <SecondaryButton to="about">اكتشف المزيد</SecondaryButton>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm leading-6 text-white/78">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md">
                <Calendar className="h-3.5 w-3.5 shrink-0" />
                من 20 أبريل إلى 13 مايو
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md">
                <MapPin className="h-3.5 w-3.5 shrink-0" />
                جامعة المجمعة
              </span>
            </div>
          </div>

          <div className="mt-10 flex justify-center">
            <button
              onClick={() => scrollToId("about")}
              className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/10 px-4 py-2 text-sm font-semibold text-white/82 backdrop-blur-md transition hover:bg-white/14"
            >
              <Clock3 className="h-4 w-4" />
              اكتشف المزيد
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
      <div className="container">
        <SectionTitle>عن المعسكر</SectionTitle>
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="space-y-4 text-base leading-loose text-[var(--text-soft)] md:text-lg">
              <p>
                يأتي معسكر الابتكار الرقمي والمفتوح كمنصة عملية تهدف إلى تمكين المشاركين من تطوير حلول رقمية مبتكرة، ضمن بيئة تفاعلية تجمع بين التفكير التصميمي، وريادة الأعمال التقنية، والتطبيق العملي.
              </p>
              <p>
                حيث يرافق المعسكر المشاركين في رحلة متكاملة تبدأ من بلورة الفكرة، وتمتد إلى بناء نموذج أولي قابل للتنفيذ.
              </p>
              <p>
                يركز المعسكر على توظيف أحدث التقنيات مثل الذكاء الاصطناعي، وإنترنت الأشياء، وتحليل البيانات، بما يسهم في تحسين الكفاءة التشغيلية، وتعزيز تجربة المستفيد، ودعم مفاهيم الاستدامة والابتكار المؤسسي في مجالات حيوية متنوعة.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                { value: "4", label: "مسارات رئيسية" },
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
      </div>
    </section>
  );
}

function ObjectivesSection() {
  return (
    <section id="objectives" className="section-block section-fade-up bg-[linear-gradient(180deg,rgba(13,59,102,0.03),transparent_55%)]">
      <div className="container">
        <SectionTitle>الأهداف</SectionTitle>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
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
                <h3 className="mt-6 text-lg font-bold text-[var(--brand-ink)]">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.description}</p>
              </article>
            );
          })}
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
        <SectionTitle>المسارات</SectionTitle>

        <div className="mb-8 overflow-hidden rounded-[34px] border border-white/70 shadow-[0_30px_90px_rgba(13,59,102,0.10)]">
          <img src={TRACKS_IMAGE} alt="المسارات التقنية والابتكارية للمعسكر" className="h-[220px] w-full object-cover sm:h-[260px] md:h-[340px]" loading="lazy" decoding="async" />
        </div>

        <div className="grid gap-5 xl:grid-cols-2">
          {tracks.map((track, index) => {
            const isOpen = expanded === index;
            return (
              <article
                key={track.id}
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
                    <ChevronDown className={`h-5 w-5 text-[var(--brand-blue)] transition duration-300 ${isOpen ? "rotate-180" : ""}`} />
                  </div>
                  <h3 className="mt-5 text-2xl font-bold text-[var(--brand-ink)]">{track.title}</h3>
                  <p className="mt-3 text-base leading-8 text-[var(--text-soft)]">{track.description}</p>
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
        <SectionTitle>الجدول الزمني</SectionTitle>

        <div className="relative mx-auto max-w-5xl">
          <div className="absolute right-5 top-0 hidden h-full w-px bg-[rgba(13,59,102,0.10)] md:block" />
          <div
            className="absolute right-5 top-0 hidden w-px bg-[linear-gradient(180deg,var(--brand-gold),var(--brand-orange))] shadow-[0_0_25px_rgba(242,168,72,0.5)] transition-all duration-700 md:block"
            style={{ height: `${Math.min(100, visible * (100 / timeline.length))}%` }}
          />

          <div className="space-y-5 md:space-y-8">
            {timeline.map((item, index) => (
              <article
                key={`${item.date}-${item.title}`}
                data-index={index}
                className="timeline-card relative md:pr-16"
              >
                <div className="absolute right-[11px] top-8 hidden h-3 w-3 rounded-full border-4 border-white bg-[var(--brand-gold)] shadow-[0_0_0_8px_rgba(242,168,72,0.12)] md:block" />
                <div
                  className={`rounded-[30px] border p-6 shadow-[0_20px_60px_rgba(13,59,102,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(13,59,102,0.10)] ${
                    item.type === "deadline"
                      ? "border-[rgba(219,127,44,0.38)] bg-[linear-gradient(135deg,rgba(219,127,44,0.1),#ffffff)] shadow-[0_14px_44px_rgba(219,127,44,0.1)] ring-1 ring-[rgba(219,127,44,0.12)]"
                      : item.type === "final"
                        ? "border-[rgba(13,59,102,0.14)] bg-[linear-gradient(135deg,rgba(242,168,72,0.1),#ffffff)] shadow-[0_14px_44px_rgba(13,59,102,0.06)]"
                        : "border-[rgba(13,59,102,0.08)] bg-white"
                  }`}
                >
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="rounded-full border border-[rgba(242,168,72,0.22)] bg-[rgba(242,168,72,0.08)] px-4 py-2 text-sm font-bold text-[var(--brand-orange)]">
                        {item.date}
                      </div>
                      {item.type === "deadline" && item.title === "إغلاق التسجيل" ? (
                        <span className="rounded-full border border-[rgba(219,127,44,0.35)] bg-white/90 px-3 py-1 text-xs font-bold text-[var(--brand-orange)]">
                          موعد نهائي
                        </span>
                      ) : null}
                    </div>
                    <div className="text-sm font-semibold text-[var(--brand-blue)]">المرحلة {formatNumber(index + 1)}</div>
                  </div>
                  <h3 className="mt-5 text-2xl font-bold text-[var(--brand-ink)]">{item.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CriteriaSection() {
  return (
    <section id="criteria" className="section-block section-fade-up">
      <div className="container">
        <SectionTitle>معايير التقييم</SectionTitle>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {criteria.map((item, index) => {
            const Icon = item.icon;
            return (
              <article key={item.label} className="group rounded-[26px] border border-[rgba(13,59,102,0.08)] bg-white px-5 py-6 shadow-[0_16px_45px_rgba(13,59,102,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_65px_rgba(13,59,102,0.09)]">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[linear-gradient(135deg,rgba(13,59,102,0.10),rgba(242,168,72,0.10))] text-[var(--brand-blue)]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-bold text-[var(--brand-gold)]">{formatNumber(index + 1)}</span>
                </div>
                <h3 className="text-base font-bold text-[var(--brand-ink)] leading-7">{item.label}</h3>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function TechnologiesSection() {
  return (
    <section id="technologies" className="section-block section-fade-up">
      <div className="container">
        <SectionTitle>التقنيات الداعمة</SectionTitle>
        <div className="grid grid-cols-2 gap-5 md:grid-cols-4 lg:grid-cols-7">
          {technologies.map((tech) => {
            const Icon = tech.icon;
            return (
              <article key={tech.name} className="flex flex-col items-center rounded-[24px] border border-[rgba(13,59,102,0.08)] bg-white px-4 py-6 text-center shadow-[0_16px_45px_rgba(13,59,102,0.05)] transition duration-300 hover:scale-105 hover:shadow-md">
                <Icon className={`h-14 w-14 ${tech.color} mb-4`} />
                <span className="text-sm font-semibold leading-6 text-[var(--brand-ink)] md:text-base">{tech.name}</span>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function AudienceSection() {
  return (
    <section id="audience" className="section-block section-fade-up">
      <div className="container">
        <SectionTitle>الفئات المستهدفة</SectionTitle>
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
          {audience.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="mx-auto flex aspect-square w-full max-w-xs flex-col items-center justify-center rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm transition hover:shadow-md md:max-w-none"
              >
                <div className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full ${item.bgColor}`}>
                  <Icon className={`h-8 w-8 ${item.color}`} />
                </div>
                <h3 className="text-base font-bold leading-tight text-slate-800 md:text-lg">{item.title}</h3>
              </div>
            );
          })}
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
    <section
      id="awards"
      className="section-fade-up relative overflow-hidden bg-[linear-gradient(150deg,#0d5278_0%,#1484b8_42%,#07ace9_68%,#0b5f8c_100%)] py-20 text-white"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,40,62,0.2),transparent_42%,rgba(5,45,68,0.18))]"
        aria-hidden
      />
      <div className="container relative">
        <div className="mx-auto mb-12 max-w-4xl text-center">
          <h2 className="mb-4 text-balance text-5xl font-black leading-[1.08] tracking-tight text-white md:text-6xl lg:text-7xl [text-shadow:0_2px_22px_rgba(0,35,55,0.38)]">
            جوائز
          </h2>
          <p className="text-balance text-[clamp(2.4rem,8vw,4.75rem)] font-black leading-[1.08] tracking-tight text-white [text-shadow:0_2px_22px_rgba(0,35,55,0.38)]">
            تصل إلى 50,000 ريال
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6" dir="rtl">
            <div className="rounded-2xl border border-white/20 bg-white/10 p-7 text-center backdrop-blur-sm">
              <p className="mb-3 text-[clamp(1.6rem,5vw,2.4rem)] font-black leading-tight text-white [text-shadow:0_2px_16px_rgba(0,35,55,0.35)]">
                30,000 ريال
              </p>
              <p className="text-base font-semibold leading-relaxed text-white/90 md:text-lg">
                للمشاريع الفائزة
              </p>
            </div>
            <div className="rounded-2xl border border-white/20 bg-white/10 p-7 text-center backdrop-blur-sm">
              <p className="mb-3 text-[clamp(1.6rem,5vw,2.4rem)] font-black leading-tight text-white [text-shadow:0_2px_16px_rgba(0,35,55,0.35)]">
                20,000 ريال
              </p>
              <p className="text-base font-semibold leading-relaxed text-white/90 md:text-lg">
                دعم لتطوير المشاريع الواعدة بعد المعسكر
              </p>
            </div>
          </div>
        </div>

        <p className="mx-auto mt-12 max-w-2xl text-center text-sm font-medium leading-relaxed text-white/80 [text-shadow:0_1px_10px_rgba(0,35,55,0.35)] md:text-base">
          وفرص تمكين واحتضان للحلول المميزة
        </p>
      </div>
    </section>
  );
}

function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="section-block section-fade-up bg-[linear-gradient(180deg,rgba(13,59,102,0.03),transparent_75%)]">
      <div className="container max-w-4xl">
        <SectionTitle>الأسئلة الشائعة</SectionTitle>

        <div className="space-y-4" dir="rtl">
          {faqItems.map((item, index) => {
            const open = openIndex === index;
            return (
              <article key={item.q} className="rounded-[28px] border border-[rgba(13,59,102,0.08)] bg-white shadow-[0_16px_45px_rgba(13,59,102,0.05)]">
                <button
                  onClick={() => setOpenIndex(open ? null : index)}
                  className="flex w-full flex-row-reverse items-start justify-between gap-4 px-6 py-5 text-right sm:px-7"
                  aria-expanded={open}
                >
                  <ChevronDown className={`mt-1 h-5 w-5 shrink-0 text-[var(--brand-blue)] transition duration-300 ${open ? "rotate-180" : ""}`} />
                  <div className="flex-1 text-base font-bold leading-8 text-[var(--brand-ink)] sm:text-lg">{item.q}</div>
                </button>
                <div className={`grid transition-all duration-500 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <div className="border-t border-[rgba(13,59,102,0.06)] px-6 py-5 text-right text-sm leading-8 text-slate-600 sm:px-7 sm:text-base sm:leading-8">
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
        <div className="py-16 text-center">
          <h2 className="mb-8 text-3xl font-bold text-slate-900 md:text-4xl">
            هل أنت جاهز لتطوير حل رقمي نوعي داخل بيئة ابتكار تطبيقية؟
          </h2>
          <a
            href={GOOGLE_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#1e3a5f] px-10 py-4 text-lg font-bold text-white shadow-lg transition-all hover:bg-[#2a4a73] hover:shadow-xl"
          >
            سجل الآن
          </a>
        </div>
      </div>
    </section>
  );
}

function FloatingWhatsAppButton() {
  return (
    <a
      href={WHATSAPP_GROUP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="قروب الاستفسارات على واتساب"
      className="fixed bottom-[max(0.9rem,env(safe-area-inset-bottom))] left-[max(0.9rem,env(safe-area-inset-left))] z-50 inline-flex items-center gap-3 rounded-full bg-[#1e3a5f] px-6 py-3 text-base font-bold text-white shadow-md transition-all hover:bg-[#2a4a73] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35 sm:bottom-[max(1.2rem,env(safe-area-inset-bottom))] sm:left-[max(1.2rem,env(safe-area-inset-left))] sm:px-8 sm:py-3.5 sm:text-lg"
    >
      <MessageCircle className="h-5 w-5 shrink-0 text-white" />
      <span className="whitespace-nowrap leading-none">قروب الاستفسارات</span>
    </a>
  );
}

function Footer() {
  const handleSectionLink = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    scrollToId(id);
  };

  return (
    <footer
      id="footer"
      className="mt-auto border-t border-[rgba(13,59,102,0.12)] bg-[linear-gradient(180deg,#f0f6fc_0%,#e4edf6_100%)] py-12 text-[var(--brand-ink)]"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-3 text-xl font-bold text-[var(--brand-blue)]">معسكر الابتكار الرقمي والمفتوح 2026</h3>
            <p className="text-sm leading-relaxed text-[var(--text-soft)]">
              بالتعاون بين جامعة المجمعة ومدينة الملك عبدالله للطاقة الذرية والمتجددة (K·A·CARE)
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-base font-bold text-[var(--brand-blue)]">روابط سريعة</h4>
            <ul className="space-y-2 text-sm text-[var(--text-soft)]">
              <li>
                <a
                  href="#about"
                  onClick={(e) => handleSectionLink(e, "about")}
                  className="transition hover:text-[var(--brand-ink)]"
                >
                  عن المعسكر
                </a>
              </li>
              <li>
                <a
                  href="#tracks"
                  onClick={(e) => handleSectionLink(e, "tracks")}
                  className="transition hover:text-[var(--brand-ink)]"
                >
                  المسارات
                </a>
              </li>
              <li>
                <a
                  href="#timeline"
                  onClick={(e) => handleSectionLink(e, "timeline")}
                  className="transition hover:text-[var(--brand-ink)]"
                >
                  الجدول الزمني
                </a>
              </li>
              <li>
                <a href="#faq" onClick={(e) => handleSectionLink(e, "faq")} className="transition hover:text-[var(--brand-ink)]">
                  الأسئلة الشائعة
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-base font-bold text-[var(--brand-blue)]">تواصل معنا</h4>
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
    <div dir="rtl" className="flex min-h-screen max-w-[100vw] flex-col overflow-x-hidden bg-[var(--page-bg)] text-[var(--brand-ink)]">
      <RevealObserver />
      <ScrollProgressBar />
      <Header />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <ObjectivesSection />
        <TracksSection />
        <AwardsSection />
        <TimelineSection />
        <ListCardSection
          id="requirements"
          title="شروط المشاركة"
          body="المشاركة في المعسكر ترتبط بالالتزام الزمني والتفاعل الفعّال مع الأنشطة والورش والتسليمات خلال كامل الرحلة التنفيذية."
          items={requirements}
          columns={2}
        />
        <CriteriaSection />
        <TechnologiesSection />
        <AudienceSection />
        <FaqSection />
        <RegistrationSection />
      </main>
      <Footer />
      <FloatingWhatsAppButton />
    </div>
  );
}
