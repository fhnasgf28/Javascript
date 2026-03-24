const app = Vue.createApp({
    data(){
        return {
            products: [
                {
                    id: 1,
                    name: "Laptop Canggih XYZ",
                    price: 15000000,
                    short_description: "Laptop performa tinggi untuk profesional.",
                    description: "Laptop XYZ hadir dengan prosesor Intel Core i9 terbaru, RAM 32GB, SSD 1TB, dan layar 4K. Sangat cocok untuk pekerjaan grafis, editing video, dan gaming.",
                    image_url: "https://via.placeholder.com/200/42b983/ffffff?text=Laptop"
                },
                {
                    id: 2,
                    name: "Laptop Canggih Farhan",
                    price: 23000000,
                    short_description: "Laptop performa tinggi untuk profesional.",
                    description: "Laptop XYZ hadir dengan prosesor Intel Core i9 terbaru, RAM 32GB, SSD 1TB, dan layar 4K. Sangat cocok untuk pekerjaan grafis, editing video, dan gaming.",
                    image_url: "https://via.placeholder.com/200/42b983/ffffff?text=Laptop"
                }
            ], 
            selectedProduct: null,
            cartItems: []
        };
    },
    computed: {
        totalPrice() {
            return this.cartItems.reduce((total, item) => {
                return total + (item.product.price * item.quantity);
            }, 0)
        }
    },
    methods: {
        selectedProduct(product) {
            this.selectedProduct = product;
        }
    },

    addToCart(product){
        const existingItemIndex = this.cartItems.findIndex(item => item.product.id === product.id);
        if(existingItemIndex > -1){
            this.cartItems[existingItemIndex].quantity++;
        }else {
            this.cartItems.push({
                product:product,
                quantity: 1
            });
        }
    }
});

app.mount('#app')