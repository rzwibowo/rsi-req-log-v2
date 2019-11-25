const main_script = new Vue({
    el: '#app',
    data: {
        jml_data: 0,
        requests: [],
        awal: 0,
        akhir: 5,
        baris: 5,
        is_loading: true
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
        this.getRequestRowCount();
        this.listRequest();
    },
    methods: {
        getRequestRowCount: function () {
            axios.get('/api/countRequest')
            .then(res => this.jml_data = res.data.data[0].jml_baris)
            .catch(err => {
                alert("Terjadi masalah: " + err)
                console.error(err);
            });
        },
        listRequest: function () {
            this.is_loading = true;

            axios.get('/api/listRequest/' + this.baris + "/" + this.awal)
            .then(res => this.requests = res.data.data)
            .catch(err => {
                alert("Terjadi masalah: " + err)
                console.error(err);
            })
            .finally(() => this.is_loading = false);
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
            this.listRequest();
        },
    }
});