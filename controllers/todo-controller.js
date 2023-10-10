// const { saveData } = require('../helpers/saveData');

const { create, read, del } = require('../helpers/mongodb');
const { errorHandling } = require('../helpers/errorHandling');

const getTodos = async (req, res) => {
    const { option } = req.params;
    const todos = await read('todos');

    //TODO create filter for complete/incomplete in MongoDB
    if (option) {
        if (option === 'complete') {
            const trueTask = todos.filter((el) => el.completed === true);
            return res.status(200).send(trueTask);
        }

        if (option === 'incomplete') {
            const falseTask = todos.filter((el) => el.completed === false);
            res.status(200).send(falseTask);
        }
    } else {
        res.status(200).send(todos);
    }
};

const createTodo = async (req, res) => {
    try {
        const { title, description, completed } = req.body;

        if (title == null || title === '') {
            errorHandling('Title field is required');
        }

        if (description == null || description === '') {
            errorHandling('Description field is required');
        }

        if (typeof completed !== 'boolean') {
            errorHandling('Completed field is required');
        }

        await create('todos', req.body);
        return res.status(200).send(`Todo with title "${title}" successfully created`);
    } catch (err) {
        return res.status(404).send({ message: err.message });
    }
};

const changeStatus = (req, res) => {
    //TODO need to be changed
    const { id } = req.params;
    const { title, description, completed } = req.body;
    const data = [];

    console.log(id, { title, description, completed });
    if (title) {
        data.push(title);
    }

    res.status(200).send('ok');
};

const deleteTodos = async (req, res) => {
    try {
        const { id } = req.params;
        const resp = await del('todos', id);
        if (!resp.deletedCount) {
            errorHandling(`Id is not found`);
        }
        return res.status(200).send({ message: `Todo with id "${id}" successfully deleted` });
    } catch (err) {
        res.status(404).send({ message: err.message });
    }
};

// const changeDetails = (req, res) => {
//     let todo = [];
//
//     todo = data.find((element) => {
//         if (req.body.title) {
//             element.title = req.body.title;
//         }
//         if (req.body.description) {
//             element.description = req.body.description;
//         }
//         if (req.body.completed) {
//             element.completed = req.body.completed;
//         }
//         todo.push(element);
//         res.status(200).send(todo);
//     });
// };

module.exports = {
    createTodo,
    changeStatus,
    deleteTodos,
    getTodos,
};
