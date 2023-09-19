const fs = require('fs');
const saveData = (someData, project) => {
    if (project === 'todo') {
        fs.writeFileSync('./todo.json', JSON.stringify(someData, null, 2));
    }
    if (project === 'users') {
        fs.writeFileSync('./users.json', JSON.stringify(someData, null, 2));
    }
};

module.exports = { saveData };
