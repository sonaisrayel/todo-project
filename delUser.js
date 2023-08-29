const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const data = require('./todo.json');

app.use(bodyParser.json());

app.delete('/users/:id', (req, res) => {
    const userId = Number(req.params.id);

    const usersData = data.filter((el) => el.id !== userId);
    if (!usersData) {
        res.status(404).send('User Not Found');
    } else {
        res.status(200).send('User successfully deleted');
        console.log(usersData);
    }
    return usersData;
});

app.listen(port, () => {
    console.log(`Server working on port ${port}`);
});
