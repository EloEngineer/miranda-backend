import { Request, Response } from "express";
import rooms from "../repositories/rooms";
import { IRoom } from "../models/RoomSchema";

const getRooms = async (_: Request, res: Response) => {
  try {
    const allRooms = await rooms.getAll();
    return res.send(allRooms);
  } catch (err: any) {
    return res.sendStatus(500);
  }
};

const getRoomById = async (
  req: Request<{ id: string }, IRoom>,
  res: Response
) => {
  try {
    const room = await rooms.getOne(Number(req.params.id));
    return res.send(room);
  } catch (err: any) {
    return res.status(err.status ?? 500).send(err.message);
  }
};

const createRoom = async (req: Request<{}, IRoom, IRoom>, res: Response) => {
  try {
    const newRoom = await rooms.create(req.body);
    return res.status(200).send(newRoom);
  } catch (err: any) {
    return res.status(err.status ?? 500).send(err.message);
  }
};

const updateRoom = async (
  req: Request<{ id: string }, IRoom, IRoom>,
  res: Response
) => {
  try {
    const updatedRoom = await rooms.update(Number(req.params.id), req.body);
    return res.send(updatedRoom);
  } catch (err: any) {
    return res.status(err.status ?? 500).send(err.message);
  }
};

const deleteRoom = async (
  req: Request<{ id: string }, string>,
  res: Response
) => {
  try {
    const deletedRoomMsg = await rooms.delete(Number(req.params.id));
    return res.send(deletedRoomMsg);
  } catch (err: any) {
    return res.status(err.status ?? 500).send(err.message);
  }
};

export { getRooms, getRoomById, createRoom, updateRoom, deleteRoom };
