const bcrypt = require("bcrypt");
function getLoginPage(req, res) {
  res.render("login", {
    error: null
  });
}

function login(req, res) {
  const password = req.body.password;

  const isMatch = bcrypt.compareSync(
    password,
    process.env.ADMIN_PASSWORD_HASH
  );

  if (!isMatch) {
    return res.status(401).render("login", {
      error: "Invalid password"
    });
  }

  req.session.isLoggedIn = true;

  const redirectTo = req.session.returnTo || "/admin/new";
  delete req.session.returnTo;

  res.redirect(redirectTo);
}

function logout(req, res) {
  req.session.destroy(() => {
    res.redirect("/");
  });
}

module.exports = {
  getLoginPage,
  login,
  logout
};