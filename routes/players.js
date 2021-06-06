// Player router
const router = require("express").Router();
const { getPlayers } = require("../controllers/playerController");

router.get("/alls", getPlayers);

module.exports = router;
