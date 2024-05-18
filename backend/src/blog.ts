import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import authMiddleware from "./authMiddleware";

const blogRoutes = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        SECRET_KEY: string;
    };
    Variables: { userUuid: string };
}>();

// authMiddleware
blogRoutes.use("/*", authMiddleware);

const createSchema = z.object({
    title: z.string(),
    content: z.string(),
    published: z.boolean().optional(),
    authorId: z.string(),
});

type CreateBlog = z.infer<typeof createSchema>;
// create blog
blogRoutes.post("/", zValidator("json", createSchema), async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const body = await c.req.json();

        // Create the base data object
        let data: CreateBlog = {
            title: body.title,
            content: body.content,
            authorId: body.authorId,
        };

        // Conditionally add the 'published' field if it exists
        if (body.published !== undefined) {
            data.published = body.published;
        }
        const blog = await prisma.post.create({
            data,
        });

        return c.json(blog);
    } catch (error) {
        return c.json({
            msg: "Something went wrong!",
        });
    }
});

const updateSchema = createSchema
    .pick({ title: true, content: true, published: true })
    .partial()
    .extend({ id: z.string() });

// update blog
blogRoutes.put("", zValidator("json", updateSchema), async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const userId = c.get("userUuid");
    try {
        const body = await c.req.json();
        const updatedPost = await prisma.post.update({
            where: {
                id: body.id,
                authorId: userId,
            },
            data: body,
        });
        return c.json(updatedPost);
    } catch (error) {
        return c.json({
            msg: "Something went wrong!",
        });
    }
});

// GET /api/v1/blog/:id
blogRoutes.get("/:id", (c) => {
    return c.text("GET /api/v1/blog/:id");
});

// GET /api/v1/blog/bulk
blogRoutes.get("/bulk", (c) => {
    return c.text("GET /api/v1/blog/bulk");
});

export default blogRoutes;
