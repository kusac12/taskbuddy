import { TaskController } from "./TaskController.js";
import { UserController } from "./UserController.js";

const taskController = new TaskController();
const userController = new UserController();

export {
    taskController,
    userController,
}