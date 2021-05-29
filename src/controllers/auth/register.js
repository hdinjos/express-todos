import { genSaltSync, hashSync } from "bcryptjs";
import pool from "../../controllers/config";

const registerView = (req, res) => {
  res.render("auth/register");
};

const registerAction = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const retypePassword = req.body.retypePassword;
  if (password !== retypePassword) {
    res.render("auth/register", {
      err: 0,
      msg: "Password and retype password must same",
    });
  } else {
    req.session.email = email;
    if (!req.session.email) {
      res.redirect("/auth/register");
    } else {
      try {
        const salt = genSaltSync(10);
        const hash = hashSync(password, salt);
        const query = {
          text: `INSERT INTO auth(email, password) VALUES($1,$2)`,
          values: [email, hash],
        };
        await pool.query(query);
        res.redirect("/");
      } catch (err) {
        console.log(err);
      }
    }
  }
};

export { registerView, registerAction };
