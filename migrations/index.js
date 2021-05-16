import pool from '../controllers/config/index.js';

const runMigrationTodos = async () => {
  try {
    const query = `CREATE TABLE IF NOT EXISTS todos (
      id SERIAL PRIMARY KEY,
      activity VARCHAR(20) NOT NULL,
      status BOOLEAN NOT NULL,
      created_at TIMESTAMP
    )`;
    await pool.query(query);
    await pool.end();
    console.log('migrations todos successfull');
    process.exit(0);
  } catch (err) {
    console.log(err);
  }
};

runMigrationTodos();