const express = require('express');
const router = express.Router();

router.get('/', function(req, res){
    res.render('request/index');
});

router.get('/id-:id_req', function(req, res){
    res.render('request/index');
});

router.get('/list', function(req, res){
    res.render('request/list');
});

router.get('/listtoday', function(req, res){
    res.render('request/listtoday');
});

module.exports = router;