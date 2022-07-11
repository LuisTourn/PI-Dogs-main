require('dotenv').config();
const axios = require('axios');
const { Raza, Temperamento } = require('../db');
const { Op } = require('sequelize');
const { X_API_KEY } = process.env;

const breedsRequest = async () => {
    const responseApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${X_API_KEY}`);
    const responseDb = await Raza.findAll({
        attributes: {
            exclude: ['height']
        }
    });
    const data = responseApi.data.map(e => {
       return {
            id: e.id,
            image: e.image.url,
            name: e.name,
            temperament: e.temperament,
            weight: e.weight.metric
        };
    });
    return data.concat(responseDb);
};

const breedDetail = async (id) => {
    if (id < 300) {
        const response = await axios.get(`https://api.thedogapi.com/v1/breeds/${id}?api_key=${X_API_KEY}`);
        if (!response.data.id) throw new Error('Page not found');
        var data = {
            id: response.data.id,
            name: response.data.name,
            temperament: response.data.temperament,
            weight: response.data.weight.metric,
            height: response.data.height.metric,
            life_span: response.data.life_span
        }
    } else {
        id -= 300;
        var data = await Raza.findOne({
            attributes: {
                exclude: ['height']
            },
            where: {
                id: id
            }
        });
        if (data === null) throw new Error('Page not found');
    }
    return data;
};

const breedSeacrh = async (name) => {
  //  if (!name) breedsRequest();
    const responseApi = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}&api_key=${X_API_KEY}`);
    const responseDb = await Raza.findAll({
        attributes: {
            exclude: ['height']
        },
        where: {
            name: {
                [Op.substring]: name
            }
        }
    });
    const data = responseApi.data.map(e => {
        return {
            id: e.id,
            name: e.name,
            temperament: e.temperament,
            weight: e.weight.metric
        };
    }).concat(responseDb);
    if (!data.length) throw new Error('Raza no encontrada');
    return data;
};

const breedCreator = async (obj) => {
    const {name, height, weight, lifeSpan, temperamentId} = obj;
    if(!name || !height || !weight) throw new Error ('Faltan datos obligatorios');
    const breed = await Raza.create({ name, height, weight, lifeSpan });
    await breed.addTemperamento(temperamentId);
};

const setAllTemperaments = async () => {
    const temperaments = await Temperamento.findAll();
    if (!temperaments.length) {
        const response = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${X_API_KEY}`);
        let data = [];
        response.data.forEach(e => {
            if (e.temperament) e.temperament.split(', ').forEach(x => data.push(x));
        });
        data = data.filter((e, i) => data.indexOf(e) === i);
        data = data.map(e => ({ name: e }));
        await Temperamento.bulkCreate(data);
    }
};

const getTemperaments = async () => {
    return await Temperamento.findAll();
}

module.exports = {
    breedsRequest,
    breedSeacrh,
    breedDetail,
    breedCreator,
    setAllTemperaments,
    getTemperaments
}