import pool from "../config";

const detailProfile = async (req, res) => {
  const query = {
    text: `SELECT name, address FROM users INNER JOIN auth ON users.auth_id=auth.id WHERE email=$1`,
    values: [req.session.email],
  };
  const users = await pool.query(query);
  res.render("user/index", {
    name: "Hendi",
    user: req.session.email,
    role: req.session.role,
    names: users.rows[0].name,
    address: users.rows[0].address,
    validForm: req.flash("info"),
  });
};

const editProfile = async (req, res, next) => {
  try {
    const email = req.session.email;
    const name = req.body.names;
    const address = req.body.address;
    const queryGetAuth = {
      text: `SELECT id FROM auth WHERE email=$1`,
      values: [email],
    };
    const idAuth = await pool.query(queryGetAuth);
    const auth_id = idAuth.rows[0].id;
    const queryUpdateUser = {
      text: `UPDATE users SET name=$1, address=$2 WHERE auth_id=$3`,
      values: [name, address, auth_id],
    };
    await pool.query(queryUpdateUser);
    res.redirect("/user/profile");
  } catch (err) {
    console.log(err);
  }
};

export { detailProfile, editProfile };
