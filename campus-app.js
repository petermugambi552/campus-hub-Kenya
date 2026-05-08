const STORAGE_KEY = 'campus_marketplace_session';
const CART_KEY = 'campus_marketplace_cart';
const WISHLIST_KEY = 'campus_marketplace_wishlist';

const products = [
  {
    id: 'p1',
    title: 'Campus Power Bank 20,000mAh',
    category: 'Electronics',
    price: 3420,
    vendor: 'SmartCampus Kenya',
    rating: 4.7,
    stock: 12,
    description: 'Reliable power bank for phones and study lamps. Ideal for students on the move.',
    tags: ['Phones & Accessories', 'Hostel Essentials']
  },
  {
    id: 'p2',
    title: 'Refurbished Laptop Sleeve',
    category: 'Fashion',
    price: 1590,
    vendor: 'HostelMart',
    rating: 4.4,
    stock: 18,
    description: 'Water-resistant laptop sleeve with extra storage for notebooks and chargers.',
    tags: ['Books & Stationery', 'Second-Hand Items']
  },
  {
    id: 'p3',
    title: 'Campus Snack Combo',
    category: 'Food & Snacks',
    price: 650,
    vendor: 'Foodie Hub',
    rating: 4.8,
    stock: 30,
    description: 'Breakfast combo with fresh pastry, juice and coffee. Delivered to your dorm.',
    tags: ['Food & Snacks', 'Hostel Essentials']
  },
  {
    id: 'p4',
    title: 'Wireless Gaming Headset',
    category: 'Gaming Accessories',
    price: 7980,
    vendor: 'UniMarket Store',
    rating: 4.6,
    stock: 6,
    description: 'Comfortable headset with noise isolation and long battery life.',
    tags: ['Gaming Accessories', 'Electronics']
  },
  {
    id: 'p5',
    title: 'Second-Hand Textbooks Bundle',
    category: 'Books & Stationery',
    price: 1200,
    vendor: 'Campus Resell',
    rating: 4.3,
    stock: 25,
    description: 'Collection of campus textbooks for business, engineering and humanities.',
    tags: ['Second-Hand Items', 'Books & Stationery']
  }
];

const hotels = [
  {
    id: 'h1',
    name: 'CampusStay Hotel',
    type: 'Hotel & Restaurant',
    menu: ['Breakfast', 'Lunch', 'Dinner', 'Snacks'],
    description: 'Student-friendly hotel with cafeteria, room booking and delivery options.',
    rating: 4.9
  },
  {
    id: 'h2',
    name: 'Jumia Eats Campus Kitchen',
    type: 'Food & Drinks',
    menu: ['Hot Meals', 'Drinks', 'Desserts'],
    description: 'Fast university delivery with student meal deals and hot snacks.',
    rating: 4.7
  }
];

const categories = [
  'Electronics',
  'Fashion',
  'Shoes',
  'Food & Snacks',
  'Hostel Essentials',
  'Beauty Products',
  'Books & Stationery',
  'Phones & Accessories',
  'Gaming Accessories',
  'Second-Hand Items'
];

let session = null;
let cart = [];
let wishlist = [];

function getSession() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (err) {
    return null;
  }
}

