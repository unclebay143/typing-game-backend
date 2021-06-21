const client = require("../config/dbconfig");

//  Create game record instance for new player
exports.createGameRecord = async (req, res) => {
  const options = {
    // Schema is not passed here since it has been passed while creating client
    table: "players_game_record",
    records: [
      {
        id: req.id,
        userName: req.userName,
        wpm: 0,
        accuracy: 0,
        rank: 0,
        time: Date.now(),
      },
    ],
  };

  // Async/await
  try {
    const response = await client.insert(options);

    // Return response to the registration function
    return response;
  } catch (err) {
    return err;
  }
};

// Single player game record
exports.myGameRecord = async (req, res) => {
  try {
    const playerProfile = await client.searchByHash({
      table: "players_game_record",
      hashValues: [req.user._id],
      attributes: ["*"],
    });
    res.send(playerProfile);
  } catch (error) {
    res.status(401).send({ errorMessageToken: error });
  }
};

// Update game record
exports.updateGame = async (req, res) => {
  const { wpm, accuracy } = req.body;
  const options = {
    // schema is not passed here since it has been passed while creating client
    table: "players_game_record",
    records: [
      {
        id: req.user._id,
        wpm: Math.round(wpm),
        accuracy: Math.round(accuracy),
        time: Date.now(),
      },
    ],
  };

  // Async/await
  try {
    const response = await client.update(options);
    res.send(response);
  } catch (err) {
    res.send(err);
  }
};
