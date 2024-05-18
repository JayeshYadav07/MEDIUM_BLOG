import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { zValidator } from "@hono/zod-validator";
import authMiddleware from "./authMiddleware";
import { createSchema, updateSchema } from "jayeshyadav_medium_common";

const blogRoutes = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        SECRET_KEY: string;
    };
    Variables: { userUuid: string };
}>();

// authMiddleware
blogRoutes.use("/*", authMiddleware);

// create blog
blogRoutes.post("/", zValidator("json", createSchema), async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const body = await c.req.json();
        const userId = c.get("userUuid");
        const blog = await prisma.post.create({
            data: { ...body, authorId: userId },
        });

        return c.json(blog);
    } catch (error) {
        return c.json({
            msg: "Something went wrong!",
        });
    }
});

// update blog
blogRoutes.put("/", zValidator("json", updateSchema), async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const userId = c.get("userUuid");
    try {
        const body = await c.req.json();
        const updatedBlog = await prisma.post.update({
            where: {
                id: body.id,
                authorId: userId,
            },
            data: body,
        });
        return c.json(updatedBlog);
    } catch (error) {
        return c.json({
            msg: "Something went wrong!",
        });
    }
});

// get all blog
blogRoutes.get("/bulk", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const getAllBlog = await prisma.post.findMany();
        return c.json(getAllBlog);
    } catch (error) {
        return c.json({
            msg: "Something went wrong!",
        });
    }
});

// get blog
blogRoutes.get("/:id", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const id = c.req.param("id");
    const userId = c.get("userUuid");
    try {
        const getBlog = await prisma.post.findUnique({
            where: {
                id: id,
                authorId: userId,
            },
        });
        return c.json(getBlog);
    } catch (error) {
        return c.json({
            msg: "Something went wrong!",
        });
    }
});

export default blogRoutes;
