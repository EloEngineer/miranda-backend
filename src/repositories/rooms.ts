import mysql from "mysql2/promise";
import { pool } from "../database/db";
import { IRoom } from "../interfaces/RoomInterface";

const getAll = async () => {
  const [rows] = await pool.query<mysql.RowDataPacket[]>("SELECT * FROM rooms");
  return rows;
};

const getOne = async (id: number) => {
  const [rows] = await pool.query<mysql.RowDataPacket[]>(
    "SELECT * FROM rooms WHERE id = ?",
    [id]
  );
  return rows[0];
};

const create = async (newRoomData: IRoom) => {
  const [result] = await pool.query<mysql.OkPacket>(
    "INSERT INTO rooms SET ?",
    newRoomData
  );
  const [rows] = await pool.query<mysql.RowDataPacket[]>(
    "SELECT * FROM rooms WHERE id = ?",
    [result.insertId]
  );
  return rows[0];
};

const update = async (id: number, updatedData: IRoom) => {
  await pool.query("UPDATE rooms SET ? WHERE id = ?", [updatedData, id]);
  const [rows] = await pool.query<mysql.RowDataPacket[]>(
    "SELECT * FROM rooms WHERE id = ?",
    [id]
  );
  return rows[0];
};

const _delete = async (id: number) => {
  await pool.query("DELETE FROM rooms WHERE id = ?", [id]);
  return "Room Deleted";
};

export default { getAll, getOne, create, update, delete: _delete };
