const axios = require('axios');
const { Raza, Temperamento } = require('../db');
const { Op } = require('sequelize');
const { X_API_KEY } = process.env;

const temperaments = ['Athletic, Easygoing, Timid, Friendly, Playful, Anxious', 'Intelligent, Fun-loving, Adorable, Friendly, Outgoing', 'Affectionate, Courageous, Clever, Gentle, Friendly, Playful, Aloof', 'Intelligent, Active, Loyal, Friendly, Outgoing, Playful'];

const breedsRequest = async () => {
    const responseApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${X_API_KEY}`);
    const responseDb = await Raza.findAll({
        attributes: {
            exclude: ['height']
        },
        include: Temperamento
    });
    const dataApi = responseApi.data.map(e => {
        if (!e.temperament) {
            if (e.id === 196) {
                e.temperament = temperaments[0];
            } else if (e.id === 197) {
                e.temperament = temperaments[1];
            } else if (e.id === 211) {
                e.temperament = temperaments[2];
            } else if (e.id === 261) {
                e.temperament = temperaments[3];
            }
        }
        if (!e.weight.metric.includes(' - ') && e.weight.metric.includes('NaN')) {
            e.weight.metric = '20 - 30';
        } else if (e.weight.metric.includes('NaN')) {
            e.weight.metric = `${e.weight.metric.slice(-2)}`;
        };
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
            image: e.image,
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
        if (!dataApi[0].temperament) {
            if (dataApi[0].id === 196) {
                dataApi[0].temperament = temperaments[0];
            } else if (dataApi[0].id === 197) {
                dataApi[0].temperament = temperaments[1];
            } else if (dataApi[0].id === 211) {
                dataApi[0].temperament = temperaments[2];
            } else if (dataApi[0].id === 261) {
                dataApi[0].temperament = temperaments[3];
            }
        }
        if (!dataApi[0].weight.metric.includes(' - ') && dataApi[0].weight.metric.includes('NaN')) {
            dataApi[0].weight.metric = '20 - 30';
        } else if (dataApi[0].weight.metric.includes('NaN')) {
            dataApi[0].weight.metric = `${dataApi[0].weight.metric.slice(-2)}`;
        };
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
            image: dataDb.image,
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
    }).concat(responseDb);
    const dataDb = responseDb.map(e => {
        return e.id
    });
    const data = [...dataApi, ...dataDb];
    if (!data.length) throw new Error('Breed not found');
    return data;
};

const breedCreator = async (obj) => {
    const { name, height, weight, lifeSpan, image, temperaments } = obj;
    if (!name || !height || !weight || !temperaments.length) throw new Error('Could not create breed. Missing required fields');
    const dog = await Raza.findOne({
        where: {
            name: name
    }});
    if (dog) throw new Error('Existing breed');
    const breed = await Raza.create({ name, height, weight, lifeSpan, image });
    let temperamentsId = await breed.addTemperamento(temperaments);
    return temperamentsId;
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
    if(!temperaments || !temperaments.length) throw new Error('No temperaments available');
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