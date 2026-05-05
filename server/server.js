require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const { connect } = require("./config/database");
const { init: initFirebase } = require("./config/firebaseAdmin");

initFirebase();
const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, { cors: { origin: process.env.SOCKET_CORS_ORIGIN } });

app.use(cors({ origin: process.env.SOCKET_CORS_ORIGIN, credentials: true }));
app.use(express.json({ limit: "10mb" }));

app.get("/api/health", (req, res) => res.json({ status: "OK" }));
app.use("/api/auth", (req, res) => res.json({ msg: "Auth ready" }));
app.use("/api/feed", require("./routes/feedRoutes"));
app.use("/api/teachers", require("./routes/teacherRoutes"));
app.use("/api/ai", require("./routes/aiRoutes"));

app.set("io", io);
io.on("connection", (socket) => console.log("📡 Connected:", socket.id));

connect().then(() => {
  server.listen(process.env.PORT, () => console.log(`🚀 Server on port ${process.env.PORT}`));
});

module.exports = app;
