import express from "express";
import path from "path";
import session from "express-session";
import { renderFile } from "eta";
import { todos, items, auth } from "./routes";
import checkLogin from "./controllers/auth/sessions";
const app = express();

app.use("/static", express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "ngoding9rjqrq_mfwFHWE9",
    resave: true,
    saveUninitialized: true,
  })
);

//configure tamplate engine
app.engine("eta", renderFile);
app.set("view engine", "eta");
app.set("views", "./src/views");

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/auth", auth);
app.use(checkLogin);
app.use("/", todos);
app.use("/items", items);

app.listen(3000, () => {
  console.log("the server listen on port 3000");
});
