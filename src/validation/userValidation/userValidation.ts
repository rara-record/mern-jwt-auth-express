import { RequestHandler } from "express";
import { userSchema } from "./userSchema";

import validator from "../utils/validator";

export const signupUserValidation: RequestHandler = (req, res, next) =>
  validator(userSchema.signupUser, req.body, next);

export const signinUserValidation: RequestHandler = (req, res, next) =>
  validator(userSchema.signinUser, req.body, next);
