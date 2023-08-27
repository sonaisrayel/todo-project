// - **Delete Todo**
//     - Method: DELETE
//     - Endpoint: `/todos/{todo_id}`
//     - Response: Confirmation message

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const fs = require('fs');
const data = require('./todo.json');
const { v4: uuidv4 } = require('uuid');

app.use(bodyParser.json());

app.delete('/todos', (req, res) => {

    const { id, title, description, completed } = req.body;

    const deleteTodo = () => {
        data.forEach(element => {
            if (element.id === id) {
                let found = data.find(el => el.id === id);
                let index = data.indexOf(found);
                data.splice(index, 1);
            }
            else {
                // return res.status(404).send(`We dont have a title with id "${id}" to delete`)
            }
        })
            return data;
        }
const newData = deleteTodo()


        fs.writeFileSync("todo.json", JSON.stringify(newData, null, 2));
        // return res.send(newData)
        return res.status(200).send(`Title with id "${id}" successfully deleted`)

    });

app.listen(port, () => {
    console.log(`Server working on port ${port}`)
})