import type { Hono } from "hono";
import type { Env, BlankSchema } from "hono/types";
import taskRoute from "./taskRoute.js";
import userRoute from "./userRoute.js";

export interface RouterMW {
    path: string;
    router: Hono<Env, BlankSchema, "/">
}

export const routers: RouterMW[] = [
    { path: "/taskbuddy/api/user", router: userRoute },
    { path: "/taskbuddy/api/task", router: taskRoute },
]
