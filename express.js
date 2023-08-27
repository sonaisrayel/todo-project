const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const fs = require('fs');
const data = require('./todo.json')
app.use(bodyParser.json());
app.get('/.todos', (req,res) =>{
const arr= [];
data.forEach(element => {
    arr.push(element)
})
console.log(arr)
    // fs.writeFileSync("todosNew.json", JSON.strigify(arr, null, 2))
    return res.status(200).send(arr)
})
app.listen(port, () => {
    console.log(`Server working on port ${port}`)
})