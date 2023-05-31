import express from "express";
import cors from "cors";
import UserRouter from "./routes/UserRoute";
import authRouter from "./controllers/LoginController";
import passport from "passport";
import "./services/Login";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/login", authRouter);
app.use(
  "/api/users",
  passport.authenticate("jwt", { session: false }),
  UserRouter
);

export default function startServer() {
  app.listen(PORT, () => console.log(`Server is live on port ${PORT}`));
}
