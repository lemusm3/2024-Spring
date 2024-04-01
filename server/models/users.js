/* B"H
*/
const data = require('../data/users.json');



function getAll() {
    return data .items;
}

function get(id) {
    return data.items.find(p => p.id == id);
}

function search(q) {
    return data.items.filter(item =>
        new RegExp(q).test(item.firstName) ||
        new RegExp(q).test(item.lastName) ||
        new RegExp(q).test(item.email));
}

module.exports = {
    getAll, get
}