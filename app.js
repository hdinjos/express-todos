import express from 'express';
const app = express();
import { renderFile } from 'eta';
import path from 'path';
import list from './controllers/todos/list';

app.use('/static', express.static(path.join(__dirname, 'public')));

//configure tamplate engine
app.engine("eta", renderFile);
app.set("view engine", "eta");
app.set("views", "./views");

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

app.listen(3000, () => {
  console.log('the server listen on port 3000');
});