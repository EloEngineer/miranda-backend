import mysql from "mysql2/promise";
import dontenv from "dotenv";

dontenv.config();

export const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "database_miranda",
});
