const express = require('express');
const app = express();

require('dotenv').config();

const port = process.env.PORT || 4000;
const server = app.listen(port, () => console.log("App running on port: " + port));

const bodyParser = require('body-parser');
const ejs = require('ejs');

app.set('views', __dirname + '/../views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/../public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const apiRoute = require('./api.js');
app.use('/api', apiRoute);

const requestRoute = require(__dirname + '/../views/request/route.js');
app.use('/request', requestRoute);
app.use('/request', express.static(__dirname + '/../public'));

const userRoute = require(__dirname + '/../views/user/route.js');
app.use('/user', userRoute);
app.use('/user', express.static(__dirname + '/../public'));

// const usersRoute = require(__dirname + '/../views/users/route.js');
// app.use('/users', usersRoute);
// app.use('/users', express.static(__dirname + '/../public'));

app.get('/', (req, res) => {
    res.redirect('request');
});