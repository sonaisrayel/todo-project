

// - **Create Todo**
//     - Method: POST
//     - Endpoint: `/todos`
//     - Request Body: `{ "title": "Todo Title", "description": "Todo Description" , "completed" : false}`
//     - Response: Newly created todo with ID

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const fs = require('fs');
const data = require('./todo.json');   //  OR   const data = fs.readFileSync('todo.json')
const { v4: uuidv4 } = require('uuid');

app.use(bodyParser.json());

app.post('/todos', (req, res) => {

    const { title, description, completed } = req.body;
    const titles = data.map(d => d.title);
    if (!titles.includes(title)) {
        data.push({id: uuidv4(), title, description, completed });                     // OR    data.push (req.body);   
        fs.writeFileSync("todo.json", JSON.stringify(data, null, 2));
        return res.send(data)
    } else {
        return res.status(404).send(`We already have title named ${title}`)      //  OR return res.status(404).send({message:'Todo is exists'})
    }

});

app.listen(port, () => {
    console.log(`Server working on port ${port}`)
})