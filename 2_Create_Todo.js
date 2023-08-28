const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const fs = require('fs');
const data = require('./todo.json');  
const { v4: uuidv4 } = require('uuid');

app.use(bodyParser.json());

app.post('/todos', (req, res) => {

    const { title, description, completed } = req.body;
    const titles = data.map(d => d.title);
    if (!titles.includes(title)) {
        data.push({id: uuidv4(), title, description, completed });                     
        fs.writeFileSync("todo.json", JSON.stringify(data, null, 2));
        return res.send(data)
    } else {
        return res.status(404).send(`We already have title named ${title}`)      
    }

});

app.listen(port, () => {
    console.log(`Server working on port ${port}`)
})