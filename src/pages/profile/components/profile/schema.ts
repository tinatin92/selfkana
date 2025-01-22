import { z } from "zod";

export const loginSFormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  full_name: z
    .string()
    .min(2, {
      message: "Full name must be at least 2 characters.",
    })
    .optional()
    .refine((val) => val === undefined || val.length >= 2, {
      message: "Full name must be at least 2 characters.",
    }),
});
