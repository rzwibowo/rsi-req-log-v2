const main_script = new Vue({
    el: '#app',
    data: {
        tanggal: "",
        unit: 0,
        petugas: 0,
        units: [],
        petugases: [],
        requests: [],
        lv: 0
    },
    filters: {
        fmtTanggal: function (tgl) {
            const namaBulan = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
                'Jul', 'Agt', 'Sep', 'Okt', 'Nov', 'Des'];
            const tanggal = new Date(tgl);

            const _tgl = tanggal.getDate();
            const _bln = namaBulan[tanggal.getMonth()];
            const _thn = tanggal.getFullYear();

            return `${_tgl} ${_bln} ${_thn}`;
        }
    },
    mounted: function () {
        this.setDefaultTanggal();
        this.listRequest();
        this.listUnit();
        this.listUser();
    },
    methods: {
        setDefaultTanggal: function () {
            const waktu_skr = new Date();

            const tgl = waktu_skr.getDate().toString().padStart(2, '0');
            const bulan = (waktu_skr.getMonth() + 1).toString().padStart(2, '0');
            const tahun = waktu_skr.getFullYear();
            const tgl_fmt = `${tahun}-${bulan}-${tgl}`;

            this.tanggal = tgl_fmt;

            const auth = JSON.parse(localStorage.getItem('rql_usr'));
            this.lv = auth.level;
            this.unit = auth.id_unit;
        },
        listUserAndReq: function () {
            this.listUser();
            this.listRequest();
        },
        listRequest: function () {
            axios.get('/api/lapHarian/' + this.tanggal + "/" + this.unit + "/" + this.petugas)
                .then(res => this.requests = res.data.data)
                .catch(err => {
                    alert("Terjadi masalah: " + err)
                    console.error(err);
                });
        },
        listUnit: function () {
            axios.get('/api/listUnit')
                .then(res => this.units = res.data.data.sort((a, b) => (a.nama_unit > b.nama_unit) ? 1 : -1))
                .catch(err => console.error(err));
        },
        listUser: function () {
            const url = this.unit == 0 ? '/api/listUsers/' : '/api/listUsersByUnit/' + this.unit;
            axios.get(url)
                .then(res => this.petugases = res.data.data)
                .catch(err => {
                    console.error(err);
                });
        },
        exportExcel: function () {
            axios({
                method: 'post',
                url: '/exportx/xlharian',
                data: {
                    tanggal: this.tanggal,
                    idunit: this.unit,
                    petugas: this.petugas
                },
                responseType: 'blob'
            })
                .then(res => saveAs(new Blob([res.data]), `laporan-harian-${this.tanggal}.xlsx`))
                .catch(err => {
                    alert("Terjadi masalah: " + err)
                    console.error(err);
                });
        },
        exportPdf: function () {
            axios({
                method: 'post',
                url: '/exportp/pdfharian',
                data: {
                    tanggal: this.tanggal,
                    idunit: this.unit,
                    petugas: this.petugas
                },
                responseType: 'blob'
            })
                .then(res => saveAs(new Blob([res.data]), `laporan-harian-${this.tanggal}.pdf`))
                .catch(err => {
                    alert("Terjadi masalah: " + err)
                    console.error(err);
                });
        }
    }
});