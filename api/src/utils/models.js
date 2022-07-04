const axios = require('axios');
const { Raza } = require('../models/Raza');

const breedsRequest = async () => {
    const response = await axios.get(`https://api.thedogapi.com/v1/breeds?apikey=${X_API_KEY}`);
    const data = {
        id: response.data.id,
        image: response.data.image,
        name: response.data.name,
        temperament: response.data.temperament,
        weight: response.data.weight
    };
    return data;
};

const breedsSeacrh = async (id) => {
    const response = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${id}?apikey=${X_API_KEY}`);
    if (!response) throw new Error('Raza no encontrada');
    const data = {
        id: response.data.id,
        image: response.data.image,
        name: response.data.name,
        temperament: response.data.temperament,
        weight: response.data.weight,
        height: response.data.height,
        lifeSpan: response.data.life_span
    };
    return data;
};

const breedDetail = async (name) => {
    const response = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}?apikey=${X_API_KEY}`);
    const data = {
        id: response.data.id,
        image: response.data.image,
        name: response.data.name,
        temperament: response.data.temperament,
        weight: response.data.weight
    };
    return data;
};

const breedCreator = async (name, height, weight, lifeSpan, temperament) => {
    const breed = await Raza.create({ name, height, weight, lifeSpan });
    
};

module.exports = {
    breedsRequest,
    breedsSeacrh,
    breedDetail,
    breedCreator
}