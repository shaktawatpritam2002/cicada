import bcrypt from "bcrypt"
import Team from "../model/team.js";
import generateCookie from "../config/generateToken.js";
import TeamAnswer from "../model/TeamAnswer.js";

const LoginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Both email and password are required" });
        }

        const team = await Team.findOne({ leader_email: email });
        if (!team) {
            return res.status(404).json({ message: "Email not found" });
        }

        const isMatch = await bcrypt.compare(password, team.password);   
        if (!isMatch) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        generateCookie(team._id, res);   
        return res.status(200).json({ team });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const signupController = async(req,res)=>{
    try {
        const {email,member1,member2,member3} = req.body;
        let {password} = req.body;
    
        const team = await Team.findOne({leader_email:email});
        if(team){
            return res.status(404).json({message:"email already present"});
        }
    
        const teammember = await Team.findOne({
            $or:[{member1:member1},{member2:member2},{member3:member3}]
        });
        if(teammember){
            return res.status(404).json({message:"member already present"});
        }
    
        if(!password){
            return res.status(404).json({message:"enter password"});
        }
    
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt)
        const teamdata = await Team.create({
            leader_email:email,
            password:password,
            member1:member1,
            member2:member2,
            member3:member3,
        })
        if (teamdata) {
            generateCookie(teamdata._id,res);
           return res.status(201).json({
                teamdata
            });
        } else {
            return res.status(400).json({ message: "Invalid team data" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error"});
    }
};

const Logout = async(req,res)=>{
    try {
        res.cookie("jwt", "", { maxAge: 1 });
        res.status(200).json({ message: "User logged out successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log("Error in signupUser: ", err.message);
    }
}

const getAns = async(req,res) =>{
    try {
        const {ans,qno} = req.body;
        if(!ans && !qno){
            res.status(404).json({message:"enter both field"});
        }
        const team = await TeamAnswer.findById({
            TeamId:req.team._id
        });
        const QuizNo = `Quiz${qno}`;
        if(team){
            res.status(200).json({PuzzleAns:team.QuizNo});
        }
        else{
            res.status(404).json({message:"no answer found"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error"});
    }
}
const postAns = async(req,res) =>{
    try {
        const {ans,qno} = req.body;
        if(!ans && !qno){
            res.status(404).json({message:"enter both field"});
        }
        const team = await TeamAnswer.findbyId({
            TeamId:req.team._id
        });
    
    
        if(!team){
            const isleader = await Team.findOne({
                leader_email:req.Team.leader_email
            })
            if(!isleader){
                res.status(404).json({message:"you are not the leader"});
            }
            else{
                const QuizNo = `Quiz${qno}`;

                const ansdata = await TeamAnswer.create({
                    TeamId:req.team._id,
                    QuizNo:ans,
                })
                res.status(201).json({message:"answer submitted",ansdata});
            }
        };
        const QuizNo = `Quiz${qno}`;

        const updateAns = await TeamAnswer.updateOne(
            { TeamId: req.team._id },
            { $set: { [QuizNo]: ans } }
        );
         
        res.status(201).json({message:"answer submitted",updateAns});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error"});
    }
}
const updateCorrectCount=async(teamId,isCorrect)=>{
    try {
        const teamAnswer = await TeamAnswer.findOne({ TeamId: teamId });
        if (teamAnswer) {
          if (isCorrect) {
            teamAnswer.correctCount++;
          }
          await teamAnswer.save();
        } else {
          // If no TeamAnswer document exists, create a new one
          await TeamAnswer.create({ TeamId: teamId, correctCount: isCorrect ? 1 : 0 });
        }
      } catch (error) {
        console.error('Error updating correct count:', error);
        throw error;
      }
}
const getCorrectCount = async (teamId) => {
    try {
      // Find the TeamAnswer document associated with the given teamId
      const teamAnswer = await TeamAnswer.findOne({ TeamId: teamId });
  
      // If the document exists, return the correctCount, otherwise return 0
      if (teamAnswer) {
        return teamAnswer.correctCount;
      } else {
        // Return 0 if no TeamAnswer document exists
        return 0;
      }
    } catch (error) {
      console.error('Error fetching correct count:', error);
      throw error;
    }
  };
  

export {signupController,LoginController,Logout,getAns,postAns,updateCorrectCount,getCorrectCount};