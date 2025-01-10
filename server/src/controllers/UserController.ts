import { UserQueries } from './../utils/queries/UserQueries.js';
import type { Context } from "hono";
import { BaseController } from "./BaseController.js";


export class UserController extends BaseController {
    private readonly userQueries = new UserQueries();
    async auth(c: Context) {
        try {
            const email = c.get("email");
            const [results]: unknown[] = await this.userQueries.findUser(email);
            if (!results) {
                await this.userQueries.createUser(email);
                return c.json({ message: "User created successfully" }, 200);
            }
            return c.json("User already exists", 200);
        } catch (error) {
            return c.json({ message: (error as Error).message }, 400);
        }
    }
}