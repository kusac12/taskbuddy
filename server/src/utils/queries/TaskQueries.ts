import { sql } from "../../server.js";
import { Task } from "../types/index.js";

export class TaskQueries {
    async execAddTask(email: string, task: Task) {
        await sql`CALL usp_insert_task(${email}, ${task.title}, ${task.description}, ${task.category},
                ${task.dueDate}, ${task.status}, ${task.attachment})`;
        
    }

    async execGetTask(email: string) {
        const response = await sql`SELECT * FROM public.usp_get_tasks(${email})`;
        return response;
    }

    async execDeleteTask(taskId: number) {
        await sql`CALL usp_delete_task(${taskId})`;
    }

    async execUpdateTask(task: Task) {
        await sql`CALL usp_update_task(${task.taskId}, ${task.title}, ${task.description}, ${task.category},
                ${task.dueDate}, ${task.status}, ${task.attachment}, ${task.updateMessage})`;
    }

    async execGetUpdateHistory(taskId: number) {
        const response = await sql`SELECT * FROM public.usp_get_update_history(${taskId})`;
        return response;
    }
}