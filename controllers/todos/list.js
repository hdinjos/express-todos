import pool from '../config';

const list = async () => {
  try {
    const { rows } = await pool.query('SELECT * from todos');
    return rows;
  } catch (err) {
    console.log(err);
  }
}

export default list;