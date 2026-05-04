/* old 
function requireAuth(req, res, next) {
  if (req.session.isLoggedIn) {
    return next();
  }

  res.redirect("/login");
} */

function requireAuth(req, res, next) {
  if (req.session.isLoggedIn) {
    return next();
  }

  req.session.returnTo = req.originalUrl;
  res.redirect("/login");
}

module.exports = {
  requireAuth
};