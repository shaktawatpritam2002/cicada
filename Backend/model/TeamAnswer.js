import mongoose from "mongoose";
import { Schema } from "mongoose";

const teamAnswerSchema = new Schema({
  TeamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
    required: true,
  },

  correctCount: {
    type: Number,
    default: 0,
  },
   endTime: { type: Date, default: null }
});

export default mongoose.model("TeamAnswer", teamAnswerSchema);