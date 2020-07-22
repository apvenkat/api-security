var express = require("express");
var cookie = require("cookie-parser");
const jwt = require("jsonwebtoken");

var app = express();
app.use(cookie());
app.set("port", process.env.PORT || 4000);
var secret = "This is the secret for signing tokens";

app.use(require("./routes/routes"));
// app.get("/auth", function (req, res) {
//   if (jwt.verify(token, secret)) {
//     res.json({ name: "Venkat" });
//   }
// });

var server = app.listen(app.get("port"), function () {
  console.log("Listening on port" + app.get("port"));
});
