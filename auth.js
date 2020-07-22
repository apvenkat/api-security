const jwt = require("jsonwebtoken");
var secret = "This is the secret for signing tokens";

module.exports = function (req, res, next) {
  var authheader = req.headers.authorization;

  if (!authheader) {
    res.json({ message: "This is not an auth route" });
  } else {
    const token = authheader.split(" ")[1];

    try {
      jwt.verify(token, secret);
      next();
    } catch (err) {
      res.json({ message: "token doesn't match" });
    }
  }
};
