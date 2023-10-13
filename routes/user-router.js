const express = require('express');
const router = express.Router();

const { authenticateUser, getUsers, deleteUser } = require('../controllers/user-controller');

router.get('/:id?', getUsers);
// router.post('/', createUser);
router.post('/login', authenticateUser);
// router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
