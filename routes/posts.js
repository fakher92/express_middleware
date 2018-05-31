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

// delete the post with this id
router.delete('/delete/:id', (req, res) => {
  Post.remove({
    _id: req.params.id
  }, (err, post) => {
    if (err)
      res.send(err);
    console.log('Post deleted');

  });
   
});

// update the post with this id
router.get('/edit/:id', function(req, res) {

  // use our post model to find the post we want
  Post.findById(req.params.id, function(err, post) {
    if (err)
      res.send(err);
    console.log(post);
    res.render('edit', {post: post});

    });
  });

router.put('/submit/:id', function(req, res) {
  Post.findById(req.params.id, function(err, post) {

    if (err)
      res.send(err);

    post.name = req.body.name;  // update the posts info
    post.content = req.body.content;  // update the posts info
    post.order = req.body.order;  // update the posts info

    // save the post
    post.save(function(err) {
      if (err)
        res.send(err);

      console.log("Post updated:", post);
      res.redirect('/posts');
    });

  });
})


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