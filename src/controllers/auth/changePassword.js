import pool from "../config";
import { compareSync, hashSync, genSaltSync } from "bcryptjs";

const changePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword, retypeNewPassword } = req.body;
    const { email } = req.session;
    const queryCurrentPass = {
      text: `SELECT password FROM auth WHERE email=$1`,
      values: [email],
    };
    const currentPassword = await pool.query(queryCurrentPass);
    const comparePass = compareSync(
      oldPassword,
      currentPassword.rows[0].password
    );
    if (oldPassword && newPassword && retypeNewPassword) {
      if (comparePass) {
        console.log(newPassword, retypeNewPassword);
        if (newPassword === retypeNewPassword) {
          const saltPass = genSaltSync(10);
          const hashPass = hashSync(newPassword, saltPass);
          const queryChangePassword = {
            text: `UPDATE auth SET password=$1 WHERE email=$2`,
            values: [hashPass, email],
          };
          await pool.query(queryChangePassword);
          req.session.destroy((err) => {
            if (err) {
              console.log(err);
            } else {
              res.redirect("/auth/login");
            }
          });
        } else {
          req.flash("info", {
            code: 1,
            msg: "New password and New retype password must the same",
          });
          res.redirect("/user/profile");
        }
      } else {
        req.flash("info", {
          code: 2,
          msg: "Old password is not valid",
        });
        res.redirect("/user/profile");
      }
    } else {
      req.flash("info", { code: 3, msg: "All fields cannot be empty" });
      res.redirect("/user/profile");
    }
  } catch (err) {
    console.log(err);
  }
};

export default changePassword;
