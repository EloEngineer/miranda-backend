import fs from "fs";
import path from "path";
import { IRoom } from "../interfaces/RoomInterface";

let rooms: IRoom[] = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../data/RoomData.json")).toString()
);

function saveJson() {
  const jsonData = JSON.stringify(rooms, null, 2);
  fs.writeFileSync(path.resolve(__dirname, "../data/RoomData.json"), jsonData);
}

const getAll = () => rooms;

const getOne = (id: number) => rooms.find((room) => room.id === id);

const create = (newRoomData: IRoom) => {
  const newRoom = { ...newRoomData, ID: rooms.length + 1 };
  rooms.push(newRoom);
  saveJson();
  return newRoom;
};

const update = (id: number, updatedData: any) => {
  let room = rooms.find((room) => room.id === id);
  if (!room) {
    throw "No room found by provided ID";
  }
  room = { ...room, ...updatedData };
  saveJson();
  return room;
};

const _delete = (id: number) => {
  rooms = rooms.filter((room) => room.id !== id);
  saveJson();
  return "Room Deleted";
};

export default { getAll, getOne, create, update, delete: _delete };
