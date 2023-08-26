
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;
const fs= require('fs');
const data = require('./todo.json');

app.use(bodyParser.json())



app.get('/todos/:completed', (req, res) => {
    const statusFilter = req.params.completed; 
    const new_data = [];

    data.forEach(item => {
        if (item.completed === statusFilter) {
            // console.log(item)
            new_data.push(item);
        }
      });
      //res.json(data);
       
      res.json(new_data);


})



app.listen(port, () => {
    console.log(`Server working on port ${port}`);
})

