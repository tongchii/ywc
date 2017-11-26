var db = require('./db');
var mongoose = require('mongoose');
var bCrypt = require('bcrypt')
var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var swig = require('swig');
var passport = require('passport');
var session = require('express-session');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
var bodyParser = require('body-parser')
var body = require('body-parser').urlencoded({
  extended: false
});
var valid = [];
var multer = require('multer');
var uploader = multer({
  dest: 'photo'
})
var ejs = require('ejs');
var cookie = require('cookie-parser')()




var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.use(flash());
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.methodOverride());

app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var User = mongoose.model('User');
var Buddy = mongoose.model('Buddy');


/* GET login page. */
app.get('/', cookie, function(req, res) {
  var card = -1
  if (req.cookies) {
    card = req.cookies.card
  }
  // Display the Login page with any flash message, if any
  res.render('index', {
    member: valid[card]
  });
});

app.get('/design', cookie, function(req, res) {
  var card = -1
  if (req.cookies) {
    card = req.cookies.card
  }
  // Display the Login page with any flash message, if any
  res.render('design', {
    member: valid[card]
  });
});

app.get('/marketing', cookie, function(req, res) {
  var card = -1
  if (req.cookies) {
    card = req.cookies.card
  }
  // Display the Login page with any flash message, if any
  res.render('marketing', {
    member: valid[card]
  });
});

app.get('/programming', cookie, function(req, res) {
  var card = -1
  if (req.cookies) {
    card = req.cookies.card
  }
  // Display the Login page with any flash message, if any
  res.render('programming', {
    member: valid[card]
  });
});

app.get('/booking', cookie, function(req, res) {
  var card = -1
  if (req.cookies) {
    card = req.cookies.card
  }
  // Display the Login page with any flash message, if any
  res.render('booking', {
    member: valid[card]
  });
});

app.get('/place', cookie, function(req, res) {
  var card = -1
  if (req.cookies) {
    card = req.cookies.card
  }
  // Display the Login page with any flash message, if any
  res.render('place', {
    member: valid[card]
  });
});


app.get('/apply', cookie, function(req, res) {
  var card = -1
  if (req.cookies) {
    card = req.cookies.card
  }
  // Display the Login page with any flash message, if any
  res.render('apply', {
    member: valid[card]
  });
});

app.get('/buddy', cookie, function(req, res) {
  var card = -1
  if (req.cookies) {
    card = req.cookies.card
  }
  // Display the Login page with any flash message, if any
  res.render('apply', {
    member: valid[card]
  });
});


app.post('/signup', body ,createMember);

function createMember(req,res){
  var newUser = new User();
  newUser.email = req.body.signemail;
  newUser.password = req.body.signpassword;
  newUser.status="1";

  newUser.save(function (err, newUser, count) {
           if (err) return res.redirect('/');
           res.redirect('/');
       });

}





app.post('/signin', body, function(req, res) {

  var email = req.body.email;
  var password = req.body.password;

  User.findOne({
    email: email,
    password: password
  }, function(err, user) {
    if (user != null) {
      var card = parseInt(Math.random() * 100000)
      valid[card] = user
      res.set('Set-Cookie', 'card=' + card)
      res.render('index', {
        member: valid[card]
      })
    } else {
      res.render('index')

    }


  })

})


// Logout endpoint
app.get(['/logout', '/signout'], cookie, showLogOut)
function showLogOut(req, res) {
	var card = -1
	if (req.cookies) {
		card = req.cookies.card
	}
	delete valid[card]
	res.redirect('/')
}

app.post('/submit',body,cookie,function(req,res){
  var newBuddy = new Buddy();
  newBuddy.name = req.body.name;
  newBuddy.detail = req.body.detail;
  newBuddy.interest = req.body.interest;

  newBuddy.save(function (err, newBuddy, count) {

           if (err) return res.redirect('/');
           res.redirect('/');
       });


})

/*
app.get('/random', cookie, random)
function random(req, res) {
	var card = -1
	if (req.cookies) {
		card = req.cookies.card
	}
  Buddy.findOne(function(err,buddy){
    var detail=buddy.detail
    var interest=buddy.interest
    var name=buddy.name

    User.findone({
      email:member.email,
      password:member.password,

    },function(err,user){
      user.buddydetail:detail,
      user.buddyinterest:interest,
      user.buddyname:name,
      user.status:"0"

      user.save()

    })

  })
	res.redirect('/')
}
*/





http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
