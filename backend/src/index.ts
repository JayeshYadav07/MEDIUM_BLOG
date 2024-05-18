import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { sign, verify } from "hono/jwt";

const app = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        SECRET_KEY: string;
    };
    Variables: { userUuid: string };
}>();

app.get("/", (c) => {
    return c.text("Hello Hono!");
});

const signupSchema = z.object({
    email: z.string(),
    password: z.string(),
    name: z.string().optional(),
});

// Create User
app.post("/app/v1/user/signup", zValidator("json", signupSchema), async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    try {
        const user = await prisma.user.create({
            data: {
                email: body.email,
                password: body.password,
                name: body.name,
            },
        });
        return c.json({
            msg: "User created successfully!",
            user,
        });
    } catch (error) {
        return c.json({
            msg: "Something went wrong!",
        });
    }
});

const loginSchema = z.object({
    email: z.string(),
    password: z.string(),
});

// Login User
app.post("/app/v1/user/signin", zValidator("json", loginSchema), async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    try {
        const user = await prisma.user.findFirst({
            where: {
                email: body.email,
                password: body.password,
            },
        });
        if (!user) {
            return c.json({
                msg: "Wrong Credentials!",
            });
        } else {
            const token = await sign({ userId: user.id }, c.env.SECRET_KEY);
            return c.json({
                msg: "User Login successfully!",
                user,
                token: token,
            });
        }
    } catch (error) {
        return c.json({
            msg: "Something went wrong!",
        });
    }
});

app.use("/app/v1/blog/*", async (c, next) => {
    const jwt: string = c.req.header("Authorization")!;
    if (!jwt) {
        c.status(401);
        return c.json({ error: "unauthorized" });
    }
    try {
        const token = jwt.split(" ")[1];
        const payload = await verify(token, c.env.SECRET_KEY);
        c.set("userUuid", payload.userId);
    } catch (error) {
        return c.json({ error });
    }
    await next();
});

// POST /api/v1/blog
app.post("/app/v1/blog", (c) => {
    return c.text("POST /api/v1/blog");
});

// PUT /api/v1/blog
app.put("/app/v1/blog", (c) => {
    return c.text("POST /api/v1/blog");
});

// GET /api/v1/blog/:id
app.get("/app/v1/blog/:id", (c) => {
    return c.text("GET /api/v1/blog/:id");
});

// GET /api/v1/blog/bulk
app.get("/api/v1/blog/bulk", (c) => {
    return c.text("GET /api/v1/blog/bulk");
});

export default app;
