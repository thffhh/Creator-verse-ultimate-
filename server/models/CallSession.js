const mongoose = require("mongoose");

const callSessionSchema = new mongoose.Schema({
  sessionId: { type: String, unique: true, required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  hostId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: { type: String, enum: ["scheduled", "live", "ended"], default: "scheduled" },
  participants: [{ userId: String, role: String, joinedAt: Date }],
  recording: { enabled: Boolean, url: String }
}, { timestamps: true });

module.exports = mongoose.model("CallSession", callSessionSchema);
