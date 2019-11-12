const main_script = new Vue({
    el: '#app',
    data: {
        bulan: "",
        tahun: "",
        namaBulan: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 
        'Jul', 'Agt', 'Sep', 'Okt', 'Nov', 'Des'],
        tahuns: [],
        requests: []
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
            if (this.bulan && this.tahun) {
                const _bln = this.bulan.toString().padStart(2, '0');
                const fmtBulan = `${this.tahun}-${_bln}`;
    
                axios.get('/api/lapBulanan/' + fmtBulan)
                .then(res => this.requests = res.data.data)
                .catch(err => console.error(err));
            }
        },
        exportExcel: function () {
            axios({
                method: 'post',
                url: '/exportx/xlbulanan',
                data: this.requests,
                responseType: 'blob'
            })
            .then(res => saveAs(new Blob([res.data]), `laporan-bulanan-${this.tahun}-${this.bulan}.xlsx`))
            .catch(err => console.error(err));
        }
    }
});