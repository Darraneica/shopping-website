// Product data
const products = [
    {
        id: 1,
        name: "Summer Dress",
        price: 89.99,
        image: "/placeholder.svg?height=400&width=400",
        tag: "new",
        category: "new"
    },
    {
        id: 2,
        name: "Classic Denim",
        price: 129.99,
        image: "/placeholder.svg?height=400&width=400",
        tag: "bestseller",
        category: "bestseller"
    },
    {
        id: 3,
        name: "Floral Blouse",
        price: 69.99,
        image: "/placeholder.svg?height=400&width=400",
        tag: "trending",
        category: "trending"
    },
    {
        id: 4,
        name: "Leather Jacket",
        price: 199.99,
        image: "/placeholder.svg?height=400&width=400",
        tag: "new",
        category: "new"
    }
];

// Cart functionality
let cart = []; // Array to store cart items

// DOM elements for cart
const cartIcon = document.querySelector('.cart-icon');
const cartModal = document.querySelector('.cart-modal');
const closeCart = document.querySelector('.close-cart');
const modalBackdrop = document.querySelector('.modal-backdrop');
const cartItems = document.querySelector('.cart-items');
const cartCount = document.querySelector('.cart-count');
const cartTotal = document.querySelector('.cart-total span');

// DOM elements for products and filter buttons
const productsGrid = document.querySelector('.products-grid');
const filterButtons = document.querySelectorAll('.filter-btn');

// Function to render products on the page with optional category filter
function renderProducts(filterCategory = 'all') {
    // Clear the products grid before rendering
    productsGrid.innerHTML = '';

    // Filter products based on the selected category
    products
        .filter(product => filterCategory === 'all' || product.category === filterCategory)
        .forEach(product => {
            const productElement = document.createElement('article');
            productElement.className = 'product-card';
            productElement.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                    <span class="product-tag">${product.tag}</span>
                </div>
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-price">$${product.price}</p>
                    <button class="btn btn-primary add-to-cart" data-id="${product.id}">
                        Add to Cart
                    </button>
                </div>
            `;
            productsGrid.appendChild(productElement);
        });

    // Add event listeners to the "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = parseInt(e.target.dataset.id); // Get product id from the button's data attribute
            addToCart(id); // Add the selected product to the cart
            showCartNotification(); // Show a cart notification
        });
    });
    document.getElementById('loading-spinner').style.display = 'none';
}

// Event listeners for filter buttons
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove "active" class from all filter buttons and add it to the clicked button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        renderProducts(button.dataset.category); // Re-render products based on selected filter category
    });
});

// Function to add a product to the cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId); // Find the product by id
    const existingItem = cart.find(item => item.id === productId); // Check if the product already exists in the cart

    if (existingItem) {
        // If the product is already in the cart, increase its quantity
        existingItem.quantity += 1;
    } else {
        // If the product is not in the cart, add it as a new item
        cart.push({ ...product, quantity: 1 });
    }

    updateCart(); // Update the cart UI
}

// Function to remove a product from the cart
function removeFromCart(productId) {
    // Filter out the product with the given id
    cart = cart.filter(item => item.id !== productId);
    updateCart(); // Update the cart UI
}

// Function to update the cart display (item count, total price, and cart items)
function updateCart() {
    // Update cart item count
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    // Update cart total price
    cartTotal.textContent = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);
    
    // Update the cart items in the modal
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>$${item.price} x ${item.quantity}</p>
            </div>
            <button class="cart-item-remove" data-id="${item.id}">✕</button>
        </div>
    `).join('');

    // Add event listeners to "Remove from Cart" buttons
    document.querySelectorAll('.cart-item-remove').forEach(button => {
        button.addEventListener('click', (e) => {
            removeFromCart(parseInt(e.target.dataset.id)); // Remove the clicked item from the cart
        });
    });
}

// Cart modal toggle logic
cartIcon.addEventListener('click', () => {
    // Show cart modal and backdrop when cart icon is clicked
    cartModal.classList.add('active');
    modalBackdrop.classList.add('active');
});

// Function to close the cart modal
function closeCartModal() {
    cartModal.classList.remove('active');
    modalBackdrop.classList.remove('active');
}

// Event listeners to close the cart modal
closeCart.addEventListener('click', closeCartModal);
modalBackdrop.addEventListener('click', closeCartModal);

// Newsletter subscription form submission handling
const newsletterForm = document.getElementById('newsletter-form');
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent default form submission
    const email = e.target.querySelector('input').value; // Get email value
    alert(`Thank you for subscribing with ${email}!`); // Show subscription confirmation
    e.target.reset(); // Reset the form input
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent default anchor behavior
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth' // Smooth scrolling to the target section
        });
    });
});

// Show cart notification (cart icon scaling)
function showCartNotification() {
    cartCount.style.transform = 'scale(1.2)'; // Scale up the cart item count
    setTimeout(() => {
        cartCount.style.transform = 'scale(1)'; // Reset the scale after animation
    }, 200);
}

// Initialize the page
renderProducts(); // Render the products on page load
updateCart(); // Update the cart display


