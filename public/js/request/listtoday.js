const main_script = new Vue({
    el: '#app',
    data: {
        petugas_id: "",
        petugas: "",
        tanggal: "",
        requests: []
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
        this.setDefault();
        this.listRequest();
    },
    methods: {
        setDefault: function () {
            const waktu_skr = new Date();

            const tgl = waktu_skr.getDate().toString().padStart(2, '0');
            const bulan = (waktu_skr.getMonth() + 1).toString().padStart(2, '0');
            const tahun = waktu_skr.getFullYear();
            const tgl_fmt = `${tahun}-${bulan}-${tgl}`;

            this.tanggal = tgl_fmt;

            this.petugas_id = JSON.parse(localStorage.getItem('rql_usr')).id_user;
            this.petugas = JSON.parse(localStorage.getItem('rql_usr')).nama_lengkap;
        },
        listRequest: function () {
            axios.get('/api/listRequestPtg/' + this.tanggal + '/' + this.petugas_id)
            .then(res => this.requests = res.data.data)
            .catch(err => {
                alert("Terjadi masalah: " + err)
                console.error(err);
            });
        },
        editReq: function (id) {
            window.location.assign('/request/id-' + id);
        },
        deleteReq: function (id, imgname) {
            const cnf = confirm('Hapus data?');
            if (cnf) {
                let deletePars = id;
                if (imgname) {
                    deletePars += '/' + imgname;
                }
                axios.delete('/api/deleteRequest/' + deletePars)
                .then(() => {
                    alert('Terhapus');
                    this.listRequest();
                })
                .catch(err => {
                    alert("Terjadi masalah: " + err)
                    console.error(err);
                });
            }
        },
    }
});