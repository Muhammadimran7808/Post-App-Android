import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please enter name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "please enter email"],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "please enter password"],
      min: 6,
      max: 32,
    },
    profilePicture: {
      public_id: {
        type: String,
        default: "xyz",
      },
      url: {
        type: String,
        default:
          "https://res.cloudinary.com/muhammadimran/image/upload/v1714547321/default_pic_jkpk8m.png",
      },
    },
    role: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Users", userSchema); // "Users" is the relation in database
