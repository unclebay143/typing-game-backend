// Express
const express = require("express");
const app = express();

// Import Routes
const authRouters = require("./routes/auth");
const playersRouters = require("./routes/players");
const gamesRoutes = require("./routes/games");

// Route Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/user", authRouters);
app.use("/players", playersRouters);
app.use("/games", gamesRoutes);

//Port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server is 🏃‍♂️ on port ${port}`);
});

// Handle unknown route
app.use((req, res, next) => {
  const error = new Error(
    `Sorry can't find ${req.originalUrl} on the server 😫😫`
  );
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  return res
    .status(error.code || 500)
    .json({ message: error.message || "An unknown error occurred!" });
});
