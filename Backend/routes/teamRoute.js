import express from "express";
import { LoginController, signupController,Logout, getCorrectCount, updateCorrectCount, storeEndTime } from "../controller/team.js";
import { verifyToken } from "../config/verifytoken.js";
const router = express.Router();

router.post("/login",LoginController);
router.post("/signup",signupController);
router.post("/logout",Logout);
router.get("/getcount",verifyToken,getCorrectCount)
router.post("/updateCount",verifyToken,updateCorrectCount)
router.get('/check-login', verifyToken, (req, res) => {
    res.status(200).json({ message: "User is logged in", teamId: req.team._id });
});
router.get('/storeEndTime',verifyToken,storeEndTime);

export default router;