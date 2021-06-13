const router = require('express').Router();
const Comment = require('../../models/Comment');
const withAuth = require('../../utils/auth');

router.post('/post/:id', withAuth, async (req, res) => {
    try {
      req.body.user_id = req.session.userId;
      req.body.post_id = req.params.id;
      const post = await Comment.create(req.body);
      res.status(200).json(post);
    } catch (err) {
        console.log(err);
      res.status(400).json(err);
    }
  });

  module.exports = router;