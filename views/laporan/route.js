const express = require('express');
const router = express.Router();

router.get('/harian', function(req, res){
    res.render('laporan/harian');
});

router.get('/bulanan', function(req, res){
    res.render('laporan/bulanan');
});

module.exports = router;