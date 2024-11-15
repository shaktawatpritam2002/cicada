import bcrypt from "bcrypt"
import Team from "../model/team.js";
import generateCookie from "../config/generateToken.js";
import TeamAnswer from "../model/TeamAnswer.js";
import jwt from 'jsonwebtoken';
const JWT_SECRET = 'your-secret-key';
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

        // Generate JWT token with consistent payload structure
        const token = jwt.sign(
            {
                // Ensure teamId is a string
                email: team.leader_email
            },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        return res.status(200).json({
            message: "Login successful",
            token: token,
            team: {
                _id: team._id,
                email: team.leader_email
                // Add other non-sensitive team info as needed
            }
        });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ 
            message: "Internal server error",
            error: error.message 
        });
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
        const token = jwt.sign(
            {
                // Ensure teamId is a string
                email: teamdata.leader_email
            },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        if (teamdata) {
          
           return res.status(201).json({
                teamdata, token:token
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
const updateCorrectCount = async (req, res) => {
    try {
        const { isCorrect } = req.body;
        const email = req.team.email;

        // First find the team by email
        const team = await Team.findOne({ leader_email: email });
        if (!team) {
            return res.status(404).json({ message: "Team not found" });
        }

        // Convert team._id to string for logging/debugging
        console.log('Team ID:', team._id.toString());

        // Using findOneAndUpdate for atomic operation
        const teamAnswer = await TeamAnswer.findOneAndUpdate(
            { TeamId: team._id },
            {
                $inc: { correctCount: isCorrect ? 1 : 0 },
                $setOnInsert: { TeamId: team._id }
            },
            {
                new: true,
                upsert: true // Creates document if it doesn't exist
            }
        );

        res.status(200).json({ 
            message: "Count updated successfully",
            correctCount: teamAnswer.correctCount
        });

    } catch (error) {
        console.error('Error updating correct count:', error);
        
        // More detailed error logging
        if (error instanceof mongoose.Error.CastError) {
            return res.status(400).json({
                message: "Invalid ID format",
                error: error.message
            });
        }

        res.status(500).json({ 
            message: "Internal server error",
            error: error.message 
        });
    }
};

const getCorrectCount = async (req, res) => {
    try {
        // Get email from the authenticated request
        const email = req.team.email;

        // First find the team by email
        const team = await Team.findOne({ leader_email: email });
        if (!team) {
            return res.status(404).json({ 
                message: "Team not found",
                correctCount: 0 
            });
        }

        // Find the TeamAnswer document using the team's ID
        const teamAnswer = await TeamAnswer.findOne({ TeamId: team._id });
  
        // Send response with correct count (0 if no document exists)
        res.status(200).json({
            message: "Count retrieved successfully",
            correctCount: teamAnswer ? teamAnswer.correctCount : 0
        });

    } catch (error) {
        console.error('Error fetching correct count:', error);
        res.status(500).json({ 
            message: "Error fetching correct count",
            error: error.message,
            correctCount: 0
        });
    }
};

const storeEndTime = async (req, res) => {
    try {
      const { teamId, endTime } = req.body;
  
      if (!teamId || !endTime) {
        return res.status(400).json({ error: 'Team ID and end time are required.' });
      }
  
      // Save the end time for the team
      const updatedTeam = await TeamAnswer.findOneAndUpdate(
        { TeamId: teamId },
        { $set: { endTime } },
        { new: true, upsert: true } // Create entry if not exists
      );
  
      res.status(200).json({ message: 'End time stored successfully.', updatedTeam });
    } catch (error) {
      res.status(500).json({ error: 'Failed to store end time.' });
    }
  };
export {signupController,LoginController,Logout,getAns,postAns,updateCorrectCount,getCorrectCount,storeEndTime};