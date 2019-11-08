const main_script = new Vue({
    el: '#app',
    data: {
        users: [],
        user: {},
        open: false
    },
    mounted: function() {
        this.listUsers()
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
            .catch(err => console.error(err));
        },
        deleteUser: function (id) {
            const cnf = confirm('Hapus data?');
            if (cnf) {
                axios.delete('api/deleteUser', { id_user: id })
                .then(() => {
                    alert('Terhapus');
                    this.listUsers();
                })
                .catch(err => console.error(err));
            }
        },
        toggleForm: function () {
            this.open = !this.open;
            if (!this.open) { this.user = {} }
        },
        editUser: function (id) {
            axios.get('api/getUser/' + id)
            .then(res => { this.user = res.data.data[0] })
            .catch(err => console.error(err));
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
                .catch(err => console.error(err));
            } else {
                axios.post('/api/saveUser', this.user)
                .then(() => {
                        this.user = {};
                        this.open = !this.open;
                        this.listUsers();
                    })
                .catch(err => console.error(err));
            }
        }
    }
});