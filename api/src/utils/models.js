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
        const response = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${X_API_KEY}`);
        if (!response.data.length) throw new Error('Page not found');
        var dataId = response.data.filter(e => e.id === id);
        var data = {
            id: dataId[0].id,
            name: dataId[0].name,
            image: dataId[0].image.url,
            temperament: dataId[0].temperament,
            weight: dataId[0].weight.metric,
            height: dataId[0].height.metric,
            lifeSpan: dataId[0].life_span
        }
    } else {
        id -= 300;
        var data = await Raza.findOne({
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
        attributes: ['id'],
        where: {
            name: {
                [Op.substring]: name
            }
        }
    });
    const dataApi = responseApi.data.map(e => {
        return e.id;
        /*             name: e.name,
            temperament: e.temperament,
            weight: e.weight.metric */
    }).concat(responseDb);
    const dataDb = responseDb.map(e => {
        return e.id
    })
    const data = [...dataApi, ...dataDb];
    if (!data.length) throw new Error('Raza no encontrada');
    return data;
};

const breedCreator = async (obj) => {
    const { name, height, weight, lifeSpan, temperaments } = obj;
    if (!name || !height || !weight || !temperaments.length) throw new Error('No se pudo crear raza. Faltan campos obligatorios');
    const breed = await Raza.create({ name, height, weight, lifeSpan });
    let temperamentsId = await breed.addTemperamento(temperaments);
    return temperamentsId
 //   let temperamentsId = temperaments.map(e => Temperamento.findByPk(e));
 //   await Promise.all(temperamentsId);
//    temperament.forEach(async e =>
//        await Temperamento.findOrCreate({
//            where: {
//                name: e
//            }
//        })
//    );
//    const temperaments = await Temperamento.findAll({
//        attributes: id
//    },
//        {
//            where: {
//                name: {
//                    [Op.like]: {
//                        [Op.any]: temperament
//                    }
//                }
//            }
//        })
 //   await breed.addTemperamentos(temperamentsId);
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
    const temperaments = await Temperamento.findAll();
    if(!temperaments || !temperaments.length) throw new Error('No hay temperamentos disponibles');
    return temperaments;
};

module.exports = {
    breedsRequest,
    breedSeacrh,
    breedDetail,
    breedCreator,
    setAllTemperaments,
    getTemperaments
};