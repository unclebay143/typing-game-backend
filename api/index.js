const { response, request } = require("express");
const db = require("../config/dbconfig");
const { registerValidation, loginValidation } = require("../validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// QUERIES
exports.registeration = async (request, response) => {
  // Validate for with Joi
  const { error } = registerValidation(request.body);

  // Destructure request body
  const { userName, email, password } = request.body;

  // Hash passwords
  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(password, salt);

  if (error)
    // If there is an error return validation error
    return response.status(400).send(error.details[0].message);

  // Check if the user exist only continue if both returns false
  const isUserExist =
    (await isEmailExist(email)) || (await isUsernameExist(userName));

  // If user exist with email or username
  if (isUserExist) {
    return response.status(400).json({ message: "Player already exist" });
  } else {
    // Register new player if no error
    const res = await registerNewPlayer(userName, email, hashedPassword);

    // Return the response status from the db -Restful best practice
    response.status(res.statusCode).json(res.data);
  }
};

// // DUPLICATED USERNAME VALIDATION FUNCTION return true if username exist on the db
const isUsernameExist = async (userName, email) => {
  // Query the db to find the account with the provided username
  const response = await db.searchByValue({
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
  const response = await db.searchByValue({
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
const registerNewPlayer = async (userName, email, password) => {
  try {
    // Query the db to add new player
    const response = await db.insert({
      table: "players",
      records: [
        {
          userName: userName,
          id: 1222,
          email: email,
          password: password,
          twitterHandle: null,
          // wpm:  0,
          // accuracy: 0,
          // rank: 0,
          // lastGameTime: Date.now()
        },
      ],
    });
    // Return the response
    return response;
  } catch (error) {
    return error;
  }
};

// LOGIN
exports.login = async (request, response) => {
  // Validate for with Joi
  const { error } = loginValidation(request.body);
  const { userName, password } = request.body;

  if (error)
    // If there is an error return validation error
    return response.status(400).send(error.details[0].message);

  // DUPLICATED USERNAME VALIDATION FUNCTION return true if username exist on the db
  try {
    // Find user in db using the username
    const user = await db.searchByValue({
      table: "players",
      searchAttribute: "userName",
      searchValue: userName,
      attributes: ["userName", "password", "id"],
    });
    // If no user is found
    if (!user)
      return response.status(400).send("Username or password is incorrect");
    // Validate Password
    const validPass = await bcrypt.compare(password, user.data[0].password);
    if (!validPass)
      return response.status(400).send("Invalid User credentials");

    // Create and assign token
    const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET);
    response
      .header("auth-token", token)
      .status(200)
      .send({
        message: "success",
        token: token,
        username: user.data[0].userName,
      });
  } catch (error) {
    response.send("error");
    console.log(error);
  }
};
