import { useEffect, useRef, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import {
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Edit2,
  ImagePlus,
  LogOut,
  Newspaper,
  Plus,
  Save,
  Shield,
  Trash2,
  Trophy,
  X,
} from "lucide-react";
import { isSupabaseConfigured, supabase } from "../lib/supabase";
import {
  createNewsArticle,
  deleteNewsArticle,
  getAllNewsArticlesAdmin,
  updateNewsArticle,
  uploadNewsImage,
  type SupabaseNewsArticle,
} from "../services/newsService";
import {
  addGalleryImage,
  deleteGalleryImage,
  getAllGalleryAdmin,
  getAllWinnersAdmin,
  updatePreviousEditionWinner,
  uploadGalleryImage,
  uploadWinnerImage,
  type SupabaseGalleryImage,
  type SupabaseWinner,
} from "../services/previousEditionService";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function cls(...args: (string | false | undefined | null)[]) {
  return args.filter(Boolean).join(" ");
}

// ─── Shared UI ────────────────────────────────────────────────────────────────

function Label({ children }: { children: React.ReactNode }) {
  return <label className="block text-sm font-semibold text-[var(--brand-ink)]">{children}</label>;
}

function Input({
  value,
  onChange,
  placeholder,
  type = "text",
  required,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
      className="w-full rounded-lg border border-[rgba(13,59,102,0.2)] bg-white px-3 py-2 text-sm text-[var(--brand-ink)] outline-none focus:border-[var(--brand-blue)] focus:ring-2 focus:ring-[var(--brand-blue)]/15"
    />
  );
}

function Textarea({
  value,
  onChange,
  placeholder,
  rows = 4,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full rounded-lg border border-[rgba(13,59,102,0.2)] bg-white px-3 py-2 text-sm text-[var(--brand-ink)] outline-none focus:border-[var(--brand-blue)] focus:ring-2 focus:ring-[var(--brand-blue)]/15"
    />
  );
}

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2">
      <div
        onClick={() => onChange(!checked)}
        className={cls(
          "relative h-5 w-9 rounded-full transition-colors",
          checked ? "bg-[var(--brand-blue)]" : "bg-gray-200",
        )}
      >
        <span
          className={cls(
            "absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform",
            checked ? "translate-x-4" : "translate-x-0.5",
          )}
        />
      </div>
      <span className="text-sm text-[var(--text-soft)]">{label}</span>
    </label>
  );
}

function Btn({
  children,
  onClick,
  variant = "primary",
  type = "button",
  disabled,
  small,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "danger" | "ghost" | "outline";
  type?: "button" | "submit";
  disabled?: boolean;
  small?: boolean;
}) {
  const base = "inline-flex items-center gap-1.5 rounded-lg font-semibold transition disabled:opacity-50";
  const size = small ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm";
  const variants = {
    primary: "bg-[var(--brand-blue)] text-white hover:bg-[var(--brand-blue-2)]",
    danger: "bg-red-500 text-white hover:bg-red-600",
    ghost: "text-[var(--text-soft)] hover:text-[var(--brand-ink)]",
    outline:
      "border border-[rgba(13,59,102,0.2)] text-[var(--brand-ink)] hover:border-[rgba(13,59,102,0.4)] bg-white",
  };

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls(base, size, variants[variant])}>
      {children}
    </button>
  );
}

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
    </div>
  );
}

function Alert({ msg, type }: { msg: string; type: "error" | "success" }) {
  return (
    <div
      className={cls(
        "rounded-lg px-4 py-3 text-sm font-medium",
        type === "error" ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700",
      )}
    >
      {msg}
    </div>
  );
}

// ─── Image Upload Button ───────────────────────────────────────────────────────

function ImageUploadBtn({
  onUploaded,
  label,
  uploading,
  setUploading,
}: {
  onUploaded: (url: string) => void;
  label?: string;
  uploading: boolean;
  setUploading: (v: boolean) => void;
}) {
  const ref = useRef<HTMLInputElement>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadNewsImage(file);
      onUploaded(url);
    } catch (err) {
      alert("فشل رفع الصورة: " + String(err));
    } finally {
      setUploading(false);
      if (ref.current) ref.current.value = "";
    }
  }

  return (
    <>
      <input ref={ref} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      <Btn variant="outline" onClick={() => ref.current?.click()} disabled={uploading} small>
        <ImagePlus className="h-3.5 w-3.5" />
        {uploading ? "جارٍ الرفع…" : (label ?? "رفع صورة")}
      </Btn>
    </>
  );
}

