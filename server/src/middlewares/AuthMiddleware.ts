import type { Context, Next } from "hono";
import admin from "../../firebase.js";

export class AuthMiddleware {
    async verifyToken(c: Context, next: Next) {
        try {
            const token = c.req.header("Authorization");
            if (!token) {
                throw new Error("Unauthorized request");
            }
            const { email } = await admin.auth().verifyIdToken(token);
            c.set("email", email);
            await next();
        } catch (error: any) {
            return c.json(error.message, 401);
        }
    }
}

export const authMiddleware = new AuthMiddleware();