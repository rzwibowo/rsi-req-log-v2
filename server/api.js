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
router.get('/listRequest/:lim/:ofs', (req, res) => {
    connection.query(`SELECT id_request, tanggal, jam_lapor,
        jam_selesai, isi_request, keterangan, rencanatl,
        nama_lengkap AS petugas, nama_unit
        FROM t_request aa
        LEFT JOIN t_user bb ON aa.id_user = bb.id_user
        LEFT JOIN t_unit cc ON aa.id_unit = cc.id_unit
        ORDER BY tanggal DESC, jam_lapor DESC
        LIMIT ? OFFSET ?`,
        [parseInt(req.params.lim), parseInt(req.params.ofs)],
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

router.get('/countRequest', (req, res) => {
    connection.query(`SELECT COUNT(*) AS jml_baris
        FROM t_request`,
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
    connection.query(`SELECT id_request, jam_lapor, jam_selesai, 
        isi_request, keterangan, rencanatl, nama_unit
        FROM t_request aa
        LEFT JOIN t_user bb ON aa.id_user = bb.id_user
        LEFT JOIN t_unit cc ON aa.id_unit = cc.id_unit
        WHERE tanggal = ?
        AND aa.id_user = ?
        ORDER BY jam_lapor DESC`,
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
    connection.query(`SELECT id_request, tanggal, jam_lapor,
        jam_selesai, isi_request, keterangan, rencanatl,
        id_unit, id_user
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
    connection.query(`INSERT INTO t_request (tanggal, jam_lapor, jam_selesai, 
        id_unit, isi_request, keterangan, rencanatl, id_user) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [req.body.tanggal, req.body.jam_lapor, req.body.jam_selesai, req.body.id_unit, 
            req.body.isi_request, req.body.keterangan, req.body.rencanatl, req.body.id_user],
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
    connection.query(`UPDATE t_request SET tanggal = ?, jam_lapor = ?, jam_selesai = ?, 
        isi_request = ?, keterangan = ?, rencanatl = ?, id_unit = ? 
        WHERE id_request = ?`,
        [req.body.tanggal, req.body.jam_lapor, req.body.jam_selesai, req.body.isi_request, 
            req.body.keterangan, req.body.rencanatl, req.body.id_unit, req.body.id_request],
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
router.get('/lapHarian/:tgl/:idpetugas', (req, res) => {
    let petugas_par = "";
    
    if (parseInt(req.params.idpetugas) !== 0) {
        petugas_par = `AND aa.id_user = ${req.params.idpetugas}`;
    }

    connection.query(`SELECT id_request, jam_lapor, jam_selesai, 
        isi_request, keterangan, rencanatl, nama_lengkap AS petugas, nama_unit
        FROM t_request aa
        LEFT JOIN t_user bb ON aa.id_user = bb.id_user
        LEFT JOIN t_unit cc ON aa.id_unit = cc.id_unit
        WHERE tanggal = ?
        ${petugas_par}
        ORDER BY jam_lapor`,
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

router.get('/lapBulanan/:bln/:idpetugas', (req, res) => {
    let petugas_par = "";
    
    if (parseInt(req.params.idpetugas) !== 0) {
        petugas_par = `AND aa.id_user = ${req.params.idpetugas}`;
    }

    connection.query(`SELECT id_request, tanggal, jam_lapor, jam_selesai, 
        isi_request, keterangan, rencanatl, nama_lengkap AS petugas, nama_unit
        FROM t_request aa
        LEFT JOIN t_user bb ON aa.id_user = bb.id_user
        LEFT JOIN t_unit cc ON aa.id_unit = cc.id_unit
        WHERE tanggal LIKE ?
        ${petugas_par}
        ORDER BY tanggal, jam_lapor`,
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

router.get('/lapTriwulan/:thn/:triw/:idpetugas', (req, res) => {
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

    let petugas_par = "";
    
    if (parseInt(req.params.idpetugas) !== 0) {
        petugas_par = `AND aa.id_user = ${req.params.idpetugas}`;
    }

    connection.query(`SELECT id_request, tanggal, jam_lapor, jam_selesai, 
        isi_request, keterangan, rencanatl, nama_lengkap AS petugas, nama_unit
        FROM t_request aa
        LEFT JOIN t_user bb ON aa.id_user = bb.id_user
        LEFT JOIN t_unit cc ON aa.id_unit = cc.id_unit
        WHERE tanggal BETWEEN ? AND ?
        ${petugas_par}
        ORDER BY tanggal, jam_lapor`,
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

//#region CHART data operation
router.get('/top3Petugas/:bln', (req, res) => {
    connection.query(`SELECT COUNT(*) AS kontribusi, nama_lengkap
    FROM t_request aa
    LEFT JOIN t_user bb ON aa.id_user = bb.id_user
    WHERE tanggal LIKE ?
    GROUP BY aa.id_user
    LIMIT 3;`,
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
//#endregion CHART data operation

module.exports = router;