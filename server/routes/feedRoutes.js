const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const ctrl = require("../controllers/feedController");

router.get("/", ctrl.getFeed);
router.post("/", auth, ctrl.createPost);
router.post("/:postId/like", auth, ctrl.toggleLike);

module.exports = router;
