require('dotenv').config({
    path: 'variables.env'
});

const express = require('express');
const cors = require('cors')
const app = express();
const axios = require('axios');

const bodyParser = require('body-parser');

const { checkIfAuthenticated } = require('./services/authMiddleware.js');

const { getUserAccessToken } = require('./models/Users');

const { axiosErrorHandler } = require('./utils.js');

app.use(cors());
// We take the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json());



app.get('/', (req, res) => {

    res.send(`Hello World`);

});


app.get('/private-route', checkIfAuthenticated, async (req, res) => {

    res.send({ msg: "this route is private and you got access :) " });
});



const server = app.listen(process.env.PORT || 3008, () => {
    const port = server.address().port;
    console.log(`App listening on port ${port}`);
});