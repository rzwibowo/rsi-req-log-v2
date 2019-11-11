const main_script = new Vue({
    el: '#app',
    data: {
        units: [],
        unit: {},
        open: false
    },
    mounted: function() {
        this.listUnits()
    },
    computed: {
        headerModal: function () {
            if (this.unit.id_unit) {
                return "Ubah"
            } else {
                return "Tambah"
            }
        }
    },
    methods: {
        listUnits: function () {
            axios.get('/api/listUnit')
            .then(res => this.units = res.data.data)
            .catch(err => console.error(err));
        },
        deleteUnit: function (id) {
            const cnf = confirm('Hapus data?');
            if (cnf) {
                axios.delete('api/deleteUnit', { id_unit: id })
                .then(() => {
                    alert('Terhapus');
                    this.listUnits();
                })
                .catch(err => console.error(err));
            }
        },
        toggleForm: function () {
            this.open = !this.open;
            if (!this.open) { this.unit = {} }
        },
        editUnit: function (id) {
            axios.get('api/getUnit/' + id)
            .then(res => { this.unit = res.data.data[0] })
            .catch(err => console.error(err));
            this.open = !this.open;
        },
        saveUser: function (id) {
            if (id) {
                axios.put('/api/updateUnit', this.unit)
                .then(() => {
                        this.unit = {};
                        this.open = !this.open;
                        this.listUnits();
                    })
                .catch(err => console.error(err));
            } else {
                axios.post('/api/saveUnit', this.unit)
                .then(() => {
                        this.unit = {};
                        this.open = !this.open;
                        this.listUnits();
                    })
                .catch(err => console.error(err));
            }
        }
    }
});