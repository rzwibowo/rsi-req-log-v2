const express = require('express');
const router = express.Router();

const mysql = require('mysql');
const crypto = require('crypto');

require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_SERVER,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dateStrings: true
});
connection.connect(function (err) {
    err ? console.error(err)
        : console.log('Database connected')
});

//#region REQUEST data operation
router.get('/listRequest', (req, res) => {
    connection.query(`SELECT id_request, tanggal, jam, isi_request,
        keterangan, nama_lengkap AS petugas, nama_unit
        FROM t_request aa
        LEFT JOIN t_user bb ON aa.id_user = bb.id_user
        LEFT JOIN t_unit cc ON aa.id_unit = cc.id_unit
        ORDER BY tanggal DESC, jam DESC`,
        function (err, result) {
            if (err) {
                res.status(500).send({
                    success: false,
                    errMsg: err.code
                })
                console.error(err);
            } else {
                const data = result;
                res.status(200).send({
                    success: true,
                    data: data
                });
            }
        });
});

router.get('/listRequest/:tgl/:idpetugas', (req, res) => {
    connection.query(`SELECT id_request, jam, isi_request,
        keterangan, nama_unit
        FROM t_request aa
        LEFT JOIN t_user bb ON aa.id_user = bb.id_user
        LEFT JOIN t_unit cc ON aa.id_unit = cc.id_unit
        WHERE tanggal = ?
        AND aa.id_user = ?
        ORDER BY jam DESC`,
        [req.params.tgl, req.params.idpetugas],
        function (err, result) {
            if (err) {
                res.status(500).send({
                    success: false,
                    errMsg: err.code
                })
                console.error(err);
            } else {
                const data = result;
                res.status(200).send({
                    success: 'true',
                    data: data
                })
            }
        });
});

router.get('/getRequest/:idreq', (req, res) => {
    connection.query(`SELECT id_request, tanggal, jam, 
        isi_request, keterangan, id_unit, id_user
        FROM t_request
        WHERE id_request = ?`,
        [req.params.idreq],
        function (err, result) {
            if (err) {
                res.status(500).send({
                    success: false,
                    errMsg: err.code
                })
                console.error(err);
            } else {
                const data = result;
                res.status(200).send({
                    success: 'true',
                    data: data
                })
            }
        });
});

router.post('/saveRequest', (req, res) => {
    connection.query(`INSERT INTO t_request (tanggal, jam, id_unit, isi_request, 
        keterangan, id_user) 
        VALUES (?, ?, ?, ?, ?, ?)`,
        [req.body.tanggal, req.body.jam, req.body.id_unit, req.body.isi_request,
        req.body.keterangan, req.body.id_user],
        function (err, result) {
            if (err) {
                res.status(500).send({
                    success: false,
                    errMsg: err.code
                })
                console.error(err);
            } else {
                res.status(200).send({
                    success: 'true'
                })
            }
        });
});

router.put('/updateRequest', (req, res) => {
    connection.query(`UPDATE t_request SET tanggal = ?, jam = ?, isi_request = ?,
        keterangan = ?, id_unit = ? 
        WHERE id_request = ?`,
        [req.body.tanggal, req.body.jam, req.body.isi_request, req.body.keterangan,
        req.body.id_unit, req.body.id_request],
        function (err, result) {
            if (err) {
                res.status(500).send({
                    success: false,
                    errMsg: err.code
                })
                console.error(err);
            } else {
                res.status(200).send({
                    success: 'true'
                })
            }
        });
});

router.delete('/deleteRequest/:idreq', (req, res) => {
    console.log(req.body)
    connection.query("DELETE FROM t_request WHERE id_request = ?",
        [req.params.idreq],
        function (err, result) {
            if (err) {
                res.status(500).send({
                    success: false,
                    errMsg: err.code
                })
                console.error(err);
            } else {
                res.status(200).send({
                    success: 'true'
                })
            }
        });
});
//#endregion REQUEST data operation

//#region UNIT data operation
router.get('/listUnit', (req, res) => {
    connection.query(`SELECT id_unit, nama_unit
        FROM t_unit`,
        function (err, result) {
            if (err) {
                res.status(500).send({
                    success: false,
                    errMsg: err.code
                })
                console.error(err);
            } else {
                const data = result;
                res.status(200).send({
                    success: 'true',
                    data: data
                })
            }
        });
});

