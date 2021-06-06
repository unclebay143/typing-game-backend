// Player router
const router = require("express").Router();
const { getPlayers } = require("../controllers/playerController");

router.post("/players/", getPlayers);

module.exports = router;
