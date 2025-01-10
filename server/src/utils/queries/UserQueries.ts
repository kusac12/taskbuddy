import { sql } from "../../server.js";

export class UserQueries {
    async findUser(email: string) {
        const response = await sql`SELECT * FROM tblUser WHERE email = (${email}) LIMIT 1;`;
        return response;
    }

    async createUser(email: string) {
        const response = await sql`INSERT INTO tblUser (email) VALUES (${email})`;
        return response;
    }

}