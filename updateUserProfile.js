const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const fs = require('fs');
const data = require('./todo.json');
const { v4: uuidv4 } = require('uuid');


app.use(bodyParser.json())

app.put('/users/:id', (req, res) => {

    const userId = Number(req.params.id)
    const body = req.body;
    
    const user = data.find((element, index) => element.id === userId)
    if (!user) {
        res.status(404).send('User Not Found')
    } else {
        const updatedProfile = {...user, ...body};
        console.log(updatedProfile);        
        res.status(200).json(updatedProfile);
        
    } 
    
}); 

app.listen(port, () => {
    console.log(`Server working on port ${port}`);
})