import express from 'express';
import path from 'path';
import { renderFile } from 'eta';
import { todos, items } from './routes';

const app = express();
app.use('/static', express.static(path.join(__dirname, 'public')));

//configure tamplate engine
app.engine("eta", renderFile);
app.set("view engine", "eta");
app.set("views", "./views");

app.use(express.urlencoded({
  extended: true
}));

app.use('/', todos);
app.use('/items', items);

app.listen(3000, () => {
  console.log('the server listen on port 3000');
});