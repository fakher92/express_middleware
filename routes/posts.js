const Post = require('../models/post');

const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  Post.find( (err, posts) =>{
    res.render('posts', {
      posts: posts
    })
  });
});

router.post('/', (req, res) => {
  var post = new Post();
  post.name = req.body.name;
  post.content = req.body.content;
  post.order = req.body.order;

  // Save the post and check for errors
  post.save( (err) => {
    if (err)
    res.send(err);
    console.log("Post Created", post);
    res.redirect('/posts');
  });
});


module.exports = router