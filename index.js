var express = require('express'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    db = require('./models'),
    path = require('path'),
    app = express();

app.use(bodyParser.urlencoded({extended: true}))
app.use(session({
	secret: 'super secret',
	resave: false,
	saveUninitialized: true
}));

var views = path.join(process.cwd(), "views");

app.use("/", function (req, res, next) {

  req.login = function (user) {
    req.session.userId = user._id;
  };

  req.currentUser = function (cb) {
     db.User.
      findOne({
          _id: req.session.userId
      },
      function (err, user) {
        req.user = user;
        cb(null, user);
      })
  };

  req.logout = function () {
    req.session.userId = null;
    req.user = null;
  }

  next(); 
});

app.get("/signup", function (req, res) {
  res.send("Coming soon");
});

app.post("/users", function(req,res) {
	var user = req.body.user;

	db.User.createSecure(user.email,user.password,function() {
		res.send(user.email +"signed up!");
	});
});


//is accepting a form post with creds and authenticate account
app.post("/login", function (req, res) {
	var user = req.body.user;

	db.User.authenticate(user.email, user.password,
		function(err,user) {
			console.log(user + "logging in");
			req.login(user);
			res.redirect("/profile");
			//res.send("logged in!");
		});
});

app.get("/profile", function(req,res) {
	//we want to display current user's profile information
	req.currentUser(function(err,user) {
		res.send(user);
	});
});

app.get("/login", function(req,res) {
	res.sendFile(path.join(views,"login.html"));
});

app.listen(3000, function () {
  console.log("SERVER RUNNING");
});