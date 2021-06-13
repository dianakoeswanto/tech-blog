/* 
 * Express middleware to check if user is authenticated.
 * If not logged in, redirect to /login.
 * Otherwise, continue to the next() function.
 */
const withAuth = (req, res, next) => {
    if (!req.session.loggedIn) {
      res.redirect('/login');
    } else {
      next();
    }
  };
  
  module.exports = withAuth;
  