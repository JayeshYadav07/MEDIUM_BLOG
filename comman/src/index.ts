import z from "zod";

export const signupSchema = z.object({
    email: z.string(),
    password: z.string(),
    name: z.string().optional(),
});

export type SignupType = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
    email: z.string(),
    password: z.string(),
});
export type LoginType = z.infer<typeof loginSchema>;

export const createSchema = z.object({
    title: z.string(),
    content: z.string(),
    published: z.boolean().optional(),
});
export type CreateType = z.infer<typeof createSchema>;

export const updateSchema = z.object({
    title: z.string().optional(),
    content: z.string().optional(),
    id: z.string(),
});
export type UpdateType = z.infer<typeof updateSchema>;
