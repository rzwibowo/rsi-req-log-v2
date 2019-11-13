const main_script = new Vue({
    el: '#app',
    data: {
        user: {}
    },
    mounted: function () {
        this.checkAuth();
    },
    methods: {
        checkAuth: function () {
            const userdata = localStorage.getItem('rql_usr');
            if (userdata) {
                window.location.assign('/');
            }
        },
        login: function () {
            axios.post('/api/login', this.user)
            .then(res => {
                const userdata = JSON.stringify(res.data.data[0]);
                localStorage.setItem('rql_usr', userdata);
                window.location.assign('/request');
            })
            .catch(err => {
                alert("Terjadi masalah: " + err)
                console.error(err);
            })
        }
    }
});