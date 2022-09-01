const main_script = new Vue({
    el: '#app',
    data: {
        kategoris: [],
        kategori: {},
        open: false
    },
    mounted: function() {
        this.listKategoris()
    },
    computed: {
        headerModal: function () {
            if (this.kategori.id_kategori) {
                return "Ubah"
            } else {
                return "Tambah"
            }
        }
    },
    methods: {
        listKategoris: function () {
            axios.get('/api/listKategori')
            .then(res => this.kategoris = res.data.data)
            .catch(err => {
                alert("Terjadi masalah: " + err)
                console.error(err);
            });
        },
        deleteKategori: function (id) {
            const cnf = confirm('Hapus data?');
            if (cnf) {
                axios.delete('api/deleteKategori/' + id)
                .then(() => {
                    alert('Terhapus');
                    this.listKategoris();
                })
                .catch(err => {
                    alert("Terjadi masalah: " + err)
                    console.error(err);
                });
            }
        },
        toggleForm: function () {
            this.open = !this.open;
            if (!this.open) { this.kategori = {} }
        },
        editKategori: function (id) {
            axios.get('api/getKategori/' + id)
            .then(res => { this.kategori = res.data.data[0] })
            .catch(err => {
                alert("Terjadi masalah: " + err)
                console.error(err);
            });
            this.open = !this.open;
        },
        saveKategori: function (id) {
            if (id) {
                axios.put('/api/updateKategori', this.kategori)
                .then(() => {
                        this.kategori = {};
                        this.open = !this.open;
                        this.listKategoris();
                    })
                .catch(err => {
                    alert("Terjadi masalah: " + err)
                    console.error(err);
                });
            } else {
                axios.post('/api/saveKategori', this.kategori)
                .then(() => {
                        this.kategori = {};
                        this.open = !this.open;
                        this.listKategoris();
                    })
                .catch(err => {
                    alert("Terjadi masalah: " + err)
                    console.error(err);
                });
            }
        }
    }
});