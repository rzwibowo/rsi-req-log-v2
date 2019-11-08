const main_script = new Vue({
    el: '#app',
    data: {
        request: {
            id_user: 0,
            tanggal: "",
            jam: "",
            bagian: "",
            isi_request: "",
            keterangan: ""
        }
    },
    mounted: function() {
        this.setDefault();
    },
    methods: {
        setDefault: function () {
            const auth = JSON.parse(localStorage.getItem('rql_usr'));
            const id_user = auth.id_user;
            this.request.id_user = id_user;

            const waktu_skr = new Date();

            const tgl = waktu_skr.getDate().toString().padStart(2, '0');
            const bulan = (waktu_skr.getMonth() + 1).toString().padStart(2, '0');
            const tahun = waktu_skr.getFullYear();
            const tgl_fmt = `${tahun}-${bulan}-${tgl}`;

            this.request.tanggal = tgl_fmt;

            const jam = waktu_skr.getHours().toString().padStart(2, '0');
            const menit = waktu_skr.getMinutes().toString().padStart(2, '0');
            const detik = waktu_skr.getSeconds().toString().padStart(2, '0');
            const jam_fmt = `${jam}:${menit}:${detik}`;

            this.request.jam = jam_fmt;
        },
        saveRequest: function () {
            axios.post('/api/saveRequest', this.request)
            .then(() => {
                    //this.request = {};
                    alert("Berhasil simpan request");
                    this.setDefault();
                })
            .catch(err => console.error(err));
        }
    }
});