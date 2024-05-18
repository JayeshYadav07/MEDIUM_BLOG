import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
    return c.text("Hello Hono!");
});

// POST /api/v1/user/signup
app.post("/app/v1/user/signup", (c) => {
    return c.text("POST /api/v1/user/signup");
});

// POST /api/v1/user/signin
app.post("/app/v1/user/signin", (c) => {
    return c.text("POST /api/v1/user/signin");
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
