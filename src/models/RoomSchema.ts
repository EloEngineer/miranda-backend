import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
  RoomID: {
    type: Number,
    required: true,
  },
  RoomName: {
    type: String,
    enum: ["Deluxe A-", "Deluxe B-", "Deluxe C-", "Deluxe D-"],
    required: true,
  },
  Status: {
    type: String,
    enum: ["Available", "Unavailable"],
    required: true,
  },
  Offer: Number,
});

export default mongoose.model("Room", RoomSchema);
