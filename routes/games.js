// Player router
const router = require("express").Router();
const { updateGame } = require("../controllers/gameController");

router.put("/update/", updateGame);

module.exports = router;
