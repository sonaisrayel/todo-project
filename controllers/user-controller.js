const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const users = require('../users.json');

const regDate = require('../helpers/getRegDate')();
const { validateInputs } = require('../helpers/validation');

const createUser = (req, res) => {
    const { username, email, password, repeatPassword, gender, birthday } = req.body;

    const errors = validateInputs(username, email, password, repeatPassword, birthday);

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

    fs.writeFileSync('users.json', JSON.stringify(users, null, 2));

    res.status(201).send({ message: 'User is created', user });
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

module.exports = { createUser, getUser, updateUser, deleteUser };
