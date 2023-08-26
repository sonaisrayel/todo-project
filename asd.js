const express = require('express');
const fs = require('fs');
const bodyParse = require('body-parser');
const app = express();
const port = 3000;
const data = require('./todo.json');
app.use(bodyParse.json());
app.post('/delete', (req, res) => {
    let ind = -1;
    data.forEach((element, index) => {
        if (element.id == req.body.id) ind = index;
    })
    if (ind == -1) {
        res.status(404).send({message: `There is no todo with id ${req.body.id}`});
    }
    else {
        data.splice(ind, 1);
        res.send(JSON.stringify(data, null, 2));
        fs.writeFileSync("./todo.json", JSON.stringify(data, null, 2));
    }
});
app.listen(3000);