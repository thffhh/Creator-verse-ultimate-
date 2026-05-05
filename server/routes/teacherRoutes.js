const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const ctrl = require("../controllers/teacherController");

router.post("/apply", auth, ctrl.apply);
router.post("/review", auth, admin, ctrl.review);

module.exports = router;