function saveSession(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function getCart() {
  const raw = localStorage.getItem(CART_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch (err) {
    return [];
  }
}

function saveCart(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

function getWishlist() {
  const raw = localStorage.getItem(WISHLIST_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch (err) {
    return [];
  }
}

function saveWishlist(items) {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(items));
}

function initApp() {
  session = getSession();
  cart = getCart();
  wishlist = getWishlist();

  document.getElementById('login-form').addEventListener('submit', handleLogin);
  document.getElementById('logout-button').addEventListener('click', handleLogout);
  document.getElementById('product-search').addEventListener('input', handleProductSearch);
  document.getElementById('category-filter').addEventListener('change', handleCategoryFilter);
  document.getElementById('checkout-form')?.addEventListener('submit', handleCheckout);
  document.getElementById('resell-form')?.addEventListener('submit', handleResellProduct);
  document.getElementById('hotel-search')?.addEventListener('input', handleHotelSearch);
  document.getElementById('hotel-category-filter')?.addEventListener('change', handleHotelCategoryFilter);

  renderCategories();
  renderProductCards(products);
  renderHotelCards(hotels);
  renderSessionPanel();
  renderCartSummary();
  renderDashboards();
}

function renderCategories() {
  const container = document.getElementById('category-list');
  if (!container) return;
  container.innerHTML = categories
    .map(category => `<button class="btn-secondary" type="button" onclick="filterCategory('${category}')">${category}</button>`)
    .join('');
}

function renderProductCards(productList) {
  const container = document.getElementById('marketplace-products');
  if (!container) return;
  container.innerHTML = productList
    .map(product => `
      <article class="product-card">
        <div class="product-badge">${product.category}</div>
        <h3>${product.title}</h3>
        <p>${product.description}</p>
        <div class="price">KSh ${product.price.toLocaleString()}</div>
        <div class="actions">
          <button class="primary" type="button" onclick="addToCart('${product.id}')">Add to Cart</button>
          <button class="secondary" type="button" onclick="toggleWishlist('${product.id}')">${wishlist.includes(product.id) ? 'Remove' : 'Wishlist'}</button>
        </div>
      </article>
    `)
    .join('');
}

function renderHotelCards(hotelList) {
  const container = document.getElementById('hotel-cards');
  if (!container) return;
  container.innerHTML = hotelList
    .map(hotel => `
      <article class="hotel-card">
        <h3>${hotel.name}</h3>
        <p>${hotel.description}</p>
        <p><strong>Menu:</strong> ${hotel.menu.join(', ')}</p>
        <p><strong>Rating:</strong> ${hotel.rating.toFixed(1)} ⭐</p>
      </article>
    `)
    .join('');
}

function renderSessionPanel() {
  const status = document.getElementById('user-status');
  const profile = document.getElementById('profile-summary');
  if (!status || !profile) return;
  if (!session) {
    status.textContent = 'Not signed in yet';
    profile.innerHTML = '<p>Use the login form to access student, seller, delivery, or admin dashboards.</p>';
    return;
  }

  status.textContent = `Signed in as ${session.role.toUpperCase()} — ${session.name}`;
  profile.innerHTML = `
    <div class="form-panel">
      <h3>Welcome, ${session.name}</h3>
      <p><strong>Role:</strong> ${session.role}</p>
      <p><strong>Email:</strong> ${session.email || 'Not provided'}</p>
      <p><strong>Phone:</strong> ${session.phone || 'Not provided'}</p>
    </div>
  `;
}

function renderCartSummary() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);
  const summary = document.getElementById('cart-summary');
  if (summary) {
    summary.textContent = `${count} items · KSh ${total.toLocaleString()}`;
  }

  const cartContainer = document.getElementById('cart-items');
  if (!cartContainer) return;
  if (!cart.length) {
    cartContainer.innerHTML = '<p class="section-intro">Your cart is currently empty.</p>';
    return;
  }
  cartContainer.innerHTML = cart
    .map(item => `
      <div class="order-item">
        <h4>${item.title}</h4>
        <p>Quantity: ${item.quantity}</p>
        <p>Price: KSh ${item.price.toLocaleString()}</p>
        <p>Subtotal: KSh ${(item.quantity * item.price).toLocaleString()}</p>
        <button class="secondary" type="button" onclick="removeFromCart('${item.id}')">Remove</button>
      </div>
    `)
    .join('');
}

function renderDashboards() {
  renderStudentDashboard();
  renderSellerDashboard();
  renderDeliveryDashboard();
  renderAdminPanel();
}

function renderStudentDashboard() {
  const container = document.getElementById('student-dashboard-content');
  if (!container) return;
  if (!session || session.role !== 'student') {
    container.innerHTML = '<p class="section-intro">Login as a student to view your dashboard.</p>';
    return;
  }
  container.innerHTML = `
    <div class="dashboard-grid">
      <section class="dashboard-panel">
        <h3>Live Orders</h3>
        <p class="section-intro">Track orders, request delivery and review purchased items.</p>
        <ul class="order-list">
          <li class="order-item"><h4>Campus Snack Combo</h4><p>Status: Dispatching</p><p>Delivery ETA: 1 day</p></li>
          <li class="order-item"><h4>Power Bank 20,000mAh</h4><p>Status: Confirmed</p><p>Delivery ETA: 3 days</p></li>
        </ul>
      </section>
      <section class="dashboard-panel">
        <h3>Resell & Affiliate</h3>
        <p class="section-intro">Upload your used items to resell and earn commissions.</p>
        <form id="resell-form">
          <div class="form-group"><label>Product Title</label><input type="text" id="resell-title" required /></div>
          <div class="form-group"><label>Price (KSh)</label><input type="number" id="resell-price" required /></div>
          <div class="form-group"><label>Description</label><textarea id="resell-description" required></textarea></div>
          <button class="btn-primary" type="submit">Publish Resale Offer</button>
        </form>
      </section>
    </div>
  `;
}

function renderSellerDashboard() {
  const container = document.getElementById('seller-dashboard-content');
  if (!container) return;
  if (!session || session.role !== 'seller') {
    container.innerHTML = '<p class="section-intro">Login as a seller to access your dashboard.</p>';
    return;
  }
  container.innerHTML = `
    <div class="dashboard-grid">
      <section class="dashboard-panel">
        <h3>Seller Analytics</h3>
        <ul class="dashboard-list">
          <li class="offer-item"><h4>Total Sales</h4><p>KSh 124,560 this month</p></li>
          <li class="offer-item"><h4>Orders Pending</h4><p>7 active orders</p></li>
          <li class="offer-item"><h4>Stock Alerts</h4><p>2 items low in stock</p></li>
        </ul>
      </section>
      <section class="dashboard-panel">
        <h3>Product Management</h3>
        <p class="section-intro">Upload new products or update stock in real-time.</p>
        <button class="btn-secondary" type="button" onclick="alert('Seller product upload coming soon!')">Upload Product</button>
      </section>
    </div>
  `;
}

function renderDeliveryDashboard() {
  const container = document.getElementById('delivery-dashboard-content');
  if (!container) return;
  if (!session || session.role !== 'delivery') {
    container.innerHTML = '<p class="section-intro">Login as a delivery rider to manage your assigned routes.</p>';
    return;
  }
  container.innerHTML = `
    <div class="dashboard-grid">
      <section class="dashboard-panel">
        <h3>Delivery Routes</h3>
        <ul class="delivery-list">
          <li class="delivery-item"><h4>Order #D-1289</h4><p>Destination: Westlands campus</p><p>Status: En route</p></li>
          <li class="delivery-item"><h4>Order #D-1291</h4><p>Destination: Town campus</p><p>Status: Picked up</p></li>
        </ul>
      </section>
      <section class="dashboard-panel">
        <h3>Performance</h3>
        <p class="section-intro">Delivery within 3 days target. Track completed assignments and ratings.</p>
        <p><strong>Completed:</strong> 21</p>
        <p><strong>On-time:</strong> 95%</p>
      </section>
    </div>
  `;
}

function renderAdminPanel() {
  const container = document.getElementById('admin-dashboard-content');
  if (!container) return;
  if (!session || session.role !== 'admin') {
    container.innerHTML = '<p class="section-intro">Login as admin to manage users, products, and payments.</p>';
    return;
  }
  container.innerHTML = `
    <div class="dashboard-grid">
      <section class="dashboard-panel">
        <h3>Platform Overview</h3>
        <ul class="dashboard-list">
          <li class="offer-item"><h4>Active Users</h4><p>1,280 students • 320 sellers • 45 riders</p></li>
          <li class="offer-item"><h4>Pending Approvals</h4><p>18 new seller applications</p></li>
          <li class="offer-item"><h4>Transactions</h4><p>KSh 3.4M this month</p></li>
        </ul>
      </section>
      <section class="dashboard-panel">
        <h3>Admin Actions</h3>
        <button class="btn-secondary" type="button" onclick="alert('Coupon management coming soon')">Manage Coupons</button>
        <button class="btn-secondary" type="button" onclick="alert('Banner control coming soon')">Banner Management</button>
      </section>
    </div>
  `;
}

function handleLogin(event) {
  event.preventDefault();
  const name = document.getElementById('auth-name').value.trim();
  const email = document.getElementById('auth-email').value.trim();
  const phone = document.getElementById('auth-phone').value.trim();
  const role = document.getElementById('auth-role').value;

  if (!name) return alert('Please enter your name.');
  session = { name, email, phone, role, id: `user-${Date.now()}` };
  saveSession(session);
  renderSessionPanel();
  renderDashboards();
  showToast('Welcome to CampusHub Kenya!');
}

function handleLogout() {
  session = null;
  localStorage.removeItem(STORAGE_KEY);
  renderSessionPanel();
  renderDashboards();
  showToast('You have been signed out.');
}

function handleProductSearch(event) {
  const query = event.target.value.toLowerCase();
  const filtered = products.filter(product =>
    product.title.toLowerCase().includes(query) ||
    product.description.toLowerCase().includes(query) ||
    product.category.toLowerCase().includes(query)
  );
  renderProductCards(filtered);
}

function handleCategoryFilter(event) {
  const category = event.target.value;
  const filtered = category === 'All' ? products : products.filter(product => product.category === category);
  renderProductCards(filtered);
}

function filterCategory(category) {
  const filtered = products.filter(product => product.category === category);
  renderProductCards(filtered);
}

function handleHotelSearch(event) {
  const query = event.target.value.toLowerCase();
  const filtered = hotels.filter(hotel =>
    hotel.name.toLowerCase().includes(query) ||
    hotel.description.toLowerCase().includes(query) ||
    hotel.menu.join(' ').toLowerCase().includes(query)
  );
  renderHotelCards(filtered);
}

function handleHotelCategoryFilter(event) {
  const category = event.target.value;
  const filtered = category === 'All'
    ? hotels
    : hotels.filter(hotel => hotel.type === category);
  renderHotelCards(filtered);
}

function addToCart(productId) {
  const product = products.find(item => item.id === productId);
  if (!product) return;
  const item = cart.find(entry => entry.id === productId);
  if (item) item.quantity += 1;
  else cart.push({ ...product, quantity: 1 });
  saveCart(cart);
  renderCartSummary();
  showToast(`${product.title} added to cart.`);
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart(cart);
  renderCartSummary();
  showToast('Item removed from cart.');
}

function toggleWishlist(productId) {
  const exists = wishlist.includes(productId);
  if (exists) wishlist = wishlist.filter(id => id !== productId);
  else wishlist.push(productId);
  saveWishlist(wishlist);
  renderProductCards(products);
  showToast(exists ? 'Removed from wishlist.' : 'Saved to wishlist.');
}

function handleCheckout(event) {
  event.preventDefault();
  if (!cart.length) return alert('Your cart is empty.');
  const name = document.getElementById('checkout-name').value.trim();
  const phone = document.getElementById('checkout-phone').value.trim();
  if (!name || !phone) return alert('Please complete the checkout form.');
  cart = [];
  saveCart(cart);
  renderCartSummary();
  document.getElementById('cart-items').innerHTML = '<p class="section-intro">Order placed successfully. M-Pesa payment request sent.</p>';
  showToast('Order confirmed! Delivery within 3 days.');
}

function handleResellProduct(event) {
  event.preventDefault();
  const title = document.getElementById('resell-title').value.trim();
  const price = parseInt(document.getElementById('resell-price').value.trim(), 10);
  const description = document.getElementById('resell-description').value.trim();
  if (!title || !price || !description) return alert('Complete the resale form to publish your product.');
  products.unshift({
    id: `resell-${Date.now()}`,
    title,
    category: 'Second-Hand Items',
    price,
    vendor: session?.name || 'Campus Reseller',
    rating: 4.2,
    stock: 1,
    description,
    tags: ['Reselling', 'Campus Agent']
  });
  renderProductCards(products);
  event.target.reset();
  showToast('Your resale product is now available for students.');
}

function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3200);
}

window.addEventListener('DOMContentLoaded', initApp);
