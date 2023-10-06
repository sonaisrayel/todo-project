const express = require('express');
const router = express.Router();

const {
    getAllUsers,
    createUser,
    // authenticateUser,
    // getUser, updateUser,
    // deleteUser
} = require('../controllers/user-controller');

router.get('/getAllUsers', getAllUsers);
router.post('/', createUser);
// router.post('/login', authenticateUser);
// router.get('/:id', getUser);
// router.get('/:id', updateUser);
// router.delete('/:id', deleteUser);

module.exports = router;
