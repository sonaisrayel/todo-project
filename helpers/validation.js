const users = require('../users.json');

const validateInputs = (username, email, password, repeatPassword, birthday, regDate) => {
    const errors = [];

    const userNames = users.map((user) => user.username);
    const emails = users.map((user) => user.email);

    if (username.includes(' ')) {
        errors.push({
            status: 403,
            message: 'Username cannot contain spaces.',
        });
    }

    if (userNames.includes(username)) {
        errors.push({
            status: 409,
            message: 'Username exists',
        });
    }

    if (username.length < 8) {
        errors.push({
            status: 403,
            message: 'Username must contain at least 8 symbols.',
        });
    }

    if (username.length > 30) {
        errors.push({
            status: 403,
            message: 'Too long username. Max length is 30 symbols.',
        });
    }

    if (emails.includes(email)) {
        errors.push({
            status: 403,
            message: 'Email exists',
        });
    }

    if (
        !email.includes('@') ||
        !email.includes('.') ||
        email.endsWith('@') ||
        email.endsWith('.') ||
        email.startsWith('@') ||
        email.startsWith('.') ||
        email.includes(' ')
    ) {
        errors.push({
            status: 403,
            message: 'Invalid email.',
        });
    }

    if (password !== repeatPassword) {
        errors.push({
            status: 403,
            message: 'Password does not match',
        });
    }

    if (password.length < 8) {
        errors.push({
            status: 403,
            message: 'Password must contain at least 8 symbols.',
        });
    }

    if (username.length > 30 || password.length > 30) {
        errors.push({
            status: 403,
            message: 'Too long password. Max length is 30 symbols.',
        });
    }

    if (new Date(regDate).getFullYear() - new Date(birthday).getFullYear() < 19) {
        errors.push({
            status: 403,
            message: 'You are too young to use this page.',
        });
    }

    return errors;
};

module.exports = { validateInputs };
