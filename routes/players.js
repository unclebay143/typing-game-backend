// Player router
const router = require("express").Router();
const {
  getPlayers,
  profile,
  rankPlayers,
  getGameRecord,
  updateProfile,
} = require("../controllers/playerController");
const verifyToken = require("./verifyToken");

// Routes
router.get("/profile", verifyToken, profile);
router.put("/profile/update", verifyToken, updateProfile);
router.get("/all", getPlayers);
router.put("/rank", rankPlayers);
router.get("/game-record", verifyToken, getGameRecord);

module.exports = router;
