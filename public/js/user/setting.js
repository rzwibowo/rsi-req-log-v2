const main_script = new Vue({
    el: '#app',
    data: {
        user: {
            id_user: 0,
            password: '',
            password_ulang: '',
            nama_lengkap: '',
            username: '',
            level: 0,
            id_unit: 0
        },
        unit: 0,
        units: [],
        is_loading: false,
        is_invalid: false,
        isPwdOpen: false,
        invalid_message: ''
    },
    mounted: function () {
        this.editUser()
        this.listUnit();
    },
    methods: {
        listUnit: function () {
            axios.get('/api/listUnit')
                .then(res => this.units = res.data.data.sort((a, b) => (a.nama_unit > b.nama_unit) ? 1 : -1))
                .catch(err => console.error(err));
        },
        saveUser: async function () {
            if (this.checkMatch) {
                this.is_loading = true

                axios.put('/api/updateUser',
                    this.user)
                    .then(() => {
                        alert('Berhasil simpan data. Logout dan Login Ulang untuk melihat perubahan.')
                        this.editUser()
                    })
                    .catch(err => {
                        const errMsg = err.response.data.msg || err
                        alert("Terjadi masalah: " + errMsg)
                        console.error(err)
                    })
                    .finally(() => this.is_loading = false)
            }
        },
        editUser: function () {
            const auth = JSON.parse(localStorage.getItem('rql_usr'));
            this.unit = auth.id_unit;
            axios.get('/api/getUser/' + auth.id_user)
                .then(res => { 
                    this.user = res.data.data[0]
                })
                .catch(err => {
                    const errMsg = err.response.data.msg || err
                    alert("Terjadi masalah: " + errMsg)
                    console.error(err)
                });
        },
        checkMatch: function () {
            let retval = true
            this.is_invalid = false
            this.invalid_message = ''
            if (this.user.password.length > 0) {
                if (this.user.password !== this.user.password_ulang) {
                    this.is_invalid = true
                    this.invalid_message = 'Password tidak cocok'
                    retval = false
                }
            }
            return retval
        }
    }
});