// ─── News Article Form ─────────────────────────────────────────────────────────

type ArticleFormData = {
  title: string;
  slug: string;
  date: string;
  date_iso: string;
  summary: string;
  content_text: string; // raw textarea, split by \n\n
  main_image_url: string;
  extra_images_text: string; // newline-separated URLs
  is_published: boolean;
};

const emptyArticleForm = (): ArticleFormData => ({
  title: "",
  slug: "",
  date: "",
  date_iso: "",
  summary: "",
  content_text: "",
  main_image_url: "",
  extra_images_text: "",
  is_published: true,
});

function articleToForm(a: SupabaseNewsArticle): ArticleFormData {
  return {
    title: a.title,
    slug: a.slug,
    date: a.date,
    date_iso: a.date_iso,
    summary: a.summary,
    content_text: (a.content ?? []).join("\n\n"),
    main_image_url: a.main_image_url ?? "",
    extra_images_text: (a.extra_images ?? []).join("\n"),
    is_published: a.is_published,
  };
}

function formToArticlePayload(f: ArticleFormData): Omit<SupabaseNewsArticle, "id" | "created_at"> {
  return {
    title: f.title,
    slug: f.slug,
    date: f.date,
    date_iso: f.date_iso,
    summary: f.summary,
    content: f.content_text
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean),
    main_image_url: f.main_image_url || undefined,
    extra_images: f.extra_images_text
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean),
    is_published: f.is_published,
  };
}

