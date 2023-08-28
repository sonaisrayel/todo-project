const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const fs = require('fs');
const data = require('./todo.json');

const { v4: uuidv4 } = require('uuid');


app.get ('/todos', (req, res)=> {

const AllTodos=[]
data.forEach(el=>{
    AllTodos.push(el)
})
res.status(200).send(AllTodos)
})

app.listen(port, () =>{
    console.log(`Server working on port ${port}`);
})