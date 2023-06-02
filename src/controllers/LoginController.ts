import { Request, Response, NextFunction, Router } from "express";
import jwt from "jsonwebtoken";
import passport, { DoneCallback } from "passport";
import { Strategy as LocalStrategyModule } from "passport-local";
import {
  Strategy as JWTStrategyModule,
  ExtractJwt as ExtractJwtModule,
} from "passport-jwt";
import { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

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
        const token = jwt.sign(
          { user: userData },
          `${process.env.LOGIN_SECRET_KEY}`
        );

        return res.json({ token });
      });
    } catch (err) {
      return next(err);
    }
  })(req, res, next);
};

authRouter.post("/", loginController);

export default authRouter;
