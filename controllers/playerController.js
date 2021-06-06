const client = require("../config/dbconfig");

// CONTROLLERS

// Get all players
exports.getPlayers = async (req, res) => {
  try {
    const allPlayers = await client.dbquery("SELECT * FROM developers.players");
    res.send({ allPlayers });
  } catch (error) {
    res.status(400).send(error);
  }
};
