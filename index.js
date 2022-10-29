const express = require('express');
const petApi = require('./routes/petRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());
petApi(app)

app.listen(process.env.PORT,()=>{
    console.log(`Listening on ${process.env.HOST}:${process.env.PORT}/api`);
})