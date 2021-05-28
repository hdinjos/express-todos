const registerView = (req, res) => {
  res.render("auth/register");
};

const registerAction = (req, res) => {
  let password = req.body.password;
  let retypePassword = req.body.retypePassword;
  if (password !== retypePassword) {
    res.render("auth/register", {
      err: 0,
      msg: "Password and retype password must same",
    });
  } else {
    req.session.email = req.body.email;
    if (!req.session.email) {
      // return;
      res.redirect("/auth/register");
    } else {
      res.redirect("/");
    }
  }
};

export { registerView, registerAction };
