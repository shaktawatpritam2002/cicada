import Team from "../model/team.js"
import jwt from "jsonwebtoken"
const protectRoute = async(req,res,next) => {
    try {
        const token = req.cookies.jwt
        if(!token){
            res.status(401).json({message:"Unauthorized team"})
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        const team = await Team.findById(decoded.teamId).select("-password")
        req.team = team
        next()
    } catch (error) {
        console.log(error)
    }

}

export default protectRoute;