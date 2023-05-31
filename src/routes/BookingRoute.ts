import { Router } from "express";
import {
  getBookings,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking,
} from "../controllers/BookingController";

const BookingRouter = Router();

BookingRouter.get("/", getBookings);

BookingRouter.get("/:id", getBookingById);

BookingRouter.post("/", createBooking);

BookingRouter.put("/:id", updateBooking);

BookingRouter.delete("/:id", deleteBooking);

export default BookingRouter;
