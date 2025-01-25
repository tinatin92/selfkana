import { z } from "zod";

export const loginSFormSchema = z.object({
  email: z.string().email().min(2, {
    message: "Enter valid email.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});
