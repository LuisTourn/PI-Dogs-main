const axios = require('axios');
const { Raza, Temperamento } = require('../db');
const { Op } = require('sequelize');
const { X_API_KEY } = process.env;

const breedsRequest = async () => {
    const responseApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${X_API_KEY}`);
    const responseDb = await Raza.findAll({
        attributes: {
            exclude: ['height']
        },
        include: Temperamento
    });
    const dataApi = responseApi.data.map(e => {
        return {
            id: e.id,
            image: e.image.url,
            name: e.name,
            temperament: e.temperament,
            weight: e.weight.metric
        };
    });
    const dataDb = responseDb.map(e => {
        return {
            id: e.id,
            name: e.name,
            temperament: e.temperament,
            weight: e.weight,
            temperament: e.Temperamentos.reduce((temp, el) => temp.concat(`, ${el.name}`),'').slice(2)
        };
    });
    return dataApi.concat(dataDb);
};

const breedDetail = async (id) => {
    if (id < 300) {
        const responseApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${X_API_KEY}`);
        if (!responseApi.data.length) throw new Error('Page not found');
        var dataApi = responseApi.data.filter(e => e.id === id);
        var data = {
            id: dataApi[0].id,
            name: dataApi[0].name,
            image: dataApi[0].image.url,
            temperament: dataApi[0].temperament,
            weight: dataApi[0].weight.metric,
            height: dataApi[0].height.metric,
            lifeSpan: dataApi[0].life_span
        };
    } else {
        id -= 300;
        var dataDb = await Raza.findOne({
            where: {
                id: id
            },
            include: Temperamento
        });
        if (dataDb === null) throw new Error('Page not found');
        var data = {
            id: dataDb.id,
            name: dataDb.name,
            temperament: dataDb.Temperamentos.reduce((temp, el) => temp.concat(`, ${el.name}`),'').slice(2),
            weight: dataDb.weight,
            height: dataDb.height,
            lifeSpan: dataDb.lifeSpan
        };
    };
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
    });
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