const { v4: uuidv4 } = require('uuid');
const { getAll } = require('../helpers/mongodb');
const { saveUsersData } = require('../helpers/saveData');
const users = require('../users.json');

const { validateInputs } = require('../helpers/validation');

const createUser = (req, res) => {
    const { username, email, password, repeatPassword, gender, birthday } = req.body;

    const regDate = new Date().toISOString().split('T')[0];

    const errors = validateInputs(username, email, password, repeatPassword, birthday, regDate);

    if (errors.length) {
        return res.status(errors[0].status).send({ message: errors[0].message });
    }

    const user = {
        username,
        email,
        password,
        dateOfRegistration: regDate,
        gender,
        birthday,
        id: uuidv4(),
    };

    users.push(user);

    saveUsersData(users);

    res.status(201).send({ message: `User is created, ${user}` });
};

const authenticateUser = (req, res) => {
    const { email, password } = req.body;
    const user = users.find((user) => user.email === email);

    if (!user) {
        return res.status(404).send({ message: 'No such email.' });
    } else if (user.password !== password) {
        return res.status(404).send({ message: 'Wrong credentials', username: user.username });
    }

    //TODO write JWT logic
    res.status(200).send({ message: 'You will receive some token soon' });
};

// const getAllUsers = async (req, res) => {
//     const users = await getAll('users');
//     return res.status(200).send(users)
// };
const getAllUsers = async (req, res) => {
    try {
        const users = await getAll('users');
        return res.status(200).send(users);
    } catch (err) {
        return res.status(404).send({ message: err.message });
    }
};
const getUser = (req, res) => {
    const userId = Number(req.params.id);

    const getUs = users.find((el) => el.id === userId);
    if (!getUs) {
        res.status(404).send('User Not Found');
    } else {
        res.status(200).send(getUs);
    }
};

const updateUser = (req, res) => {
    const userId = Number(req.params.id);
    const body = req.body;

    const user = users.find((element) => element.id === userId);
    if (!user) {
        res.status(404).send('User Not Found');
    } else {
        const updatedProfile = { ...user, ...body };
        console.log(updatedProfile);
        res.status(200).json(updatedProfile);
    }
};

const deleteUser = (req, res) => {
    const userId = Number(req.params.id);

    const usersData = users.filter((el) => el.id !== userId);
    if (!usersData) {
        res.status(404).send('User Not Found');
    } else {
        res.status(200).send('User successfully deleted');
        console.log(usersData);
    }
    return usersData;
};

module.exports = { createUser, getAllUsers, authenticateUser, getUser, updateUser, deleteUser };
