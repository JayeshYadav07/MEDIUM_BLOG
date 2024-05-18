import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { sign } from "hono/jwt";

const userRoutes = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        SECRET_KEY: string;
    };
    Variables: { userUuid: string };
}>();

const signupSchema = z.object({
    email: z.string(),
    password: z.string(),
    name: z.string().optional(),
});

// Create User
userRoutes.post("/signup", zValidator("json", signupSchema), async (c) => {
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
userRoutes.post("/signin", zValidator("json", loginSchema), async (c) => {
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

export default userRoutes;
