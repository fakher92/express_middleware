require('dotenv').config();
const express = require('express');
var fs = require('fs');


// Init App
const app = express();
app.set('view engine', 'pug');