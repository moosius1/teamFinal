module.exports = {
    ensureAuth: function (req, res, next) {
      if (process.env.NODE_ENV !== 'test') {
        return next()
      }
      else if (req.isAuthenticated()) {
        return next()
      } else {
        res.redirect('/')
      }
    },
    ensureGuest: function (req, res, next) {
      if (!req.isAuthenticated()) {
        return next();
      } else {
        res.redirect('/dashboard');
      }
    },
  }