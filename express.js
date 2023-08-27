const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const fs = require('fs');
const data = require('./todos.json')
app.use(bodyParser.json());
app.get('/.todos', (req,res) =>{
const arr= [];
todos.forEach(element => {
    arr.push(element)
    fs.writeFileSync(todosNew.json, JSON.strigify(arr, null, 2))
    return res.send(arr)
});
})
app.listen(port, () => {
    console.log(arr)
})