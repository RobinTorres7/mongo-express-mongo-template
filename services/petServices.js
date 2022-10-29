const { MongoClient } = require("mongodb");
require('dotenv').config();

class PetServices {
    constructor() {
        this.client = new MongoClient(process.env.MONGODB_URI);
        this.datab = this.client.db('detodito')
    }
    async getPets() {
        const collection = this.datab.collection('pet');
        const result = await collection.find().toArray()
        return result;
    }
    async getSpeciesPets() {
        const collection = this.datab.collection('pet');
        const result = await collection.aggregate([{
            $lookup: {
                from: 'species',
                localField: 'id_specie',
                foreignField: 'id_specie',
                as: 'specieDetails',

            }
        }]).toArray();
        return result;

    }
    async insertPet() {
        const collection = this.datab.collection('pet')
        const counter = await this.counter("pet");
        const result = await  collection.insertOne({
            id_pet: counter.seq_value,
            name: 'pancha',
            id_specie: 14,
        })
        return result;
    }
    async counter(){
        const collection = this.datab.collection('counters');
        const result = await collection.findOneAndUpdate(
            { _id: 'petCount' },
            { $inc: { seq_value: 1 } }
        );
        return result.value;
    }
}

module.exports = PetServices;