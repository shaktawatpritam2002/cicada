import express from "express";
import { LoginController, signupController,Logout, getCorrectCount, updateCorrectCount } from "../controller/team.js";

const router = express.Router();

router.post("/login",LoginController);
router.post("/signup",signupController);
router.post("/logout",Logout);
router.get("/updateCount",getCorrectCount)
router.post("/getCount",updateCorrectCount)

export default router;