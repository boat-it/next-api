import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

if (
    !process.env.DB_HOST ||
    !process.env.DB_USERNAME ||
    !process.env.DB_DATABASE ||
    !process.env.DB_PASSWORD
) {
    throw new Error("Database environment variables are not set properly.");
}
const conn = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD || "",
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
});

export const db = drizzle({ client: conn });