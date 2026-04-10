import mongoose from "mongoose";

const issueSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  priority: { type: String, required: true },
  landmark: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String }, 
  status: { type: String, default: "Pending" },
  reportedBy: { type: String }, // Stores the User's Name
  userId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Issue = mongoose.model("Issue", issueSchema);
export default Issue;