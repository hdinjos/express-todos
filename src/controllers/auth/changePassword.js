import pool from "../config";
import { compareSync } from "bcryptjs";

const changePassword = async (req, res) => {
  const { email } = req.session;
  const { oldPassword } = req.body;
  const { newPassword } = req.body;
  const { newRetypePassword } = req.body;
  try {
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
      console.log("oke bosq");
      // const queryChangePassword
    } else {
      console.log("wowoow");
    }
  } catch (err) {
    console.log(err);
  }
};

export default changePassword;
