import pool from "../config";

const manageView = async (req, res) => {
  const { email, role } = req.session;
  const query = {
    text: `SELECT id, email, role FROM auth ORDER BY id`,
  };
  const { rows } = await pool.query(query);
  res.render("user/manage", {
    name: "Hendi",
    role: role,
    user: email,
    listUsers: rows,
  });
};

const manageRoleAct = async (req, res) => {
  try {
    const role = req.body.role;
    const userId = parseInt(req.body.userId);
    const queryRole = {
      text: `UPDATE auth SET role=$1 WHERE id=$2 RETURNING *`,
      values: [role, userId],
    };
    const resUpdateRole = await pool.query(queryRole);
    if (req.session.email === resUpdateRole.rows[0].email) {
      req.session.role = resUpdateRole.rows[0].role;
      res.redirect("/");
    } else {
      res.redirect("/user/manage");
    }
  } catch (err) {
    console.log(err);
  }
};

export { manageView, manageRoleAct };
