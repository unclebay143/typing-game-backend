const client = require("../config/dbconfig");
const { registerValidation, loginValidation } = require("../validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createGameRecord } = require("./gameController");
const { sendWelcomeMail } = require("./../mailing/welcome");

// CONTROLLERS

exports.registration = async (request, response) => {
  try {
    // Validate for with Joi
    const { error } = registerValidation(request.body);

    // Destructure request body
    const { userName, email, password } = request.body;
    // Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    if (error)
      // If there is an error return validation error as an object
      return response.status(400).json({
        message: error.details[0].message,
      });

    // Check if the user exist only continue if both returns false
    const isUserExist =
      (await isEmailExist(email)) || (await isUsernameExist(userName));

    // If user exist with email or username
    if (isUserExist) {
      return response.status(400).json({ message: "Player already exist" });
    } else {
      // Register new player if no error
      const res = await createNewPlayer(userName, email, hashedPassword);
      // Send welcome mail
      sendWelcomeMail(userName, email, password);
      // Return the response status from the db -Restful best practice
      response.status(res.statusCode).json({ message: "success" });
    }
  } catch (error) {
    response.json(error);
  }
};

//DUPLICATED USERNAME VALIDATION FUNCTION return true if username exist on the db
const isUsernameExist = async (userName, email) => {
  // Query the db to find the account with the provided username
  const response = await client.searchByValue({
    table: "players",
    searchAttribute: "userName",
    searchValue: userName,
    attributes: ["userName"],
  });
  // If the returned response length is greater than one the username exist
  if (response.data.length > 0) return true;

  // Return false by default
  return false;
};

// DUPLICATED EMAIL VALIDATION FUNCTION  returns true if email already exist on the db
const isEmailExist = async (email) => {
  // Query the db to find the account with the provided email
  const response = await client.searchByValue({
    table: "players",
    searchAttribute: "email",
    searchValue: email,
    attributes: ["email"],
  });

  // If the returned response length is greater than one the email exist
  if (response.data.length > 0) return true;
  // Return false by default
  return false;
};

// REGISTER A NEW USER
const createNewPlayer = async (userName, email, password) => {
  try {
    // Query the db to add new player
    const response = await client.insert({
      table: "players",
      records: [
        {
          userName: userName,
          email: email,
          password: password,
          twitterHandle: null,
        },
      ],
    });

    if (response.statusCode === 200) {
      // Create game record for new player in the players_game_record
      const res = await createGameRecord(response.data.inserted_hashes[0]);
      // Return response to the playerRegisteration function
      return res;
    }
  } catch (error) {
    return error;
  }
};

// LOGIN
exports.login = async (request, response) => {
  // Validate form with Joi
  const { error } = loginValidation(request.body);
  const { userName, password } = request.body;

  if (error)
    // If there is an error return validation error
    // return response.status(400).send(error.details[0].message);
    return response.status(400).json({
      message: error.details[0].message,
    });

  // DUPLICATED USERNAME VALIDATION FUNCTION return true if username exist on the db
  try {
    // Find user in db using the username
    const user = await client.searchByValue({
      table: "players",
      searchAttribute: "userName",
      searchValue: userName,
      attributes: ["userName", "password", "id"],
    });

    // If no user is found
    if (user.data.length === 0)
      return response
        .status(400)
        .json({ message: "Username or password is incorrect 🤦‍♂️" });
    // Validate Password
    const validPass = await bcrypt.compare(password, user.data[0].password);
    // If password is invalid
    if (!validPass)
      return response
        .status(400)
        .json({ message: "Invalid User credentials 🙇‍♀️" });

    // Create and assign token
    const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET_TOKEN);
    // Send token to the frontend
    response.header("auth-token", token).status(200).send({
      message: "success",
      token: token,
      username: user.data[0].userName,
    });
  } catch (error) {
    response.json(error);
  }
};
