import { Context, Next } from "hono";
import { verify } from "hono/jwt";

const authMiddleware = async (c: Context, next: Next) => {
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
};

export default authMiddleware;
