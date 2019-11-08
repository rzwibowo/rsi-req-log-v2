const main_script = new Vue({
    el: '#app',
    data: {
        bulan: "",
        requests: []
    },
    filters: {
        fmtBulan: function (tgl) {
            const namaBulan = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 
                'Jul', 'Agt', 'Sep', 'Okt', 'Nov', 'Des'];
            const tanggal = new Date(tgl);
            
            const _bln = namaBulan[tanggal.getMonth()];
            const _thn = tanggal.getFullYear();

            return `${_bln} ${_thn}`;
        },
        fmtHari: function (tgl) {
            const tanggal = new Date(tgl);

            return tanggal.getDate();
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

            this.bulan = tgl_fmt;
        },
        listRequest: function () {
            const tgl = new Date(this.bulan);
            const _bln = (tgl.getMonth() + 1).toString().padStart(2, '0');
            const fmtBulan = `${tgl.getFullYear()}-${_bln}`;

            axios.get('/api/lapBulanan/' + fmtBulan)
            .then(res => this.requests = res.data.data)
            .catch(err => console.error(err));
        }
    }
});