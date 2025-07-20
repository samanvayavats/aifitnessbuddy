import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  history: [
    {
      image: {
        type: String
      },
      role: {
        type: String,
        enum: ['user', 'assistant', 'system'],
        default: 'system',
      },
      content: {
        type: String,
        required: true,
      }
    }
  ]
}, { timestamps: true });

export const User = mongoose.models.User || mongoose.model("User", userSchema);
