const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const fs = require('fs');
const { v4 : uuidv4 } = require("uuid") 
const data = require('./todo.json')
app.use(bodyParser.json());

app.delete('/todos' , (req,res) =>{
    const {id} = req.body;
    const ids = data.map(d => d.id);
   if(!ids.includes(id))   {
    res.status(200).send(`Unknown ${id}`)
   } else {
    const dig =  data.findIndex(todo_id);
    console.log(dig)
    data.slice(dig,1)
    return res.status(200).send(data)
}
       
app.listen(port, () => {
    console.log(`Server working on port ${port}`)
    
})