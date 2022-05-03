import {
  signupUserValidation,
  signinUserValidation,
} from "./../validation/userValidation/userValidation";
import { Router } from "express";
import { signupUser, signinUser } from "../controllers/userControllers";

const router = Router();

router.post("/signup", signupUserValidation, signupUser);
router.post("/signin", signinUserValidation, signinUser);

export default router;
