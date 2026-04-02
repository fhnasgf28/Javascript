const app = Vue.createApp({
    data() {
        return {
            products: [
                {
                    id: 1,
                    name: 'Laptop Gaming X1',
                    price: 15000000,
                    short_description: 'Laptop bertenaga untuk gaming dan produktivitas.',
                    description: 'Laptop Gaming X1 dilengkapi dengan prosesor Intel Core i7 terbaru, RAM 16GB, dan kartu grafis NVIDIA RTX 3060. Layar 15.6 inci Full HD dengan refresh rate 144Hz memberikan pengalaman visual yang imersif. Ideal untuk gamer dan profesional.',
                    image_url: 'https://via.placeholder.com/200x150?text=Laptop+Gaming'
                },
                {
                    id: 2,
                    name: 'Smartphone Ultra Pro',
                    price: 8000000,
                    short_description: 'Ponsel pintar dengan kamera canggih dan performa tinggi.',
                    description: 'Smartphone Ultra Pro menawarkan sistem kamera triple 108MP, layar AMOLED 6.7 inci, dan baterai tahan lama 5000mAh. Ditenagai oleh chipset Snapdragon terbaru untuk performa super cepat.',
                    image_url: 'https://via.placeholder.com/200x150?text=Smartphone'
                },
                {
                    id: 3,
                    name: 'Smartwatch Fit 2.0',
                    price: 1500000,
                    short_description: 'Jam tangan pintar untuk gaya hidup sehat.',
                    description: 'Smartwatch Fit 2.0 memantau detak jantung, langkah, dan kualitas tidur Anda. Dilengkapi dengan GPS terintegrasi dan tahan air, cocok untuk berbagai aktivitas olahraga. Notifikasi cerdas langsung ke pergelangan tangan Anda.',
                    image_url: 'https://via.placeholder.com/200x150?text=Smartwatch'
                },
                {
                    id: 4,
                    name: 'Headphone Noise Cancelling',
                    price: 2500000,
                    short_description: 'Nikmati musik tanpa gangguan dengan teknologi noise cancelling.',
                    description: 'Headphone Noise Cancelling memberikan kualitas suara premium dengan teknologi peredam bising aktif. Desain ergonomis dan bantalan telinga yang nyaman untuk penggunaan jangka panjang. Baterai tahan hingga 30 jam.',
                    image_url: 'https://via.placeholder.com/200x150?text=Headphone'
                }
            ],
            selectedProduct: null,
            cartItems: []
        };
    },
    methods: {
        selectProduct(product) {
            this.selectedProduct = product;
        },
        addToCart(product) {
            const existingItem = this.cartItems.find(item => item.product.id === product.id);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                this.cartItems.push({ product: product, quantity: 1 });
            }
        }
    },
    computed: {
        totalPrice() {
            return this.cartItems.reduce((total, item) => {
                return total + (item.product.price * item.quantity);
            }, 0);
        }
    },
    // Optional: Anda bisa menambahkan lifecycle hook jika diperlukan,
    // misalnya untuk memuat data dari API saat komponen dibuat.
    // mounted() {
    //     console.log('Aplikasi Vue telah dimuat!');
    // }
});

app.mount('#app');