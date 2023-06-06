import { IContact } from "../models/interfaces";
import Contact from "../models/ContactSchema";

const getAll = async () => {
  return await Contact.find();
};

const getOne = async (id: string) => {
  return await Contact.findById(id);
};

const create = async (newContactInfo: IContact) => {
  const contact = new Contact(newContactInfo);
  await contact.save();
  return contact;
};

const update = async (id: string, updatedContact: IContact) => {
  return await Contact.findByIdAndUpdate(id, updatedContact, { new: true });
};

const _delete = async (id: string) => {
  await Contact.findByIdAndDelete(id);
  return "Contact Deleted";
};

export default { getAll, getOne, create, update, delete: _delete };
