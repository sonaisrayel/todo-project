const express = require('express');
const router = express.Router();

const { createTodoValidate, compIncompTodos, changeStatus } = require('../controllers/todo-controller');

// router.post('/', createTodo);
router.post('/', createTodoValidate);
router.get('/:option?', compIncompTodos);
router.put('/complete', changeStatus);
// router.put('/change', changeDetails);
// router.delete('/:id', deleteTodos);

module.exports = router;
