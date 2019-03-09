var Post = require("../models/post");
var User = require("../models/user");
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const jwt = require("jsonwebtoken");

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

// app.set('appSecret', 'secretforinvoicingapp');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/NodeApp');
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback){
  console.log("Connection Succeeded");
});

app.post('/'), (req, res) => {
  var db = req.db;
  var username = req.body.username;
  var password = req.body.password;
  // User.find({username: username}) {
  //     if (error) { console.log(error) }
  //     res.send({
  //       message: 'User successfully logged in',
  //       status: true,
  //     })
    // })
  }

  // app.get('/posts', (req, res) => {
  //   Post.find({}, 'title description', function (error, posts) {
  //     if (error) { console.error(error); }
  //     res.send({
  //       posts: posts
  //     })
  //   }).sort({_id:-1})
  // })

app.post('/register', (req, res) => {
  var db = req.db;
  var username = req.body.username;
  var password = req.body.password;
  var new_user = new User({
    username: username,
    password: password
  })

  new_user.save(function (error) {
    if (error) {
      console.log(error)
    }
      // const payload = {
      //   user: new_user
      // }
      // let token = jwt.sign(payload, app.get("appSecret"), {
      //          expiresIn: 60*60*24 // expires in 24 hours
      // });
    res.send({
        message: 'User saved successfully with token',
        status: true,
        // token : token
    })
  })
})

// app.use(function(req, res, next) {
//   // check header or url parameters or post parameters for token
//   let token =
//     req.body.token || req.query.token || req.headers["x-access-token"];
//   // decode token
//   if (token) {
//     // verifies secret and checks exp
//     jwt.verify(token, app.get("appSecret"), function(err, decoded) {
//       if (err) {
//         return res.json({
//           success: false,
//           message: "Failed to authenticate token."
//         });
//       } else {
//         // if everything is good, save to request for use in other routes
//         req.decoded = decoded;
//         next();
//       }
//     });
//   } else {
//     // if there is no token
//     // return an error
//     return res.status(403).send({
//       success: false,
//       message: "No token provided."
//     });
//   }
// });

// Fetch all posts
app.get('/posts', (req, res) => {
  Post.find({}, 'title description', function (error, posts) {
    if (error) { console.error(error); }
    res.send({
      posts: posts
    })
  }).sort({_id:-1})
})

// adding post method
app.post('/posts', (req, res) => {
  var db = req.db;
  var title = req.body.title;
  var description = req.body.description;
  var new_post = new Post({
    title: title,
    description: description
  })

  new_post.save(function (error) {
    if (error) {
      console.log(error)
    }
    res.send({
      success: true,
      message: 'Post saved successfully!'
    })
  })
})

// Fetch single post
app.get('/post/:id', (req, res) => {
  var db = req.db;
  Post.findById(req.params.id, 'title description', function (error, post) {
    if (error) { console.error(error); }
    res.send(post)
  })
})

// Update a post
app.put('/posts/:id', (req, res) => {
  var db = req.db;
  Post.findById(req.params.id, 'title description', function (error, post) {
    if (error) { console.error(error); }

    post.title = req.body.title
    post.description = req.body.description
    post.save(function (error) {
      if (error) {
        console.log(error)
      }
      res.send({
        success: true
      })
    })
  })
})

// Delete a post
app.delete('/posts/:id', (req, res) => {
  var db = req.db;
  Post.remove({
    _id: req.params.id
  }, function(err, post){
    if (err)
      res.send(err)
    res.send({
      success: true
    })
  })
})

app.listen(process.env.PORT || 8081)
