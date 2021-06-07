const client = require("../config/dbconfig");

// CONTROLLERS

// Get all players
exports.getPlayers = async (req, res) => {
  try {
    const allPlayers = await client.query("SELECT * FROM developers.players");
    res.json(allPlayers);
  } catch (error) {
    res
      .status(400)
      .json(`error from the db ${error} - .env ${process.env.INSTANCE_SCHEMA}`);
  }
};
