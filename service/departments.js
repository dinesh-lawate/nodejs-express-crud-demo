

async function getDepartments() {
    const fs = require('fs');
    const util = require('util');
    const path = require('path');
    // Convert fs.readFile into Promise version of same    
    const readFile = util.promisify(fs.readFile);

    let departments;

    try {
        departments = await readFile(path.resolve('./controllers/data/departments.json'), 'utf8')
    }
    catch (err) {
        throw err;
    }

    return departments;
}



module.exports = { getDepartments };