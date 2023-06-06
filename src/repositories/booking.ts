import mysql from "mysql2/promise";
import { pool } from "../database/db";
import { IBooking } from "../interfaces/BookingSchema";

const getAll = async () => {
  const [rows] = await pool.query<mysql.RowDataPacket[]>(
    "SELECT * FROM bookings"
  );
  return rows;
};

const getOne = async (id: string) => {
  const [rows] = await pool.query<mysql.RowDataPacket[]>(
    "SELECT * FROM bookings WHERE BookingID = ?",
    [id]
  );
  return rows[0];
};

const create = async (newBookingData: IBooking) => {
  const [result] = await pool.query<mysql.OkPacket>(
    "INSERT INTO bookings SET ?",
    newBookingData
  );
  const [rows] = await pool.query<mysql.RowDataPacket[]>(
    "SELECT * FROM bookings WHERE BookingID = ?",
    [result.insertId]
  );
  return rows[0];
};

const update = async (id: string, updatedData: IBooking) => {
  await pool.query("UPDATE bookings SET ? WHERE BookingID = ?", [
    updatedData,
    id,
  ]);
  const [rows] = await pool.query<mysql.RowDataPacket[]>(
    "SELECT * FROM bookings WHERE BookingID = ?",
    [id]
  );
  return rows[0];
};

const _delete = async (id: string) => {
  await pool.query("DELETE FROM bookings WHERE BookingID = ?", [id]);
  return "Booking Deleted";
};

export default { getAll, getOne, create, update, delete: _delete };
