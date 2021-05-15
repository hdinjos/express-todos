import express from 'express';
import list from '../controllers/todos/list';
import post from '../controllers/todos/post';
const todos = express.Router();

todos.get('/', async (req, res) => {
  // await list();
  res.render("landing", {
    favorite: "Eta",
    name: "Hendi",
    reasons: ["fast", "lightweight", "simple"],
    todos: await list()
  });
});

todos.get('/add', (req, res) => {
  res.render('add', { name: 'Hendi' })
});

todos.post('/add', async (req, res) => {
  if (!req.body.status) {
    const payload = {
      activity: req.body.activity,
      status: false
    }
    await post(payload);
  } else {
    const payload = {
      activity: req.body.activity,
      status: true
    }
    await post(payload);
  }
  res.redirect('/');
});

export default todos;