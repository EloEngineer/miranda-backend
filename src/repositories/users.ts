import { pool } from "../database/db";
import { IUser } from "../interfaces/UserSchema";
import mysql from "mysql2/promise";
import bcrypt from "bcrypt";

const getAll = async () => {
  const [rows] = await pool.query("SELECT * FROM users");
  return rows;
};

const getOne = async (id: number) => {
  const [rows] = await pool.query<mysql.RowDataPacket[]>(
    "SELECT * FROM users WHERE ID = ?",
    [id]
  );
  return rows[0];
};

const create = async (newUserInfo: IUser) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(newUserInfo.Password, saltRounds);
  newUserInfo.Password = hashedPassword;

  const [result] = await pool.query<mysql.OkPacket>(
    "INSERT INTO users SET ?",
    newUserInfo
  );
  const [rows] = await pool.query<mysql.RowDataPacket[]>(
    "SELECT * FROM users WHERE ID = ?",
    [result.insertId]
  );
  return rows[0];
};

const update = async (updatedUser: IUser) => {
  await pool.query("UPDATE users SET ? WHERE ID = ?", [
    updatedUser,
    updatedUser.ID,
  ]);
  const [rows] = await pool.query<mysql.RowDataPacket[]>(
    "SELECT * FROM users WHERE ID = ?",
    [updatedUser.ID]
  );
  return rows[0];
};

const _delete = async (id: number) => {
  await pool.query("DELETE FROM users WHERE ID = ?", [id]);
  return "User Deleted";
};

export default { getAll, getOne, create, update, delete: _delete };
