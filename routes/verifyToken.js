const jwt = require("jsonwebtoken");

// Middleware function to validate the generated token
module.exports = function auth(req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access Denied");

  // If there is a token, try to verify it
  try {
    const verified = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);

    // Verify will return the id
    req.user = verified;
    next();
  } catch (error) {
    // If validation failed
    res.status(400).send("Invalid Token");
  }
};

// The req provides the information of the current users through the jwt, any function using this middleware can make us of it
