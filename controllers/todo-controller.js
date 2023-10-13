// const { saveData } = require('../helpers/saveData');

const { create, read, update, del } = require('../libs/mongodb');
const { errorHandling } = require('../errors/errorHandling');

const getTodos = async (req, res) => {
    try {
        //  const { id, title, complete } = req.query;

        const todos = await read('todos', req.query);
        return res.status(200).send(todos);

        //TODO create filter for complete/incomplete in MongoDB

        // res.status(200).send(todos);
    } catch (e) {
        return res.status(404).send({ message: e.message });
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

const editTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { title } = req.body;
        // const { title, description, completed } = req.body;

        const todo = await read('todos', id);
        if (!todo) {
            errorHandling('Todo Not Found');
        } else {
            // const updatedTodo = {...req.body };
            await update('todos', id, title);
            return res.status(200).send(`Todo successfully edited.`);
        }
    } catch (e) {
        return res.status(404).send({ message: e.message });
    }
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

module.exports = {
    createTodo,
    editTodo,
    deleteTodos,
    getTodos,
};
