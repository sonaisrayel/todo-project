const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const fs = require('fs');
const data = require('./todo.json');



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
    res.status(200).send(taskCompl()) 
})

app.get ('/todos/not-completed', (req, res) => {
    
    function taskIncompl(){
        let incompTasks=[]
        data.forEach(el =>{
        
        if (el.completed==false){
            incompTasks.push(el)
        }
        
        })
        return incompTasks
    }
    res.status(200).send(taskIncompl()) 
})

app.listen(port, () => {
    console.log(`Server working on port ${port}`);
})
