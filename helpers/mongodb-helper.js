const generateQuery = (params) => {
    if (params.completed === 'true') {
        params.completed = true;
    } else {
        params.completed = false;
    }

    const arr = [];
    for (const key in params) {
        arr.push({ [key]: params[key] });
    }
    return arr;
};

module.exports = { generateQuery };
