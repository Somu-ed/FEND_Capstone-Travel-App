// Used server.js code from Project 3

// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// setting up environment variables
require('dotenv').config()
function validateInputRequest(req, res, next) {
    if(!req.body.text ) { // check for input validation
        return res.status(400).json({
           message: 'Invalid input'
        })
    } 
    return next();
}

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
app.post('/add', (req, res) => {
    projectData['date'] = req.body.date;
    projectData['temp'] = req.body.temp;
    projectData['content'] = req.body.content;
    res.send(projectData);
});

// Setup Server

const server = app.listen(process.env.SERVER_PORT, listening);

function listening() {
  console.log(`running on localhost: ${process.env.SERVER_PORT}`);
};