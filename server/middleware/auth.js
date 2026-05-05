const admin = require("../config/firebaseAdmin").init();

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split("Bearer ")[1];
    if (!token) return res.status(401).json({ error: "No token provided" });
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = {
      uid: decoded.uid,
      email: decoded.email,
      role: decoded.role || "user"
    };
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};
