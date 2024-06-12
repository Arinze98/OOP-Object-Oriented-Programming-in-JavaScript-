// app.js

class Product {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}

class ShoppingCartItem {
    constructor(product, quantity) {
        this.product = product;
        this.quantity = quantity;
    }

    getTotalPrice() {
        return this.product.price * this.quantity;
    }
}

class ShoppingCart {
    constructor() {
        this.items = [];
    }

    getTotalItems() {
        return this.items.length;
    }

    addItem(product, quantity) {
        const existingItem = this.items.find(item => item.product.id === product.id);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            const newItem = new ShoppingCartItem(product, quantity);
            this.items.push(newItem);
        }
        this.updateCartDisplay();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.product.id !== productId);
        this.updateCartDisplay();
    }

    updateCartDisplay() {
        const cartList = document.getElementById('cart-list');
        cartList.innerHTML = '';
        this.items.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `Product: ${item.product.name}, Quantity: ${item.quantity}, Total Price: $${item.getTotalPrice().toFixed(2)}`;
            li.addEventListener('click', () => this.removeItem(item.product.id));
            cartList.appendChild(li);
        });
        const cartTotal = document.getElementById('cart-total');
        cartTotal.textContent = this.getCartTotalPrice();
    }

    getCartTotalPrice() {
        return this.items.reduce((total, item) => total += item.getTotalPrice(), 0).toFixed(2);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const products = [
        new Product(1, 'Laptop', 1200),
        new Product(2, 'Smartphone', 800),
        new Product(3, 'Tablet', 600)
    ];

    const cart = new ShoppingCart();

    const productList = document.getElementById('product-list');
    products.forEach(product => {
        const li = document.createElement('li');
        li.textContent = `${product.name} - $${product.price}`;
        li.addEventListener('click', () => cart.addItem(product, 1));
        productList.appendChild(li);
    });
});
