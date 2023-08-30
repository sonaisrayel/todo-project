const express = require('express');
const router = express.Router();

const { createUser, getUser, updateUser, deleteUser } = require('../controllers/user-controller');

router.post('/', createUser);
router.get('/:id', getUser);
router.get('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
