import { JSONContent } from "novel";
import { z } from "zod";

export const newPostSchema = z.object({
    title: z.string().min(1, "Please Enter Title"),
    slug: z.string().min(1, "Slug Is Required"),
    excerpt: z.string().min(1, "Please Enter Excerpt"),
    coverImageId: z.string().optional(),
    content: z.custom<JSONContent>()
});