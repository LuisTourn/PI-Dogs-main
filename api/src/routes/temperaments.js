const { Router } = require('express');
const { getTemperaments } = require('../utils/models')

const temperaments = Router();

temperaments.get('/', async (req, res, next) => {
    try {
        const data = await getTemperaments();
        res.send(data);
    } catch (e) {
        next(e);
    }
})

module.exports = temperaments;