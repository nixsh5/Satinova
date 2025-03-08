// Sample product data
const products = [
    {
        id: 1,
        name: "Elegant Evening Dress",
        price: 199.99,
        category: "dresses",
        image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400"
    },
    {
        id: 2,
        name: "Classic White Blouse",
        price: 89.99,
        category: "tops",
        image: "https://images.unsplash.com/photo-1534126416832-a88fdf2911c2?w=400"
    },
    {
        id: 3,
        name: "Designer Handbag",
        price: 299.99,
        category: "accessories",
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400"
    }
];

// Initialize cart from localStorage or empty array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// DOM Elements
const productsContainer = document.getElementById('products-container');
const cartCount = document.querySelector('.cart-count');

// Render products
function renderProducts(productsToRender = products) {
    if (!productsContainer) return;

    productsContainer.innerHTML = productsToRender.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">$${product.price}</p>
            <button onclick="addToCart(${product.id})" class="cta-button">Add to Cart</button>
        </div>
    `).join('');
}

// Add to cart functionality
window.addToCart = (productId) => {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    }
};

// Update cart count
function updateCartCount() {
    const count = cart.length;
    document.querySelectorAll('.cart-count').forEach(el => {
        el.textContent = count;
    });
}

// Filter products
function filterProducts() {
    const checkedCategories = Array.from(document.querySelectorAll('input[name="category"]:checked'))
        .map(input => input.value);

    const filteredProducts = checkedCategories.length === 0 
        ? products 
        : products.filter(product => checkedCategories.includes(product.category));

    renderProducts(filteredProducts);
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Update cart count on page load
    updateCartCount();

    // Initialize products if on shop page
    if (productsContainer) {
        renderProducts();

        // Add filter event listeners
        const filterInputs = document.querySelectorAll('input[name="category"]');
        filterInputs.forEach(input => {
            input.addEventListener('change', filterProducts);
        });
    }
});