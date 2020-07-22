var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");

var secret = "This is the secret for signing tokens";
const auth = require("../auth");

router.get("/", function (req, res) {
  var token = jwt.sign({ foo: "bar" }, secret);
  res.cookie("token", token);
  res.setHeader("Authorization", "Bearer " + token);
  res.sendStatus(200);
});
router.get("/auth", auth, function (req, res) {
  res.json({ message: "route is authenticated" });
});

module.exports = router;
