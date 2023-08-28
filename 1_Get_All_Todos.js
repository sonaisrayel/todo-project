const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');

const data = fs.readFileSync('todo.json');

app.get('/todos', (req, res) => {
  res.end(data)
});

app.listen(port, () => {
  console.log(`Server working on port ${port}`)
})