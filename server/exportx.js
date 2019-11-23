const express = require('express');
const router = express.Router();

const xl = require('node-excel-export');

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
    const report = xl.buildExport(
        [
            {
                name: 'Laporan Harian',
                specification: specificationH,
                data: req.body
            }
        ]
    );
    
    return res.status(200).send(report);
});

router.post('/xlbulanan', (req, res) => {
    const report = xl.buildExport(
        [
            {
                name: 'Laporan Bulanan',
                specification: specificationB,
                data: req.body
            }
        ]
    );
    
    return res.status(200).send(report);
});

router.post('/xltriwulan', (req, res) => {
    const report = xl.buildExport(
        [
            {
                name: 'Laporan Triwulan',
                specification: specificationT,
                data: req.body
            }
        ]
    );
    
    return res.status(200).send(report);
});

module.exports = router;