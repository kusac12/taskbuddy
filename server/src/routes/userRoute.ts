import { Hono } from "hono";
import { userController } from "../controllers/index.js";
import { authMiddleware } from "../middlewares/AuthMiddleware.js";

const app = new Hono();

app.post("/auth", authMiddleware.verifyToken, (c) => userController.auth(c));

export default app;