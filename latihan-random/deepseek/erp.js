class Product {
    constructor(id, name, price, quantity, category) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.category = category;
    }
    updatePrice(newPrice){
        this.price = newPrice;
    }
    updateQuantity(newQuantity){
        this.quantity = newQuantity;
    }
    getTotalValue() {
        return this.price * this.quantity;
    }
    displayInfo() {
        console.log(`ID: ${this.id}`);
        console.log(`Name: ${this.name}`);
        console.log(`Price: ${this.price}`);
        console.log(`Quantity: ${this.quantity}`);
        console.log(`Category: ${this.category}`);
        console.log(`Total Value: ${this.getTotalValue()}`);
    }
}

class Category {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    displayInfo() {
        console.log(`ID: ${this.id}`);
        console.log(`Name: ${this.name}`);
    }
}

class Inventory {
    constructor() {
        this.products = [];
    }
    addProduct(product) {
        this.products.push(product);
    }
    removeProduct(ProductId) {
        this.products = this.products.filter(product => product.id !== ProductId);
    }
    findProductById(ProductId) {
        return this.products.find(product => product.id === ProductId);
    }
    updateProductPrice(productid, newPrice) {
        const product = this.findProductById(productid);
        if (product){
            product.updatePrice(newPrice);
        } else {
            console.log(`Product with ID ${productid} not found.`);
        }
    }
    updateProductQuantity(productid, newQuantity) {
        const product = this.findProductById(productid);
        if (product){
            product.updateQuantity(newQuantity);
        } else {
            console.log(`Product with ID ${productid} not found.`);
        }
    }
    displayAllProducts() {
        this.products.forEach(product => product.displayInfo());
        console.log("====================");
    }
}

// contoh penggunaan class
// membuat beberapa category
const electronics = new Category(1, 'Electronics');
const clothing = new Category(2, 'Clothing');
const books = new Category(3, 'Books');

// membuat beberapa product
const product1 = new Product(1, 'Laptop', 100000, 10, electronics);
const product2 = new Product(2, 'Shirt', 50000, 20, clothing);
const product3 = new Product(3, 'Book', 30000, 5, books);

// membuat inventory
const inventory = new Inventory();
inventory.addProduct(product1);
inventory.addProduct(product2);
inventory.addProduct(product3);

// menampilkan semua product
inventory.displayAllProducts();

// update harga dan stok product
inventory.updateProductPrice(1, 150000);
inventory.updateProductQuantity(2, 15);

// menampilkan semua product
inventory.displayAllProducts();

// menghapus product
inventory.removeProduct(3);

// menampilkan semua product
inventory.displayAllProducts();