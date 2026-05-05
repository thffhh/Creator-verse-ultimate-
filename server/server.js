require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const { connect } = require("./config/database");
const { init: initFirebase } = require("./config/firebaseAdmin");

initFirebase();

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: { origin: process.env.SOCKET_CORS_ORIGIN, methods: ["GET", "POST"] }
});

app.use(cors({ origin: process.env.SOCKET_CORS_ORIGIN, credentials: true }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/api/health", (req, res) => {
  res.json({ status: "OK", time: new Date().toISOString() });
});

app.use("/api/auth", (req, res) => res.json({ message: "Auth route ready" }));
app.use("/api/feed", (req, res) => res.json({ message: "Feed route ready" }));
app.use("/api/ai", (req, res) => res.json({ message: "AI route ready" }));

app.set("io", io);
io.on("connection", (socket) => console.log("📡 Socket Connected:", socket.id));

connect().then(() => {
  server.listen(process.env.PORT, () => {
    console.log(`🚀 Server running on http://localhost:${process.env.PORT}`);
  });
});

module.exports = app;
