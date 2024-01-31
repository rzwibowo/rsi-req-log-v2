const main_script = new Vue({
    el: '#app',
    data: {
        bulan: "",
        tahun: "",
        namaBulan: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
            'Jul', 'Agt', 'Sep', 'Okt', 'Nov', 'Des'],
        tahuns: [],
        petugas: 0,
        unit: 0,
        petugases: [],
        units: [],
        requests: [],
        awal: 0,
        akhir: 5,
        baris: 5,
        requests_paged: [],
        is_loading: true,
        lv: 0
    },
    filters: {
        fmtHari: function (tgl) {
            const tanggal = new Date(tgl);

            return tanggal.getDate();
        }
    },
    mounted: function () {
        this.listTahun();
        this.setDefaultTanggal();
        this.listRequest();
        this.listUnit();
        this.listUser();
    },
    methods: {
        setDefaultTanggal: function () {
            const waktu_skr = new Date();

            this.bulan = waktu_skr.getMonth() + 1;
            this.tahun = waktu_skr.getFullYear();

            const auth = JSON.parse(localStorage.getItem('rql_usr'));
            this.lv = auth.level;
            this.unit = auth.id_unit;
        },
        listTahun: function () {
            const waktu_skr = new Date();
            const tahun = waktu_skr.getFullYear();

            for (let i = 2019; i <= tahun; i++) {
                this.tahuns.push(i);
            }
        },
        listUserAndReq: function () {
            this.listUser();
            this.listRequest();
        },
        listRequest: function () {
            this.is_loading = true;

            if (this.bulan && this.tahun) {
                const _bln = this.bulan.toString().padStart(2, '0');
                const fmtBulan = `${this.tahun}-${_bln}`;

                axios.get('/api/lapBulanan/' + fmtBulan + "/" + this.unit + "/" + this.petugas)
                    .then(res => {
                        this.requests = res.data.data;
                        this.awal = 0;
                        this.akhir = parseInt(this.baris);
                        this.pageNav();
                    })
                    .catch(err => {
                        alert("Terjadi masalah: " + err)
                        console.error(err);
                    })
                    .finally(() => this.is_loading = false);
            }
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
        setBaris: function () {
            this.awal = 0;
            this.akhir = parseInt(this.baris);
            this.pageNav();
        },
        pageNav: function (direction) {
            if (direction === 0) {
                this.awal -= parseInt(this.baris);
                this.akhir -= parseInt(this.baris);
            } else if (direction === 1) {
                this.awal += parseInt(this.baris);
                this.akhir += parseInt(this.baris);
            }
            this.requests_paged = this.requests.slice(this.awal, this.akhir);
        },
        exportExcel: function () {
            const _bln = this.bulan.toString().padStart(2, '0');
            const fmtBulan = `${this.tahun}-${_bln}`;

            axios({
                method: 'post',
                url: '/exportx/xlbulanan',
                data: {
                    bulan: fmtBulan,
                   idunit: this.unit,
                   petugas: this.petugas
                },
                responseType: 'blob'
            })
                .then(res => saveAs(new Blob([res.data]), `laporan-bulanan-${this.tahun}-${this.bulan}.xlsx`))
                .catch(err => {
                    alert("Terjadi masalah: " + err)
                    console.error(err);
                });
        },
        exportPdf: function () {
            const _bln = this.bulan.toString().padStart(2, '0');
            const fmtBulan = `${this.tahun}-${_bln}`;
            
            axios({
                method: 'post',
                url: '/exportp/pdfbulanan',
                data: {
                    bulan: fmtBulan,
                    idunit: this.unit,
                    petugas: this.petugas
                },
                responseType: 'blob'
            })
                .then(res => saveAs(new Blob([res.data]), `laporan-bulanan-${this.tahun}-${this.bulan}.pdf`))
                .catch(err => {
                    alert("Terjadi masalah: " + err)
                    console.error(err);
                });
        }
    }
});