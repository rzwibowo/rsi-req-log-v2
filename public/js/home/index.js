const main_script = new Vue({
    el: '#app',
    data: {
        top3petugas: []
    },
    mounted: function () {},
    methods: {
        getTop3Petugas: function () {
            const waktu_skr = new Date();

            let bulan = waktu_skr.getMonth() + 1;
            const tahun = waktu_skr.getFullYear();
            const _bln = bulan.toString().padStart(2, '0');

            const fmtBulan = `${tahun}-${_bln}`;

            axios.get('/api/top3Petugas/' + fmtBulan)
            .then(res => this.top3petugas = res.data.data)
            .catch(err => {
                console.error(err);
            });
        }
    }
});