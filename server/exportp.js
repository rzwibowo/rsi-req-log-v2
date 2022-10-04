const express = require('express');
const router = express.Router();

const PDFDocument = require('pdfkit-table');

const laporan = require('./laporan_fetch');

/* NOTE
* https://github.com/natancabral/pdfkit-table/issues/49#issuecomment-1253485804
* untuk otomatis tambah halaman
*/

router.post('/pdfharian', (req, res) => {
    let doc = new PDFDocument({ margin: 30, size: 'LEGAL', layout: 'landscape' });
    const lap = new laporan();
    const lap_harian = lap.harian(req.body.tanggal,
        req.body.petugas);
    lap_harian.then(result => {
        const resready = result.body.map(v => Object.assign({}, v));
        doc.pipe(res);

        ; (async function () {
            const table = {
                title: 'Laporan Tanggal ' + req.body.tanggal,
                headers: [
                    {
                        label: 'Tanggal',
                        property: 'tanggal',
                        width: 50,
                        renderer: null
                    },
                    {
                        label: 'Jam Lapor',
                        property: 'jam_lapor',
                        width: 50,
                        renderer: null
                    },
                    {
                        label: 'Jam Selesai',
                        property: 'jam_selesai',
                        width: 50,
                        renderer: null
                    },
                    {
                        label: 'Unit',
                        property: 'nama_unit',
                        width: 100,
                        renderer: null
                    },
                    {
                        label: 'Kategori',
                        property: 'nama_kategori',
                        width: 70,
                        renderer: null
                    },
                    {
                        label: 'Isi Request',
                        property: 'isi_request',
                        width: 150,
                        renderer: null
                    },
                    {
                        label: 'Keterangan',
                        property: 'keterangan',
                        width: 150,
                        renderer: null
                    },
                    {
                        label: 'Rencana Tindak Lanjut',
                        property: 'rencanatl',
                        width: 150,
                        renderer: null
                    },
                    {
                        label: 'Petugas',
                        property: 'petugas',
                        width: 100,
                        renderer: null
                    }
                ],
                datas: resready,
            };

            await doc.table(table);
            doc.end();
        })();

        return res.status(200).send(doc);
    }).catch(err => {
        res.status(500).send({
            success: false,
            // errMsg: err.body.code
        })
        console.error(err);
    })
});

router.post('/pdfbulanan', (req, res) => {
    let doc = new PDFDocument({ margin: 30, size: 'LEGAL', layout: 'landscape' });
    const lap = new laporan();
    const lap_bulanan = lap.bulanan(req.body.bulan,
        req.body.petugas);
    lap_bulanan.then(result => {
        const resready = result.body.map(v => Object.assign({}, v));
        doc.pipe(res);

        ; (async function () {
            const table = {
                title: 'Laporan Bulan ' + req.body.bulan,
                headers: [
                    {
                        label: 'Tanggal',
                        property: 'tanggal',
                        width: 50,
                        renderer: null
                    },
                    {
                        label: 'Jam Lapor',
                        property: 'jam_lapor',
                        width: 50,
                        renderer: null
                    },
                    {
                        label: 'Jam Selesai',
                        property: 'jam_selesai',
                        width: 50,
                        renderer: null
                    },
                    {
                        label: 'Unit',
                        property: 'nama_unit',
                        width: 100,
                        renderer: null
                    },
                    {
                        label: 'Kategori',
                        property: 'nama_kategori',
                        width: 70,
                        renderer: null
                    },
                    {
                        label: 'Isi Request',
                        property: 'isi_request',
                        width: 150,
                        renderer: null
                    },
                    {
                        label: 'Keterangan',
                        property: 'keterangan',
                        width: 150,
                        renderer: null
                    },
                    {
                        label: 'Rencana Tindak Lanjut',
                        property: 'rencanatl',
                        width: 150,
                        renderer: null
                    },
                    {
                        label: 'Petugas',
                        property: 'petugas',
                        width: 100,
                        renderer: null
                    }
                ],
                datas: resready,
            };

            await doc.table(table);
            doc.end();
        })();

        return res.status(200).send(doc);
    }).catch(err => {
        res.status(500).send({
            success: false,
            // errMsg: err.body.code
        })
        console.error(err);
    })
});

router.post('/pdftriwulan', (req, res) => {
    let doc = new PDFDocument({ margin: 30, size: 'LEGAL', layout: 'landscape' });
    const lap = new laporan();
    const lap_triwulan = lap.triwulan(req.body.tahun,
        req.body.triwulan, req.body.petugas);
    lap_triwulan.then(result => {
        const resready = result.body.map(v => Object.assign({}, v));
        doc.pipe(res);

        (async function () {
            const table = {
                title: 'Laporan Triwulan ' + req.body.triwulan + ' ' + req.body.tahun,
                headers: [
                    {
                        label: 'Tanggal',
                        property: 'tanggal',
                        width: 50,
                        renderer: null
                    },
                    {
                        label: 'Jam Lapor',
                        property: 'jam_lapor',
                        width: 50,
                        renderer: null
                    },
                    {
                        label: 'Jam Selesai',
                        property: 'jam_selesai',
                        width: 50,
                        renderer: null
                    },
                    {
                        label: 'Unit',
                        property: 'nama_unit',
                        width: 100,
                        renderer: null
                    },
                    {
                        label: 'Kategori',
                        property: 'nama_kategori',
                        width: 70,
                        renderer: null
                    },
                    {
                        label: 'Isi Request',
                        property: 'isi_request',
                        width: 150,
                        renderer: null
                    },
                    {
                        label: 'Keterangan',
                        property: 'keterangan',
                        width: 150,
                        renderer: null
                    },
                    {
                        label: 'Rencana Tindak Lanjut',
                        property: 'rencanatl',
                        width: 150,
                        renderer: null
                    },
                    {
                        label: 'Petugas',
                        property: 'petugas',
                        width: 100,
                        renderer: null
                    }
                ],
                datas: resready,
            };

            await doc.table(table);
            doc.end();
        })();

        return res.status(200).send(doc);
    }).catch(err => {
        res.status(500).send({
            success: false,
            // errMsg: err.body.code
        })
        console.error(err);
    })
});

module.exports = router;
