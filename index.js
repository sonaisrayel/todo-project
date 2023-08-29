require('dotenv').config();

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const { port } = process.env;

const signup = require('./users/signup');

const todoRouter = require('./routes/todo-router');

app.use('/todos', todoRouter);

app.post('/user/signup', signup);

app.listen(port, () => {
    console.log(`Server working on port ${port}`);
});
