import express from 'express';
import path from 'path';
import session from 'express-session';
import { renderFile } from 'eta';
import { todos, items, auth } from './routes';
const app = express();

app.use(session({
  secret: "ngoding9rjqrq_mfwFHWE9",
  resave: true,
  saveUninitialized: true
}));
app.use('/static', express.static(path.join(__dirname, 'public')));

//configure tamplate engine
app.engine("eta", renderFile);
app.set("view engine", "eta");
app.set("views", "./src/views");

app.use(express.urlencoded({
  extended: true
}));

app.use('/', todos);
app.use('/items', items);
app.use('/auth', auth);

app.listen(3000, () => {
  console.log('the server listen on port 3000');
});