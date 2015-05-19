var express = require('express'),
    bodyParser = require('body-parser'),
    app = express();

app.use(bodyParser.urlencoded({extended: true}))

app.get("/signup", function (req, res) {
  res.send("Coming soon");
});

//is accepting a form post with creds and authenticate account
app.post("/login", function (req, res) {
	db.User.authenticate(user.email,user.password,
		function(err,user) {
			console.log("logging in");
			res.send("logged in!");
		});
});

app.listen(3000, function () {
  console.log("SERVER RUNNING");
});