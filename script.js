// =========================================
// Dams Coffee - JavaScript
// =========================================

// Menu Data
const menuItems = [
    {
        id: 1,
        name: 'Iced Americano',
        description: 'Espresso segar dengan es dan air, memberikan rasa kopi yang murni dan menyegarkan.',
        price: 32000,
        image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        category: 'Kopi Hitam'
    },
    {
        id: 2,
        name: 'Cafe Latte',
        description: 'Espresso yang dihaluskan dengan susu steamed, menghasilkan rasa yang lembut dan creamy.',
        price: 38000,
        image: 'https://images.unsplash.com/photo-1534538627340-de9f3963573f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        category: 'Kopi Susu'
    },
    {
        id: 3,
        name: 'Cappuccino',
        description: 'Klasik kopi Italia dengan lahan foamed susu yang tebal dan taburan bubuk cokelat.',
        price: 40000,
        image: 'https://images.unsplash.com/photo-1534780618662-6119748286f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        category: 'Kopi Susu'
    },
    {
        id: 4,
        name: 'Butterscotch Latte',
        description: 'Rasa manis butterscotch yang berpadu sempurna dengan espresso premium dan susu segar.',
        price: 42000,
        image: 'https://images.unsplash.com/photo-1556740738-9a60f03e091c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        category: 'Signature'
    },
    {
        id: 5,
        name: 'Matcha Latte',
        description: 'Teh hijau Jepang berkualitas tinggi dicampur dengan susu steamed yang lembut.',
        price: 40000,
        image: 'https://images.unsplash.com/photo-1564836730965-724259605794?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        category: 'Non-Kopi'
    },
    {
        id: 6,
        name: 'Caramel Macchiato',
        description: 'Espresso dengan vanila sirup, susu, dan taburan caramel yang manis dan lezat.',
        price: 45000,
        image: 'https://images.unsplash.com/photo-1473564302383-d754bb8302c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        category: 'Signature'
    }
];

// Cart State
let cart = [];

// DOM Elements
const menuGrid = document.getElementById('menuGrid');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const mobileCartCount = document.getElementById('mobileCartCount');
const cartTotal = document.getElementById('cartTotal');
const cartOverlay = document.getElementById('cartOverlay');
const cartSidebar = document.getElementById('cartSidebar');
const cartClose = document.getElementById('cartClose');
const navCartBtn = document.getElementById('navCartBtn');
const mobileCartBtn = document.getElementById('mobileCartBtn');
const cartCheckout = document.getElementById('cartCheckout');
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const backToTop = document.getElementById('backToTop');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderMenu();
    initCart();
    initNavbar();
    initScrollAnimations();
    initBackToTop();
    initContactForm();
});
// Render Menu Items
function renderMenu() {
    menuGrid.innerHTML = menuItems.map(item => `
        <div class="menu-card reveal">
            <div class="menu-card-image">
                <img src="${item.image}" alt="${item.name}" loading="lazy">
            </div>
            <div class="menu-card-content">
                <span class="menu-card-category">${item.category}</span>
                <h3 class="menu-card-title">${item.name}</h3>
                <p class="menu-card-description">${item.description}</p>
                <div class="menu-card-footer">
                    <span class="menu-card-price">Rp ${item.price.toLocaleString('id-ID')}</span>
                    <button class="menu-card-btn" onclick="addToCart(${item.id})">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Cart Functions
function initCart() {
    navCartBtn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleCart();
    });

    mobileCartBtn.addEventListener('click', toggleCart);

    cartClose.addEventListener('click', closeCart);

    cartOverlay.addEventListener('click', closeCart);

    cartCheckout.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Keranjang Anda masih kosong. Silakan pilih produk terlebih dahulu.');
            return;
        }
        alert(`Terima kasih! Pesanan Anda sebesar Rp ${calculateTotal().toLocaleString('id-ID')} telah diterima. Kami akan segera memproses pesanan Anda.`);
        closeCart();
        clearCart();
    });
}

function toggleCart() {
    cartOverlay.classList.toggle('active');
    cartSidebar.classList.toggle('active');
    document.body.style.overflow = cartSidebar.classList.contains('active') ? 'hidden' : '';
}

function closeCart() {
    cartOverlay.classList.remove('active');
    cartSidebar.classList.remove('active');
    document.body.style.overflow = '';
}

function addToCart(productId) {
    const product = menuItems.find(item => item.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.qty += 1;
    } else {
        cart.push({ ...product, qty: 1 });
    }

    updateCartUI();
    showAddedNotification(product.name);
    toggleCart();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

function changeQty(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.qty += change;
        if (item.qty <= 0) {
            removeFromCart(productId);
        } else {
            updateCartUI();
        }
    }
}

function calculateTotal() {
    return cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
}

// Navbar Functions
function initNavbar() {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#cart') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });
}

// Back to Top Button
function initBackToTop() {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);

            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            btn.textContent = 'Mengirim...';
            btn.disabled = true;

            setTimeout(() => {
                alert(`Terima kasih ${data.name}! Pesan Anda telah kami terima. Kami akan menanggapi segera.`);
                contactForm.reset();
                btn.textContent = originalText;
                btn.disabled = false;
            }, 1500);
        });
    }
}

// Export functions for HTML onclick
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.changeQty = changeQty;

function getCartCount() {
    return cart.reduce((sum, item) => sum + item.qty, 0);
}

function updateCartUI() {
    const count = getCartCount();
    cartCount.textContent = count;
    mobileCartCount.textContent = count;

    cartTotal.textContent = 'Rp ' + calculateTotal().toLocaleString('id-ID');

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="cart-empty">
                <p>Keranjang Anda masih kosong</p>
                <a href="#menu" class="btn btn-outline cart-empty-btn">Lihat Menu</a>
            </div>
        `;
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}" loading="lazy">
                </div>
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">Rp ${item.price.toLocaleString('id-ID')}</div>
                    <div class="cart-item-controls">
                        <button class="qty-btn" onclick="changeQty(${item.id}, -1)">-</button>
                        <span class="qty-value">${item.qty}</span>
                        <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
                        <button class="remove-item" onclick="removeFromCart(${item.id})">Hapus</button>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

function clearCart() {
    cart = [];
    updateCartUI();
}

function showAddedNotification(productName) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 30px;
        background: var(--primary-dark);
        color: white;
        padding: 16px 24px;
        border-radius: var(--radius);
        box-shadow: var(--shadow-lg);
        z-index: 2000;
        font-size: 0.95rem;
        font-weight: 500;
        transform: translateX(120%);
        transition: transform 0.3s ease;
    `;
    notification.textContent = `${productName} ditambahkan ke keranjang`;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    setTimeout(() => {
        notification.style.transform = 'translateX(120%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 2000);
}