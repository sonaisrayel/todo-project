const express = require('express');
const router = express.Router();

const {
    createUser,
    getAllUsers,
    authenticateUser,
    getUser,
    updateUser,
    deleteUser,
} = require('../controllers/user-controller');

router.post('/', createUser);
router.post('/login', authenticateUser);
router.get('/:id', getUser);
router.get('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/getAllUsers', getAllUsers);
module.exports = router;
