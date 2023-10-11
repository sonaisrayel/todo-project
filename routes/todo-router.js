const express = require('express');
const router = express.Router();

const {
    getTodos,
    createTodo,
    deleteTodos,
    // changeStatus,
    // getTodos,
    // changeDetails,
} = require('../controllers/todo-controller');
router.post('/', createTodo);
router.get('/:option?', getTodos);
// router.put('/:id', changeStatus);
// router.put('/change', changeDetails);
router.delete('/:id', deleteTodos);

module.exports = router;
