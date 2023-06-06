import { Request, Response } from "express";
import users from "../repositories/users";
import { IUser } from "../models/UserSchema";

const getUsers = async (_: Request, res: Response) => {
  try {
    const allUsers = await users.getAll();
    return res.send(allUsers);
  } catch (err: any) {
    return res.sendStatus(500);
  }
};

const getUserById = async (
  req: Request<{ id: string }, IUser>,
  res: Response
) => {
  try {
    const user = await users.getOne(Number(req.params.id));
    return res.send(user);
  } catch (err: any) {
    return res.status(err.status ?? 500).send(err.message);
  }
};

const createUser = async (req: Request<{}, IUser, IUser>, res: Response) => {
  try {
    const newUser = await users.create(req.body);
    return res.status(200).send(newUser);
  } catch (err: any) {
    return res.status(err.status ?? 500).send(err.message);
  }
};

const updateUser = async (
  req: Request<{ id: string }, IUser, IUser>,
  res: Response
) => {
  try {
    const updatedUser = await users.update({
      ...req.body,
      ID: Number(req.params.id),
    });
    return res.send(updatedUser);
  } catch (err: any) {
    return res.status(err.status ?? 500).send(err.message);
  }
};

const deleteUser = async (
  req: Request<{ id: string }, string>,
  res: Response
) => {
  try {
    const deletedUserMsg = await users.delete(Number(req.params.id));
    return res.send(deletedUserMsg);
  } catch (err: any) {
    return res.status(err.status ?? 500).send(err.message);
  }
};

export { getUsers, getUserById, createUser, updateUser, deleteUser };
