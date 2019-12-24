const express = require('express');
const bodyParser = require('body-parser');
app = express();
const Post = require('./models/post');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://thakurdikshant15:<dikshant15>@dthakur-fh5k1.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true})
  .then(() => {
    console.log('Connected to database');
  })
 .catch(()=> {
  console.log('Connection failed');
});

app.use(bodyParser.json());


app.use((req,res,next) => {
  res.setHeader(
    'Access-Control-Allow-Origin','*'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

app.post("/api/posts",(req,res,next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(createdPost => {
    res.status(201).json({
      message: 'Post added successfully',
      postId: createdPost._id
    });
  });
});

app.put("/api/posts/:id", (req, res, next) => {
  const post = new Post({
    _id: req.params.id,
    title: req.body.title,
    content: req.body.content
  });
  Post.updateOne({_id: req.params.id}, post).then(result => {
    console.log(result);
    res.status(200).json ({message: " Update successful"});
  } )
});

app.get("/api/posts",(req, res, next) => {
  Post.find()
    .then(documents => {
      res.status(200).json({
        message:'Hello',
        posts: documents
      });
    });

});



app.delete("/api/posts/:id",(req , res, next) => {
  Post.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({message: "Post deleted"});
  });

});

module.exports = app;
