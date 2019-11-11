const express = require('express');
const router = express.Router();

router.get('/harian', function(req, res){
    res.render('laporan/harian');
});

router.get('/bulanan', function(req, res){
    res.render('laporan/bulanan');
});

router.get('/triwulan', function(req, res){
    res.render('laporan/triwulan');
});

module.exports = router;