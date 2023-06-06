import { Request, Response } from "express";
import booking from "../repositories/booking";
import { IBooking } from "../models/BookingSchema";

const getBookings = async (_: Request, res: Response) => {
  try {
    const allBookings = await booking.getAll();
    return res.send(allBookings);
  } catch (err: any) {
    return res.sendStatus(500);
  }
};

const getBookingById = async (
  req: Request<{ id: string }, IBooking>,
  res: Response
) => {
  try {
    const bookingItem = await booking.getOne(req.params.id);
    return res.send(bookingItem);
  } catch (err: any) {
    return res.status(err.status ?? 500).send(err.message);
  }
};

const createBooking = async (
  req: Request<{}, IBooking, IBooking>,
  res: Response
) => {
  try {
    const newBooking = await booking.create(req.body);
    return res.status(200).send(newBooking);
  } catch (err: any) {
    return res.status(err.status ?? 500).send(err.message);
  }
};

const updateBooking = async (
  req: Request<{ id: string }, IBooking, IBooking>,
  res: Response
) => {
  try {
    const updatedBooking = await booking.update(req.params.id, req.body);
    return res.send(updatedBooking);
  } catch (err: any) {
    return res.status(err.status ?? 500).send(err.message);
  }
};

const deleteBooking = async (
  req: Request<{ id: string }, string>,
  res: Response
) => {
  try {
    const deletedBookingMsg = await booking.delete(req.params.id);
    return res.send(deletedBookingMsg);
  } catch (err: any) {
    return res.status(err.status ?? 500).send(err.message);
  }
};

export {
  getBookings,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking,
};
