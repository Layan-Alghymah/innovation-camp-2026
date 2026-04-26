import { isSupabaseConfigured, supabase } from "../lib/supabase";

export interface SupabaseWinner {
  id: string;
  rank: number;
  project_name: string;
  rank_label: string;
  team_names: string;
  description: string;
  image_url?: string;
  medal_type: "gold" | "silver" | "bronze";
  is_published: boolean;
}

export interface SupabaseGalleryImage {
  id: string;
  title: string;
  image_url: string;
  category?: string;
  sort_order: number;
  is_published: boolean;
}

export async function getPreviousEditionWinners(): Promise<SupabaseWinner[]> {
  if (!isSupabaseConfigured) return [];
  const { data, error } = await supabase
    .from("previous_edition_winners")
    .select("*")
    .eq("is_published", true)
    .order("rank", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function getAllWinnersAdmin(): Promise<SupabaseWinner[]> {
  if (!isSupabaseConfigured) return [];
  const { data, error } = await supabase
    .from("previous_edition_winners")
    .select("*")
    .order("rank", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function updatePreviousEditionWinner(
  id: string,
  winnerData: Partial<Omit<SupabaseWinner, "id">>,
): Promise<SupabaseWinner> {
  if (!isSupabaseConfigured) throw new Error("Supabase not configured");
  const { data, error } = await supabase
    .from("previous_edition_winners")
    .update(winnerData)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function uploadWinnerImage(file: File): Promise<string> {
  if (!isSupabaseConfigured) throw new Error("Supabase not configured");
  const ext = file.name.split(".").pop() ?? "jpg";
  const filename = `previous-edition/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { error } = await supabase.storage.from("media").upload(filename, file);
  if (error) throw error;
  const {
    data: { publicUrl },
  } = supabase.storage.from("media").getPublicUrl(filename);
  return publicUrl;
}

export async function getPreviousEditionGallery(): Promise<SupabaseGalleryImage[]> {
  if (!isSupabaseConfigured) return [];
  const { data, error } = await supabase
    .from("previous_edition_gallery")
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function getAllGalleryAdmin(): Promise<SupabaseGalleryImage[]> {
  if (!isSupabaseConfigured) return [];
  const { data, error } = await supabase
    .from("previous_edition_gallery")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function addGalleryImage(
  imageData: Omit<SupabaseGalleryImage, "id">,
): Promise<SupabaseGalleryImage> {
  if (!isSupabaseConfigured) throw new Error("Supabase not configured");
  const { data, error } = await supabase
    .from("previous_edition_gallery")
    .insert(imageData)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteGalleryImage(id: string): Promise<void> {
  if (!isSupabaseConfigured) throw new Error("Supabase not configured");
  const { error } = await supabase.from("previous_edition_gallery").delete().eq("id", id);
  if (error) throw error;
}

export async function uploadGalleryImage(file: File): Promise<string> {
  if (!isSupabaseConfigured) throw new Error("Supabase not configured");
  const ext = file.name.split(".").pop() ?? "jpg";
  const filename = `previous-edition/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { error } = await supabase.storage.from("media").upload(filename, file);
  if (error) throw error;
  const {
    data: { publicUrl },
  } = supabase.storage.from("media").getPublicUrl(filename);
  return publicUrl;
}
