require('dotenv').config();

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const { port } = process.env;

const todoRouter = require('./routes/todo-router');
const userRouter = require('./routes/user-router');

app.use('/todos', todoRouter);
app.use('/users', userRouter);

app.listen(port, () => {
    console.log(`Server working on port ${port}`);
});
