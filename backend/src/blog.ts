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

const blogSchema = z.object({
    title: z.string(),
    content: z.string(),
    published: z.boolean().optional(),
    authorId: z.string(),
});

type blogType = z.infer<typeof blogSchema>;
// create blog
blogRoutes.post("/", zValidator("json", blogSchema), async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const body = await c.req.json();

        // Create the base data object
        let data: blogType = {
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

// PUT /api/v1/blog
blogRoutes.put("/", (c) => {
    return c.text("POST /api/v1/blog");
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
