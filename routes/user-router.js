const express = require('express');
const router = express.Router();

const { authenticateUser, getUser, updateUser, deleteUser } = require('../controllers/user-controller');

router.get('/:id?', getUser);
// router.post('/', createUser);
router.post('/login', authenticateUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
