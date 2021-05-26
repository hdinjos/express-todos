import express from 'express';
import { loginView, loginPost } from '../controllers/auth/login';
const auth = express.Router();

auth.route('/login')
  .get(loginView)
  .post(loginPost)

export default auth;