import express from 'express';
const items = express.Router();

items.get('/', (req, res) => {
  res.send('this items root');
});

items.get('/category', (req, res) => {
  res.send('this category items');
});

export default items;