import express from "express";
import { LoginController, signupController,Logout,getAns,postAns } from "../controller/team.js";

const router = express.Router();

router.post("/login",LoginController);
router.post("/signup",signupController);
router.post("/logout",Logout);
router.get("/getAns/:Pid",getAns)
router.post("/SubmitAns",postAns)

export default router;