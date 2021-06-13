const router = require('express').Router();
const Post = require('../../models/Post');
const { Op } = require("sequelize");
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    req.body.user_id = req.session.userId;
    const post = await Post.create(req.body);
    res.status(200).json(post);
  } catch (err) {
      console.log(err);
    res.status(400).json(err);
  }
});

router.post('/:id', withAuth, async (req, res) => {
  try {
    const post = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!post[0]) {
      res.status(404).json({ message: 'No Passwords with this id!' });
      return;
    }
    res.status(200).json(post);
  } catch (err) {
      console.log(err);
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const post = await Post.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!post) {
      res.status(404).json({ message: 'No Post found with this id!' });
      return;
    }

    res.status(200).json(post);
  } catch (err) {
      console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;