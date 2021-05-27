let checkLogin = (req, res, next) => {
  if (!req.session.email) {
    return res.redirect("/auth/login");
  }
  next();
};

export default checkLogin;
