// Imported libraries
const path = require('path');
const express = require('express');
const logger = require('morgan');
const routes = require('./routes');

// Configure express
const app = express();
const PORT = process.env.PORT || 3001;
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Define routes code dir
app.use(routes);

// Start the server
app.listen(PORT, () => console.log('Now listening'));
