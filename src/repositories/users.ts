import fs from "fs";
import { IUser } from "../interfaces/UserInterface";
import path from "path";

const users: IUser[] = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../data/UserData.json")).toString()
);

function saveJson() {
  const jsonData = JSON.stringify(users, null, 2);
  fs.writeFileSync(path.resolve(__dirname, "../data/UserData.json"), jsonData);
}

const getAll = () => users;

const getOne = (id: number) => {
  const user = users.find((user) => user.ID === id);
  if (!user) {
    return null;
  }
  return user;
};

const create = (newUserInfo: IUser) => {
  const newUser: IUser = {
    ...newUserInfo,
    ID: users[users.length - 1].ID + 1,
  };
  users.push(newUser);
  saveJson();
  return newUser;
};

const update = (updatedUser: IUser) => {
  const index = users.findIndex((user) => user.ID === updatedUser.ID);

  if (index === -1) {
    throw "No user found by provided ID";
  }

  users[index] = updatedUser;
  saveJson();
  return users[index];
};

const _delete = (id: number) => {
  const index = users.findIndex((user) => user.ID === id);

  if (index === -1) {
    throw "No user found by provided ID";
  }

  users.splice(index, 1);
  saveJson();
  return "User Deleted";
};

export default { getAll, getOne, create, update, delete: _delete };
