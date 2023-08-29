const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const users = require('../users.json');

const regDate = require('../helpers/getRegDate')();
const { validateInputs } = require('../helpers/validation');

const signup = (req, res) => {
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

module.exports = signup;
