import { Request, Response, NextFunction, Router } from "express";
import jwt from "jsonwebtoken";
import passport, { DoneCallback } from "passport";
import { Strategy as LocalStrategyModule } from "passport-local";
import {
  Strategy as JWTStrategyModule,
  ExtractJwt as ExtractJwtModule,
} from "passport-jwt";
import { JwtPayload } from "jsonwebtoken";

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
      secretOrKey: "Miranda_Backend_Secret",
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

interface UserTokenPayload {
  email: string;
}

const authRouter = Router();

const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate("local", async (error: any, user: UserTokenPayload) => {
    try {
      if (error || !user) {
        const newError = new Error("An unexpected error occurred.");
        return next(newError);
      }

      req.login(user, { session: false }, async (err) => {
        if (err) return next(err);

        const userData = { email: user.email };
        const token = jwt.sign({ user: userData }, "Miranda_Backend_Secret");

        return res.json({ token });
      });
    } catch (err) {
      return next(err);
    }
  })(req, res, next);
};

authRouter.post("/", loginController);

export default authRouter;