function ArticleForm({
  initial,
  onSave,
  onCancel,
}: {
  initial?: SupabaseNewsArticle;
  onSave: () => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<ArticleFormData>(initial ? articleToForm(initial) : emptyArticleForm());
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const extraImgRef = useRef<HTMLInputElement>(null);
  const [uploadingExtra, setUploadingExtra] = useState(false);

  function set<K extends keyof ArticleFormData>(key: K, val: ArticleFormData[K]) {
    setForm((f) => ({ ...f, [key]: val }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const payload = formToArticlePayload(form);
      if (initial) {
        await updateNewsArticle(initial.id, payload);
      } else {
        await createNewsArticle(payload);
      }
      onSave();
    } catch (err) {
      setError("حدث خطأ: " + String(err));
    } finally {
      setSaving(false);
    }
  }

  async function handleExtraImageFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingExtra(true);
    try {
      const url = await uploadNewsImage(file);
      set("extra_images_text", form.extra_images_text ? form.extra_images_text + "\n" + url : url);
    } catch (err) {
      alert("فشل رفع الصورة: " + String(err));
    } finally {
      setUploadingExtra(false);
      if (extraImgRef.current) extraImgRef.current.value = "";
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-[rgba(13,59,102,0.1)] bg-[#f8fbff] p-5">
      <h3 className="font-bold text-[var(--brand-blue)]">{initial ? "تعديل الخبر" : "إضافة خبر جديد"}</h3>

      {error && <Alert msg={error} type="error" />}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField label="العنوان *">
          <Input value={form.title} onChange={(v) => set("title", v)} placeholder="عنوان الخبر" required />
        </FormField>
        <FormField label="الرابط (slug) *">
          <Input value={form.slug} onChange={(v) => set("slug", v)} placeholder="alwarsha-aloula" required />
        </FormField>
        <FormField label="التاريخ (نص عربي)">
          <Input value={form.date} onChange={(v) => set("date", v)} placeholder="٢١ أبريل ٢٠٢٦" />
        </FormField>
        <FormField label="التاريخ (YYYY-MM-DD) *">
          <Input value={form.date_iso} onChange={(v) => set("date_iso", v)} placeholder="2026-04-21" type="date" required />
        </FormField>
      </div>

      <FormField label="الملخص">
        <Textarea value={form.summary} onChange={(v) => set("summary", v)} placeholder="ملخص مختصر للخبر" rows={2} />
      </FormField>

      <FormField label="المحتوى (كل سطر = فقرة)">
        <Textarea
          value={form.content_text}
          onChange={(v) => set("content_text", v)}
          placeholder="الفقرة الأولى&#10;الفقرة الثانية"
          rows={6}
        />
      </FormField>

      <FormField label="الصورة الرئيسية">
        <div className="flex flex-wrap items-center gap-2">
          <Input
            value={form.main_image_url}
            onChange={(v) => set("main_image_url", v)}
            placeholder="https://... أو ارفع صورة"
          />
          <ImageUploadBtn
            onUploaded={(url) => set("main_image_url", url)}
            uploading={uploading}
            setUploading={setUploading}
          />
        </div>
        {form.main_image_url && (
          <img src={form.main_image_url} alt="" className="mt-2 h-24 rounded-lg object-cover" />
        )}
      </FormField>

      <FormField label="صور إضافية (رابط واحد في كل سطر)">
        <Textarea
          value={form.extra_images_text}
          onChange={(v) => set("extra_images_text", v)}
          placeholder="https://..."
          rows={3}
        />
        <div className="mt-1">
          <input ref={extraImgRef} type="file" accept="image/*" className="hidden" onChange={handleExtraImageFile} />
          <Btn variant="outline" onClick={() => extraImgRef.current?.click()} disabled={uploadingExtra} small>
            <ImagePlus className="h-3.5 w-3.5" />
            {uploadingExtra ? "جارٍ الرفع…" : "رفع صورة إضافية"}
          </Btn>
        </div>
      </FormField>

      <Toggle checked={form.is_published} onChange={(v) => set("is_published", v)} label="منشور" />

      <div className="flex gap-2 pt-1">
        <Btn type="submit" disabled={saving}>
          <Save className="h-4 w-4" />
          {saving ? "جارٍ الحفظ…" : "حفظ"}
        </Btn>
        <Btn variant="ghost" onClick={onCancel}>
          <X className="h-4 w-4" />
          إلغاء
        </Btn>
      </div>
    </form>
  );
}

// ─── News Admin Tab ────────────────────────────────────────────────────────────

function NewsAdminTab() {
  const [articles, setArticles] = useState<SupabaseNewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<SupabaseNewsArticle | null>(null);
  const [success, setSuccess] = useState("");

  async function load() {
    setLoading(true);
    try {
      const data = await getAllNewsArticlesAdmin();
      setArticles(data);
    } catch (err) {
      setError("فشل تحميل الأخبار: " + String(err));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleDelete(id: string, title: string) {
    if (!confirm(`حذف "${title}"؟`)) return;
    try {
      await deleteNewsArticle(id);
      setSuccess("تم الحذف بنجاح");
      load();
    } catch (err) {
      setError("فشل الحذف: " + String(err));
    }
  }

  function handleSaved() {
    setShowForm(false);
    setEditing(null);
    setSuccess("تم الحفظ بنجاح");
    load();
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-[var(--brand-ink)]">إدارة الأخبار</h2>
        <Btn onClick={() => { setShowForm(true); setEditing(null); }}>
          <Plus className="h-4 w-4" />
          إضافة خبر
        </Btn>
      </div>

      {error && <Alert msg={error} type="error" />}
      {success && <Alert msg={success} type="success" />}

      {(showForm && !editing) && (
        <ArticleForm
          onSave={handleSaved}
          onCancel={() => setShowForm(false)}
        />
      )}

      {editing && (
        <ArticleForm
          initial={editing}
          onSave={handleSaved}
          onCancel={() => setEditing(null)}
        />
      )}

      {loading ? (
        <div className="flex justify-center py-10">
          <div className="h-7 w-7 animate-spin rounded-full border-4 border-[var(--brand-blue)] border-t-transparent" />
        </div>
      ) : articles.length === 0 ? (
        <p className="text-center text-sm text-[var(--text-soft)]">لا توجد أخبار بعد.</p>
      ) : (
        <div className="divide-y divide-[rgba(13,59,102,0.07)] rounded-xl border border-[rgba(13,59,102,0.1)] bg-white">
          {articles.map((a) => (
            <div key={a.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-[var(--brand-ink)]">{a.title}</p>
                <p className="mt-0.5 text-xs text-[var(--text-soft)]">
                  {a.date_iso}
                  {!a.is_published && (
                    <span className="mr-2 rounded bg-orange-100 px-1 py-0.5 text-[10px] font-bold text-orange-600">
                      مسودة
                    </span>
                  )}
                </p>
              </div>
              <div className="flex shrink-0 gap-2">
                <Btn variant="outline" small onClick={() => { setEditing(a); setShowForm(false); }}>
                  <Edit2 className="h-3.5 w-3.5" />
                  تعديل
                </Btn>
                <Btn variant="danger" small onClick={() => handleDelete(a.id, a.title)}>
                  <Trash2 className="h-3.5 w-3.5" />
                  حذف
                </Btn>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Winner Edit Form ─────────────────────────────────────────────────────────

function WinnerEditForm({
  winner,
  onSave,
  onCancel,
}: {
  winner: SupabaseWinner;
  onSave: () => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState({
    project_name: winner.project_name,
    rank_label: winner.rank_label,
    team_names: winner.team_names,
    description: winner.description,
    medal_type: winner.medal_type,
    is_published: winner.is_published,
    image_url: winner.image_url ?? "",
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const imgRef = useRef<HTMLInputElement>(null);

  function set<K extends keyof typeof form>(key: K, val: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: val }));
  }

  async function handleImgFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadWinnerImage(file);
      set("image_url", url);
    } catch (err) {
      alert("فشل رفع الصورة: " + String(err));
    } finally {
      setUploading(false);
      if (imgRef.current) imgRef.current.value = "";
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await updatePreviousEditionWinner(winner.id, {
        ...form,
        image_url: form.image_url || undefined,
      });
      onSave();
    } catch (err) {
      setError("حدث خطأ: " + String(err));
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-[rgba(13,59,102,0.1)] bg-[#f8fbff] p-5">
      <h3 className="font-bold text-[var(--brand-blue)]">تعديل الفائز — {winner.rank_label}</h3>
      {error && <Alert msg={error} type="error" />}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField label="اسم المشروع">
          <Input value={form.project_name} onChange={(v) => set("project_name", v)} />
        </FormField>
        <FormField label="المرتبة (نص)">
          <Input value={form.rank_label} onChange={(v) => set("rank_label", v)} placeholder="المركز الأول" />
        </FormField>
      </div>

      <FormField label="أسماء الفريق">
        <Textarea value={form.team_names} onChange={(v) => set("team_names", v)} rows={2} />
      </FormField>

      <FormField label="وصف المشروع">
        <Textarea value={form.description} onChange={(v) => set("description", v)} rows={4} />
      </FormField>

      <FormField label="نوع الميدالية">
        <select
          value={form.medal_type}
          onChange={(e) => set("medal_type", e.target.value as SupabaseWinner["medal_type"])}
          className="w-full rounded-lg border border-[rgba(13,59,102,0.2)] bg-white px-3 py-2 text-sm"
        >
          <option value="gold">ذهبية</option>
          <option value="silver">فضية</option>
          <option value="bronze">برونزية</option>
        </select>
      </FormField>

      <FormField label="صورة المشروع">
        <div className="flex flex-wrap items-center gap-2">
          <Input value={form.image_url} onChange={(v) => set("image_url", v)} placeholder="https://..." />
          <input ref={imgRef} type="file" accept="image/*" className="hidden" onChange={handleImgFile} />
          <Btn variant="outline" onClick={() => imgRef.current?.click()} disabled={uploading} small>
            <ImagePlus className="h-3.5 w-3.5" />
            {uploading ? "جارٍ الرفع…" : "رفع صورة"}
          </Btn>
        </div>
        {form.image_url && (
          <img src={form.image_url} alt="" className="mt-2 h-20 rounded-lg object-cover" />
        )}
      </FormField>

      <Toggle checked={form.is_published} onChange={(v) => set("is_published", v)} label="منشور" />

      <div className="flex gap-2">
        <Btn type="submit" disabled={saving}>
          <Save className="h-4 w-4" />
          {saving ? "جارٍ الحفظ…" : "حفظ"}
        </Btn>
        <Btn variant="ghost" onClick={onCancel}>
          <X className="h-4 w-4" />
          إلغاء
        </Btn>
      </div>
    </form>
  );
}

// ─── Gallery Add Form ──────────────────────────────────────────────────────────

function GalleryAddForm({ onSave, onCancel }: { onSave: () => void; onCancel: () => void }) {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [sortOrder, setSortOrder] = useState("10");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadGalleryImage(file);
      setImageUrl(url);
    } catch (err) {
      alert("فشل رفع الصورة: " + String(err));
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!imageUrl) { setError("يرجى رفع صورة أو إدخال رابطها"); return; }
    setSaving(true);
    setError("");
    try {
      await addGalleryImage({
        title,
        image_url: imageUrl,
        sort_order: parseInt(sortOrder) || 10,
        is_published: true,
      });
      onSave();
    } catch (err) {
      setError("حدث خطأ: " + String(err));
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-[rgba(13,59,102,0.1)] bg-[#f8fbff] p-5">
      <h3 className="font-bold text-[var(--brand-blue)]">إضافة صورة للمعرض</h3>
      {error && <Alert msg={error} type="error" />}

      <FormField label="العنوان">
        <Input value={title} onChange={setTitle} placeholder="عنوان الصورة" />
      </FormField>

      <FormField label="الصورة">
        <div className="flex flex-wrap items-center gap-2">
          <Input value={imageUrl} onChange={setImageUrl} placeholder="https://..." />
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
          <Btn variant="outline" onClick={() => fileRef.current?.click()} disabled={uploading} small>
            <ImagePlus className="h-3.5 w-3.5" />
            {uploading ? "جارٍ الرفع…" : "رفع صورة"}
          </Btn>
        </div>
        {imageUrl && <img src={imageUrl} alt="" className="mt-2 h-20 rounded-lg object-cover" />}
      </FormField>

      <FormField label="الترتيب">
        <Input value={sortOrder} onChange={setSortOrder} type="number" />
      </FormField>

      <div className="flex gap-2">
        <Btn type="submit" disabled={saving}>
          <Save className="h-4 w-4" />
          {saving ? "جارٍ الحفظ…" : "حفظ"}
        </Btn>
        <Btn variant="ghost" onClick={onCancel}>
          <X className="h-4 w-4" />
          إلغاء
        </Btn>
      </div>
    </form>
  );
}

// ─── Previous Edition Admin Tab ────────────────────────────────────────────────

function PreviousEditionAdminTab() {
  const [winners, setWinners] = useState<SupabaseWinner[]>([]);
  const [gallery, setGallery] = useState<SupabaseGalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editingWinner, setEditingWinner] = useState<SupabaseWinner | null>(null);
  const [showGalleryForm, setShowGalleryForm] = useState(false);
  const [winnersOpen, setWinnersOpen] = useState(true);
  const [galleryOpen, setGalleryOpen] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const [w, g] = await Promise.all([getAllWinnersAdmin(), getAllGalleryAdmin()]);
      setWinners(w);
      setGallery(g);
    } catch (err) {
      setError("فشل تحميل البيانات: " + String(err));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function handleDeleteGallery(id: string) {
    if (!confirm("حذف هذه الصورة؟")) return;
    try {
      await deleteGalleryImage(id);
      setSuccess("تم حذف الصورة");
      load();
    } catch (err) {
      setError("فشل الحذف: " + String(err));
    }
  }

  function handleWinnerSaved() {
    setEditingWinner(null);
    setSuccess("تم الحفظ بنجاح");
    load();
  }

  function handleGallerySaved() {
    setShowGalleryForm(false);
    setSuccess("تمت الإضافة بنجاح");
    load();
  }

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold text-[var(--brand-ink)]">إدارة النسخة السابقة</h2>

      {error && <Alert msg={error} type="error" />}
      {success && <Alert msg={success} type="success" />}

      {loading ? (
        <div className="flex justify-center py-10">
          <div className="h-7 w-7 animate-spin rounded-full border-4 border-[var(--brand-blue)] border-t-transparent" />
        </div>
      ) : (
        <>
          {/* Winners section */}
          <div className="rounded-xl border border-[rgba(13,59,102,0.1)] bg-white">
            <button
              type="button"
              className="flex w-full items-center justify-between p-4 text-left"
              onClick={() => setWinnersOpen((o) => !o)}
            >
              <span className="flex items-center gap-2 font-bold text-[var(--brand-ink)]">
                <Trophy className="h-4 w-4 text-[var(--brand-gold)]" />
                الفائزون ({winners.length})
              </span>
              {winnersOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>

            {winnersOpen && (
              <div className="border-t border-[rgba(13,59,102,0.07)] p-4 space-y-3">
                {editingWinner && (
                  <WinnerEditForm
                    winner={editingWinner}
                    onSave={handleWinnerSaved}
                    onCancel={() => setEditingWinner(null)}
                  />
                )}
                {winners.length === 0 ? (
                  <p className="text-sm text-[var(--text-soft)]">لا يوجد فائزون بعد.</p>
                ) : (
                  <div className="divide-y divide-[rgba(13,59,102,0.07)]">
                    {winners.map((w) => (
                      <div key={w.id} className="flex flex-wrap items-center justify-between gap-3 py-2">
                        <div>
                          <p className="font-semibold text-[var(--brand-ink)]">{w.project_name}</p>
                          <p className="text-xs text-[var(--text-soft)]">{w.rank_label}</p>
                        </div>
                        <Btn variant="outline" small onClick={() => setEditingWinner(w)}>
                          <Edit2 className="h-3.5 w-3.5" />
                          تعديل
                        </Btn>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Gallery section */}
          <div className="rounded-xl border border-[rgba(13,59,102,0.1)] bg-white">
            <button
              type="button"
              className="flex w-full items-center justify-between p-4 text-left"
              onClick={() => setGalleryOpen((o) => !o)}
            >
              <span className="flex items-center gap-2 font-bold text-[var(--brand-ink)]">
                <ImagePlus className="h-4 w-4 text-[var(--brand-blue)]" />
                المعرض ({gallery.length})
              </span>
              {galleryOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>

            {galleryOpen && (
              <div className="border-t border-[rgba(13,59,102,0.07)] p-4 space-y-3">
                <div className="flex justify-end">
                  <Btn onClick={() => setShowGalleryForm(true)}>
                    <Plus className="h-4 w-4" />
                    إضافة صورة
                  </Btn>
                </div>

                {showGalleryForm && (
                  <GalleryAddForm onSave={handleGallerySaved} onCancel={() => setShowGalleryForm(false)} />
                )}

                {gallery.length === 0 ? (
                  <p className="text-sm text-[var(--text-soft)]">لا توجد صور في المعرض بعد.</p>
                ) : (
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                    {gallery.map((g) => (
                      <div key={g.id} className="group relative overflow-hidden rounded-lg border border-[rgba(13,59,102,0.1)]">
                        <img
                          src={g.image_url}
                          alt={g.title}
                          className="aspect-[4/3] w-full object-cover"
                        />
                        <div className="absolute inset-0 flex flex-col justify-between bg-black/0 p-2 transition group-hover:bg-black/30">
                          <p className="line-clamp-1 text-[11px] font-bold text-white opacity-0 drop-shadow transition group-hover:opacity-100">
                            {g.title}
                          </p>
                          <button
                            type="button"
                            onClick={() => handleDeleteGallery(g.id)}
                            className="self-end rounded-lg bg-red-500 p-1 text-white opacity-0 transition group-hover:opacity-100"
                            title="حذف"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

// ─── Login Form ────────────────────────────────────────────────────────────────

function LoginForm({ onLogin }: { onLogin: (session: Session) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      if (data.session) onLogin(data.session);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "فشل تسجيل الدخول");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div dir="rtl" className="flex min-h-screen items-center justify-center bg-[var(--page-bg)] p-4">
      <div className="w-full max-w-sm rounded-2xl border border-[rgba(13,59,102,0.12)] bg-white p-8 shadow-[0_8px_40px_rgba(13,59,102,0.1)]">
        <div className="mb-6 flex flex-col items-center gap-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--brand-blue)]">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-xl font-black text-[var(--brand-ink)]">لوحة الإدارة</h1>
          <p className="text-sm text-[var(--text-soft)]">تسجيل الدخول للمتابعة</p>
        </div>

        {error && <Alert msg={error} type="error" />}

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <FormField label="البريد الإلكتروني">
            <Input value={email} onChange={setEmail} type="email" placeholder="admin@example.com" required />
          </FormField>
          <FormField label="كلمة المرور">
            <Input value={password} onChange={setPassword} type="password" placeholder="••••••••" required />
          </FormField>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[var(--brand-blue)] py-2.5 text-sm font-bold text-white transition hover:bg-[var(--brand-blue-2)] disabled:opacity-60"
          >
            {loading ? "جارٍ الدخول…" : "تسجيل الدخول"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

function Dashboard({ session, onLogout }: { session: Session; onLogout: () => void }) {
  const [tab, setTab] = useState<"news" | "previous">("news");

  return (
    <div dir="rtl" className="min-h-screen bg-[var(--page-bg)]">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-[rgba(13,59,102,0.08)] bg-white px-4 py-3">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-[var(--brand-blue)]" />
            <span className="font-bold text-[var(--brand-ink)]">لوحة الإدارة</span>
            <span className="hidden text-xs text-[var(--text-soft)] sm:inline">| {session.user.email}</span>
          </div>
          <button
            type="button"
            onClick={onLogout}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[rgba(13,59,102,0.15)] px-3 py-1.5 text-xs font-semibold text-[var(--text-soft)] transition hover:border-red-300 hover:text-red-600"
          >
            <LogOut className="h-3.5 w-3.5" />
            تسجيل الخروج
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="border-b border-[rgba(13,59,102,0.08)] bg-white">
        <div className="mx-auto flex max-w-5xl gap-1 px-4">
          <button
            type="button"
            onClick={() => setTab("news")}
            className={cls(
              "flex items-center gap-1.5 border-b-2 px-4 py-3 text-sm font-semibold transition",
              tab === "news"
                ? "border-[var(--brand-blue)] text-[var(--brand-blue)]"
                : "border-transparent text-[var(--text-soft)] hover:text-[var(--brand-ink)]",
            )}
          >
            <Newspaper className="h-4 w-4" />
            إدارة الأخبار
          </button>
          <button
            type="button"
            onClick={() => setTab("previous")}
            className={cls(
              "flex items-center gap-1.5 border-b-2 px-4 py-3 text-sm font-semibold transition",
              tab === "previous"
                ? "border-[var(--brand-blue)] text-[var(--brand-blue)]"
                : "border-transparent text-[var(--text-soft)] hover:text-[var(--brand-ink)]",
            )}
          >
            <Trophy className="h-4 w-4" />
            إدارة النسخة السابقة
          </button>
        </div>
      </div>

      {/* Content */}
      <main className="mx-auto max-w-5xl px-4 py-8">
        {tab === "news" ? (
          <NewsAdminTab />
        ) : (
          <PreviousEditionAdminTab />
        )}
      </main>

      <footer className="border-t border-[rgba(13,59,102,0.06)] py-4 text-center text-xs text-[var(--text-soft)]">
        <CheckCircle className="mb-0.5 me-1 inline h-3.5 w-3.5 text-green-500" />
        متصل بـ Supabase
      </footer>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    setSession(null);
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--page-bg)]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[var(--brand-blue)] border-t-transparent" />
      </div>
    );
  }

  if (!isSupabaseConfigured) {
    return (
      <div dir="rtl" className="flex min-h-screen items-center justify-center bg-[var(--page-bg)] p-4 text-center">
        <div>
          <Shield className="mx-auto mb-4 h-12 w-12 text-[var(--text-soft)]/40" />
          <h1 className="text-xl font-bold text-[var(--brand-ink)]">Supabase غير مُهيأ</h1>
          <p className="mt-2 text-sm text-[var(--text-soft)]">
            يرجى إضافة VITE_SUPABASE_URL و VITE_SUPABASE_ANON_KEY في ملف .env
          </p>
        </div>
      </div>
    );
  }

  if (!session) {
    return <LoginForm onLogin={setSession} />;
  }

  return <Dashboard session={session} onLogout={handleLogout} />;
}
