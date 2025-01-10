import { Hono } from "hono";
import { taskController } from "../controllers/index.js";
import { authMiddleware } from "../middlewares/AuthMiddleware.js";

const app = new Hono();

app.post("/addTask", authMiddleware.verifyToken, (c) => taskController.addTask(c));
app.get("/getTask", authMiddleware.verifyToken, (c) => taskController.getTask(c));
app.put("/updateTask", authMiddleware.verifyToken, (c) => taskController.updateTask(c));
app.delete("/deleteTask", authMiddleware.verifyToken, (c) => taskController.deleteTask(c));

export default app;

/*
{
  "title": "Task 2",
  "description": "This is task 2",
  "category": "Work",
  "dueDate": "2025-01-12",
  "status": "To-do",
  "attachment": ""
}
  */