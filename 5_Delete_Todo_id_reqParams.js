// - **Delete Todo**
//     - Method: DELETE
//     - Endpoint: `/todos/{todo_id}`
//     - Response: Confirmation message

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const fs = require('fs');
const data = require('./todo.json');
const { v4: uuidv4 } = require('uuid');


app.use(bodyParser.json())


app.delete('/todos/{todo_id}', (req, res) => {

    console.log("id", req.params [{todo_id}]);
    res.send();

//     const ids = data.map(d => d.id);

//     if (!ids.includes(id)) {

//         return res.status(404).send(`We dont have a title with id "${id}" to delete`)
        
//     } else {
//         const deleteTodo = () => {
//             data.forEach(element => {
//                 let found = data.find(el => el.id === id);
//                 let index = data.indexOf(found);
//                 data.splice(index, 1);                    // Why it delete last elements too???
//             })
//             return data;
//         }
//         const newData = deleteTodo()
//         fs.writeFileSync("todo.json", JSON.stringify(newData, null, 2));
    
//         return res.status(200).send(`Title with id "${id}" successfully deleted`)        
//     }
    
});


app.listen(port, () => {
    console.log(`Server working on port ${port}`);
})
