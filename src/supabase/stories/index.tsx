import { supabase } from "..";

export const getStories = async (title?: string) => {
  try {
    let query = supabase.from("books").select("*");

    if (title) {
      // Use `or` with proper syntax for multiple conditions
      query = query.or(`title_en.ilike.%${title}%,title_ja.ilike.%${title}%`);
    }

    const { data, error } = await query;

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};

export const getStoryById = async (id: number) => {
  try {
    const { data, error } = await supabase
      .from("books")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.log("Error fetching story by ID:", error);
    throw error;
  }
};

export const getUserStories = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from("books")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error fetching user stories:", error);
    throw error;
  }
};

export const updateStorie = async (
  id: number,
  payload: {
    title_ja?: string | null;
    title_en?: string | null;
    description?: string | null;
    audio_url?: string | null;
  },
) => {
  const { data, error } = await supabase
    .from("books")
    .update(payload)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteStory = async (id: number) => {
  try {
    const { data, error } = await supabase
      .from("books")
      .delete()
      .eq('id', id);

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error deleting book:", error);
    throw error;
  }
};