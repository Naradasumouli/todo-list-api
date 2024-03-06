
const express = require('express');
const router = express.Router();
const TodoService = require('./todoService');

const todoService = new TodoService();

router.get('/', (req, res) => {
  res.json(todoService.getAllTodos());
});

router.post('/', (req, res) => {
  const { task } = req.body;
  const newTodo = todoService.createTodo(task);
  res.status(201).json(newTodo);
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { task, completed } = req.body;
  const updatedTodo = todoService.updateTodo(id, { task, completed });
  if (updatedTodo) {
    res.json(updatedTodo);
  } else {
    res.status(404).json({ error: 'Todo not found' });
  }
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const deletedTodo = todoService.deleteTodo(id);
  if (deletedTodo) {
    res.json(deletedTodo);
  } else {
    res.status(404).json({ error: 'Todo not found' });
  }
});

module.exports = router;
