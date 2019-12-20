const express = require('express');
const bodyParser = require('body-parser');
const app = express();

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
  const post = req.body;
  console.log(post);
  res.status(201).json({
    message: 'Post added successfully'
  });
});

app.get("/api/posts",(req, res, next) => {
  const posts = [
    {
      id: 'jsg2672',
      title:'First server post',
      content:'This is coming form the server'
    },
    {
      id: 'hdasg64',
      title: 'Second Post Server',
      content:'This is second post'
    }
  ];
  res.status(200).json({
    message:'Hello',
    posts: posts
  });
});

module.exports = app;
