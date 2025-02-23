import { z } from 'zod';

export const formSchema = z.object({
    title: z.string().min(3).max(100),
    description: z.string().min(3).max(500),
    category: z.string().min(3).max(200),
    img_link: z.string().url()
    .refine(async (url) => {
        try {
          const res = await fetch(url, { method: "HEAD" });
          const contentType = res.headers.get("content-type");

          return contentType?.startsWith("image/");
        } catch {
          return false;
        }
      }),
    pitch: z.string().min(10),
    dateTime: z.string()
        .min(1, "Date and time are required")
        .regex(
            /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/,
            "Date and time must be in the format YYYY-MM-DDTHH:MM"
        ),
})