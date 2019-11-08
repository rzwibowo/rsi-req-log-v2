const express = require('express');
const router = express.Router();

router.get('/', function(req, res){
    res.render('request/index');
});

router.get('/list', function(req, res){
    res.render('request/list');
});

module.exports = router;