const express = require('express');
const router = express.Router();

const xl = require('node-excel-export');
const laporan = require('./laporan_fetch');

const styles = {
    headerGreen: {
        fill: {
            fgColor: {
                rgb: 'FF4eba9a'
            }
        },
        font: {
            color: {
                rgb: 'FFffffff'
            },
            sz: 14,
            bold: true,
            underline: true
        }
    }
};

const specificationH = {
    jam_lapor: {
        displayName: 'Jam Lapor',
        headerStyle: styles.headerGreen,
        width: '8'
    },
    jam_selesai: {
        displayName: 'Jam Selesai',
        headerStyle: styles.headerGreen,
        width: '8'
    },
    nama_unit: {
        displayName: 'Nama Unit',
        headerStyle: styles.headerGreen,
        width: '30'
    },
    isi_request: {
        displayName: 'Isi Request',
        headerStyle: styles.headerGreen,
        width: '50'
    },
    keterangan: {
        displayName: 'Keterangan',
        headerStyle: styles.headerGreen,
        width: '50'
    },
    rencanatl: {
        displayName: 'Rencana Tindak Lanjut',
        headerStyle: styles.headerGreen,
        width: '50'
    },
    petugas: {
        displayName: 'Petugas',
        headerStyle: styles.headerGreen,
        width: '15'
    }
}

const specificationB = {
    tanggal: {
        displayName: 'Tanggal',
        headerStyle: styles.headerGreen,
        width: '7'
    },
    jam_lapor: {
        displayName: 'Jam Lapor',
        headerStyle: styles.headerGreen,
        width: '8'
    },
    jam_selesai: {
        displayName: 'Jam Selesai',
        headerStyle: styles.headerGreen,
        width: '8'
    },
    nama_unit: {
        displayName: 'Nama Unit',
        headerStyle: styles.headerGreen,
        width: '30'
    },
    isi_request: {
        displayName: 'Isi Request',
        headerStyle: styles.headerGreen,
        width: '50'
    },
    keterangan: {
        displayName: 'Keterangan',
        headerStyle: styles.headerGreen,
        width: '50'
    },
    rencanatl: {
        displayName: 'Rencana Tindak Lanjut',
        headerStyle: styles.headerGreen,
        width: '50'
    },
    petugas: {
        displayName: 'Petugas',
        headerStyle: styles.headerGreen,
        width: '15'
    }
}

const specificationT = {
    tanggal: {
        displayName: 'Tanggal',
        headerStyle: styles.headerGreen,
        width: '10'
    },
    jam_lapor: {
        displayName: 'Jam Lapor',
        headerStyle: styles.headerGreen,
        width: '8'
    },
    jam_selesai: {
        displayName: 'Jam Selesai',
        headerStyle: styles.headerGreen,
        width: '8'
    },
    nama_unit: {
        displayName: 'Nama Unit',
        headerStyle: styles.headerGreen,
        width: '30'
    },
    isi_request: {
        displayName: 'Isi Request',
        headerStyle: styles.headerGreen,
        width: '50'
    },
    keterangan: {
        displayName: 'Keterangan',
        headerStyle: styles.headerGreen,
        width: '50'
    },
    rencanatl: {
        displayName: 'Rencana Tindak Lanjut',
        headerStyle: styles.headerGreen,
        width: '50'
    },
    petugas: {
        displayName: 'Petugas',
        headerStyle: styles.headerGreen,
        width: '15'
    }
}

router.post('/xlharian', (req, res) => {
    const lap = new laporan()
    const lap_harian = lap.harian(req.body.tanggal,
        req.body.petugas)
    lap_harian.then(result => {
        const report = xl.buildExport(
            [
                {
                    name: 'Laporan Harian',
                    specification: specificationH,
                    data: result.body
                }
            ]
        );
        
        return res.status(200).send(report);
    }).catch(err => {
        res.status(500).send({
            success: false,
            errMsg: err.body.code
        })
        console.error(err);
    })
});

router.post('/xlbulanan', (req, res) => {
    const lap = new laporan()
    const lap_bulanan = lap.bulanan(req.body.bulan,
        req.body.petugas)
    lap_bulanan.then(result => {
        const report = xl.buildExport(
            [
                {
                    name: 'Laporan Bulanan',
                    specification: specificationB,
                    data: result.body
                }
            ]
        );
        
        return res.status(200).send(report);
    }).catch(err => {
        res.status(500).send({
            success: false,
            errMsg: err.body.code
        })
        console.error(err);
    })
});

router.post('/xltriwulan/', (req, res) => {
    const lap = new laporan()
    const lap_triwulan = lap.triwulan(req.body.tahun,
        req.body.triwulan, req.body.petugas)
    lap_triwulan.then(result => {
        const report = xl.buildExport(
            [
                {
                    name: 'Laporan Triwulan',
                    specification: specificationT,
                    data: result.body
                }
            ]
        );
        
        return res.status(200).send(report);
    }).catch(err => {
        res.status(500).send({
            success: false,
            errMsg: err.body.code
        })
        console.error(err);
    })
});

module.exports = router;