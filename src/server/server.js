// Used server.js code from Project 3

// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// setting up environment variables
require('dotenv').config();

// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'));

// Callback function to complete GET '/all'
app.get('/', (req, res) => {
    res.sendFile('dist/index.html');
});

// Post Route
app.post('/predict', async(req, res)=>{
    const body = req.body;
    projectData.minTemp = body.minTemp;
    projectData.maxTemp = body.maxTemp;
    projectData.description = body.description;
    projectData.country = body.country;
    projectData.cityName = body.cityName;
    projectData.LeavingDate = body.LeavingDate;
    projectData.ReturningDate = body.ReturningDate;
    projectData.picture = body.picture;
    console.log(body);
    const jsonData = JSON.parse('{"response": "POST received"}');
    res.send(jsonData);
    console.log(jsonData);
});
// get request to /save and sending all datas saved
app.get('/save', async(req, res)=>{
    res.send(projectData);
});

// Setup Server

const server = app.listen(process.env.SERVER_PORT, listening);

function listening() {
  console.log(`running on localhost: ${process.env.SERVER_PORT}`);
};