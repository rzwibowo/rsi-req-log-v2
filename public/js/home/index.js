const main_script = new Vue({
    el: '#app',
    data: {
        bulan: '',
        tahun: '',
        namaBulan: ['Januari', 'Februari', 'Maret', 'April',
            'Mei', 'Juni', 'Juli', 'Agustus', 'September',
            'Oktober', 'November', 'Desember'],
        top3petugas: []
    },
    mounted: function () {
        this.getTop3Petugas();
    },
    methods: {
        getTop3Petugas: function () {
            const waktu_skr = new Date();

            this.bulan = this.namaBulan[waktu_skr.getMonth()];
            let bulan = waktu_skr.getMonth() + 1;
            this.tahun = waktu_skr.getFullYear();
            const _bln = bulan.toString().padStart(2, '0');

            const fmtBulan = `${this.tahun}-${_bln}`;

            axios.get('/api/top3Petugas/' + fmtBulan)
            .then(res => {
                this.top3petugas = res.data.data;
                this.makeChart();
            })
            .catch(err => {
                console.error(err);
            });
        },
        makeChart: function () {
            if (this.top3petugas.length > 0) {
                const petugas = this.top3petugas.map(item => { return item.nama_lengkap });
                const kontrib = this.top3petugas.map(item => { return item.kontribusi });

                const ctx = document.getElementById('chart-top-petugas');
                const chart = new Chart(ctx, {
                    type: 'horizontalBar',
                    data: {
                        labels: petugas,
                        datasets: [{
                            label: `Kontribusi Bulan ${this.bulan} ${this.tahun}`,
                            data: kontrib,
                            backgroundColor: 'rgba(54,73,93,.5)',
                            borderColor: '#36495d',
                            borderWidth: 3
                        }]
                    }
                })
            }
        }
    }
});