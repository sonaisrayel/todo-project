const data = require('../todo.json');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

// const createTodo = (req, res) => {
//     const { title, description, completed } = req.body;

//     const titles = data.map((d) => d.title);

//     if (!titles.includes(title)) {
//         data.push({ title, description, completed, id: uuidv4() });
//         fs.writeFileSync('todo.json', JSON.stringify(data, null, 2));

//         return res.send(data);
//     }

//     return res.status(404).send({ message: 'Todo is exists' });
// };

const createTodoValidate = (req, res) => {
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
        fs.writeFileSync('todo.json', JSON.stringify(data, null, 2));

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

    fs.writeFileSync('todo.json', JSON.stringify(data, null, 2));

    const result = data.find((item) => item.id === todoId);
    res.status(200).send(result);
};

const deleteTodos = (req, res) => {
    const id = req.params.id;

    const ids = data.map((d) => d.id);

    if (!ids.includes(id)) {
        return res.status(404).send(`todo with id ${id} does not exsists`);
    }

    const index = data.findIndex((el) => el.id === id);
    data.splice(index, 1);

    fs.writeFileSync('todo.json', JSON.stringify(data, null, 2));
    return res.status(200).send(`Title with id "${id}" successfully deleted`);
  
}

const compIncompTodos = (req, res) => {
    const { option } = req.params;

    if (option) {
        if (option === 'complete') {
            const trueTask = data.filter((el) => el.completed === true);
            return res.status(200).send(trueTask);
        }
        if (option === 'incomplete') {
            const falseTask = data.filter((el) => el.completed === false);
            res.status(200).send(falseTask);
        } else {
            res.status(400).send();
        }
    }

};

module.exports = {
    // createTodo,
    createTodoValidate,
    changeStatus,
};
