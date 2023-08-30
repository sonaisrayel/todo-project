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

const authenticateUser = (req, res) => {
    const { email, password } = req.body;
    const user = users.find((user) => user.email === email);

    if (!user) {
        return res.status(404).send({ message: 'No such email.' });
    } else if (user.password !== password) {
        return res.status(404).send({ message: 'Wrong credentials', username: user.username });
    }

    res.status(200).send({ message: 'You will receive some token soon' });
};

module.exports = { createUser, authenticateUser };
