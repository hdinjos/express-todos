import express from "express";
import {
  todosList,
  todosViewCreate,
  todosActionCreate,
  todosViewUpdate,
  todosActionUpdate,
  todosDestroy,
} from "../controllers/todos";
import checkLogin from "../controllers/auth/sessions";
const todos = express.Router();

todos.get("/", todosList);
todos
  .route("/add")
  .all(checkLogin)
  .get(todosViewCreate)
  .post(todosActionCreate);
todos
  .route("/todos/:id")
  .all(checkLogin)
  .get(todosViewUpdate)
  .post(todosActionUpdate);
todos.post("/:id", checkLogin, todosDestroy);
export default todos;
