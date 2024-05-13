/* B"H
*/
const fs = require('fs/promises');
const { ObjectId, connect } = require('./mongo')
const COLLECTION_NAME = 'Products';

async function collection(){
    const db = await connect();
    return db.collection(COLLECTION_NAME);
}

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
    const coll = await collection();

    return /** @type {any} */ (await coll.find().toArray());
}

/**
 * @param {string} id
 * @returns {Promise<Product>}
 * */
async function get(id) {
    const coll = await collection();
    
    return /** @type {any} */ (coll.findOne({ _id: new ObjectId(id) }));

}

/**
 * @param {string} q
 * @returns {Promise<Product[]>}
 * */
async function search(q) {
    const coll = await collection();

    const filter = {
        $or: [
            { brand: { $regex: q, $options: 'i' } },
            { title: { $regex: q, $options: 'i' } },
            { description: { $regex: q, $options: 'i' } }
        ]
    };

    const cursor = coll.find(filter);
    return /** @type {any} */ (cursor.toArray());
}

/**
 * @param {string} category
 * @returns {Promise<{
 *     items: Product[],
 *     totalCount: number,
 * }>}
 * */
async function getByCategory(category) {
    const col = await collection();
    const filter = { category };
    const ret = {
        items: /** @type {any[]} */ (await col.find(filter).toArray()),
        totalCount: await col.countDocuments(filter)
    }
    return ret
}

/**
 * @param {Product} product
 * @returns {Promise<Product>}
 * */
async function add(product) {
      const col = await collection();
      const result = await col.insertOne(product);
      product._id = result.insertedId;
    
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
    getAll, get, getByCategory, search, add, update, remove
}