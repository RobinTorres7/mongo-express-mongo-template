const express = require('express');
const PetServices = require('../services/petServices');
const petApi = (app) => {
    const route = express.Router();
    const petServices = new PetServices();

    app.use('/api', route)
    route.get('/getPets', async (req, res) => {
        const result = await petServices.getPets()
        res.send(result);
    });
    route.get('/getSpeciesDetails', async (req, res) => {
        const result = await petServices.getSpeciesPets();
        res.send(result);
    })
    route.post('/insertPet', async (req, res) => {
        const result = await petServices.insertPet();
        res.send(result);
    })
};

module.exports = petApi;