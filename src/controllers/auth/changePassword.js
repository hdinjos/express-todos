import pool from "../config";
import { compareSync, hashSync, genSaltSync } from "bcryptjs";

const changePassword = async (req, res) => {
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
        // belum solving untuk alert
        res.redirect(
          "/user/profile/?err=1&msg=new+password+and+retype+new+password+must+same"
        );
      }
    } else {
      // belum solving untuk alert
      res.redirect("/user/profile/?err=0&msg=old+password+is+not+valid");
    }
  } catch (err) {
    console.log(err);
  }
};

export default changePassword;