router.get('/getUnit/:unit_id', (req, res) => {
    connection.query(`SELECT id_unit, nama_unit
        FROM t_unit
        WHERE id_unit = ?`,
        [req.params.unit_id],
        function (err, result) {
            if (err) {
                res.status(500).send({
                    success: false,
                    errMsg: err.code
                })
                console.error(err);
            } else {
                const data = result;
                res.status(200).send({
                    success: 'true',
                    data: data
                })
            }
        });
});

router.post('/saveUnit', (req, res) => {
    connection.query(`INSERT INTO t_unit (nama_unit) 
        VALUES (?)`,
        [req.body.nama_unit],
        function (err, result) {
            if (err) {
                res.status(500).send({
                    success: false,
                    errMsg: err.code
                })
                console.error(err);
            } else {
                res.status(200).send({
                    success: 'true'
                })
            }
        });
});

router.put('/updateUnit', (req, res) => {
    connection.query(`UPDATE t_unit SET nama_unit = ? 
        WHERE id_unit = ?`,
        [req.body.nama_unit, req.body.id_unit],
        function (err, result) {
            if (err) {
                res.status(500).send({
                    success: false,
                    errMsg: err.code
                })
                console.error(err);
            } else {
                res.status(200).send({
                    success: 'true'
                })
            }
        });
});

router.delete('/deleteUnit/:idunit', (req, res) => {
    connection.query("DELETE FROM t_unit WHERE id_unit = ?",
        [req.params.id_unit],
        function (err, result) {
            if (err) {
                res.status(500).send({
                    success: false,
                    errMsg: err.code
                })
                console.error(err);
            } else {
                res.status(200).send({
                    success: 'true'
                })
            }
        });
});
//#endregion UNIT data operation

//#region LAPORAN data operation
router.get('/lapHarian/:tgl', (req, res) => {
    connection.query(`SELECT id_request, jam, isi_request,
        keterangan, nama_lengkap AS petugas, nama_unit
        FROM t_request aa
        LEFT JOIN t_user bb ON aa.id_user = bb.id_user
        LEFT JOIN t_unit cc ON aa.id_unit = cc.id_unit
        WHERE tanggal = ?
        ORDER BY jam`,
        [req.params.tgl],
        function (err, result) {
            if (err) {
                res.status(500).send({
                    success: false,
                    errMsg: err.code
                })
                console.error(err);
            } else {
                const data = result;
                res.status(200).send({
                    success: 'true',
                    data: data
                })
            }
        });
});

router.get('/lapBulanan/:bln', (req, res) => {
    connection.query(`SELECT id_request, tanggal, jam, isi_request,
        keterangan, nama_lengkap AS petugas, nama_unit
        FROM t_request aa
        LEFT JOIN t_user bb ON aa.id_user = bb.id_user
        LEFT JOIN t_unit cc ON aa.id_unit = cc.id_unit
        WHERE tanggal LIKE ?
        ORDER BY tanggal, jam`,
        [req.params.bln + '%'],
        function (err, result) {
            if (err) {
                res.status(500).send({
                    success: false,
                    errMsg: err.code
                })
                console.error(err);
            } else {
                const data = result;
                res.status(200).send({
                    success: 'true',
                    data: data
                })
            }
        });
});

