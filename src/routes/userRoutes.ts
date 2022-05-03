import { Router } from "express";
import { signupUser } from "../controllers/userControllers";

const router = Router();

router.post("/signup", signupUser);

export default router;
