// Express
const express = require("express");
const app = express();

// Import Routes
const authController = require("./api/index");
const playerController = require("./api/players");

// Route Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.route("/register").post(authController.registration);
app.route("/login").post(authController.login);
app.route("/players").get(playerController.getPlayers);
app.route("/game/update").put(playerController.updateGame);

//Port
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server is on port ${port}`);
});
