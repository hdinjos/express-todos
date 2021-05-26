// import { render } from 'eta';
import pool from '../todos';

const loginView = (req, res) => {
  res.render('auth/login', { name: 'Hendi' });
};

const loginPost = (req, res) => {
  req.session.email = req.body.email;
  res.redirect('/');
}

export { loginView, loginPost };