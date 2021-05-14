import pool from '../config';

const post = async (params) => {
  try {
    const query = {
      text: `INSERT INTO todos(activity, status) VALUES($1,$2)`,
      values: [params.activity, params.status]
    }
    await pool.query(query);
  } catch (err) {
    console.log(err);
  }
};

export default post;