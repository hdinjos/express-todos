import pool from "../config";

const detailProfile = (req, res) => {
  console.log(req.session.email, "jsjsdj");
  res.render("user/index", {
    name: "Hendi",
    user: req.session.email,
    role: req.session.role,
  });
};

export { detailProfile };
