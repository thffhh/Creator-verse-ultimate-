const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const ctrl = require("../controllers/aiController");

router.use(auth, admin);
router.post("/preview", ctrl.preview);
router.post("/deploy", ctrl.deploy);

module.exports = router;
