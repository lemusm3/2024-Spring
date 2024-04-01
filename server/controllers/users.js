/* B"H
*/
const users = require('../models/users');
const express = require('express');
const app = express.Router();

app
    .get('/', (req, res) => {

        const all = users.getAll();
        res.send(all);

    })
    .get('/search', (req, res) => {
        const search = req.query.q;
        const filtered = users.search(q);
        res.send(filtered);
    })

    .get('/:id', (req, res) => {
        const id = req.params.id;
        const user = users.get(id);
        res.send(user);
    });

module.exports = app