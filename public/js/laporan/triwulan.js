const main_script = new Vue({
    el: '#app',
    data: {
        triwulan: "",
        tahun: "",
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
    mounted: function () {
        this.listUser();
        this.listTahun();
        this.setDefaultTanggal();
        this.listRequest();
    },
    methods: {
        setDefaultTanggal: function () {   
            const waktu_skr = new Date();

            const bulan = waktu_skr.getMonth() + 1;
            this.triwulan = Math.ceil(bulan / 3).toString();

            const tahun = waktu_skr.getFullYear();
            this.tahun = tahun;
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

            if (this.triwulan && this.tahun) {
                axios.get('/api/lapTriwulan/' + this.tahun + '/' + this.triwulan + "/" + this.petugas)
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
            axios({
                method: 'post',
                url: '/exportx/xltriwulan',
                data: {
                    tahun: this.tahun,
                    triwulan: this.triwulan,
                    petugas: this.petugas
                },
                responseType: 'blob'
            })
            .then(res => saveAs(new Blob([res.data]), `laporan-triwulan-${this.tahun}-${this.triwulan}.xlsx`))
            .catch(err => {
                alert("Terjadi masalah: " + err)
                console.error(err);
            });
        },
        exportPdf: function () {
            axios({
                method: 'post',
                url: '/exportp/pdftriwulan',
                data: {
                    tahun: this.tahun,
                    triwulan: this.triwulan,
                    petugas: this.petugas
                },
                responseType: 'blob'
            })
            .then(res => saveAs(new Blob([res.data]), `laporan-triwulan-${this.tahun}-${this.triwulan}.pdf`))
            .catch(err => {
                alert("Terjadi masalah: " + err)
                console.error(err);
            });
        }
    }
});