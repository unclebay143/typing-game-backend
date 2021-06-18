const express = require("express");
const cors = require("cors");
const app = express();

// Import Routes
const authRouters = require("./routes/auth");
const playersRouters = require("./routes/players");
const gamesRoutes = require("./routes/games");

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Cors option
// const whitelist = ["http://example1.com", "http://example2.com"];
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
// };

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
