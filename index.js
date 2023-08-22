
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
app.use(bodyParser.json())

const data = [{
    name: "Marine",
    surname: "Karapetyan"
}]

app.post('/title', (req, res) => {
    const arr = [];

    const { name, surname } = req.body
    arr.push({
        name, surname
    })
    console.log(arr);

    res.send(JSON.stringify(arr, null, 2))
    // fs.writeFileSync("file.json",JSON.stringify(data,null,2))
})

app.listen(port, () => {
    console.log(`Server working on port ${port}`);
})
