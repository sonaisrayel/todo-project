const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const fs = require('fs');
const data = require('./todo.json');



app.get('/todos/complete', (req, res) => {


    let compTasks = []
    data.forEach(el => {

        if (el.completed == true) {
            compTasks.push(el)
        }

    })

    res.status(200).send(compTasks)
})

app.get('/todos/not-completed', (req, res) => {

    let incompTasks = []
    data.forEach(el => {

        if (el.completed == false) {
            incompTasks.push(el)
        }

    })


    res.status(200).send(incompTasks)
})


app.listen(port, () => {
    console.log(`Server working on port ${port}`);
})
