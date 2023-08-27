// - **Get All Todos**
//     - Method: GET
//     - Endpoint: `/todos`
//     - Response: List of all todos

const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const port = 3000;

const fs = require('fs');

// const data = require('./todo.json');           //WHY DOESN'T WORK
const data = fs.readFileSync('todo.json')

app.get('/todos', (req, res) => {
  res.end(data)
});

app.listen(port, () => {
  console.log(`Server working on port ${port}`)
})