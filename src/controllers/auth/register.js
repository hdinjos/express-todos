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
      const client = await pool.connect();
      try {
        const salt = genSaltSync(10);
        const hash = hashSync(password, salt);
        await client.query("BEGIN");
        const queryAuth = {
          text: `INSERT INTO auth(email, password) VALUES($1,$2) RETURNING id`,
          values: [email, hash],
        };
        const { rows } = await client.query(queryAuth);
        const queryUser = {
          text: `INSERT INTO users(auth_id) values($1)`,
          values: [rows[0].id],
        };
        await client.query(queryUser);
        await client.query("COMMIT");
        await client.release();
        res.redirect("/");
      } catch (err) {
        await client.query("ROLLBACK");
        await client.release();
        res.redirect("/auth/register");
        console.log(err);
      }
    }
  }
};

export { registerView, registerAction };
