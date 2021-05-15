import pool from '../config';

const todosList = async (req, res) => {
  try {
    const { rows } = await pool.query(`SELECT * FROM todos`);
    res.render('landing', {
      favorite: "Eta",
      name: "Hendi",
      reasons: ["fast", "lightweight", "simple"],
      todos: rows
    });
  } catch (err) {
    console.log(err);
  }
};

const todosViewCreate = (req, res) => {
  res.render('add', { name: 'Hendi' })
};

const todosActionCreate = async (req, res) => {
  try {
    const payload = {
      activity: '',
      status: ''
    };
    if (!req.body.status) {
      payload.activity = req.body.activity;
      payload.status = false;
    } else {
      payload.activity = req.body.activity;
      payload.status = true;
    }
    const query = {
      text: `INSERT INTO todos(activity, status) VALUES($1, $2)`,
      values: [payload.activity, payload.status]
    }
    await pool.query(query);
    res.redirect('/');
  } catch (err) {
    console.log('err');
  }
};

export {
  todosList, todosViewCreate, todosActionCreate
};