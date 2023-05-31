import mysql from "mysql2/promise";
import dontenv from "dotenv";

dontenv.config();

export const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "diegomiguel99",
  database: "database_miranda",
});

export async function connect() {
  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "diegomiguel99",
      database: "database_miranda",
    });

    console.log("Successfully connected to the database.");
    return connection;
  } catch (error) {
    console.error("Error connecting to the database: ", error);
    process.exit(-1);
  }
}
