const router = require('express').Router();
const Post = require('../../models/Post');
const { Op } = require("sequelize");
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    console.log("HERE");
    req.body.user_id = req.session.userId;
    const post = await Post.create(req.body);
    res.status(200).json(post);
  } catch (err) {
      console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;