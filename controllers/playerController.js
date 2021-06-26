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

// update player profile (twitter only for now)
exports.updateProfile = async (req, res) => {
  const { twitterHandle } = req.body;

  const options = {
    table: "players",
    records: [
      {
        id: req.user._id,
        twitterHandle: twitterHandle,
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

// Get all players
exports.getPlayers = async (req, res) => {
  try {
    // Contains all players Game record (without twitter handle for home page)
    const playersGameRecord = await client.query(
      "SELECT * FROM developers.players_game_record"
    );

    // Contains twitter handles without game records
    const playersProfile = await client.query(
      "SELECT * FROM developers.players"
    );

    // Sort the players profile with IDs
    const sortPlayersGameRecord = playersGameRecord.data.sort(
      (a, b) => a.id - b.id
    );
    // Sort the players profile with IDs to match with players record arrangement
    const sortplayersProfile = playersProfile.data.sort((a, b) => a.id - b.id);

    // Array to hold players profile which has twitter included
    const twitterIncludedProfile = [];

    for (let i = 0; i < sortPlayersGameRecord.length; i++) {
      // Look for twitter handle of players through id
      if (sortplayersProfile[i].id === sortPlayersGameRecord[i].id) {
        // Set the the found handle as new property (twitter handle) to each players profile
        sortPlayersGameRecord[i]["twitterHandle"] =
          sortplayersProfile[i].twitterHandle;
      }
    }
    // Store new record with twitter handle
    twitterIncludedProfile.push(sortPlayersGameRecord);

    // Return players profile(twitter handle and game record)
    res.json(twitterIncludedProfile);
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
