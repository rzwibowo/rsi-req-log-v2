const main_script = new Vue({
    el: '#app',
    data: {
        user: {}
    },
    methods: {
        login: function () {
            axios.post('/api/login', this.user)
            .then(res => {
                const userdata = JSON.stringify(res.data.data[0]);
                localStorage.setItem('rql_usr', userdata);
                window.location.assign('/request');
            })
            .catch(err => console.error(err))
        }
    }
});