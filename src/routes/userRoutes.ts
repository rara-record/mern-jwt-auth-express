import { Router } from "express";
import { signupUser, signinUser } from "../controllers/userControllers";

const router = Router();

router.post("/signup", signupUser);
router.post("/signin", signinUser);

export default router;
