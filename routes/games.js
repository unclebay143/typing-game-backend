// Player router
const router = require("express").Router();
const { updateGame, myGameRecord } = require("../controllers/gameController");
const verifyToken = require("./verifyToken");

// Routes
router.get("/record/", verifyToken, myGameRecord);
router.put("/update/", updateGame);

module.exports = router;
