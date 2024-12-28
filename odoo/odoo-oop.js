class Product {
    constructor(name, price, quantity) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }

    addStock(amount) {
        this.quantity += amount;
        console.log(`${amount} ${this.name} added to stock. New stock is ${this.quantity}`);
    }

    // methode untuk mengurangi stok
    removeStock(amount) {
        if (amount > this.quantity) {
            console.log('Insufficient stock');
        } else {
            this.quantity -= amount;
            console.log(`${amount} ${this.name} removed from stock. Remaining stock is ${this.quantity}`);
        }
    }

    // metode untuk menghitung nilai total stok
    totalValue() {
        return this.price * this.quantity;
    }

    // metode untuk menampilkan informasi produk
    displayInfo() {
        console.log(`Product: ${this.name}`);
        console.log(`Price: ${this.price}`);
        console.log(`Quantity: ${this.quantity}`);
        console.log(`Total Value: ${this.totalValue()}`);
    }
}

// contoh penggunaan class Product
const product1 = new Product('Indomie', 2500, 100);
product1.displayInfo();

product1.addStock(50);
product1.removeStock(20);
product1.displayInfo();