import { compareSync } from "bcryptjs";
import pool from "../../controllers/config";

const loginView = (req, res) => {
  res.render("auth/login", { name: "Hendi" });
};

const loginPost = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const query = {
      text: `SELECT email,password,role FROM auth WHERE email=$1`,
      values: [email],
    };
    const { rows } = await pool.query(query);
    if (!(rows.length === 0)) {
      const compare = compareSync(password, rows[0].password);
      if (compare) {
        req.session.email = rows[0].email;
        req.session.role = rows[0].role;
        res.redirect("/");
      } else {
        res.render("auth/login", {
          name: "Hendi",
          err: 1,
          msg: "password is not valid",
        });
      }
    } else {
      res.render("auth/login", {
        name: "Hendi",
        err: 0,
        msg: "email is not registered",
      });
    }
  } catch (err) {
    if (err.code === "42703") {
      res.render("auth/login", { err: 0, msg: "email is not registered" });
    }
    console.log(err);
  }
};

export { loginView, loginPost };
