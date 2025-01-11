import { z } from "zod";

export const loginSFormSchema = z.object({
  avatar_url: z
    .string()
    // .url({ message: "Avatar URL must be a valid URL." })
    .min(2, { message: "Avatar URL must be at least 2 characters." }),
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  full_name: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
});
