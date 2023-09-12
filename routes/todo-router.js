const express = require('express');
const router = express.Router();

const { createTodo, deleteTodos, changeStatus, compIncompleteTodos } = require('../controllers/todo-controller');

router.post('/', createTodo);
router.get('/:option?', compIncompleteTodos);
router.put('/complete', changeStatus);
// router.put('/change', changeDetails);
router.delete('/:id', deleteTodos);

module.exports = router;
