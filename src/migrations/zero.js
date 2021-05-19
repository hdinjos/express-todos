import pool from '../controllers/config';

const zeroMigrate = async () => {
  try {
    const query = 'DROP TABLE todos';
    await pool.query(query);
    await pool.end();
    console.log('now, all table has no migrations');
    process.exit(0);
  } catch (err) {
    console.log(err);
  }
};

zeroMigrate();