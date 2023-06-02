import fs from "fs";
import { pool } from "./db";
import { faker } from "@faker-js/faker";

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
  const entities = ["users", "rooms", "bookings", "contacts"];

  for (let entity of entities) {
    const data = generateFakeData(100, entity);
    writeDataToJsonFile(data, `${entity}.json`);
    await pool.query(`DROP TABLE IF EXISTS ${entity}`);
    let createTableSql = "";
    switch (entity) {
      case "users":
        createTableSql = `CREATE TABLE users(
            ID INT AUTO_INCREMENT PRIMARY KEY,
            Name VARCHAR(255) NOT NULL,
            Email VARCHAR(255) NOT NULL,
            StartDate DATE,
            Description TEXT,
            Contact VARCHAR(50),
            Status ENUM('Active', 'Inactive'),
            Password VARCHAR(255),
            IMG TEXT
        )`;
        break;

      case "rooms":
        createTableSql = `CREATE TABLE rooms(
            RoomID INT AUTO_INCREMENT PRIMARY KEY,
            RoomName ENUM('Deluxe A-', 'Deluxe B-', 'Deluxe C-', 'Deluxe D-'),
            Status ENUM('Available', 'Unavailable'),
            Offer INT
        )`;
        break;
      case "bookings":
        createTableSql = `CREATE TABLE bookings(
            BookingID VARCHAR(255) PRIMARY KEY,
            Guest INT,
            RoomID INT,
            CheckInDate DATE,
            CheckOutDate DATE,
            OrderDate VARCHAR(255),
            SpecialRequest TEXT,
            RoomType VARCHAR(255),
            Status ENUM('Check In', 'Progress' ,'Check Out'),
            FOREIGN KEY (RoomID) REFERENCES rooms(RoomID)
        )`;
        break;
      case "contacts":
        createTableSql = `CREATE TABLE contacts(
            OrderID VARCHAR(255) PRIMARY KEY,
            Date DATETIME,
            Customer VARCHAR(255),
            Mail VARCHAR(255),
            Telephone VARCHAR(20),
            Comment TEXT,
            Asunto VARCHAR(255),
            Action ENUM('Archive', 'Unarchive'),
            IMG TEXT
        )`;
        break;
    }
    await pool.query(createTableSql);
    for (let item of data) {
      await pool.query(`INSERT INTO ${entity} SET ?`, item);
    }
  }
};

main();
