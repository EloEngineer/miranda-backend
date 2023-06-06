import fs from "fs";
import { connection } from "./db";
import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import User from "../models/UserSchema";
import Room from "../models/RoomSchema";
import Booking from "../models/BookingSchema";
import Contact from "../models/ContactSchema";

const generateFakeData = (amount: number, type: string) => {
  const data = [];
  let roomIds = [];
  for (let i: number = 1; i <= 10; i++) {
    let item;
    switch (type) {
      case "users":
        item = {
          Name: faker.person.fullName(),
          Email: faker.internet.email(),
          StartDate: faker.date.past(),
          Description: faker.lorem.sentences(),
          Contact: Math.trunc(Math.random() * 1000000000).toString(),
          Status: ["Inactive", "Active"][Math.floor(Math.random())],
          Password: faker.internet.password(),
          IMG: faker.image.avatar(),
        };
        break;

      case "rooms":
        item = {
          RoomID: i,
          RoomName: ["Deluxe A-", "Deluxe B-", "Deluxe C-", "Deluxe D-"][
            Math.floor(Math.random() * 3)
          ],
          Status: ["Available", "Unavailable"][Math.floor(Math.random())],
          Offer: Math.floor(Math.random() * 100),
        };
        break;

      case "contacts":
        item = {
          OrderID: `ORD${i}`,
          Date: faker.date.recent(),
          Customer: faker.person.fullName(),
          Mail: faker.internet.email(),
          Telephone: Math.trunc(Math.random() * 1000000000).toString(),
          Comment: faker.lorem.sentences(),
          Action: ["Archive", "Publish"][Math.floor(Math.random())],
          IMG: faker.image.avatar(),
        };
        break;

      case "bookings":
        item = {
          BookingID: i,
          RoomID: Math.floor(Math.random() * 10) + 1,
          CheckInDate: faker.date.future(),
          CheckOutDate: faker.date.future(),
          OrderDate: faker.date.recent(),
          SpecialRequest: faker.lorem.sentences(1),
          Status: ["Check In", "Progress", "Check Out"][
            Math.floor(Math.random() * 2)
          ],
        };
        break;
    }
    data.push(item);
  }
  return data;
};

const writeDataToJsonFile = (data: object, filename: string) => {
  fs.writeFileSync(filename, JSON.stringify(data, null, 2));
};

const main = async () => {
  //Connect to MongoDB
  connection();

  const entities = ["users", "rooms", "bookings", "contacts"];

  for (let entity of entities) {
    const data = generateFakeData(100, entity);
    let Model!: typeof User | typeof Room | typeof Booking | typeof Contact;

    switch (entity) {
      case "users":
        Model = User;
        break;
      case "rooms":
        Model = Room;
        break;
      case "bookings":
        Model = Booking;
        break;
      case "contacts":
        Model = Contact;
        break;
    }

    for (let item of data) {
      const instance = new Model(item);
      await instance.save(); // This will save the instance to the MongoDB collection associated with the Model
    }
  }

  mongoose.connection.close(); // close the connection after we're done
};

main();
