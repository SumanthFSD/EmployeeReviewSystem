const authMiddleware = (req, res, next) => {
    if (!req.session.userId) {
      return res.redirect('/auth/homepage');
    }
    next();
  };
  
  module.exports = authMiddleware;
  