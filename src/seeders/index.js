import pool from "../controllers/config";
import { genSaltSync, hashSync } from "bcryptjs";

const UserAdmin = async () => {
  try {
    const saltPass = genSaltSync(10);
    const hashPass = hashSync("admin", saltPass);
    const queryAuth = {
      text: `INSERT INTO auth(email, password, role) values($1,$2,$3) RETURNING id`,
      values: ["admin@gg.com", hashPass, "ADMIN"],
    };
    const auth = await pool.query(queryAuth);
    const queryUser = {
      text: `INSERT INTO users(auth_id) values($1)`,
      values: [auth.rows[0].id],
    };
    await pool.query(queryUser);
    console.log("user admin created successfull");
    process.exit(0);
  } catch (err) {
    console.log(err);
  }
};

const UserGeneric = async () => {
  try {
    const saltPass = genSaltSync(10);
    const hashPass = hashSync("user", saltPass);
    const queryAuth = {
      text: `INSERT INTO auth(email, password, role) values($1,$2,$3) RETURNING id`,
      values: ["user@gg.com", hashPass, "GENERIC"],
    };
    const auth = await pool.query(queryAuth);
    const queryUser = {
      text: `INSERT INTO users(auth_id) values($1)`,
      values: [auth.rows[0].id],
    };
    await pool.query(queryUser);
    console.log("user generic created successfull");
    process.exit(0);
  } catch (err) {
    console.log(err);
  }
};

UserAdmin();
UserGeneric();
