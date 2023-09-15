const saveTodoData = (someData) => {
    const fs = require('fs');
    fs.writeFileSync('./todo.json', JSON.stringify(someData, null, 2));
};
const saveUsersData = (someData) => {
    const fs = require('fs');
    fs.writeFileSync('./users.json', JSON.stringify(someData, null, 2));
};

module.exports = { saveTodoData, saveUsersData };
