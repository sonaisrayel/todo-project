const express = require('express');
const router = express.Router();

const { getUsers, createUser, editUser, deleteUser } = require('../controllers/user-controller');

router.get('/:id?', getUsers);
router.post('/', createUser);
// router.post('/login', authenticateUser);
router.put('/:id', editUser);
router.delete('/:id', deleteUser);

module.exports = router;
