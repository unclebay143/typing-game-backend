const client = require("../config/dbconfig");

// Get all players
exports.getPlayers = async (req, res) => {
  try {
    const allPlayers = await client.dbquery("SELECT * FROM developers.players");
    res.send({ allPlayers });
  } catch (error) {
    res.status(400).send(error);
  }
};

//  Create game record instance for new player
exports.createGameRecord = async (req, res) => {
  //   const { id } = req.body;
  const options = {
    // schema is not passed here since it has been passed while creating client
    table: "players_game_record",
    // hashattribute: "id",
    records: [
      {
        id: req,
        wpm: 0,
        accuracy: 0,
        rank: 0,
        time: Date.now(),
        // numberOfTimesWon: +1,
      },
    ],
  };

  // Async/await
  try {
    const response = await client.insert(options);
    return response;
    // res.send(response);
    console.log(res);
  } catch (err) {
    return err;
    // res.send(err);
    console.log(err);
  }
};

// Update game record
exports.updateGame = async (req, res) => {
  const { id, wpm, accuracy, rank, userName } = req.body;
  const options = {
    // schema is not passed here since it has been passed while creating client
    table: "players_game_record",
    // hashattribute: "id",
    records: [
      {
        id: id,
        userName: userName,
        wpm: wpm,
        accuracy: accuracy,
        rank: rank,
        time: Date.now(),
        // numberOfTimesWon: +1,
      },
    ],
  };

  // Async/await
  try {
    const response = await client.update(options);
    res.send(response);
    console.log(res);
  } catch (err) {
    res.send(err);
    console.log(err);
  }
};
