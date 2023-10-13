const express = require('express');
const router = express.Router();

const { createTodo, editTodo, deleteTodos, getTodos } = require('../controllers/todo-controller');

router.get('/', getTodos);
router.post('/', createTodo);
router.put('/:id', editTodo);
router.delete('/:id', deleteTodos);

module.exports = router;
