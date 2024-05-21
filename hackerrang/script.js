function stripProperty(obj, prop) {
    let newObj = {};

    for (let key in obj) {
        if (obj.hasOwnProperty(key) && key !== prop) {
            newObj[key] = obj[key]
        }
    }

    return newObj;
}