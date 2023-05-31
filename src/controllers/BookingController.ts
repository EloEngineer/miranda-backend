import { Request, Response } from "express";
import booking from "../repositories/booking";
import { IBooking } from "../interfaces/BookingInterface";

const getBookings = (_: Request, res: Response) => {
  try {
    return res.send(booking.getAll());
  } catch (err: any) {
    return res.sendStatus(500);
  }
};

const getBookingById = (
  req: Request<{ id: string }, IBooking>,
  res: Response
) => {
  try {
    return res.send(booking.getOne(req.params.id));
  } catch (err: any) {
    return res.status(err.status ?? 500).send(err.message);
  }
};

const createBooking = (req: Request<{}, IBooking, IBooking>, res: Response) => {
  try {
    return res.status(200).send(booking.create(req.body));
  } catch (err: any) {
    return res.status(err.status ?? 500).send(err.message);
  }
};

const updateBooking = (
  req: Request<{ id: string }, IBooking, IBooking>,
  res: Response
) => {
  try {
    return res.send(booking.update(req.params.id, req.body));
  } catch (err: any) {
    return res.status(err.status ?? 500).send(err.message);
  }
};

const deleteBooking = (req: Request<{ id: string }, string>, res: Response) => {
  try {
    return res.send(booking.delete(req.params.id));
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
