const express = require('express');
const router = express.Router();

router.get('/', function(req, res){
    res.render('user/index');
});

router.get('/login', function(req, res){
    res.render('user/login');
});

module.exports = router;