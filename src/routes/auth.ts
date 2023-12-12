import { Router } from "express";
import { signIn } from "../controllers/auth.controller";
import { verifyCard } from "../controllers/card.controller";
import { verifyJwt } from "../middleware/token";

const router = Router();
router.post("/tokens", signIn);
router.post("/charges",verifyJwt, verifyCard);


export { router };