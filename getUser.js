const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const data = require('./todo.json');

app.use(bodyParser.json());

app.get('/users/:id', (req, res) => {
    const userId = Number(req.params.id);

    const getUser = data.find((el) => el.id === userId);
    if (!getUser) {
        res.status(404).send('User Not Found');
    } else {
        res.status(200).send(getUser);
    }
});

app.listen(port, () => {
    console.log(`Server working on port ${port}`);
});
