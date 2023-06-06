import User from "../models/UserSchema";
import bcrypt from "bcrypt";
import { IUser } from "../models/interfaces";

const getAll = async () => {
  return await User.find();
};

const getOne = async (id: string) => {
  return await User.findById(id);
};

const create = async (newUserInfo: IUser) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(newUserInfo.Password, saltRounds);
  newUserInfo.Password = hashedPassword;

  const user = new User(newUserInfo);
  return await user.save();
};

const update = async (id: string, updatedUser: Partial<IUser>) => {
  // Removes the password from the updated fields if it is not present
  if (!updatedUser.Password) {
    delete updatedUser.Password;
  } else {
    // If password is present, hashes the password before updating
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(updatedUser.Password, saltRounds);
    updatedUser.Password = hashedPassword;
  }

  return await User.findByIdAndUpdate(id, updatedUser, { new: true });
};

const _delete = async (id: string) => {
  await User.findByIdAndDelete(id);
  return "User Deleted";
};

export default { getAll, getOne, create, update, delete: _delete };
