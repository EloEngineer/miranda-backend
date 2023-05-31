import { Router } from "express";
import {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
} from "../controllers/ContactController";

const ContactRouter = Router();

ContactRouter.get("/", getContacts);

ContactRouter.get("/:id", getContactById);

ContactRouter.post("/", createContact);

ContactRouter.put("/:id", updateContact);

ContactRouter.delete("/:id", deleteContact);

export default ContactRouter;
