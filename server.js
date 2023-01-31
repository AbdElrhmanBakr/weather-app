// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser')

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 3000;

// Spin up the server
const server = app.listen(port, listening);

function listening(){
    console.log("server running"); 
    console.log(`running on => localhost:${port}`);
}

// Callback function to complete GET '/all'
// Respond with JS object when a GET request is made to the homepage
const getData = (request, response) => {
    response.send(projectData);
}
// GET Route
// route 'localhost:3000/all' will now trigger the GET request
app.get('/all', getData);

// Callback function to complete POST '/add'
const postData = (request, response) => {
    // console.log(request.body);
    projectData = request.body;
    response.send(projectData);
    console.log(projectData);// <--- Printing Recieved Data on Terminal
}
// Post Route
// route 'localhost:3000/add' will now trigger the POST request
app.post('/add', postData);