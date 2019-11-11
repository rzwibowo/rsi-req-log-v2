const main_script = new Vue({
    el: '#app',
    data: {
        triwulan: "",
        tahun: "",
        requests: []
    },
    mounted: function () {
        this.listRequest();
    },
    methods: {
        listRequest: function () {
            axios.get('/api/lapTriwulan/' + this.tahun + '/' + this.triwulan)
            .then(res => this.requests = res.data.data)
            .catch(err => console.error(err));
        }
    }
});