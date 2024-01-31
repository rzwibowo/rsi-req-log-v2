const main_script = new Vue({
    el: '#app',
    data: {
        users: [],
        user: {},
        open: false,
        units: []
    },
    mounted: function() {
        this.listUsers()
        this.listUnit()
    },
    computed: {
        headerModal: function () {
            if (this.user.id_user) {
                return "Ubah"
            } else {
                return "Tambah"
            }
        }
    },
    methods: {
        listUsers: function () {
            axios.get('/api/listUsers')
            .then(res => this.users = res.data.data)
            .catch(err => {
                alert("Terjadi masalah: " + err)
                console.error(err);
            });
        },
        deleteUser: function (id) {
            const cnf = confirm('Hapus data?');
            if (cnf) {
                axios.delete('api/deleteUser/' + id)
                .then(() => {
                    alert('Terhapus');
                    this.listUsers();
                })
                .catch(err => {
                    alert("Terjadi masalah: " + err)
                    console.error(err);
                });
            }
        },
        toggleForm: function () {
            this.open = !this.open;
            if (!this.open) { this.user = {} }
        },
        listUnit: function () {
            axios.get('/api/listUnit')
            .then(res => this.units = res.data.data.sort((a, b) => (a.nama_unit > b.nama_unit) ? 1 : -1))
            .catch(err => console.error(err));
        },
        editUser: function (id) {
            axios.get('api/getUser/' + id)
            .then(res => { this.user = res.data.data[0] })
            .catch(err => {
                alert("Terjadi masalah: " + err)
                console.error(err);
            });
            this.open = !this.open;
        },
        saveUser: function (id) {
            if (id) {
                axios.put('/api/updateUser', this.user)
                .then(() => {
                        this.user = {};
                        this.open = !this.open;
                        this.listUsers();
                    })
                .catch(err => {
                    alert("Terjadi masalah: " + err)
                    console.error(err);
                });
            } else {
                axios.post('/api/saveUser', this.user)
                .then(() => {
                        this.user = {};
                        this.open = !this.open;
                        this.listUsers();
                    })
                .catch(err => {
                    alert("Terjadi masalah: " + err)
                    console.error(err);
                });
            }
        }
    }
});