import { Request, Response } from "express";
import rooms from "../repositories/rooms";
import { IRoom } from "../interfaces/RoomInterface";

const getRooms = (_: Request, res: Response) => {
  try {
    return res.send(rooms.getAll());
  } catch (err: any) {
    return res.sendStatus(500);
  }
};

const getRoomById = (req: Request<{ id: string }, IRoom>, res: Response) => {
  try {
    return res.send(rooms.getOne(Number(req.params.id)));
  } catch (err: any) {
    return res.status(err.status ?? 500).send(err.message);
  }
};

const createRoom = (req: Request<{}, IRoom, IRoom>, res: Response) => {
  try {
    return res.status(200).send(rooms.create(req.body));
  } catch (err: any) {
    return res.status(err.status ?? 500).send(err.message);
  }
};

const updateRoom = (
  req: Request<{ id: string }, IRoom, IRoom>,
  res: Response
) => {
  try {
    return res.send(rooms.update(Number(req.params.id), req.body));
  } catch (err: any) {
    return res.status(err.status ?? 500).send(err.message);
  }
};

const deleteRoom = (req: Request<{ id: string }, string>, res: Response) => {
  try {
    return res.send(rooms.delete(Number(req.params.id)));
  } catch (err: any) {
    return res.status(err.status ?? 500).send(err.message);
  }
};

export { getRooms, getRoomById, createRoom, updateRoom, deleteRoom };
