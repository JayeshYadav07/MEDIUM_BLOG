import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { zValidator } from "@hono/zod-validator";
import { sign } from "hono/jwt";
import { signupSchema, loginSchema } from "jayeshyadav_medium_common";

const userRoutes = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        SECRET_KEY: string;
    };
    Variables: { userUuid: string };
}>();

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
            error: "Something went wrong!",
        });
    }
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
                error: "Wrong Credentials!",
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
            error: "Something went wrong!",
        });
    }
});

export default userRoutes;
