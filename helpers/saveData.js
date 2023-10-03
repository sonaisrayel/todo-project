const fs = require('fs');
const { dbConnection } = require('./mongodb');

const saveData = (someData, project) => {
    const names = dbConnection.findOne({ name: 'bubu' });

    console.log(names, 'name');

    if (project === 'todo') {
        fs.writeFileSync('./todo.json', JSON.stringify(someData, null, 2));
    }
    if (project === 'users') {
        fs.writeFileSync('./users.json', JSON.stringify(someData, null, 2));
    }
};

module.exports = { saveData };
