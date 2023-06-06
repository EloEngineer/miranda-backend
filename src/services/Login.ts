import passport, { DoneCallback } from "passport";
import { Strategy as LocalStrategyModule } from "passport-local";
import {
  Strategy as JWTStrategyModule,
  ExtractJwt as ExtractJwtModule,
} from "passport-jwt";
import { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { connection } from "../database/db";
import bcrypt from "bcrypt";
import User from "../models/UserSchema";

dotenv.config();

// Local strategy for login
passport.use(
  new LocalStrategyModule(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email: string, password: string, doneCallback) => {
      try {
        // Find user in MongoDB database
        const user = await User.findOne({ email: email });

        // If user not found, return with a message
        if (!user) {
          return doneCallback(null, false, {
            message: "Incorrect credentials",
          });
        }

        // Check password against hashed password in database
        const match = await bcrypt.compare(password, user.Password);

        // If password doesn't match, return with a message
        if (!match) {
          return doneCallback(null, false, {
            message: "Incorrect credentials",
          });
        }

        // If the credentials are correct, return the user
        return doneCallback(null, user);
      } catch (errorObj) {
        return doneCallback(errorObj, false);
      }
    }
  )
);

// JWT strategy for token verification
passport.use(
  new JWTStrategyModule(
    {
      secretOrKey: process.env.LOGIN_SECRET_KEY,
      jwtFromRequest: ExtractJwtModule.fromAuthHeaderAsBearerToken(),
    },
    async (token: JwtPayload, doneCallback: DoneCallback) => {
      try {
        return doneCallback(null, token.user);
      } catch (errorObj) {
        doneCallback(errorObj);
      }
    }
  )
);
