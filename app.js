var express = require("express");
var cookie = require("cookie-parser");
const jwt = require("jsonwebtoken");

var app = express();
app.use(cookie());
app.set("port", process.env.PORT || 4000);
var secret = "This is the secret for signing tokens";

app.get("/", function (req, res) {
  var token = jwt.sign({ foo: "bar" }, secret);
  res.cookie("token", token);
  res.setHeader("Authorization", "Bearer " + token);
  res.sendStatus(200);
});

app.get("/auth", function (req, res) {
  var authheader = req.headers.authorization;

  if (!authheader) {
    res.json({ message: "This is not an auth route" });
  } else {
    const token = authheader.split(" ")[1];

    try {
      jwt.verify(token, secret);
      res.json({ message: "route is authenticated" });
    } catch (err) {
      res.json({ message: "token doesn't match" });
    }
  }
});
// app.get("/auth", function (req, res) {
//   if (jwt.verify(token, secret)) {
//     res.json({ name: "Venkat" });
//   }
// });

var server = app.listen(app.get("port"), function () {
  console.log("Listening on port" + app.get("port"));
});
