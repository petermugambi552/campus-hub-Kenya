const STORAGE_KEY = 'campus_marketplace_session';
const CART_KEY = 'campus_marketplace_cart';
const WISHLIST_KEY = 'campus_marketplace_wishlist';
const USERS_KEY = 'campus_marketplace_users';
const PRODUCTS_KEY = 'campus_marketplace_products';
const HOTELS_KEY = 'campus_marketplace_hotels';
const BUSINESSES_KEY = 'campus_marketplace_businesses';
const CHATS_KEY = 'campus_marketplace_chats';
const EVENTS_KEY = 'campus_marketplace_events';
const REFERRALS_KEY = 'campus_marketplace_referrals';
const WITHDRAWALS_KEY = 'campus_marketplace_withdrawals';
const ORDERS_KEY = 'campus_marketplace_orders';
const DELIVERIES_KEY = 'campus_marketplace_deliveries';
const PAYMENTS_KEY = 'campus_marketplace_payments';
const DARJA_TILL_NUMBER = '5438290';
const ADMIN_CREDENTIALS = { email: 'petermugambi10296@gmail.com', password: 'peter@10296' };

const sampleUsers = [
  { id: 'u-admin', name: 'Peter Zions', role: 'admin', email: 'petermugambi10296@gmail.com', phone: '0751310898', avatar: '', password: 'peter@10296', status: 'active' },
  { id: 'u-student', name: 'Amina Kamau', role: 'student', email: 'amina@student.ke', phone: '+254700111222', avatar: '', password: 'student123', status: 'active' },
  { id: 'u-seller', name: 'Juma Seller', role: 'seller', email: 'juma@sellers.ke', phone: '+254700333444', avatar: '', password: 'seller123', status: 'active' },
  { id: 'u-hotel', name: 'Mercy Hotel', role: 'hotel', email: 'mercy@hotel.ke', phone: '+254700555666', avatar: '', password: 'hotel123', status: 'active' },
  { id: 'u-delivery', name: 'Rider Kimani', role: 'delivery', email: 'rider@delivery.ke', phone: '+254700777888', avatar: '', password: 'delivery123', status: 'active' }
];

const sampleProducts = [
  { id: 'p1', title: 'Campus Power Bank 20,000mAh', category: 'Electronics', condition: 'New', campus: 'Karatina', price: 3420, vendor: 'SmartCampus Kenya', sellerId: 'u-seller', rating: 4.7, stock: 12, description: 'Reliable power bank for phones and study lamps. Ideal for students on the move.', image: 'https://via.placeholder.com/320x220?text=Power+Bank', tags: ['Phones & Accessories', 'Hostel Essentials'], status: 'published', reviews: 18, verifiedPurchase: true },
  { id: 'p2', title: 'Refurbished Laptop Sleeve', category: 'Fashion', condition: 'Used', campus: 'Nyeri', price: 1590, vendor: 'HostelMart', sellerId: 'u-seller', rating: 4.4, stock: 18, description: 'Water-resistant laptop sleeve with extra storage for notebooks and chargers.', image: 'https://via.placeholder.com/320x220?text=Laptop+Sleeve', tags: ['Books & Stationery', 'Second-Hand Items'], status: 'published', reviews: 12, verifiedPurchase: false },
  { id: 'p3', title: 'Campus Snack Combo', category: 'Food & Snacks', condition: 'Fresh', campus: 'Karatina', price: 650, vendor: 'Foodie Hub', sellerId: 'u-hotel', rating: 4.8, stock: 30, description: 'Breakfast combo with fresh pastry, juice and coffee. Delivered to your dorm.', image: 'https://via.placeholder.com/320x220?text=Snack+Combo', tags: ['Food & Snacks', 'Hostel Essentials'], status: 'published', reviews: 36, verifiedPurchase: true },
  { id: 'p4', title: 'Wireless Gaming Headset', category: 'Gaming Accessories', condition: 'New', campus: 'Karatina', price: 7980, vendor: 'UniMarket Store', sellerId: 'u-seller', rating: 4.6, stock: 6, description: 'Comfortable headset with noise isolation and long battery life.', image: 'https://via.placeholder.com/320x220?text=Gaming+Headset', tags: ['Gaming Accessories', 'Electronics'], status: 'published', reviews: 9, verifiedPurchase: true },
  { id: 'p5', title: 'Second-Hand Textbooks Bundle', category: 'Books & Stationery', condition: 'Used', campus: 'Nyeri', price: 1200, vendor: 'Campus Resell', sellerId: 'u-seller', rating: 4.3, stock: 25, description: 'Collection of campus textbooks for business, engineering and humanities.', image: 'https://via.placeholder.com/320x220?text=Textbooks', tags: ['Second-Hand Items', 'Books & Stationery'], status: 'published', reviews: 22, verifiedPurchase: false }
];

const sampleHotels = [
  { id: 'h1', name: 'CampusStay Hotel', type: 'Hotel & Restaurant', menu: ['Breakfast', 'Lunch', 'Dinner', 'Snacks'], description: 'Student-friendly hotel with cafeteria, room booking and delivery options.', rating: 4.9, ownerId: 'u-hotel', location: 'Karatina', social: 'https://wa.me/254700111222' },
  { id: 'h2', name: 'Jumia Eats Campus Kitchen', type: 'Food & Drinks', menu: ['Hot Meals', 'Drinks', 'Desserts'], description: 'Fast university delivery with student meal deals and hot snacks.', rating: 4.7, ownerId: 'u-hotel', location: 'Nyeri', social: 'https://wa.me/254700333444' }
];

