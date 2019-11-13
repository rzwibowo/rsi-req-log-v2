const main_script = new Vue({
    el: '#app',
    data: {
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
        this.listRequest()
    },
    methods: {
        listRequest: function () {
            axios.get('/api/listRequest')
            .then(res => this.requests = res.data.data)
            .catch(err => {
                alert("Terjadi masalah: " + err)
                console.error(err);
            });
        }
    }
});