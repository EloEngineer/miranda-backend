import { Request, Response } from "express";
import contact from "../repositories/contact";
import { IContact } from "../interfaces/ContactInterface";

const getContacts = (_: Request, res: Response) => {
  try {
    return res.send(contact.getAll());
  } catch (err: any) {
    return res.sendStatus(500);
  }
};

const getContactById = (
  req: Request<{ id: string }, IContact>,
  res: Response
) => {
  try {
    return res.send(contact.getOne(String(req.params.id)));
  } catch (err: any) {
    return res.status(err.status ?? 500).send(err.message);
  }
};

const createContact = (req: Request<{}, IContact, IContact>, res: Response) => {
  try {
    return res.status(200).send(contact.create(req.body));
  } catch (err: any) {
    return res.status(err.status ?? 500).send(err.message);
  }
};

const updateContact = (
  req: Request<{ id: string }, IContact, IContact>,
  res: Response
) => {
  try {
    return res.send(contact.update({ ...req.body, OrderID: req.params.id }));
  } catch (err: any) {
    return res.status(err.status ?? 500).send(err.message);
  }
};

const deleteContact = (req: Request<{ id: string }, string>, res: Response) => {
  try {
    return res.send(contact.delete(String(req.params.id)));
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
