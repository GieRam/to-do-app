const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Configure DB
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/todoapp');

// configure bodyParser to get data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 8081;

// middleware to log requests
app.use(function(req, res, next) {
  console.log(req.method + ": " + req.originalUrl + " with params: " + req.params);
  next(); 
});

// Routes
const item_routes = require('./app/routes/item_routes');

// Register routes
app.use('/api/items/', item_routes);

// Start the server
app.listen(port);
console.log('To Do App API listening on port ' + port);