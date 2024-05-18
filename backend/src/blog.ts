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

// POST /api/v1/blog
blogRoutes.post("/", (c) => {
    return c.text("POST /api/v1/blog");
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
