// Express
const express = require("express");
const app = express();

// Import Routes
const routesController = require("./api/index");

// Route Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.route("/register").post(routesController.registeration);

const PORT = 1111;
app.listen(PORT, () => console.log("server is on port " + PORT));
