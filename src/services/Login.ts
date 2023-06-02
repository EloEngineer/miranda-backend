import passport, { DoneCallback } from "passport";
import { Strategy as LocalStrategyModule } from "passport-local";
import {
  Strategy as JWTStrategyModule,
  ExtractJwt as ExtractJwtModule,
} from "passport-jwt";
import { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

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
        if (email === "admin@admin.com" && password === "1234") {
          return doneCallback(null, { email: "admin@admin.com" });
        }
        return doneCallback(null, false, { message: "Incorrect credentials" });
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
