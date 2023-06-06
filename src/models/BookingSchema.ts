import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  BookingID: {
    type: Number,
    required: true,
  },
  RoomID: {
    type: Number,
    required: true,
  },
  CheckInDate: {
    type: Date,
    required: true,
  },
  CheckOutDate: {
    type: Date,
    required: true,
  },
  OrderDate: {
    type: Date,
    required: true,
  },
  SpecialRequest: String,
  Status: {
    type: String,
    enum: ["Check In", "Progress", "Check Out"],
    required: true,
  },
});

export default mongoose.model("Booking", BookingSchema);
