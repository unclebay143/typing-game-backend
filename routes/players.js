// Player router
const router = require("express").Router();
const { getPlayers, profile } = require("../controllers/playerController");
const verifyToken = require("./verifyToken");

// Routes
router.get("/profile", verifyToken, profile);
router.get("/all", getPlayers);

module.exports = router;
