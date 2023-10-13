const { errorHandling } = require('../errors/errorHandling');
const { read, create, update, del } = require('../libs/mongodb');

const getUsers = async (req, res) => {
    try {
        const users = await read('users');
        return res.status(200).send(users);
    } catch (err) {
        return res.status(404).send({ message: err.message });
    }
};

const createUser = async (req, res) => {
    try {
        const { username, email, password, birthday } = req.body;
        if (username == null || username === '') {
            errorHandling(`Username field is required`);
        }
        if (email == null || email === '') {
            errorHandling(`Email field is required`);
        }
        if (password == null || password === '') {
            errorHandling(`Password field is required`);
        }
        if (birthday == null || birthday === '') {
            errorHandling(`Birthday field is required`);
        }
        await create('users', req.body);
        return res.status(200).send(`User ${username} successfully created`);
    } catch (e) {
        return res.status(404).send({ message: e.message });
    }
};

//
// const authenticateUser = (req, res) => {
//     const { email, password } = req.body;
//    // const user = users.find((user) => user.email === email);
//
//     // if (!user) {
//     //     return res.status(404).send({ message: 'No such email.' });
//     // } else if (user.password !== password) {
//     //     return res.status(404).send({ message: 'Wrong credentials', username: user.username });
//     // }
//
//     //TODO write JWT logic
//     res.status(200).send({ message: 'You will receive some token soon' });
// };
//
//

const editUser = async (req, res) => {
    try {
        const { id } = req.params;
        const data = {};
        Object.keys(req.body).forEach(function (prop) {
            data[prop] = req.body[prop];
        });

        const user = await read('users', id);
        if (!user) {
            errorHandling('User Not Found');
        } else {
            await update('users', id, data);
            return res.status(200).send(`User profile successfully edited.`);
        }
    } catch (e) {
        return res.status(404).send({ message: e.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const res = await del('users', id);
        if (!res.deleteCount) {
            errorHandling(`ID is not found`);
        }
        return res.status(200).send({ message: `User with ID ${id} successfully deleted` });
    } catch (e) {
        res.status(404).send({ message: e.message });
    }
};

module.exports = {
    getUsers,
    createUser,
    editUser,
    deleteUser,
};
