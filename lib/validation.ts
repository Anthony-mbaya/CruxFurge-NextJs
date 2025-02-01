import { z } from 'zod';

export const formSchema = z.object({
    title: z.string().min(3).max(100),
    description: z.string().min(3).max(500),
    category: z.string().min(3).max(20),
    img_link: z
    .string()
    .url(),
    pitch: z.string().min(10),
})