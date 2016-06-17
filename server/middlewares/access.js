module.exports = {
  isLoggedIn: (req, res, next) =>  {
    if (req.isAuthenticated()) {
      return  next();
    }
    res.redirect('/');
  },
  isAdmin: (req, res, next) => {
    if (!req.user && !(req.user.local.accessLevel === 9)) {
      res.status(401).send('Unauthorized');
    } else {
      return next();
    }
  }
}
