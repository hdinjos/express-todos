import express from 'express';
import { todosList, todosViewCreate, todosActionCreate } from '../controllers/todos';
const todos = express.Router();

todos.get('/', todosList);
todos.route('/add')
  .get(todosViewCreate)
  .post(todosActionCreate);
export default todos;