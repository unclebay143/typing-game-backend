// Player router
const router = require("express").Router();
const {
  getPlayers,
  profile,
  rankPlayers,
} = require("../controllers/playerController");
const verifyToken = require("./verifyToken");

// Routes
router.get("/profile", verifyToken, profile);
router.get("/all", getPlayers);
router.put("/rank", rankPlayers);

module.exports = router;
