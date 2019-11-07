const express = require('express');
const router = express.Router();

const mysql = require('mysql');

require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_SERVER,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});
connection.connect(function (err) {
    err ? console.error(err) 
        : console.log('Database connected')
});

//#region USERS data operation
// router.get('/listUsers', (req, res) => {
//     connection.query("SELECT id, username, nama, email FROM users",
//         function (err, result) {
//             if (err) throw err;
//             const data = result;
//             res.status(200).send({
//                 success: 'true',
//                 data: data
//             })
//         });
// });

// router.get('/getUser/:user_id', (req, res) => {
//     connection.query(`SELECT *
//         FROM users
//         WHERE id = ?`,
//         [req.params.user_id],
//         function (err, result) {
//             if (err) throw err;
//             const data = result;
//             res.status(200).send({
//                 success: 'true',
//                 data: data
//             })
//     });
// });

router.post('/saveRequest', (req, res) => {
    connection.query(`INSERT INTO t_request (tanggal, jam, isi_request, keterangan, id_user) 
        VALUES (?, ?, ?, ?, ?)`, 
        [req.body.tanggal, req.body.jam, req.body.isi_request, req.body.keterangan, req.body.id_user],
        function (err, result) {
            if (err) console.error(err);
            res.status(200).send({
                success: 'true'
            })
        });
});

// router.put('/updateUser', (req, res) => {
//     connection.query(`UPDATE users SET username = ?, nama = ?, email = ?, password = ? 
//         WHERE id = ?`, 
//         [req.body.username, req.body.nama, req.body.email, req.body.password, req.body.id],
//         function (err, result) {
//             if (err) console.error(err);
//             res.status(200).send({
//                 success: 'true'
//             })
//         });
// });

// router.delete('/deleteUser', (req, res) => {
//     connection.query("DELETE FROM users WHERE id = ?", 
//         [req.body.id],
//         function (err, result) {
//             if (err) console.error(err);
//             res.status(200).send({
//                 success: 'true'
//             })
//         });
// });
//#endregion USERS data operation

module.exports = router;