const mysql = require('mysql');

class Laporan {
    constructor() {
        this.connection = mysql.createConnection({
            host: process.env.DB_SERVER,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            dateStrings: true
        });
        this.connection.connect(function (err) {
            err ? console.error(err)
                : console.log('Database connected')
        });
    }
    harian(tanggal, id_petugas) {
        let petugas_par = "";

        if (parseInt(id_petugas) !== 0) {
            petugas_par = `AND aa.id_user = ${id_petugas}`;
        }

        return new Promise((resolve, reject) => {
            this.connection.query(`SELECT id_request, jam_lapor, jam_selesai, img_name,
            isi_request, keterangan, rencanatl, nama_lengkap AS petugas, nama_unit, nama_kategori
            FROM t_request aa
            LEFT JOIN t_user bb ON aa.id_user = bb.id_user
            LEFT JOIN t_unit cc ON aa.id_unit = cc.id_unit
            LEFT JOIN t_kategori dd ON aa.id_kategori = dd.id_kategori
            WHERE tanggal = ?
            ${petugas_par}
            ORDER BY jam_lapor`,
                [tanggal],
                function (err, result) {
                    if (err) {
                        return reject({
                            status: false,
                            body: err
                        });
                    } else {
                        return resolve({
                            status: true,
                            body: result
                        });
                    }
                });
        })
    }
    bulanan(bulan, id_petugas) {
        let petugas_par = "";

        if (parseInt(id_petugas) !== 0) {
            petugas_par = `AND aa.id_user = ${id_petugas}`;
        }

        return new Promise((resolve, reject) => {
            this.connection.query(`SELECT id_request, tanggal, jam_lapor, jam_selesai, img_name,
                isi_request, keterangan, rencanatl, nama_lengkap AS petugas, nama_unit, nama_kategori
                FROM t_request aa
                LEFT JOIN t_user bb ON aa.id_user = bb.id_user
                LEFT JOIN t_unit cc ON aa.id_unit = cc.id_unit
                LEFT JOIN t_kategori dd ON aa.id_kategori = dd.id_kategori
                WHERE tanggal LIKE ?
                ${petugas_par}
                ORDER BY tanggal, jam_lapor`,
                [bulan + '%'],
                function (err, result) {
                    if (err) {
                        return reject({
                            status: false,
                            body: err
                        });
                    } else {
                        return resolve({
                            status: true,
                            body: result
                        });
                    }
                });
        })
    }
    triwulan(tahun, triwulan, id_petugas) {
        let daterangestart = "";
        let daterangeend = "";

        switch (parseInt(triwulan)) {
            case 1:
                daterangestart = `${tahun}-01-01`;
                daterangeend = `${tahun}-03-31`;
                break;
            case 2:
                daterangestart = `${tahun}-04-01`;
                daterangeend = `${tahun}-06-30`;
                break;
            case 3:
                daterangestart = `${tahun}-07-01`;
                daterangeend = `${tahun}-09-30`;
                break;
            case 4:
                daterangestart = `${tahun}-10-01`;
                daterangeend = `${tahun}-12-31`;
                break;
        }

        let petugas_par = "";

        if (parseInt(id_petugas) !== 0) {
            petugas_par = `AND aa.id_user = ${id_petugas}`;
        }

        return new Promise((resolve, reject) => {
            this.connection.query(`SELECT id_request, tanggal, jam_lapor, jam_selesai, img_name,
            isi_request, keterangan, rencanatl, nama_lengkap AS petugas, nama_unit, nama_kategori
            FROM t_request aa
            LEFT JOIN t_user bb ON aa.id_user = bb.id_user
            LEFT JOIN t_unit cc ON aa.id_unit = cc.id_unit
            LEFT JOIN t_kategori dd ON aa.id_kategori = dd.id_kategori
            WHERE tanggal BETWEEN ? AND ?
            ${petugas_par}
            ORDER BY tanggal, jam_lapor`,
                [daterangestart, daterangeend],
                function (err, result) {
                    if (err) {
                        return reject({
                            status: false,
                            body: err
                        });
                    } else {
                        return resolve({
                            status: true,
                            body: result
                        });
                    }
                });
        })
    }
}

module.exports = Laporan;