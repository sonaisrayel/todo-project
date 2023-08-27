
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

  
    const { id } = req.body
    const todoId = parseInt(id);
    const result_of_id = data.findIndex(d=> d.id === todoId);
    
    
    if (result_of_id === -1){
        return  res.status(404).send({message: 'Todo not found'})
    }
    
    data.forEach(el =>{
        if (todoId === el.id){
            el.completed=true
              
        }
    })
    fs.writeFileSync("todo.json",JSON.stringify(data,null,2))

    let result = data.find(item => item.id === todoId);
    res.status(200).send(result);
})





app.get ('/todos/complete', (req, res) => {
    
    function taskCompl(){
        let compTasks=[]
        data.forEach(el =>{
        
        if (el.completed==true){
            compTasks.push(el)
        }
        
        })
        return compTasks
    }
    res.send(taskCompl()) 
})
    

app.listen(port, () => {
    console.log(`Server working on port ${port}`);
})
