import passport, { DoneCallback } from "passport";
import { Strategy as LocalStrategyModule } from "passport-local";
import {
  Strategy as JWTStrategyModule,
  ExtractJwt as ExtractJwtModule,
} from "passport-jwt";
import { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { pool } from "../database/db";
import bcrypt from "bcrypt";
import mysql from "mysql2/promise";

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
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        // Fetch the user from your database
        const [rows] = await pool.query<mysql.RowDataPacket[]>(
          "SELECT * FROM users WHERE Email = ? and Password = ?",
          [email, hashedPassword]
        );

        // If user not found or password doesn't match, return with a message
        if (!rows.length) {
          return doneCallback(null, false, {
            message: "Incorrect credentials",
          });
        }

        // If the credentials are correct, return the user
        return doneCallback(null, rows[0]);
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