const sampleEvents = [
  { id: 'e1', title: 'Campus Job Fair', type: 'Jobs', description: 'Student and gig opportunities near Karatina University.', date: '2026-06-12', link: 'https://example.com/jobfair' },
  { id: 'e2', title: 'Study Notes Exchange', type: 'Academics', description: 'Share notes, past papers and study guides for free.', date: '2026-06-18', link: 'https://example.com/notes' }
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
let users = getUsers();
let products = getProducts();
let hotels = getHotels();
let businesses = getBusinesses();
let chats = getChats();
let events = getEvents();
let referrals = getReferrals();
let withdrawals = getWithdrawals();
let payments = getPayments();
let pendingReferrer = null;


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

function getUsers() {
  const raw = localStorage.getItem(USERS_KEY);
  if (!raw) {
    localStorage.setItem(USERS_KEY, JSON.stringify(sampleUsers));
    return sampleUsers.slice();
  }
  try {
    const data = JSON.parse(raw);
    if (!Array.isArray(data)) throw new Error('Invalid users');
    return data;
  } catch (err) {
    localStorage.setItem(USERS_KEY, JSON.stringify(sampleUsers));
    return sampleUsers.slice();
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function getProducts() {
  const raw = localStorage.getItem(PRODUCTS_KEY);
  if (!raw) {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(sampleProducts));
    return sampleProducts.slice();
  }
  try {
    const data = JSON.parse(raw);
    if (!Array.isArray(data)) throw new Error('Invalid products');
    return data;
  } catch (err) {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(sampleProducts));
    return sampleProducts.slice();
  }
}

function saveProducts(products) {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
}

function getHotels() {
  const raw = localStorage.getItem(HOTELS_KEY);
  if (!raw) {
    localStorage.setItem(HOTELS_KEY, JSON.stringify(sampleHotels));
    return sampleHotels.slice();
  }
  try {
    const data = JSON.parse(raw);
    if (!Array.isArray(data)) throw new Error('Invalid hotels');
    return data;
  } catch (err) {
    localStorage.setItem(HOTELS_KEY, JSON.stringify(sampleHotels));
    return sampleHotels.slice();
  }
}

function saveHotels(hotels) {
  localStorage.setItem(HOTELS_KEY, JSON.stringify(hotels));
}

function getBusinesses() {
  const raw = localStorage.getItem(BUSINESSES_KEY);
  if (!raw) return [];
  try {
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch (err) {
    return [];
  }
}

function saveBusinesses(items) {
  localStorage.setItem(BUSINESSES_KEY, JSON.stringify(items));
}

function getChats() {
  const raw = localStorage.getItem(CHATS_KEY);
  if (!raw) return [];
  try {
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch (err) {
    return [];
  }
}

function saveChats(items) {
  localStorage.setItem(CHATS_KEY, JSON.stringify(items));
}

function getEvents() {
  const raw = localStorage.getItem(EVENTS_KEY);
  if (!raw) {
    localStorage.setItem(EVENTS_KEY, JSON.stringify(sampleEvents));
    return sampleEvents.slice();
  }
  try {
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : sampleEvents.slice();
  } catch (err) {
    return sampleEvents.slice();
  }
}

function saveEvents(items) {
  localStorage.setItem(EVENTS_KEY, JSON.stringify(items));
}

function getReferrals() {
  const raw = localStorage.getItem(REFERRALS_KEY);
  if (!raw) return [];
  try {
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch (err) {
    return [];
  }
}

function saveReferrals(items) {
  localStorage.setItem(REFERRALS_KEY, JSON.stringify(items));
}

function getWithdrawals() {
  const raw = localStorage.getItem(WITHDRAWALS_KEY);
  if (!raw) return [];
  try {
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch (err) {
    return [];
  }
}

function saveWithdrawals(items) {
  localStorage.setItem(WITHDRAWALS_KEY, JSON.stringify(items));
}

function getOrders() {
  const raw = localStorage.getItem(ORDERS_KEY);
  if (!raw) return [];
  try {
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch (err) {
    return [];
  }
}

function saveOrders(orders) {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

function getDeliveries() {
  const raw = localStorage.getItem(DELIVERIES_KEY);
  if (!raw) return [];
  try {
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch (err) {
    return [];
  }
}

function saveDeliveries(deliveries) {
  localStorage.setItem(DELIVERIES_KEY, JSON.stringify(deliveries));
}

function getPayments() {
  const raw = localStorage.getItem(PAYMENTS_KEY);
  if (!raw) return [];
  try {
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch (err) {
    return [];
  }
}

function savePayments(items) {
  localStorage.setItem(PAYMENTS_KEY, JSON.stringify(items));
}

function initApp() {
  session = getSession();
  cart = getCart();
  wishlist = getWishlist();

  // Ensure sample data exists and load latest collections
  users = getUsers();
  products = getProducts();
  hotels = getHotels();
  businesses = getBusinesses();
  chats = getChats();
  events = getEvents();
  referrals = getReferrals();
  withdrawals = getWithdrawals();

  const urlParams = new URLSearchParams(window.location.search);
  const referralId = urlParams.get('ref');
  if (referralId) pendingReferrer = referralId;

  const loginForm = document.getElementById('login-form');
  if (loginForm) loginForm.addEventListener('submit', handleLogin);

  const logoutButton = document.getElementById('logout-button');
  if (logoutButton) logoutButton.addEventListener('click', handleLogout);

  const searchInput = document.getElementById('product-search');
  if (searchInput) searchInput.addEventListener('input', handleProductSearch);

  const categoryFilter = document.getElementById('category-filter');
  if (categoryFilter) categoryFilter.addEventListener('change', handleCategoryFilter);

  const priceMin = document.getElementById('price-min');
  const priceMax = document.getElementById('price-max');
  const campusFilter = document.getElementById('campus-filter');
  if (priceMin) priceMin.addEventListener('input', applyMarketplaceFilters);
  if (priceMax) priceMax.addEventListener('input', applyMarketplaceFilters);
  if (campusFilter) campusFilter.addEventListener('change', applyMarketplaceFilters);

  const hotelSearch = document.getElementById('hotel-search');
  if (hotelSearch) hotelSearch.addEventListener('input', handleHotelSearch);

  const hotelCategory = document.getElementById('hotel-category-filter');
  if (hotelCategory) hotelCategory.addEventListener('change', handleHotelCategoryFilter);

  const chatForm = document.getElementById('chat-form');
  if (chatForm) chatForm.addEventListener('submit', handleChatPost);

  const businessForm = document.getElementById('business-registration-form');
  if (businessForm) businessForm.addEventListener('submit', handleBusinessRegistration);

  document.body.addEventListener('submit', event => {
    if (event.target.id === 'checkout-form') return handleCheckout(event);
    if (event.target.id === 'manual-payment-form') return handleManualPayment(event);
    if (event.target.id === 'resell-form') return handleResellProduct(event);
    if (event.target.id === 'admin-add-user-form') return handleAdminAddUser(event);
    if (event.target.id === 'admin-add-product-form') return handleAdminAddProduct(event);
    if (event.target.id === 'admin-add-hotel-form') return handleAdminAddHotel(event);
    if (event.target.id === 'seller-submit-product-form') return handleSellerSubmitProduct(event);
    if (event.target.id === 'seller-withdrawal-form') return handleSellerWithdrawalRequest(event);
  });

  renderCategories();
  renderProductCards(getProducts());
  renderHotelCards(getHotels());
  renderSessionPanel();
  renderCartSummary();
  renderManualPayments();
  renderDashboards();
  renderChatMessages();
  loadCommunityEvents();
  renderBusinessSection();
  switchDashboardTab(session?.role || 'student');
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
    .map(product => {
      const soldOut = product.stock === 0 || product.status === 'sold-out';
      const pending = product.status === 'pending';
      return `
      <article class="product-card">
        <div class="product-image" style="background-image:url('${product.image || 'https://via.placeholder.com/320x220?text=Product'}')"></div>
        <div class="product-body">
          <div class="product-badge">${product.category}</div>
          <h3>${product.title}</h3>
          <p>${product.description}</p>
          <div class="product-meta">
            <span>${product.condition || 'New/Used'}</span>
            <span>${product.campus || 'Campus'}</span>
            <span>${product.stock === 0 ? 'Sold out already' : product.stock + ' in stock'}</span>
          </div>
          <div class="product-reviews">
            <span>⭐ ${product.rating?.toFixed(1) || '0.0'} • ${product.reviews || 0} reviews</span>
            ${product.verifiedPurchase ? '<span class="verified-badge">Verified purchase</span>' : ''}
          </div>
          <div class="price">KSh ${product.price.toLocaleString()}</div>
          ${pending ? '<p class="pending-label">Pending admin approval</p>' : ''}
          <div class="actions">
            <button class="primary" type="button" onclick="addToCart('${product.id}')" ${soldOut || pending ? 'disabled' : ''}>${soldOut ? 'Sold out already' : pending ? 'Pending approval' : 'Add to Cart'}</button>
            <button class="secondary" type="button" onclick="toggleWishlist('${product.id}')">${wishlist.includes(product.id) ? 'Remove' : 'Wishlist'}</button>
          </div>
          <div class="social-links">
            <a href="https://wa.me/254700111222?text=Check%20this%20product%20on%20CampusHub:${encodeURIComponent(product.title)}" target="_blank">WhatsApp</a>
            <a href="https://www.facebook.com/sharer/sharer.php?u=https://campushubkenya.local" target="_blank">Facebook</a>
          </div>
        </div>
      </article>
    `;
    })
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
        <p><strong>Location:</strong> ${hotel.location || 'Karatina'}</p>
        <p><strong>Rating:</strong> ${hotel.rating.toFixed(1)} ⭐</p>
        ${hotel.social ? `<p><strong>Contact:</strong> <a href="${hotel.social}" target="_blank">WhatsApp</a></p>` : ''}
      </article>
    `)
    .join('');
}

function renderSessionPanel() {
  const status = document.getElementById('user-status');
  const profile = document.getElementById('profile-summary');
  const logoutButton = document.getElementById('logout-button');
  if (!status || !profile) return;
  if (!session) {
    status.textContent = 'Not signed in yet';
    profile.innerHTML = '<p>Use the login form to access student, seller, delivery, or admin dashboards.</p>';
    if (logoutButton) logoutButton.style.display = 'none';
    return;
  }

  status.textContent = `Signed in as ${session.role.toUpperCase()} — ${session.name}`;
  profile.innerHTML = `
    <div class="form-panel">
      <h3>Welcome, ${session.name}</h3>
      <p><strong>Role:</strong> ${session.role}</p>
      <p><strong>Email:</strong> ${session.email || 'Not provided'}</p>
      <p><strong>Phone:</strong> ${session.phone || 'Not provided'}</p>
      <p><strong>Verified Seller:</strong> ${session.verified ? 'Yes' : 'Pending / Not verified'}</p>
      <p><strong>Wallet:</strong> KSh ${((session.wallet || 0)).toLocaleString()}</p>
      <p><strong>Referral Points:</strong> ${session.referralPoints || 0}</p>
      <p><strong>Referral Link:</strong> <a href="${session.referralLink || '#'}" target="_blank">${session.referralLink || 'Not generated'}</a></p>
      ${session.avatar ? `<img src="${session.avatar}" alt="Profile image" style="width:66px;height:66px;border-radius:18px;margin-top:14px;object-fit:cover;" />` : ''}
    </div>
  `;
  if (logoutButton) logoutButton.style.display = 'inline-flex';
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

function switchDashboardTab(tab) {
  const buttons = document.querySelectorAll('.dashboard-tab');
  buttons.forEach(btn => btn.classList.toggle('active', btn.dataset.tab === tab));
  const activePanelId = tab === 'hotel' ? 'seller-dashboard-content' : `${tab}-dashboard-content`;
  const allPanels = ['student-dashboard-content', 'seller-dashboard-content', 'delivery-dashboard-content', 'admin-dashboard-content'];
  allPanels.forEach(panelId => {
    const panel = document.getElementById(panelId);
    if (!panel) return;
    panel.classList.toggle('hidden', panelId !== activePanelId);
  });
}

function renderBusinessSection() {
  const container = document.getElementById('business-listings');
  if (!container) return;
  const activeBusinesses = businesses.filter(biz => biz.status === 'active');
  const pendingBusinesses = businesses.filter(biz => biz.status !== 'active');
  if (!businesses.length) {
    container.innerHTML = '<p class="section-intro">No registered campus businesses yet. Register to get verified and show your service to Karatina students.</p>';
    return;
  }

  container.innerHTML = `
    <div class="business-summary">
      <p><strong>Active Businesses:</strong> ${activeBusinesses.length}</p>
      <p><strong>Pending Approval:</strong> ${pendingBusinesses.length}</p>
    </div>
    ${businesses.map(business => `
      <div class="business-card">
        <h4>${business.name}</h4>
        <p>${business.service} • ${business.location}</p>
        <p><strong>Distance from Karatina University main gate:</strong> ${business.distance}</p>
        <p><strong>Status:</strong> ${business.status === 'active' ? 'Verified and live' : 'Awaiting admin approval'}</p>
        <p><strong>Owner:</strong> ${business.owner}</p>
        ${business.social ? `<p><strong>Contact:</strong> <a href="${business.social}" target="_blank">WhatsApp / Social</a></p>` : ''}
      </div>
    `).join('')}
  `;
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
  if (!session || (session.role !== 'seller' && session.role !== 'hotel')) {
    container.innerHTML = '<p class="section-intro">Login as a seller or hotel owner to access your dashboard.</p>';
    return;
  }

  const sellerProducts = products.filter(product => product.sellerId === session.id || product.vendor === session.name);
  const sellerBusinesses = businesses.filter(business => business.owner === session.name || business.owner === session.id);
  const sellerWallet = session.wallet || 0;
  const pendingList = products.filter(product => product.status === 'pending' && product.sellerId === session.id);
  const sellerWithdrawals = withdrawals.filter(withdrawal => withdrawal.sellerId === session.id);

  container.innerHTML = `
    <div class="dashboard-grid">
      <section class="dashboard-panel">
        <h3>Seller Overview</h3>
        <ul class="dashboard-list">
          <li class="offer-item"><h4>Wallet Balance</h4><p>KSh ${sellerWallet.toLocaleString()}</p></li>
          <li class="offer-item"><h4>Products Listed</h4><p>${sellerProducts.length}</p></li>
          <li class="offer-item"><h4>Pending Approval</h4><p>${pendingList.length} items</p></li>
          <li class="offer-item"><h4>Business Listings</h4><p>${sellerBusinesses.length}</p></li>
        </ul>
      </section>
      <section class="dashboard-panel">
        <h3>Business Owner Summary</h3>
        <p class="section-intro">Track your verified business status and update inventory directly from your portal.</p>
        ${sellerBusinesses.length ? sellerBusinesses.map(business => `
          <div class="business-card">
            <h4>${business.name}</h4>
            <p>${business.service}</p>
            <p><strong>Location:</strong> ${business.location}</p>
            <p><strong>Distance:</strong> ${business.distance}</p>
            <p><strong>Status:</strong> ${business.status === 'active' ? 'Verified and live' : 'Awaiting verification'}</p>
            ${business.social ? `<p><strong>Contact:</strong> <a href="${business.social}" target="_blank">WhatsApp / Social</a></p>` : ''}
          </div>
        `).join('') : '<p class="section-intro">You have not registered a verified business yet.</p>'}
      </section>
      <section class="dashboard-panel">
        <h3>Inventory Control</h3>
        ${sellerProducts.length ? sellerProducts.map(item => `
          <div class="admin-list-item">
            <strong>${item.title}</strong><br />
            <span>Stock: ${item.stock} • KSh ${item.price.toLocaleString()}</span>
            <div class="admin-actions">
              <button class="secondary" type="button" onclick="updateProductStock('${item.id}', 1)">+ Stock</button>
              <button class="secondary" type="button" onclick="updateProductStock('${item.id}', -1)">- Stock</button>
              <button class="secondary" type="button" onclick="markProductSoldOut('${item.id}')">Mark Sold Out</button>
            </div>
          </div>
        `).join('') : '<p class="section-intro">You have no inventory to manage.</p>'}
      </section>
      <section class="dashboard-panel">
        <h3>Wallet Withdrawals</h3>
        <p class="section-intro">Request a payout from your seller balance and track pending requests.</p>
        <form id="seller-withdrawal-form">
          <div class="form-group"><label>Withdrawal Amount (KSh)</label><input id="seller-withdrawal-amount" type="number" min="100" placeholder="Minimum 100" required /></div>
          <button class="btn-secondary" type="submit">Request Withdrawal</button>
        </form>
        ${sellerWithdrawals.length ? sellerWithdrawals.map(request => `
          <div class="offer-item">
            <strong>KSh ${request.amount.toLocaleString()}</strong> • Status: ${request.status}<br />
            <span>${new Date(request.requestedAt).toLocaleDateString()}</span>
          </div>
        `).join('') : '<p class="section-intro">No withdrawal requests yet.</p>'}
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
    container.innerHTML = '<p class="section-intro">Login as admin to manage users, products, hotels, and orders.</p>';
    return;
  }

  const orders = getOrders();
  const revenue = orders.reduce((sum, order) => sum + order.total, 0);
  const activeUsers = users.filter(user => user.status === 'active').length;
  const mostSold = products.slice().sort((a, b) => (b.reviews || 0) - (a.reviews || 0)).slice(0, 3);
  const pendingProducts = products.filter(product => product.status === 'pending');
  const pendingBusinesses = businesses.filter(business => business.status === 'awaiting-approval');

  const usersHtml = users.map(user => `
    <div class="admin-list-item">
      <strong>${user.name}</strong> (${user.role})<br />
      <span>${user.email || user.phone}</span>
      <div class="admin-actions">
        <button class="secondary" type="button" onclick="toggleUserStatus('${user.id}')">${user.status === 'active' ? 'Disable' : 'Enable'}</button>
        <button class="secondary" type="button" onclick="removeUser('${user.id}')">Remove</button>
      </div>
    </div>
  `).join('');

  const productsHtml = products.slice(0, 6).map(product => `
    <div class="admin-list-item">
      <strong>${product.title}</strong> • KSh ${product.price.toLocaleString()}<br />
      <span>${product.category} • ${product.status}</span>
      <div class="admin-actions">
        <button class="secondary" type="button" onclick="approveProduct('${product.id}')">Approve</button>
        <button class="secondary" type="button" onclick="removeProduct('${product.id}')">Remove</button>
      </div>
    </div>
  `).join('');

  const businessesHtml = pendingBusinesses.map(business => `
    <div class="admin-list-item">
      <strong>${business.name}</strong> • ${business.service}<br />
      <span>${business.location} • ${business.distance}</span>
      <div class="admin-actions">
        <button class="secondary" type="button" onclick="approveBusiness('${business.id}')">Approve</button>
        <button class="secondary" type="button" onclick="removeBusiness('${business.id}')">Remove</button>
      </div>
    </div>
  `).join('');

  container.innerHTML = `
    <div class="dashboard-grid">
      <section class="dashboard-panel admin-panel">
        <h3>Admin Analytics</h3>
        <ul class="dashboard-list">
          <li class="offer-item"><h4>Revenue</h4><p>KSh ${revenue.toLocaleString()}</p></li>
          <li class="offer-item"><h4>Active Users</h4><p>${activeUsers}</p></li>
          <li class="offer-item"><h4>Pending Approvals</h4><p>${pendingProducts.length + pendingBusinesses.length}</p></li>
          <li class="offer-item"><h4>Peak Hours</h4><p>6PM - 8PM</p></li>
        </ul>
      </section>
      <section class="dashboard-panel admin-panel">
        <h3>Admin Controls</h3>
        <p class="section-intro">Manage users, approve sellers, resolve disputes, and monitor transactions.</p>
        <button class="btn-secondary" type="button" onclick="alert('Fraud monitoring enabled')">Fraud Monitoring</button>
        <button class="btn-secondary" type="button" onclick="alert('Two-factor authentication enforced')">Security Settings</button>
        <button class="btn-secondary" type="button" onclick="alert('Category management coming soon')">Manage Categories</button>
      </section>
      <section class="dashboard-panel">
        <h3>Pending Seller Listings</h3>
        ${pendingProducts.length ? pendingProducts.map(item => `
          <div class="admin-list-item">
            <strong>${item.title}</strong><br />
            <span>${item.category} • ${item.campus}</span>
            <div class="admin-actions">
              <button class="secondary" type="button" onclick="approveProduct('${item.id}')">Approve</button>
              <button class="secondary" type="button" onclick="removeProduct('${item.id}')">Reject</button>
            </div>
          </div>
        `).join('') : '<p class="section-intro">No pending product listings.</p>'}
      </section>
      <section class="dashboard-panel">
        <h3>Business Approvals</h3>
        ${businessesHtml || '<p class="section-intro">No pending business registrations.</p>'}
      </section>
      <section class="dashboard-panel">
        <h3>Top Trending Products</h3>
        ${mostSold.map(product => `<p>${product.title} (${product.reviews || 0} reviews)</p>`).join('')}
      </section>
      <section class="dashboard-panel">
        <h3>Recent Users</h3>
        ${usersHtml || '<p class="section-intro">No users added yet.</p>'}
      </section>
      <section class="dashboard-panel">
        <h3>Recent Marketplace Listings</h3>
        ${productsHtml || '<p class="section-intro">No products available.</p>'}
      </section>
    </div>
  `;
}

function handleLogin(event) {
  event.preventDefault();
  const name = document.getElementById('auth-name').value.trim();
  const email = document.getElementById('auth-email').value.trim();
  const phone = document.getElementById('auth-phone').value.trim();
  const password = document.getElementById('auth-password').value.trim();
  const avatar = document.getElementById('auth-avatar').value.trim();
  const role = document.getElementById('auth-role').value;

  if (!name) return alert('Please enter your name.');
  if (role === 'admin') {
    if (email !== ADMIN_CREDENTIALS.email) return alert('Invalid admin email.');
    if (password !== ADMIN_CREDENTIALS.password) return alert('Invalid admin password.');
    session = { ...sampleUsers[0], id: 'u-admin' };
    saveSession(session);
    renderSessionPanel();
    renderDashboards();
    showToast('Admin signed in.');
    return;
  }

  users = getUsers();
  let existing = users.find(user => (user.email && user.email === email) || (user.phone && user.phone === phone));
  if (existing) {
    if (existing.password && password && existing.password !== password) return alert('Invalid password.');
    session = { ...existing };
  } else {
    const newUser = {
      id: `u-${Date.now()}`,
      name,
      email,
      phone,
      role,
      avatar,
      password: password || 'pass123',
      status: 'active',
      verified: role === 'student' ? false : true,
      wallet: 0,
      referralPoints: 0
    };
    users.unshift(newUser);
    saveUsers(users);
    session = newUser;
  }

  session.referralLink = `https://campushubkenya.local?ref=${session.id}`;
  if (pendingReferrer && !session.referredBy && session.id !== pendingReferrer) {
    session.referredBy = pendingReferrer;
    referrals.unshift({ id: `ref-${Date.now()}`, referrer: pendingReferrer, referred: session.id, time: new Date().toISOString() });
    saveReferrals(referrals);
  }

  saveSession(session);
  saveUsers(users);
  renderSessionPanel();
  renderDashboards();
  showToast(`Welcome, ${session.name}!`);
}

function handleLogout() {
  session = null;
  localStorage.removeItem(STORAGE_KEY);
  renderSessionPanel();
  renderDashboards();
  showToast('You have been signed out.');
}

function handleProductSearch(event) {
  applyMarketplaceFilters();
}

function handleCategoryFilter(event) {
  applyMarketplaceFilters();
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
  const address = document.getElementById('checkout-address').value.trim();
  const method = document.getElementById('checkout-method').value;
  const promo = document.getElementById('checkout-promo').value.trim().toUpperCase();
  const pickup = document.getElementById('checkout-pickup').value;
  if (!name || !phone || !address) return alert('Please complete the checkout form.');

  // Calculate total
  let total = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);

  const deliveryFee = pickup === 'Pickup Station' ? 0 : 80;
  const promoDiscount = promo === 'FREEKARATINA' ? Math.min(200, total * 0.1) : 0;
  total = Math.max(0, total + deliveryFee - promoDiscount);

  const order = {
    id: `order-${Date.now()}`,
    customerName: name,
    phone,
    address,
    items: cart.slice(),
    total,
    deliveryFee,
    pickupStation: pickup,
    paymentMethod: method === 'mpesa' ? 'M-Pesa STK Push' : method === 'card' ? 'Card / Mobile Money' : 'Pickup Station',
    status: 'pending',
    promoCode: promo || 'None',
    timestamp: new Date().toISOString(),
    receipt: `Receipt for ${name} - KSh ${total.toLocaleString()} via ${method === 'mpesa' ? 'M-Pesa' : method === 'card' ? 'Card' : 'Pickup'} on ${new Date().toLocaleDateString()}`
  };

  if (method === 'mpesa') {
    initiateSTKPush(phone, total, name, address, order);
    return;
  }

  completeOrder(order);
}

function initiateSTKPush(phone, amount, name, address, order) {
  // Simulate STK Push process
  showToast('Initiating M-Pesa STK Push...');

  // Mock STK Push delay
  setTimeout(() => {
    const confirmed = confirm(`M-Pesa STK Push sent to ${phone}.\nAmount: KSh ${amount.toLocaleString()}\nTill Number: ${DARJA_TILL_NUMBER}\n\nPlease enter your M-Pesa PIN on your phone to complete payment.`);
    if (confirmed) {
      order.status = 'paid';
      completeOrder(order);
    } else {
      showToast('Payment cancelled.');
    }
  }, 2000); // 2 second delay to simulate STK push sending
}

function completeOrder(order) {
  const orders = getOrders();
  orders.unshift(order);
  saveOrders(orders);

  users = getUsers();
  order.items.forEach(item => {
    const seller = users.find(user => user.id === item.sellerId);
    const commission = Math.round(item.price * item.quantity * 0.1);
    const sellerRevenue = item.price * item.quantity - commission;
    if (seller) {
      seller.wallet = (seller.wallet || 0) + sellerRevenue;
    }
  });
  if (session?.referredBy) {
    const reward = Math.max(1, Math.round(order.total * 0.0005));
    const referrer = users.find(user => user.id === session.referredBy);
    if (referrer) {
      referrer.referralPoints = (referrer.referralPoints || 0) + reward;
      referrer.wallet = (referrer.wallet || 0) + reward;
    }
  }
  saveUsers(users);

  cart = [];
  saveCart(cart);
  renderCartSummary();

  document.getElementById('cart-items').innerHTML = `
    <div class="order-confirmation">
      <h3>Order Confirmed!</h3>
      <p><strong>Order ID:</strong> ${order.id}</p>
      <p><strong>Total Paid:</strong> KSh ${order.total.toLocaleString()}</p>
      <p><strong>Payment:</strong> ${order.paymentMethod}</p>
      <p><strong>Delivery / Pickup:</strong> ${order.pickupStation || order.address}</p>
      <p><strong>Estimated Delivery:</strong> Within 3 days</p>
      <p>Please keep your receipt for customer support and fulfilment updates.</p>
    </div>
  `;

  showToast('Order confirmed and payment recorded.');
}

function handleResellProduct(event) {
  event.preventDefault();
  const title = document.getElementById('resell-title').value.trim();
  const price = parseInt(document.getElementById('resell-price').value.trim(), 10);
  const description = document.getElementById('resell-description').value.trim();
  if (!title || !price || !description) return alert('Complete the resale form to publish your product.');
  const resaleProduct = {
    id: `resell-${Date.now()}`,
    title,
    category: 'Second-Hand Items',
    price,
    vendor: session?.name || 'Campus Reseller',
    rating: 4.2,
    stock: 1,
    description,
    tags: ['Reselling', 'Campus Agent'],
    status: 'published'
  };
  products.unshift(resaleProduct);
  saveProducts(products);
  renderProductCards(products);
  event.target.reset();
  showToast('Your resale product is now available for students.');
}

function handleManualPayment(event) {
  event.preventDefault();
  const amount = parseInt(document.getElementById('manual-payment-amount').value.trim(), 10);
  const phone = document.getElementById('manual-payment-phone').value.trim();
  const type = document.getElementById('manual-payment-type').value;
  const notes = document.getElementById('manual-payment-notes').value.trim();
  if (!amount || !phone) return alert('Enter both phone number and amount to record payment.');

  const paymentRecord = {
    id: `pay-${Date.now()}`,
    amount,
    phone,
    type,
    notes: notes || `${type === 'mpesa' ? 'Daraja STK Push' : type}`,
    till: type === 'mpesa' ? DARJA_TILL_NUMBER : '',
    timestamp: new Date().toLocaleString()
  };
  payments.unshift(paymentRecord);
  savePayments(payments);
  renderManualPayments();
  event.target.reset();
  showToast('Manual payment recorded successfully.');
}

function renderManualPayments() {
  const container = document.getElementById('manual-payment-list');
  if (!container) return;
  if (!payments.length) {
    container.innerHTML = '<p class="section-intro">No manual payments recorded yet.</p>';
    return;
  }
  container.innerHTML = payments.slice(0, 6).map(payment => `
    <div class="business-card">
      <p><strong>Amount:</strong> KSh ${payment.amount.toLocaleString()}</p>
      <p><strong>Phone:</strong> ${payment.phone}</p>
      <p><strong>Type:</strong> ${payment.type}</p>
      ${payment.till ? `<p><strong>Till:</strong> ${payment.till}</p>` : ''}
      <p><strong>Notes:</strong> ${payment.notes}</p>
      <p><small>${payment.timestamp}</small></p>
    </div>
  `).join('');
}

function handleAdminAddUser(event) {
  event.preventDefault();
  const name = document.getElementById('admin-user-name').value.trim();
  const email = document.getElementById('admin-user-email').value.trim();
  const phone = document.getElementById('admin-user-phone').value.trim();
  const password = document.getElementById('admin-user-password').value.trim();
  const role = document.getElementById('admin-user-role').value;
  if (!name || !email || !phone || !password || !role) return alert('Please complete all user fields.');
  const newUser = {
    id: `u-${Date.now()}`,
    name,
    email,
    phone,
    role,
    avatar: '',
    password,
    status: 'active'
  };
  users.unshift(newUser);
  saveUsers(users);
  renderAdminPanel();
  showToast(`${name} added as ${role}.`);
}

function handleAdminAddProduct(event) {
  event.preventDefault();
  const title = document.getElementById('admin-product-title').value.trim();
  const category = document.getElementById('admin-product-category').value.trim();
  const price = parseInt(document.getElementById('admin-product-price').value.trim(), 10);
  const description = document.getElementById('admin-product-description').value.trim();
  if (!title || !category || !price || !description) return alert('Please complete all product fields.');
  const newProduct = {
    id: `p-${Date.now()}`,
    title,
    category,
    price,
    vendor: session.name,
    sellerId: session.id,
    rating: 4.5,
    stock: 10,
    description,
    tags: [category],
    status: 'published'
  };
  products.unshift(newProduct);
  saveProducts(products);
  renderProductCards(products);
  renderAdminPanel();
  showToast('New product added to marketplace.');
}

function handleAdminAddHotel(event) {
  event.preventDefault();
  const name = document.getElementById('admin-hotel-name').value.trim();
  const type = document.getElementById('admin-hotel-type').value.trim();
  const menu = document.getElementById('admin-hotel-menu').value.trim().split(',').map(item => item.trim()).filter(Boolean);
  const description = document.getElementById('admin-hotel-description').value.trim();
  if (!name || !type || !menu.length || !description) return alert('Please complete all hotel fields.');
  const newHotel = {
    id: `h-${Date.now()}`,
    name,
    type,
    menu,
    description,
    rating: 4.5,
    ownerId: session.id,
    location: session.location || 'Karatina',
    social: ''
  };
  hotels.unshift(newHotel);
  saveHotels(hotels);
  renderHotelCards(hotels);
  renderAdminPanel();
  showToast('New hotel listing created.');
}

function handleSellerSubmitProduct(event) {
  event.preventDefault();
  if (!session || session.role !== 'seller') return alert('Only sellers can submit new products.');
  const title = document.getElementById('seller-product-title').value.trim();
  const category = document.getElementById('seller-product-category').value.trim();
  const condition = document.getElementById('seller-product-condition').value;
  const campus = document.getElementById('seller-product-campus').value.trim();
  const price = parseInt(document.getElementById('seller-product-price').value.trim(), 10);
  const stock = parseInt(document.getElementById('seller-product-stock').value.trim(), 10);
  const description = document.getElementById('seller-product-description').value.trim();
  const location = document.getElementById('seller-product-location').value.trim();
  if (!title || !category || !campus || !price || !stock || !description) return alert('Complete all fields to submit your listing.');
  const newProduct = {
    id: `p-${Date.now()}`,
    title,
    category,
    condition,
    campus,
    price,
    vendor: session.name,
    sellerId: session.id,
    rating: 0,
    stock,
    description,
    image: 'https://via.placeholder.com/320x220?text=New+Listing',
    tags: [category],
    status: 'pending',
    reviews: 0,
    verifiedPurchase: false,
    location
  };
  products.unshift(newProduct);
  saveProducts(products);
  renderProductCards(products);
  renderSellerDashboard();
  showToast('Listing submitted for admin approval.');
}

function handleBusinessRegistration(event) {
  event.preventDefault();
  const name = document.getElementById('business-name').value.trim();
  const service = document.getElementById('business-service').value.trim();
  const location = document.getElementById('business-location').value.trim();
  const distance = document.getElementById('business-distance').value.trim();
  const social = document.getElementById('business-social').value.trim();
  if (!name || !service || !location || !distance) return alert('Please complete all business registration fields.');
  const newBusiness = {
    id: `b-${Date.now()}`,
    name,
    service,
    location,
    distance,
    social,
    owner: session?.name || 'Anonymous',
    ownerId: session?.id || 'guest',
    status: 'awaiting-approval',
    verified: false
  };
  businesses.unshift(newBusiness);
  saveBusinesses(businesses);
  renderBusinessSection();
  renderSellerDashboard();
  showToast('Business registration submitted. Admin will verify your listing soon.');
  if (document.getElementById('business-registration-form')) document.getElementById('business-registration-form').reset();
}

function handleChatPost(event) {
  event.preventDefault();
  const name = document.getElementById('chat-name').value.trim();
  const text = document.getElementById('chat-text').value.trim();
  if (!name || !text) return alert('Please enter your name and message.');
  chats.unshift({ id: `chat-${Date.now()}`, name, message: text, time: new Date().toLocaleTimeString(), role: session?.role || 'Guest' });
  saveChats(chats);
  renderChatMessages();
  event.target.reset();
}

function handleSellerWithdrawalRequest(event) {
  event.preventDefault();
  if (!session) return alert('You must be logged in to request a withdrawal.');
  const amountInput = document.getElementById('seller-withdrawal-amount');
  const amount = parseInt(amountInput.value.trim(), 10);
  if (!amount || amount < 100) return alert('Enter a withdrawal amount of at least KSh 100.');
  if (amount > (session.wallet || 0)) return alert('Insufficient wallet balance.');

  const request = {
    id: `w-${Date.now()}`,
    sellerId: session.id,
    sellerName: session.name,
    amount,
    status: 'pending',
    requestedAt: new Date().toISOString()
  };
  withdrawals.unshift(request);
  saveWithdrawals(withdrawals);
  session.wallet = (session.wallet || 0) - amount;
  saveSession(session);
  users = users.map(user => user.id === session.id ? { ...user, wallet: session.wallet } : user);
  saveUsers(users);
  renderSessionPanel();
  renderSellerDashboard();
  amountInput.value = '';
  showToast('Withdrawal request submitted. Await admin review.');
}

function renderChatMessages() {
  const container = document.getElementById('chat-messages');
  if (!container) return;
  container.innerHTML = chats
    .slice(0, 20)
    .map(message => `
      <div class="chat-message ${message.role.toLowerCase()}">
        <strong>${message.name}</strong> <span>${message.time}</span>
        <p>${message.message}</p>
      </div>
    `)
    .join('');
}

function loadCommunityEvents() {
  events = getEvents();
  const list = document.getElementById('events-list');
  if (!list) return;
  list.innerHTML = events
    .map(event => `
      <li class="offer-item">
        <h4>${event.title}</h4>
        <p>${event.description}</p>
        <p><strong>Date:</strong> ${event.date}</p>
        <a class="secondary" href="${event.link}" target="_blank">View details</a>
      </li>
    `)
    .join('');
}

function applyMarketplaceFilters() {
  const category = document.getElementById('category-filter').value;
  const search = document.getElementById('product-search').value.trim().toLowerCase();
  const min = parseInt(document.getElementById('price-min').value.trim(), 10);
  const max = parseInt(document.getElementById('price-max').value.trim(), 10);
  const campus = document.getElementById('campus-filter').value;
  const filtered = products.filter(product => {
    const matchesCategory = category === 'All' || product.category === category;
    const matchesSearch = !search || product.title.toLowerCase().includes(search) || product.description.toLowerCase().includes(search) || product.vendor.toLowerCase().includes(search);
    const matchesMin = Number.isNaN(min) || product.price >= min;
    const matchesMax = Number.isNaN(max) || product.price <= max;
    const matchesCampus = campus === 'All' || product.campus === campus;
    return matchesCategory && matchesSearch && matchesMin && matchesMax && matchesCampus;
  });
  renderProductCards(filtered);
}

function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3200);
}

function toggleUserStatus(id) {
  users = users.map(user => user.id === id ? { ...user, status: user.status === 'active' ? 'disabled' : 'active' } : user);
  saveUsers(users);
  renderAdminPanel();
  showToast('User status updated.');
}

function removeProduct(id) {
  products = products.filter(product => product.id !== id);
  saveProducts(products);
  renderProductCards(products);
  renderAdminPanel();
  showToast('Product removed.');
}

function removeHotel(id) {
  hotels = hotels.filter(hotel => hotel.id !== id);
  saveHotels(hotels);
  renderHotelCards(hotels);
  renderAdminPanel();
  showToast('Hotel removed.');
}

function approveProduct(id) {
  products = products.map(product => product.id === id ? { ...product, status: 'published' } : product);
  saveProducts(products);
  renderProductCards(products);
  renderAdminPanel();
  showToast('Product approved and published.');
}

function approveBusiness(id) {
  businesses = businesses.map(business => business.id === id ? { ...business, status: 'active', verified: true } : business);
  saveBusinesses(businesses);
  renderAdminPanel();
  renderBusinessSection();
  renderSellerDashboard();
  showToast('Business approved for listing.');
}

function removeBusiness(id) {
  businesses = businesses.filter(business => business.id !== id);
  saveBusinesses(businesses);
  renderAdminPanel();
  renderBusinessSection();
  showToast('Business registration removed.');
}

function updateProductStock(id, delta) {
  products = products.map(product => product.id === id ? { ...product, stock: Math.max(0, (product.stock || 0) + delta) } : product);
  products = products.map(product => product.id === id && product.stock === 0 ? { ...product, status: 'sold-out' } : product);
  saveProducts(products);
  renderProductCards(products);
  renderSellerDashboard();
  showToast('Inventory updated.');
}

function markProductSoldOut(id) {
  products = products.map(product => product.id === id ? { ...product, stock: 0, status: 'sold-out' } : product);
  saveProducts(products);
  renderProductCards(products);
  renderSellerDashboard();
  showToast('Product marked as sold out.');
}

window.addEventListener('DOMContentLoaded', initApp);
