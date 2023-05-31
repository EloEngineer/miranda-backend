import fs from "fs";
import path from "path";
import { IContact } from "../interfaces/ContactInterface";

const contacts: IContact[] = JSON.parse(
  fs
    .readFileSync(path.resolve(__dirname, "../data/ContactData.json"))
    .toString()
);

function saveJson() {
  const jsonData = JSON.stringify(contacts, null, 2);
  fs.writeFileSync(
    path.resolve(__dirname, "../data/ContactData.json"),
    jsonData
  );
}

const getAll = () => contacts;

const getOne = (id: string) => {
  const contact = contacts.find((contact) => contact.OrderID === id);
  if (!contact) {
    return null;
  }
  return contact;
};

const create = (newContactInfo: IContact) => {
  const newContact: IContact = {
    ...newContactInfo,
  };
  contacts.push(newContact);
  saveJson();
  return newContact;
};

const update = (updatedContact: IContact) => {
  const index = contacts.findIndex(
    (contact) => contact.OrderID === updatedContact.OrderID
  );

  if (index === -1) {
    throw "No contact found by provided OrderID";
  }

  contacts[index] = updatedContact;
  saveJson();
  return contacts[index];
};

const _delete = (id: string) => {
  const index = contacts.findIndex((contact) => contact.OrderID === id);

  if (index === -1) {
    throw "No contact found by provided OrderID";
  }

  contacts.splice(index, 1);
  saveJson();
  return "Contact Deleted";
};

export default { getAll, getOne, create, update, delete: _delete };
