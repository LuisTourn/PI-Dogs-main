const { Router } = require('express');
const { breedsRequest, 
    breedsSeacrh, 
    breedDetail, 
    breedCreator 
} = require('../utils/models');

const dogs = Router();

dogs.get('/', async (req, res) => {
    try {
        const data = await breedsRequest();
        res.send(data);
    }
    catch (e) {
        res.status(404).send(e.toString());
    };
});

dogs.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const data = breedsSeacrh(id);
        res.send(data);
    }
    catch (e) {
        res.status(400).send('Raza no encontrada');
    };
});

dogs.get('/', async (req, res) => {
    const { name } = req.query;
    try {
        const data = await breedDetail(name);
        res.send(data);
    }
    catch (e) {
        res.status(400).send('Raza no encontrada');
    };
});

dogs.post('/', async (req, res) => {
    try {
        const newBreed = await breedCreator(req.body);
        res.status(201).send('Raza creada exitosamente')
    } catch (e) {
        res.status(404).send(e.toString());
    };
})

module.exports = dogs;