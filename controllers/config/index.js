import { Pool } from 'pg';
const pool = new Pool({
  user: 'hdinjos',
  host: 'localhost',
  database: 'todo_list',
  password: '123',
  port: 5432
});

export default pool;

