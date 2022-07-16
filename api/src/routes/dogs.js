const { Router } = require('express');
const { breedsRequest, 
    breedSeacrh, 
    breedDetail, 
    breedCreator 
} = require('../utils/models');

const dogs = Router();

dogs.get('/', async (req, res, next) => {
    if (!req.query.name && !req.params.id) {
        try {
            const data = await breedsRequest();
            res.send(data);
        }
        catch (e) {
            next(e);
        };
    } else {
        next()
    }
});

dogs.get('/:id', async (req, res, next) => {
    if (!req.query.name) {
        const id = parseInt(req.params.id);
        try {
            const data = await breedDetail(id);
            res.send(data);
        }
        catch (e) {
            res.status(404).send(e.message);
        };
    } else {
        next()
    }
});

dogs.get('/', async (req, res) => {
    const { name } = req.query;
    try {
        const data = await breedSeacrh(name);
        res.send(data);
    }
    catch (e) {
        res.status(400).send(e.message);
    };
});

dogs.post('/', async (req, res) => {
    try {
        await breedCreator(req.body);
        res.status(201).send('Raza creada exitosamente');
    } catch (e) {
        res.status(400).send(e.message);
    };
})

module.exports = dogs;