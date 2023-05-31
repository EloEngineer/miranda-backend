import express from "express";
import cors from "cors";

import UserRouter from "./routes/UserRoute";
import ContactRouter from "./routes/ContactRoute";
import BookingRouter from "./routes/BookingRoute";
import RoomRouter from "./routes/RoomRoute";
import authRouter from "./controllers/LoginController";
import passport from "passport";
import "./services/Login";
import { connect } from "./database/db";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/login", authRouter);

app.use(
  "/api/v1/users",
  passport.authenticate("jwt", { session: false }),
  UserRouter
);
app.use(
  "/api/v1/rooms",
  passport.authenticate("jwt", { session: false }),
  RoomRouter
);

app.use(
  "/api/v1/bookings",
  passport.authenticate("jwt", { session: false }),
  BookingRouter
);

app.use(
  "/api/v1/contact",
  passport.authenticate("jwt", { session: false }),
  ContactRouter
);

export default async function startServer() {
  await connect();
  app.listen(PORT, () => console.log(`Server is live on port ${PORT}`));
}
