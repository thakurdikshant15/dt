const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const Post = require('./models/post');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/notepad', {useNewUrlParser: true})
  .then(() => {
    console.log('Connected to database');
  })
 .catch(()=> {
  console.log('Connection failed');
});

app.use(bodyParser.json());


app.use((req,res,next) => {
  res.setHeader('Access-Control-Allow-Origin',"*");
  res.setHeader(
    'Access-Control-Allow-Headers',
    "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader(
    'Access-Control-Allow-Methods',
    "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});

app.post("/api/posts",(req,res,next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save();
  console.log(post);
  res.status(201).json({
    message: 'Post added successfully'
  });
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

app.delete('http://api/posts/:id',(req , res, next) => {
  console.log(res.params.id);
  res.status(200).json({message:'Post Deleted'});
});

module.exports = app;
