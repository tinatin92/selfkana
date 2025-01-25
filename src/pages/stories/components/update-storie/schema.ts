import { z } from "zod";

export const storieFormSchema = z.object({
  title_ja: z.string().min(2, {
    message: "Enter Title in Japanese",
  }),
  title_en: z.string().min(2, {
    message: "Enter Tilte in English",
  }),
  description: z.string().min(2, {
    message: "Enter Description",
  }),
  audio_url: z
    .instanceof(File)
    .optional()
    .refine((file) => !file || file.size <= 5 * 1024 * 1024, {
      message: "Audio file size must be 5MB or less.",
    })
    .refine(
      (file) =>
        !file || ["audio/mpeg", "audio/wav", "audio/ogg"].includes(file.type),
      {
        message: "Audio file must be in MP3, WAV, or OGG format.",
      },
    ),
});
