const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["user", "marketplace", "course", "studio"], default: "user" },
  content: String,
  media: [String],
  studioType: { type: String, enum: ["dubbing", "video-editing", "acting", "animation", null] },
  likesCount: { type: Number, default: 0 },
  commentsCount: { type: Number, default: 0 },
  isBoosted: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model("Post", postSchema);
