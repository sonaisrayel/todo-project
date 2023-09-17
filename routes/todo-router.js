const express = require('express');
const router = express.Router();

const {
    createTodo,
    deleteTodos,
    changeStatus,
    getTodos,
    changeDetails,
    getAllTodos,
} = require('../controllers/todo-controller');

router.get('/getAllTodos', getAllTodos);
router.post('/', createTodo);
router.get('/:option?', getTodos);
router.put('/complete', changeStatus);
router.put('/change', changeDetails);
router.delete('/:id', deleteTodos);

module.exports = router;
