const router = require('express').Router();
const User = require('../../models/User');
const { Op } = require("sequelize");

// CREATE new user
router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.logged_in = true;

      res.status(200).json(user);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Login - finds the user given username. Sets session if user exists. 
// Otherwise throw 500
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ 
      where: 
          { email: req.body.email }
      
    });

    if (!user) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    const validPassword = await user.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.logged_in = true;
      
      res.json({ user, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

// Logout - if user is signed in, destroy session. Else, throw 404?
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
