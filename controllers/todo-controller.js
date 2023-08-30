const data = require('../todo.json');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

const createTodo = (req, res) => {
    const { title, description, completed } = req.body;

    const titles = data.map((d) => d.title);

    if (!titles.includes(title)) {
        data.push({ title, description, completed, id: uuidv4() });
        fs.writeFileSync('todo.json', JSON.stringify(data, null, 2));

        return res.send(data);
    }

    return res.status(404).send({ message: 'Todo is exists' });
};

// const completedTodos = (req, res) => {
//
//     //TODO for Gohar -- please write in filter function
// };
const completedTodos = () => {};
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

module.exports = {
    createTodo,
    changeStatus,
    completedTodos,
};
