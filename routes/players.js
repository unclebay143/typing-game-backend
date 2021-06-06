// Player router
const router = require("express").Router();
const { getPlayers } = require("../controllers/playerController");

router.get("/all", getPlayers);

module.exports = router;
