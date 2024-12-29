class Product {
    constructor(name, price, quantity) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }

    toString() {
        return `Product: ${this.name}\nPrice: ${this.price}\nQuantity: ${this.quantity}`;
    }
}

class Market {
    constructor() {
        this.products = [];
    }

    addProduct(product) {
        this.products.push(product);
        console.log(`${product.name} added to market.`);
    }

    removeProduct(productName) {
        this.products = this.products.filter(product => product.name !== productName);
        console.log(`${productName} removed from market.`);
    }

    displayProducts() {
        if (this.products.length === 0) {
            console.log('No product available.');
        } else {
            console.log('Products in market:');
            this.products.forEach(product => {
                console.log(product.toString());
            });
        }
    }
}

// contoh penggunaan class Product
const myMarket = new Market();

// membuat beberapa produk
const product1 = new Product('Indomie', 2500, 100);
const product2 = new Product('Pocari Sweat', 6000, 50);
const product3 = new Product('Silverqueen', 20000, 30);

// menambahkan produk ke market
myMarket.addProduct(product1);
myMarket.addProduct(product2);

// menampilkan produk yang ada di market
myMarket.displayProducts();

// menghapus produk dari market
myMarket.removeProduct('Indomie');

// menampilkan produk yang ada di market
myMarket.displayProducts();