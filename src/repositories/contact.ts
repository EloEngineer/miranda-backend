import mysql from "mysql2/promise";
import { pool } from "../database/db";
import { IContact } from "../interfaces/ContactSchema";

const getAll = async () => {
  const [rows] = await pool.query<mysql.RowDataPacket[]>(
    "SELECT * FROM contacts"
  );
  return rows;
};

const getOne = async (id: string) => {
  const [rows] = await pool.query<mysql.RowDataPacket[]>(
    "SELECT * FROM contacts WHERE OrderID = ?",
    [id]
  );
  return rows[0];
};

const create = async (newContactInfo: IContact) => {
  const [result] = await pool.query<mysql.OkPacket>(
    "INSERT INTO contacts SET ?",
    newContactInfo
  );
  const [rows] = await pool.query<mysql.RowDataPacket[]>(
    "SELECT * FROM contacts WHERE OrderID = ?",
    [result.insertId]
  );
  return rows[0];
};

const update = async (updatedContact: IContact) => {
  await pool.query("UPDATE contacts SET ? WHERE OrderID = ?", [
    updatedContact,
    updatedContact.OrderID,
  ]);
  const [rows] = await pool.query<mysql.RowDataPacket[]>(
    "SELECT * FROM contacts WHERE OrderID = ?",
    [updatedContact.OrderID]
  );
  return rows[0];
};

const _delete = async (id: string) => {
  await pool.query("DELETE FROM contacts WHERE OrderID = ?", [id]);
  return "Contact Deleted";
};

export default { getAll, getOne, create, update, delete: _delete };
