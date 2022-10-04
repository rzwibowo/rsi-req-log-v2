const main_script = new Vue({
    el: '#app',
    data: {
        bulan: "",
        tahun: "",
        namaBulan: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
            'Jul', 'Agt', 'Sep', 'Okt', 'Nov', 'Des'],
        tahuns: [],
        petugas: 0,
        petugases: [],
        requests: [],
        awal: 0,
        akhir: 5,
        baris: 5,
        requests_paged: [],
        is_loading: true
    },
    filters: {
        fmtHari: function (tgl) {
            const tanggal = new Date(tgl);

            return tanggal.getDate();
        }
    },
    mounted: function () {
        this.listUser();
        this.listTahun();
        this.setDefaultTanggal();
        this.listRequest();
    },
    methods: {
        setDefaultTanggal: function () {
            const waktu_skr = new Date();

            this.bulan = waktu_skr.getMonth() + 1;
            this.tahun = waktu_skr.getFullYear();
        },
        listTahun: function () {
            const waktu_skr = new Date();
            const tahun = waktu_skr.getFullYear();

            for (let i = 2019; i <= tahun; i++) {
                this.tahuns.push(i);
            }
        },
        listRequest: function () {
            this.is_loading = true;

            if (this.bulan && this.tahun) {
                const _bln = this.bulan.toString().padStart(2, '0');
                const fmtBulan = `${this.tahun}-${_bln}`;

                axios.get('/api/lapBulanan/' + fmtBulan + "/" + this.petugas)
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
        listUser: function () {
            axios.get('/api/listUsers/')
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