import User from "../model/User.js";
import passportJwt from "passport-jwt";

import { Request } from "express";
import { PassportStatic } from "passport";
import { JWT_KEY } from "../config/index.js";

const { Strategy } = passportJwt;

const cookieExtractor = (req: Request) => {
  let jwt = null;

  if (req && req.cookies) {
    jwt = req.cookies?.jwt;
  }

  return jwt;
};

const optionsCookie = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: JWT_KEY,
};
export default (passport: PassportStatic) => {
  passport.use(
    new Strategy(optionsCookie, async (payload, done) => {
      await User.findById(payload.userId)
        .then((user) => {
          user ? done(null, user) : done(null, false);
        })
        .catch(() => done(null, false));
    })
  );
};
