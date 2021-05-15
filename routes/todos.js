import express from 'express';
import { todosList, todosViewCreate, todosActionCreate, todosViewUpdate, todosActionUpdate, todosDestroy } from '../controllers/todos';
const todos = express.Router();

todos.get('/', todosList);
todos.route('/add')
  .get(todosViewCreate)
  .post(todosActionCreate);
todos.route('/todos/:id')
  .get(todosViewUpdate)
  .post(todosActionUpdate);
todos.post('/:id', todosDestroy);
export default todos;
