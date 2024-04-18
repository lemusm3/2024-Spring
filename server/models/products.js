/* B"H
*/
const fs = require('fs/promises');

const fileName = __dirname + '/../data/products.json';

/** @type { Promise< { items: Product[] } > } */
const dataP = fs
        .access(fileName, fs.constants.F_OK)
        .then(() => fs.readFile(fileName, 'utf8'))
        .then(content => JSON.parse(content))


async function save() {
    const data = await dataP;
    return fs.writeFile(fileName, JSON.stringify(data, null, 2));
}

/**
 * @typedef {import('../../client/src/model/products').Product} Product
 * */

/**
 * @returns {Promise<Product[]>}
 * */
async function getAll() {
    const data = await dataP;
    return data.items.map(x=> ({
        ...x, 
    }))
}

/**
 * @param {number} id
 * @returns {Promise<Product>}
 * */
async function get(id) {
    const data = await dataP;
    return data.items.find(item => item.id == id);
}

/**
 * @param {string} q
 * @returns {Promise<Product[]>}
 * */
async function search(q) {
    return (await getAll()).filter(item => 
        new RegExp(q, 'i').test(item.brand) ||
        new RegExp(q, 'i').test(item.title) ||
        new RegExp(q, 'i').test(item.description) );
}

/**
 * @param {Product} product
 * @returns {Promise<Product>}
 * */
async function add(product) {
    const data = await dataP;
    product.id = data.items.length + 1;
    data.items.push(product);
    console.log("2: About to save");
    
    await save()        
    console.log("3: Saved")

    console.log("4: About to return user");
    return product;
}

/**
 * @param {Product} product
 * @returns {Promise<Product>}
 * */
async function update(product) {
    const data = await dataP;
    const index = data.items.findIndex(item => item.id == product.id);
    if (index >= 0) {
        data.items[index] = {
            ...data.items[index],
            ...product
        };
        await save()
        return product;
    }
    return null;
}

/**
 * @param {number} id
 * @returns {Promise<Product | null>}
 * */
async function remove(id) {
    const data = await dataP;
    const index = data.items.findIndex(item => item.id == id);
    if (index >= 0) {
        const deleted = data.items.splice(index, 1);
        await save()
        return deleted[0];
    }
    return null;
}

module.exports = {
    getAll, get, search, add, update, remove
}