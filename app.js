import express from 'express';
const app = express();
import { renderFile } from 'eta';

//configure tamplate engine
app.engine("eta", renderFile);
app.set("view engine", "eta");
app.set("views", "./views");

app.get('/', (req, res) => {
  res.render("template", {
    favorite: "Eta",
    name: "Hendi",
    reasons: ["fast, lightweight", "simple"]
  });
});

app.listen(3000, () => {
  console.log('the server listen on port 3000');
});