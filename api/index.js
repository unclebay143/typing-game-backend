const { response } = require("express");
const db = require("../config/dbconfig");
const { registerValidation } = require("../validation");

// QUERIES
exports.registeration = async (request, response) => {
  // Validate for with Joi
  const { error } = registerValidation(request.body);

  // Destructure request body
  const { userName, email, password } = request.body;

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
    const res = await registerNewPlayer(userName, email, password);

    // Return the response status from the db -Restful best practice
    response.status(res.statusCode).json(res.data);
  }
};

// Function return true if username exist on the db
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

// Function returns true if email already exist on the db
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

const registerNewPlayer = async (userName, email, password) => {
  try {
    // Query the db to add new player
    const response = await db.insert({
      table: "players",
      records: [
        {
          userName: userName,
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
