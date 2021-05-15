import express from 'express';
import { createView, createAction, listTodos } from '../controllers/todos';
const todos = express.Router();

todos.get('/', listTodos);
todos.get('/add', createView);
todos.post('/add', createAction);

export default todos;