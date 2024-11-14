import jwt from "jsonwebtoken";
import { Types } from 'mongoose'; // Add this import
const JWT_SECRET = 'your-secret-key';

const verifyToken = (req, res, next) => {
    try {
        // 1. Extract the token
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            return res.status(401).json({ 
                message: "No authorization header found"
            });
        }

        // 2. Validate Bearer format
        const parts = authHeader.split(' ');
        if (parts.length !== 2 || parts[0] !== 'Bearer') {
            return res.status(401).json({ 
                message: "Invalid authorization format. Use 'Bearer <token>'"
            });
        }

        const token = parts[1];

        // 3. Verify the token
        const decoded = jwt.verify(token, JWT_SECRET);
        
        // 4. Set the decoded information
        req.team = decoded;
        
        next();
    } catch (error) {
        console.log("Token verification error:", error);
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ 
                message: "Invalid token",
                error: error.message 
            });
        } else if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ 
                message: "Token has expired",
                error: error.message 
            });
        }
        return res.status(500).json({ 
            message: "Internal server error during authentication",
            error: error.message 
        });
    }
};


export { verifyToken };