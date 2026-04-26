import { isSupabaseConfigured, supabase } from "../lib/supabase";

export interface SupabaseNewsArticle {
  id: string;
  slug: string;
  title: string;
  date: string;
  date_iso: string;
  summary: string;
  content: string[];
  main_image_url?: string;
  extra_images?: string[];
  is_published: boolean;
  created_at: string;
}

export async function getNewsArticles(): Promise<SupabaseNewsArticle[]> {
  if (!isSupabaseConfigured) return [];
  const { data, error } = await supabase
    .from("news_articles")
    .select("*")
    .eq("is_published", true)
    .order("date_iso", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function getAllNewsArticlesAdmin(): Promise<SupabaseNewsArticle[]> {
  if (!isSupabaseConfigured) return [];
  const { data, error } = await supabase
    .from("news_articles")
    .select("*")
    .order("date_iso", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function getNewsArticleBySlug(slug: string): Promise<SupabaseNewsArticle | null> {
  if (!isSupabaseConfigured) return null;
  const { data, error } = await supabase
    .from("news_articles")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();
  if (error) return null;
  return data;
}

export async function createNewsArticle(
  articleData: Omit<SupabaseNewsArticle, "id" | "created_at">,
): Promise<SupabaseNewsArticle> {
  if (!isSupabaseConfigured) throw new Error("Supabase not configured");
  const { data, error } = await supabase
    .from("news_articles")
    .insert(articleData)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateNewsArticle(
  id: string,
  articleData: Partial<Omit<SupabaseNewsArticle, "id" | "created_at">>,
): Promise<SupabaseNewsArticle> {
  if (!isSupabaseConfigured) throw new Error("Supabase not configured");
  const { data, error } = await supabase
    .from("news_articles")
    .update(articleData)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteNewsArticle(id: string): Promise<void> {
  if (!isSupabaseConfigured) throw new Error("Supabase not configured");
  const { error } = await supabase.from("news_articles").delete().eq("id", id);
  if (error) throw error;
}

export async function uploadNewsImage(file: File, folder = "news"): Promise<string> {
  if (!isSupabaseConfigured) throw new Error("Supabase not configured");
  const ext = file.name.split(".").pop() ?? "jpg";
  const filename = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { error } = await supabase.storage.from("media").upload(filename, file);
  if (error) throw error;
  const {
    data: { publicUrl },
  } = supabase.storage.from("media").getPublicUrl(filename);
  return publicUrl;
}
