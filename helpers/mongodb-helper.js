const generateQuery = (params) => {
    if (params.completed === 'true') {
        params.completed = true;
    } else {
        params.completed = false;
    }

    const object = {};

    if (Object.keys(params).length === 0) {
        return object;
    }

    object['$or'] = [];
    for (const key in params) {
        object['$or'].push({ [key]: params[key] });
    }

    const arr = object['$or'];
    arr.forEach((e, index) => {
        if (e['id']) {
            arr[index] = { _id: 'new ObjectId(' + `${params.id}` + ')' };
        }
    });
    return object;
};

module.exports = { generateQuery };
