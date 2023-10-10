// // const { getAll} = require('../helpers/mongodb');
//
// const getAllUsers = async (req, res) => {
//     try {
//         const users = await getAll('users');
//         return res.status(200).send(users);
//     } catch (err) {
//         return res.status(404).send({ message: err.message });
//     }
// };
//
// const getUser = async (req, res) => {
//     const { id } = req.params;
//
//     // const user = await getAll('users', id);
//
//
//     // if (!getUs) {
//     //     res.status(404).send('User Not Found');
//     // } else {
//     //     res.status(200).send(getUs);
//     // }
// };
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
// const updateUser = (req, res) => {
//     const userId = Number(req.params.id);
//     const body = req.body;
//
//     const user = users.find((element) => element.id === userId);
//     if (!user) {
//         res.status(404).send('User Not Found');
//     } else {
//         const updatedProfile = { ...user, ...body };
//         console.log(updatedProfile);
//         res.status(200).json(updatedProfile);
//     }
// };
//
// const deleteUser = (req, res) => {
//     const userId = Number(req.params.id);
//
//    // const usersData = users.filter((el) => el.id !== userId);
//    //  if (!usersData) {
//    //      res.status(404).send('User Not Found');
//    //  } else {
//    //      res.status(200).send('User successfully deleted');
//    //      console.log(usersData);
//    //  }
//    //  return usersData;
// };
//
// module.exports = {
//     getAllUsers,
//     getUser,
//     authenticateUser,
//     updateUser,
//     deleteUser,
// };
