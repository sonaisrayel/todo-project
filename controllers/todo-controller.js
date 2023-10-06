// const { saveData } = require('../helpers/saveData');

const { getAll, create } = require('../helpers/mongodb');
const { errorHandling } = require('../helpers/errorHandling');

const getAllTodos = async (req, res) => {
    try {
        const todos = await getAll('todos');
        return res.status(200).send(todos);
    } catch (err) {
        return res.status(404).send({ message: err.message });
    }
};

const createTodo = async (req, res) => {
    try {
        const { title, description, completed } = req.body;
        const todos = await getAll('todos');
        const titles = todos.map((d) => d.title);

        if (title == null || title === '') {
            errorHandling('Title field is required');
        }

        if (description == null || description === '') {
            // return res.status(400).send({ message: 'Description field is required' });
            errorHandling('Description field is required');
        }

        if (typeof completed !== 'boolean') {
            // return res.status(400).send({ message: 'Completed field is required' });
            errorHandling('Completed field is required');

        if (!titles.includes(title)) {
            await create('todos', req.body);
            return res.status(200).send(`Todo with title "${title}" successfully created`);
        }

        errorHandling('Todo already exists');
        // return res.status(404).send({ message: 'Todo already exists' });
    } catch (err) {
        return res.status(404).send({ message: err.message });
    }
};

// const changeStatus = (req, res) => {
//     //TODO need to be changed
//     const { id } = req.params;
//     const { title, description, completed } = req.body;
//     const data = [];

//     console.log(id, { title, description, completed });
//     if (title) {
//         data.push(title);
//     }

//     res.status(200).send('ok');
// };

// const deleteTodos = (req, res) => {
//     const { id } = req.params;

//     const todoIds = data.map((d) => d.id);

//     if (!todoIds.includes(id)) {
//         return res.status(404).send(`Todo with id ${id} does not exists`);
//     }

//     const todoIndex = data.findIndex((el) => el.id === id);
//     data.splice(todoIndex, 1);

//     saveData(data, 'todo');
//     return res.status(200).send(`Todo with id "${id}" successfully deleted`);
// };

// const getTodos = async (req, res) => {
//     const { option } = req.params;

//     if (option) {
//         if (option === 'complete') {
//             const trueTask = data.filter((el) => el.completed === true);
//             return res.status(200).send(trueTask);
//         }
//         if (option === 'incomplete') {
//             const falseTask = data.filter((el) => el.completed === false);
//             res.status(200).send(falseTask);
//         }
//     } else {
//         const todoList = await mongoGetTodos();
//         res.status(200).send(todoList);
//     }
// };

// const changeDetails = (req, res) => {
//     let todo = [];

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
    getAllTodos,
    createTodo,
    // changeStatus,
    // deleteTodos,
    // getTodos,
    // changeDetails,
};
