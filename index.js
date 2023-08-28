const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const fs = require('fs');
const data = require('./todo.json');
const { v4: uuidv4 } = require('uuid');


app.use(bodyParser.json())

app.delete('/todos/:id', (req, res) => {

    const id = req.params.id

    const ids = data.map(d => d.id);

    if (!ids.includes(id)) {

        return res.status(404).send(`todo with id ${id} does not exsists`)
    }

    let index = data.findIndex(el => el.id === id);
    data.splice(index, 1);

    fs.writeFileSync("todo.json", JSON.stringify(data, null, 2));
    return res.status(200).send(`Title with id "${id}" successfully deleted`)

});


app.listen(port, () => {
    console.log(`Server working on port ${port}`);
})
