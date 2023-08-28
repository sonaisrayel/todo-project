const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const fs = require('fs');
const data = require('./todo.json');

const { v4: uuidv4 } = require('uuid');

app.use(bodyParser.json())

app.post('/todos', (req, res) => {

    const { title, description, completed } = req.body;

    const titles = data.map((d) => d.title);

    if (title == null || title == "") {
        return res.status(400).send({ message: "Title field is required" });
    }

    if (description == null || description == "") {

        return res.status(400).send({ message: "Description field is required" });
    }
    if (typeof completed != "boolean") {
        return res.status(400).send({ message: "Completed field is required" });

    } 
    
    if (!titles.includes(title)) {
        data.push({ title, description, completed, id: uuidv4() });
        fs.writeFileSync('todo.json', JSON.stringify(data, null, 2));

        return res.send(data);
    }

    return res.status(404).send({ message: 'Todo already exists' });
})

app.listen(port, () => {
    console.log(`Server working on port ${port}`)
})