import { Hono } from "hono";
import userRoutes from "./user";
import blogRoutes from "./blog";
import { cors } from "hono/cors";

const app = new Hono();
app.use("*", cors());
app.get("/", (c) => {
    return c.text("Hello Hono!");
});
app.route("/app/v1/user", userRoutes);
app.route("/app/v1/blog", blogRoutes);

export default app;
