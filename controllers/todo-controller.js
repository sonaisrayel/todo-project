const data = require('../todo.json');
const { v4: uuidv4 } = require('uuid');
const { saveTodoData } = require('../helpers/saveData');
const fs = require('fs');

const createTodo = (req, res) => {
    const { title, description, completed } = req.body;

    const titles = data.map((d) => d.title);

    if (title == null || title === '') {
        return res.status(400).send({ message: 'Title field is required' });
    }

    if (description == null || description === '') {
        return res.status(400).send({ message: 'Description field is required' });
    }

    if (typeof completed !== 'boolean') {
        return res.status(400).send({ message: 'Completed field is required' });
    }

    if (!titles.includes(title)) {
        data.push({ title, description, completed, id: uuidv4() });
        saveTodoData(data);

        return res.send(data);
    }

    return res.status(404).send({ message: 'Todo already exists' });
};

const changeStatus = (req, res) => {
    const { id } = req.body;
    const todoId = parseInt(id);
    const result_of_id = data.findIndex((d) => d.id === todoId);

    if (result_of_id === -1) {
        return res.status(404).send({ message: 'Todo not found' });
    }

    data.forEach((el) => {
        if (todoId === el.id) {
            el.completed = true;
        }
    });

    saveTodoData(data);

    const result = data.find((item) => item.id === todoId);
    res.status(200).send(result);
};

const deleteTodos = (req, res) => {
    const { id } = req.params;

    const todoIds = data.map((d) => d.id);

    if (!todoIds.includes(id)) {
        return res.status(404).send(`Todo with id ${id} does not exists`);
    }

    const todoIndex = data.findIndex((el) => el.id === id);
    data.splice(todoIndex, 1);

    saveTodoData(data);
    return res.status(200).send(`Todo with id "${id}" successfully deleted`);
};

const getTodos = (req, res) => {
    const { option } = req.params;

    if (option) {
        if (option === 'complete') {
            const trueTask = data.filter((el) => el.completed === true);
            return res.status(200).send(trueTask);
        }
        if (option === 'incomplete') {
            const falseTask = data.filter((el) => el.completed === false);
            res.status(200).send(falseTask);
        }
    } else {
        res.status(200).send(data);
    }
};

const changeDetails = (req, res) => {
    let todo = [];

    todo = data.find((element) => {
        if (req.body.title) {
            element.title = req.body.title;
        }
        if (req.body.description) {
            element.description = req.body.description;
        }
        if (req.body.completed) {
            element.completed = req.body.completed;
        }
        todo.push(element);
        res.status(200).send(todo);
    });
};

const getAllTodos = (req, res) => {
    const arr = [];
    data.forEach((element) => {
        arr.push(element);
        fs.writeFileSync('newtodo.json', JSON.stringify(arr, null, 2));
        return res.status(200).send(arr);
    });
};

module.exports = {
    getAllTodos,
    createTodo,
    changeStatus,
    deleteTodos,
    getTodos,
    changeDetails,
};
