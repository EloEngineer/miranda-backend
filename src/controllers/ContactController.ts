import { Request, Response } from "express";
import contact from "../repositories/contact";
import { IContact } from "../models/ContactSchema";

const getContacts = async (_: Request, res: Response) => {
  try {
    const allContacts = await contact.getAll();
    return res.send(allContacts);
  } catch (err: any) {
    return res.sendStatus(500);
  }
};

const getContactById = async (
  req: Request<{ id: string }, IContact>,
  res: Response
) => {
  try {
    const contactItem = await contact.getOne(String(req.params.id));
    return res.send(contactItem);
  } catch (err: any) {
    return res.status(err.status ?? 500).send(err.message);
  }
};

const createContact = async (
  req: Request<{}, IContact, IContact>,
  res: Response
) => {
  try {
    const newContact = await contact.create(req.body);
    return res.status(200).send(newContact);
  } catch (err: any) {
    return res.status(err.status ?? 500).send(err.message);
  }
};

const updateContact = async (
  req: Request<{ id: string }, IContact, IContact>,
  res: Response
) => {
  try {
    const updatedContact = await contact.update({
      ...req.body,
      OrderID: req.params.id,
    });
    return res.send(updatedContact);
  } catch (err: any) {
    return res.status(err.status ?? 500).send(err.message);
  }
};

const deleteContact = async (
  req: Request<{ id: string }, string>,
  res: Response
) => {
  try {
    const deletedContactMsg = await contact.delete(String(req.params.id));
    return res.send(deletedContactMsg);
  } catch (err: any) {
    return res.status(err.status ?? 500).send(err.message);
  }
};

export {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
};
