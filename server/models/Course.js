const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  studioType: { type: String, enum: ["dubbing", "video-editing", "acting", "animation", "general"] },
  isLive: { type: Boolean, default: false },
  schedule: Date,
  enrolledCount: { type: Number, default: 0 },
  price: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model("Course", courseSchema);
