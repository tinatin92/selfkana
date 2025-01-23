import { supabase } from "..";

export const getLetters = async () => {
  try {
    const { data, error } = await supabase
      .from("letters")
      .select("*")
      .order("id");

    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.log("error fetching letters", error);
    throw error;
  }
};
