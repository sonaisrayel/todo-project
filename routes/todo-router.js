const express = require('express');
const router = express.Router();

const { createTodo, completedTodos, changeStatus, changeDetails } = require('../controllers/todo-controller');

router.post('/', createTodo);
router.get('/:option?', completedTodos);
router.put('/complete', changeStatus);
router.put('/change', changeDetails);
// router.delete('/:id', deleteTodos);

module.exports = router;
