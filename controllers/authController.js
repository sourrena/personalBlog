function getLoginPage(req, res) {
  res.render("login", {
    error: null
  });
}

function login(req, res) {
  const password = req.body.password;

  if (password !== "admin123") {
    return res.status(401).render("login", {
      error: "Invalid password"
    });
  }

  req.session.isLoggedIn = true;

  res.redirect("/admin/new");
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