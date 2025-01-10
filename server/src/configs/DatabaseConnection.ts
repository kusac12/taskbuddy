import postgres from "postgres";

const DB_URI = `postgresql://taskbuddy_user:AIe4tuVx5C5YEeb9SViVSTBF7IQkWGvw@dpg-ctu5v7tds78s73flau4g-a.singapore-postgres.render.com/taskbuddy`;

export class DatabaseConnection {
    public sql: postgres.Sql;
    constructor() {
        this.sql = postgres(DB_URI, {
            port: 5432,
            ssl: true,
        })
    }
    async checkConnection() {
        try {
            await this.sql`SELECT 1`;
            console.log("Database connection is active.");
            return true;
        } catch (error) {
            console.error("Database connection failed:", error);
            return false;
        }
    }
}