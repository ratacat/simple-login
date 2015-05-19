var express = require('express'),
    bodyParser = require('body-parser'),
    app = express();

app.use(bodyParser.urlencoded({extended: true}))

app.get("/signup", function (req, res) {
  res.send("Coming soon");
});

//is accepting a form post with creds and authenticate account
app.post("/login", function (req, res) {

});

app.listen(3000, function () {
  console.log("SERVER RUNNING");
});