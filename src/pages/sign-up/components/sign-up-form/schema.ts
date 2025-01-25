import { z } from "zod";

export const signUpSFormSchema = z.object({
  email: z.string().email().min(2, {
    message: "Enter valid Email",
  }),
  password: z.string().min(6, {
    message: "Username must be at least 6 characters.",
  }),
});
