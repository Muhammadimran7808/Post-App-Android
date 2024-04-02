import mongoos from "mongoose";

// schema
const postSchema = new mongoos.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true, 
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    postedBy: {
      type: mongoos.Schema.Types.ObjectId,
      ref: "Users",
    },
  },
  { timestamps: true }
);
 
// model
export default mongoos.model("Post", postSchema);