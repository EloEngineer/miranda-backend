import { Router } from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/UserController";

const UserRouter = Router();

UserRouter.get("/", getUsers);

UserRouter.get("/:id", getUserById);

UserRouter.post("/", createUser);

UserRouter.put("/:id", updateUser);

UserRouter.delete("/:id", deleteUser);

export default UserRouter;
