const client = require("../config/dbconfig");

// CONTROLLERS

// Function to get player profile through jwt verify token
exports.profile = async (req, res) => {
  try {
    const playerProfile = await client.searchByHash({
      table: "players",
      hashValues: [req.user._id],
      attributes: ["email", "id", "twitterHandle", "userName"],
    });
    res.send(playerProfile);
  } catch (error) {
    res.status(401).send({ errorMessageToken: error });
  }
};
// Get all players
exports.getPlayers = async (req, res) => {
  try {
    const allPlayers = await client.query(
      "SELECT * FROM developers.players_game_record"
    );
    // New array for players username
    const playersUserName = [];
    // Get all players username and store to playersUserName array
    allPlayers.data.forEach((player) => {
      playersUserName.push(player);
    });

    // Return only players usernames
    res.json(playersUserName);
  } catch (error) {
    res
      .status(400)
      .json(`error from the db ${error} - .env ${process.env.INSTANCE_SCHEMA}`);
  }
};

// Rank players
exports.rankPlayers = async (req, res) => {
  const { id, rank } = req.body;

  const options = {
    table: "players_game_record",
    records: [
      {
        id: id,
        rank: rank,
      },
    ],
  };

  try {
    const response = await client.update(options);
    res.send(response);
  } catch (err) {
    res.send(err);
  }
};

// Get player game record
exports.getGameRecord = async (req, res) => {
  try {
    const playerGameRecord = await client.searchByHash({
      table: "players_game_record",
      hashValues: [req.user._id],
      attributes: ["*"],
    });
    res.send(playerGameRecord);
  } catch (error) {
    console.log(error);
    res.status(401).send({ errorMessage: error });
  }
};
