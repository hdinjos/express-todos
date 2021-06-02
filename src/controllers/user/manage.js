const manage = (req, res) => {
  const { email, role } = req.session;
  res.render("user/manage", { name: "Hendi", role: role, user: email });
};

export default manage;
