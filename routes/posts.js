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
router.get('/:id', function(req, res) {
  Post.find(function(err, posts) {
    posts.forEach(post => {
      if (post._id == req.params.id) {
        let matchedPost = post;
        res.render('post', {post: matchedPost});
      } else {
         console.log('Couldnt compare');
      }
    })
  });
});

router.delete('/delete/:id', (req, res) => {
  Post.remove({
    _id: req.params.id
  }, (err, post) => {
    if (err)
      res.send(err);
    console.log('Post deleted');

  });
  //redirect to /posts
  res.redirect("/posts");
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