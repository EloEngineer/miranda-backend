import { IBooking } from "../models/interfaces";
import Booking from "../models/BookingSchema";

const getAll = async () => {
  return await Booking.find();
};

const getOne = async (id: string) => {
  return await Booking.findById(id);
};

const create = async (newBookingData: IBooking) => {
  const booking = new Booking(newBookingData);
  await booking.save();
  return booking;
};

const update = async (id: string, updatedData: IBooking) => {
  return await Booking.findByIdAndUpdate(id, updatedData, { new: true });
};

const _delete = async (id: string) => {
  await Booking.findByIdAndDelete(id);
  return "Booking Deleted";
};

export default { getAll, getOne, create, update, delete: _delete };
