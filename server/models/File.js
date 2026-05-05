const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  fileName: { type: String, required: true },
  uploadedBy: String,
  contentHash: String,
  version: { type: Number, default: 1 },
  linkedAI: { type: Boolean, default: false },
  fileType: String
}, { timestamps: true });

module.exports = mongoose.model("File", fileSchema);
