const main_script = new Vue({
    el: '#app',
    data: {
        batas_tgl: '',
        request: {
            id_user: 0,
            tanggal: "",
            jam_lapor: "",
            jam_selesai: "",
            id_unit: 0,
            id_kategori: 0,
            isi_request: "",
            keterangan: "",
            rencanatl: "",
            img_name: "",
            old_img: ""
        },
        units: [],
        kategoris: [],
        file: '',
        imgSrc: 'https://bulma.io/images/placeholders/640x360.png',
        is_loading: false
    },
    mounted: function() {
        this.setDefault();
        this.listUnit();
        this.listKategori();
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
            this.batas_tgl = tgl_fmt;

            const jam = waktu_skr.getHours().toString().padStart(2, '0');
            const menit = waktu_skr.getMinutes().toString().padStart(2, '0');
            const detik = waktu_skr.getSeconds().toString().padStart(2, '0');
            const jam_fmt = `${jam}:${menit}:${detik}`;

            this.request.jam_lapor = jam_fmt;

            this.clearImg();

            const split_url = window.location.href.split('-');
            if (split_url.length > 1) {
                const req_id = split_url[1];

                axios.get('/api/getRequest/' + req_id)
                .then(res => {
                    this.request = res.data.data[0];
                    if (this.request.img_name){
                        this.imgSrc = '/img-up/' + this.request.img_name;
                        this.request.old_img = this.request.img_name;
                    } else {
                        this.setImageNull();
                    }
                })
                .catch(err => console.error(err));
            }
        },
        listUnit: function () {
            axios.get('/api/listUnit')
            .then(res => this.units = res.data.data.sort((a, b) => (a.nama_unit > b.nama_unit) ? 1 : -1))
            .catch(err => console.error(err));
        },
        listKategori: function () {
            axios.get('/api/listKategori')
            .then(res => this.kategoris = res.data.data.sort((a, b) => (a.nama_kategori > b.nama_kategori) ? 1 : -1))
            .catch(err => console.error(err));
        },
        handleUp: function () {
            this.file = this.$refs.img_up.files[0];

            if (this.file !== '') {
                const reader = new FileReader();
                reader.onload = () => {
                    this.imgSrc = reader.result;
                }
                reader.readAsDataURL(this.file);
            }
        },
        clearImg: function () {
            this.file = '';
            this.imgSrc = 'https://bulma.io/images/placeholders/640x360.png';
        },
        setImageNull: function () {
            this.request.img_name = null;
            this.clearImg();
        },
        saveRequest: async function () {
            this.is_loading = true;

            if (!this.request.jam_selesai) {
                const waktu_skr = new Date();
                const jam = waktu_skr.getHours().toString().padStart(2, '0');
                const menit = waktu_skr.getMinutes().toString().padStart(2, '0');
                const detik = waktu_skr.getSeconds().toString().padStart(2, '0');
    
                const jam_fmt = `${jam}:${menit}:${detik}`;

                this.request.jam_selesai = jam_fmt;
            }

            if (this.file !== '') {
                let formData = new FormData();
                formData.append('image', this.file);

                await axios.post('/api/saveRequestImage', formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(res => this.request.img_name = res.data.data)
                .catch(err => console.error(err));
            }

            if (this.request.id_request) {
                axios.put('/api/updateRequest', this.request)
                .then(() => {
                    alert("Berhasil perbarui request");
                    this.setDefault();
                })
                .catch(err => {
                    alert("Terjadi masalah: " + err)
                    console.error(err);
                })
                .finally(() => this.is_loading = false);
            } else {
                axios.post('/api/saveRequest', this.request)
                .then(() => {
                        this.request = {};
                        alert("Berhasil simpan request");
                        this.setDefault();
                    })
                .catch(err => {
                    alert("Terjadi masalah: " + err)
                    console.error(err);
                })
                .finally(() => this.is_loading = false);
            }
        }
    }
});