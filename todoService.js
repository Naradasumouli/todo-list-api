
const fs = require('fs');
const Todo = require('./todoModel');

class TodoService {
  constructor() {
    this.todos = [];
    this.loadTodosFromFile();
  }

  loadTodosFromFile() {
    try {
      const data = fs.readFileSync('todos.json', 'utf8');
      this.todos = JSON.parse(data);
    } catch (err) {
      console.error('Error reading todos from file:', err);
    }
  }

  saveTodosToFile() {
    try {
      fs.writeFileSync('todos.json', JSON.stringify(this.todos, null, 2));
    } catch (err) {
      console.error('Error writing todos to file:', err);
    }
  }

  getAllTodos() {
    return this.todos;
  }

  getTodoById(id) {
    return this.todos.find(todo => todo.id === id);
  }

  createTodo(task) {
    const id = Date.now().toString();
    const newTodo = new Todo(id, task, false);
    this.todos.push(newTodo);
    this.saveTodosToFile();
    return newTodo;
  }

  updateTodo(id, updatedData) {
    const todoIndex = this.todos.findIndex(todo => todo.id === id);
    if (todoIndex !== -1) {
      this.todos[todoIndex] = { ...this.todos[todoIndex], ...updatedData };
      this.saveTodosToFile();
      return this.todos[todoIndex];
    }
    return null;
  }

  deleteTodo(id) {
    const todoIndex = this.todos.findIndex(todo => todo.id === id);
    if (todoIndex !== -1) {
      const deletedTodo = this.todos.splice(todoIndex, 1)[0];
      this.saveTodosToFile();
      return deletedTodo;
    }
    return null;
  }
}

module.exports = TodoService;
