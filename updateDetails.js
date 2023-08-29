const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const fs = require('fs');
const data = require('./todo.json');
const { v4: uuidv4 } = require('uuid');


app.use(bodyParser.json())

app.put('/users/:id/edit', (req, res) => {

    const userId = Number(req.params.id)


    const user = data.find(element => element.id === userId)
    if (!user) {
        res.status(404).send('User Not Found')
    }
    if (!req.body.title) {
        user.title = user.title
    } else user.title = req.body.title;
    if (!req.body.description) {
        user.description = user.description
    } else user.description = req.body.description;
    if (!req.body.completed) {
        user.completed = user.completed
    } else user.completed = req.body.completed
    res.status(200).send(user)
});

app.listen(port, () => {
    console.log(`Server working on port ${port}`);
})