router.get('/lapTriwulan/:thn/:triw', (req, res) => {
    const tahun = req.params.thn;
    const triwulan = req.params.triw;

    let daterangestart = "";
    let daterangeend = "";
    switch (triwulan) {
        case "1":
            daterangestart = `${tahun}-01-01`;
            daterangeend = `${tahun}-03-31`;
            break;
        case "2":
            daterangestart = `${tahun}-04-01`;
            daterangeend = `${tahun}-06-30`;
            break;
        case "3":
            daterangestart = `${tahun}-07-01`;
            daterangeend = `${tahun}-09-30`;
            break;
        case "4":
            daterangestart = `${tahun}-10-01`;
            daterangeend = `${tahun}-12-31`;
            break;
    }

    connection.query(`SELECT id_request, tanggal, jam, isi_request,
        keterangan, nama_lengkap AS petugas, nama_unit
        FROM t_request aa
        LEFT JOIN t_user bb ON aa.id_user = bb.id_user
        LEFT JOIN t_unit cc ON aa.id_unit = cc.id_unit
        WHERE tanggal BETWEEN ? AND ?
        ORDER BY tanggal, jam`,
        [daterangestart, daterangeend],
        function (err, result) {
            if (err) {
                res.status(500).send({
                    success: false,
                    errMsg: err.code
                })
                console.error(err);
            } else {
                const data = result;
                res.status(200).send({
                    success: 'true',
                    data: data
                })
            }
        });
});
//#endregion LAPORAN data operation

//#region USER data operation
router.post('/login', (req, res) => {
    const pwd = crypto.createHash('md5').update(req.body.psword).digest("hex");
    connection.query(`SELECT id_user, username, nama_lengkap, level
        FROM t_user
        WHERE username = ? AND psword = ?
        LIMIT 1`,
        [req.body.username, pwd],
        function (err, result) {
            if (err) {
                res.status(500).send({
                    success: false,
                    errMsg: err.code
                })
                console.error(err);
            } else {
                const data = result;
                
                if (data.length !== 0) {
                    res.status(200).send({
                        success: true,
                        data: data
                    })
                } else {
                    res.status(403).send({
                        success: false,
                        data: 'Tidak ditemukan pengguna'
                    })
                } 
            }
        });
});

router.get('/listUsers', (req, res) => {
    connection.query("SELECT id_user, username, nama_lengkap, level FROM t_user",
        function (err, result) {
            if (err) {
                res.status(500).send({
                    success: false,
                    errMsg: err.code
                })
                console.error(err);
            } else {
                const data = result;
                res.status(200).send({
                    success: 'true',
                    data: data
                })
            }
        });
});

router.get('/getUser/:user_id', (req, res) => {
    connection.query(`SELECT id_user, username, nama_lengkap, level
        FROM t_user
        WHERE id_user = ?`,
        [req.params.user_id],
        function (err, result) {
            if (err) {
                res.status(500).send({
                    success: false,
                    errMsg: err.code
                })
                console.error(err);
            } else {
                const data = result;
                res.status(200).send({
                    success: 'true',
                    data: data
                })
            }
        });
});

router.post('/saveUser', (req, res) => {
    const pwd = crypto.createHash('md5').update(req.body.psword).digest("hex");
    connection.query(`INSERT INTO t_user (username, nama_lengkap, psword, level) 
        VALUES (?, ?, ?, ?)`,
        [req.body.username, req.body.nama_lengkap, pwd, req.body.level],
        function (err, result) {
            if (err) {
                res.status(500).send({
                    success: false,
                    errMsg: err.code
                })
                console.error(err);
            } else {
                res.status(200).send({
                    success: 'true'
                })
            }
        });
});

router.put('/updateUser', (req, res) => {
    const sent_pwd = req.body.psword;
    let pwd = "";
    let pwd_par = "";

    if (sent_pwd) {
        pwd = crypto.createHash('md5').update(req.body.psword).digest("hex");
        pwd_par = `, psword = ${pwd}`;
    }

    connection.query(`UPDATE t_user SET username = ?, nama_lengkap = ?, level = ? ${pwd_par} 
        WHERE id_user = ?`,
        [req.body.username, req.body.nama_lengkap, req.body.level, req.body.id_user],
        function (err, result) {
            if (err) {
                res.status(500).send({
                    success: false,
                    errMsg: err.code
                })
                console.error(err);
            } else {
                res.status(200).send({
                    success: 'true'
                })
            }
        });
});

router.delete('/deleteUser/:iduser', (req, res) => {
    connection.query("DELETE FROM t_user WHERE id_user = ?",
        [req.params.iduser],
        function (err, result) {
            if (err) {
                res.status(500).send({
                    success: false,
                    errMsg: err.code
                })
                console.error(err);
            } else {
                res.status(200).send({
                    success: 'true'
                })
            }
        });
});
//#endregion USER data operation

module.exports = router;