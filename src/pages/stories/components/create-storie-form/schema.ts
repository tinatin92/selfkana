
import { z } from "zod";

export const storieFormSchema = z.object({
  title: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  audio_url: z
    .instanceof(File)
    .optional() 
    .refine((file) => !file || file.size <= 5 * 1024 * 1024, {
      message: "Audio file size must be 5MB or less.",
    })
    .refine((file) => !file || ["audio/mpeg", "audio/wav", "audio/ogg"].includes(file.type), {
      message: "Audio file must be in MP3, WAV, or OGG format.",
    }),
});
