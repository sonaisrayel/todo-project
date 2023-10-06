
const { getAll } = require('../helpers/mongodb');

const { validateInputs } = require('../helpers/validation');

const { getAll, create } = require('../helpers/mongodb');

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
        };

        await create('users', user);

        return res.status(201).send({ message: `User is created` });
    } catch (err) {
        return res.status(404).send({ message: err.message });
    }
};

// const authenticateUser = (req, res) => {
//     const { email, password } = req.body;
//     const user = users.find((user) => user.email === email);

//     if (!user) {
//         return res.status(404).send({ message: 'No such email.' });
//     } else if (user.password !== password) {
//         return res.status(404).send({ message: 'Wrong credentials', username: user.username });
//     }

//     //TODO write JWT logic
//     res.status(200).send({ message: 'You will receive some token soon' });
// };

// const getUser = (req, res) => {
//     const userId = Number(req.params.id);

//     const getUs = users.find((el) => el.id === userId);
//     if (!getUs) {
//         res.status(404).send('User Not Found');
//     } else {
//         res.status(200).send(getUs);
//     }
// };

// const updateUser = (req, res) => {
//     const userId = Number(req.params.id);
//     const body = req.body;

//     const user = users.find((element) => element.id === userId);
//     if (!user) {
//         res.status(404).send('User Not Found');
//     } else {
//         const updatedProfile = { ...user, ...body };
//         console.log(updatedProfile);
//         res.status(200).json(updatedProfile);
//     }
// };

// const deleteUser = (req, res) => {
//     const userId = Number(req.params.id);

//     const usersData = users.filter((el) => el.id !== userId);
//     if (!usersData) {
//         res.status(404).send('User Not Found');
//     } else {
//         res.status(200).send('User successfully deleted');
//         console.log(usersData);
//     }
//     return usersData;
// };

module.exports = {
    getAllUsers,
    createUser,
    // authenticateUser,
    // getUser,
    // updateUser,
    // deleteUser
};

