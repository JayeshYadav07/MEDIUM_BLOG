import { Hono } from "hono";
import userRoutes from "./user";
import blogRoutes from "./blog";

const app = new Hono();

app.get("/", (c) => {
    return c.text("Hello Hono!");
});
app.route("/app/v1/user", userRoutes);
app.route("/app/v1/blog", blogRoutes);

export default app;
