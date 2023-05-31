import fs from "fs";
import path from "path";
import { IBooking } from "../interfaces/BookingInterface";

let bookings: IBooking[] = JSON.parse(
  fs
    .readFileSync(path.resolve(__dirname, "../data/BookingData.json"))
    .toString()
);

function saveJson() {
  const jsonData = JSON.stringify(bookings, null, 2);
  fs.writeFileSync(
    path.resolve(__dirname, "../data/BookingData.json"),
    jsonData
  );
}

const getAll = () => bookings;

const getOne = (id: string) =>
  bookings.find((booking) => booking.OrderID === id);

const create = (newBookingData: IBooking) => {
  const newBooking = {
    ...newBookingData,
    OrderID: `ORD${bookings.length + 1}`,
  };
  bookings.push(newBooking);
  saveJson();
  return newBooking;
};

const update = (id: string, updatedData: any) => {
  let booking = bookings.find((booking) => booking.OrderID === id);
  if (!booking) {
    throw "No booking found by provided ID";
  }
  booking = { ...booking, ...updatedData };
  saveJson();
  return booking;
};

const _delete = (id: string) => {
  bookings = bookings.filter((booking) => booking.OrderID !== id);
  saveJson();
  return "Booking Deleted";
};

export default { getAll, getOne, create, update, delete: _delete };
