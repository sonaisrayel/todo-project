// const { getAll} = require('../helpers/mongodb');

const { read, del } = require('../helpers/mongodb');
const { errorHandling } = require('../helpers/errorHandling');

const getUsers = async (req, res) => {
    const users = await read('users');

    res.status(200).send(users);
};

// const authenticateUser = (req, res) => {
// const { email, password } = req.body;
// const user = users.find((user) => user.email === email);

// if (!user) {
//     return res.status(404).send({ message: 'No such email.' });
// } else if (user.password !== password) {
//     return res.status(404).send({ message: 'Wrong credentials', username: user.username });
// }

//TODO write JWT logic
//     res.status(200).send({ message: 'You will receive some token soon' });
// };

// const updateUser = (req, res) => {
//     try {
//         const { id } = req.params;
//         const body = req.body;
//     } catch (error) {
//         res.status(404).send({ message: err.message });
//     }
// };

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const resp = await del('users', id);
        if (!resp.deletedCount) {
            errorHandling(`Id is not found`);
        }
        return res.status(200).send({ message: `User with id "${id}" successfully deleted` });
    } catch (err) {
        res.status(404).send({ message: err.message });
    }
};

module.exports = {
    getUsers,
    // authenticateUser,
    // updateUser,
    deleteUser,
};
