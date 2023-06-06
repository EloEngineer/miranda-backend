import Room from "../models/RoomSchema";
import { IRoom } from "../models/interfaces";

const getAll = async () => {
  return await Room.find();
};

const getOne = async (id: string) => {
  return await Room.findById(id);
};

const create = async (newRoomData: IRoom) => {
  const room = new Room(newRoomData);
  await room.save();
  return room;
};

const update = async (id: string, updatedData: IRoom) => {
  return await Room.findByIdAndUpdate(id, updatedData, { new: true });
};

const _delete = async (id: string) => {
  await Room.findByIdAndDelete(id);
  return "Room Deleted";
};

export default { getAll, getOne, create, update, delete: _delete };
