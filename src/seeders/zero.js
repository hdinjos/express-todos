import pool from "../controllers/config";

const undoCreated = async () => {
  try {
    const queryAuth = {
      text: `DELETE from auth WHERE email=$1`,
      values: ["admin@gg.com"],
    };
    const queryUser = {
      text: `DELETE from auth WHERE email=$1`,
      values: ["user@gg.com"],
    };
    await pool.query(queryAuth);
    await pool.query(queryUser);
    console.log("undo create user successfull");
    process.exit(0);
  } catch (err) {
    console.log(err);
  }
};

undoCreated();
