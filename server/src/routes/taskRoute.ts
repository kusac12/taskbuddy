import { Hono } from "hono";
import { taskController } from "../controllers/index.js";
import { authMiddleware } from "../middlewares/AuthMiddleware.js";

const app = new Hono();

app.post("/addTask", authMiddleware.verifyToken, (c) => taskController.addTask(c));
app.get("/getTask", authMiddleware.verifyToken, (c) => taskController.getTask(c));
app.get("/getUpdateHistory/:taskId", authMiddleware.verifyToken, (c) => taskController.getUpdateHistory(c));
app.put("/updateTask", authMiddleware.verifyToken, (c) => taskController.updateTask(c));
app.delete("/deleteTask", authMiddleware.verifyToken, (c) => taskController.deleteTask(c));

export default app;