import pool from "../config";

const manageView = async (req, res) => {
  const { email, role } = req.session;
  const query = {
    text: `SELECT email, role FROM auth ORDER BY id`,
  };
  const { rows } = await pool.query(query);
  res.render("user/manage", {
    name: "Hendi",
    role: role,
    user: email,
    listUsers: rows,
  });
};

export default manageView;
