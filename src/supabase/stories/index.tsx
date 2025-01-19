import { supabase } from "..";

export const getStories = async () => {
  try {
    const { data, error } = await supabase.from("books").select("*");
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.log("error fetching books", error);
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
