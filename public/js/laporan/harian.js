const main_script = new Vue({
    el: '#app',
    data: {
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
        this.setDefaultTanggal();
        this.listRequest();
    },
    methods: {
        setDefaultTanggal: function () {   
            const waktu_skr = new Date();

            const tgl = waktu_skr.getDate().toString().padStart(2, '0');
            const bulan = (waktu_skr.getMonth() + 1).toString().padStart(2, '0');
            const tahun = waktu_skr.getFullYear();
            const tgl_fmt = `${tahun}-${bulan}-${tgl}`;

            this.tanggal = tgl_fmt;
        },
        listRequest: function () {
            axios.get('/api/lapHarian/' + this.tanggal)
            .then(res => this.requests = res.data.data)
            .catch(err => console.error(err));
        }
    }
});