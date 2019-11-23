const main_script = new Vue({
    el: '#app',
    data: {
        triwulan: "",
        tahun: "",
        tahuns: [],
        petugas: 0,
        petugases: [],
        requests: []
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
            if (this.triwulan && this.tahun) {
                axios.get('/api/lapTriwulan/' + this.tahun + '/' + this.triwulan + "/" + this.petugas)
                    .then(res => this.requests = res.data.data)
                    .catch(err => {
                        alert("Terjadi masalah: " + err)
                        console.error(err);
                    });
            }
        },
        listUser: function () {
            axios.get('/api/listUsers/')
            .then(res => this.petugases = res.data.data)
            .catch(err => {
                console.error(err);
            });
        },
        exportExcel: function () {
            axios({
                method: 'post',
                url: '/exportx/xltriwulan',
                data: this.requests,
                responseType: 'blob'
            })
            .then(res => saveAs(new Blob([res.data]), `laporan-triwulan-${this.tahun}-${this.triwulan}.xlsx`))
            .catch(err => {
                alert("Terjadi masalah: " + err)
                console.error(err);
            });
        }
    }
});