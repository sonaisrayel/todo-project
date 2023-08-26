
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const fs= require('fs');
const data = require('./todo.json');
const { v4: uuidv4 } = require('uuid');


app.use(bodyParser.json())



app.post('/todos', (req, res) => {

    const { title,description,completed } = req.body

    const titles = data.map(d => d.title);

    if (!titles.includes(title)) {
        data.push({ title,description,completed, id: uuidv4()});
        fs.writeFileSync("todo.json",JSON.stringify(data,null,2))

        return  res.send(data)
    }

    return res.status(404).send({message:'Todo is exists'})
})

app.put('/todos/complete', (req, res) => {

    const { id,completed } = req.body

    

    let file=fs.readFileSync("todo.json", 'utf8')
    let file1=JSON.parse(file)
    file1.forEach(el =>{
        if (id == el.id){
            el.completed=true
              
        }
    })
    fs.writeFileSync("todo.json",JSON.stringify(file1,null,2))
    let file2=fs.readFileSync("todo.json", 'utf8')
    let file3=JSON.parse(file2)
    let result = file3.find(item => item.id === req.body.id);
    res.send(result)
})


app.listen(port, () => {
    console.log(`Server working on port ${port}`);
})



// Update Todo
// Method: PUT/PATCH
// Endpoint: /todos/complete
// Request Body: { "id": "idOfTodo", "completed": true }
// Response: Updated todo details

