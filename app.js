import express from 'express';
const app = express();
import { renderFile } from 'eta';
import path from 'path';
import list from './controllers/todos/list';
import post from './controllers/todos/post';

app.use('/static', express.static(path.join(__dirname, 'public')));

//configure tamplate engine
app.engine("eta", renderFile);
app.set("view engine", "eta");
app.set("views", "./views");

app.use(express.urlencoded({
  extended: true
}));

app.get('/', async (req, res) => {
  // await list();
  res.render("landing", {
    favorite: "Eta",
    name: "Hendi",
    reasons: ["fast", "lightweight", "simple"],
    todos: await list()
  });
});

app.get('/add', (req, res) => {
  res.render('add', { name: 'Hendi' })
});

app.post('/add', async (req, res) => {
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

app.listen(3000, () => {
  console.log('the server listen on port 3000');
});