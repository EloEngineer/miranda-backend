import { Request, Response } from "express";
import users from "../repositories/users";
import { IUser } from "../interfaces/UserInterface";

const getUsers = (_: Request, res: Response) => {
  try {
    return res.send(users.getAll());
  } catch (err: any) {
    return res.sendStatus(500);
  }
};

const getUserById = (req: Request<{ id: string }, IUser>, res: Response) => {
  try {
    return res.send(users.getOne(Number(req.params.id)));
  } catch (err: any) {
    return res.status(err.status ?? 500).send(err.message);
  }
};

const createUser = (req: Request<{}, IUser, IUser>, res: Response) => {
  try {
    return res.status(200).send(users.create(req.body));
  } catch (err: any) {
    return res.status(err.status ?? 500).send(err.message);
  }
};

const updateUser = (
  req: Request<{ id: string }, IUser, IUser>,
  res: Response
) => {
  try {
    return res.send(users.update({ ...req.body, ID: Number(req.params.id) }));
  } catch (err: any) {
    return res.status(err.status ?? 500).send(err.message);
  }
};

const deleteUser = (req: Request<{ id: string }, string>, res: Response) => {
  try {
    return res.send(users.delete(Number(req.params.id)));
  } catch (err: any) {
    return res.status(err.status ?? 500).send(err.message);
  }
};

export { getUsers, getUserById, createUser, updateUser, deleteUser };
