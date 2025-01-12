import type { Context } from "hono";
import { BaseController } from "./BaseController.js";
import { TaskQueries } from "../utils/queries/TaskQueries.js";
import { Task, TaskUpdateLog } from "../utils/types/index.js";

export class TaskController extends BaseController {
    private readonly taskQueries = new TaskQueries();
    async addTask(c: Context) {
        try {
            const email = c.get("email");
            const task = await c.req.json();
            await this.taskQueries.execAddTask(email, task);
            return c.json({ message: "Task added successfully" }, 200);
        } catch (error) {
            return c.json({ message: (error as Error).message }, 400);
        }
    }

    async getTask(c: Context) {
        try {
            const email = c.get("email");
            const results: unknown[] = await this.taskQueries.execGetTask(email);
            const tasks = results as Task[];
            return c.json(tasks, 200);
        } catch (error) {
            return c.json({ message: (error as Error).message }, 400);
        }
    }

    async deleteTask(c: Context) {
        try {
            const { taskId } = await c.req.json();
            await this.taskQueries.execDeleteTask(taskId);
            return c.json({ message: "Task deleted successfully" }, 200);
        } catch (error) {
            return c.json({ message: (error as Error).message }, 400);
        }
    }

    async updateTask(c: Context) {
        try {
            const task = await c.req.json();
            await this.taskQueries.execUpdateTask(task);
            return c.json({ message: "Task updated successfully" }, 200);
        } catch (error) {
            return c.json({ message: (error as Error).message }, 400);
        }
    }

    async getUpdateHistory(c: Context) {
        try {
            const taskId = c.req.param('id');
            const results: unknown[] = await this.taskQueries.execGetUpdateHistory(parseInt(taskId));
            const tasksLog = results as TaskUpdateLog[];
            return c.json(tasksLog, 200);
        } catch (error) {
            return c.json({ message: (error as Error).message }, 400);
        }
    }
}