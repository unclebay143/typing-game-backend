// Player router
const router = require("express").Router();
const {
  updateGame,
  myGameRecord,
  rankPlayers,
} = require("../controllers/gameController");
const verifyToken = require("./verifyToken");

// Routes
router.get("/record/", verifyToken, myGameRecord);
router.put("/update/", updateGame);
router.put("/rank/", rankPlayers);

module.exports = router;
