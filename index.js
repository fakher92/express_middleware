require('dotenv').config();

var express = require('express');
var methodOverride = require('method-override')
var app = express();
var bodyParser = require('body-parser');

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

//To parse URL encoded data
app.use(bodyParser.urlencoded({ extended: false }))

//To parse json data
app.use(bodyParser.json())

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOURL);

// Home Route
app.use("/", require('./routes/index'));

//Middleware function to log request protocol
app.use("/posts", require('./routes/posts'));

app.set('view engine', 'pug');



// Start Server
var port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Example app listening on port ${process.env.PORT}!`))