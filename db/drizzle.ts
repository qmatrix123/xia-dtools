import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
export const connection = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    database: "dtools",
    password: "1qaz@WSX"
});
export const db = drizzle(connection);