const registerView = (req, res) => {
  res.render("auth/register");
};

const registerAction = (req, res) => {
  req.session.email = req.body.email;
  if (!req.session.email) {
    return;
  } else {
    res.redirect("/");
  }
};
