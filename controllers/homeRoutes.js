const router = require('express').Router();
const Post = require('../models/Post');
const User = require('../models/User');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  console.log("GOT HIT");
  try {
    // Get all projects and JOIN with user data
    const postData = await Post.findAll();

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      posts,
      loggedIn: req.session.loggedIn 
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/dashboard', withAuth, async (req,res) => {
  try{
    const postsData = await Post.findAll(
    {
      where: { user_id: req.session.userId }        
    });

    const posts = postsData.map((post) => post.get({plain: true}));
    res.render('dashboard', {
      posts,
      loggedIn: req.session.loggedIn
    })
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/new_post', withAuth, async (req,res) => {
  console.log('/new');

  try{
    res.render('new', {
      post: {title: '', content: ''},
      loggedIn: req.session.loggedIn
    })
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

router.get('/edit/:id', withAuth, async (req,res) => {

  try{
    const postData = await Post.findByPk(req.params.id);
    const post = postData.get({plain: true});

    console.log(post);
    res.render('edit', {
      post,
      loggedIn: req.session.loggedIn
    })
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});


router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

module.exports = router;