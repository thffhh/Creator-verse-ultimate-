const mongoose = require("mongoose");

const appSchema = new mongoose.Schema({
  applicant: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  expertise: [String],
  portfolio: [String],
  bio: String,
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  reviewedBy: String,
  reviewNotes: String
}, { timestamps: true });

module.exports = mongoose.model("TeacherApplication", appSchema);
