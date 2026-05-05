const TeacherApplication = require("../models/TeacherApplication");
const User = require("../models/User");

exports.apply = async (req, res) => {
  try {
    const exists = await TeacherApplication.findOne({ applicant: req.user.uid, status: "pending" });
    if (exists) return res.status(400).json({ error: "Application already pending" });
    const app = await TeacherApplication.create({ applicant: req.user.uid, ...req.body });
    res.status(201).json({ success: true, app });
  } catch (err) { res.status(400).json({ error: err.message }); }
};

exports.review = async (req, res) => {
  try {
    const { appId, status, notes } = req.body;
    const app = await TeacherApplication.findById(appId);
    if (!app) return res.status(404).json({ error: "Not found" });
    app.status = status; app.reviewNotes = notes; app.reviewedBy = req.user.uid;
    await app.save();
    if (status === "approved") await User.findByIdAndUpdate(app.applicant, { role: "teacher" });
    res.json({ success: true, app });
  } catch (err) { res.status(400).json({ error: err.message }); }
};
