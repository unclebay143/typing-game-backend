const jwt = require("jsonwebtoken");

// Middleware function to validate the generated token
module.exports = function auth(req, res, next) {
  const token = req.header("auth-token");
  if (!token)
    return res.status(401).send("Access Denied, did you lost your token? 🤷‍♀️ ");

  // If there is a token
  try {
    // Try to verify it
    const verified = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    console.log(req.user);
    // Verify will return the id
    req.user = verified;
    // Continue with the original function that middleware was applied
    next();
  } catch (error) {
    // If validation failed
    res.status(400).send("Invalid Token 😭");
  }
};

// The req provides the information of the current users through the jwt, any function using this middleware can make us of it
