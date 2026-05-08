const STORAGE_SESSION = 'chc_session';
const STORAGE_HOTELS = 'chc_hotels';
const STORAGE_STUDENTS = 'chc_students';

const sampleHotels = [
  {
    id: 'hotel-1',
    name: 'Campus Comfort Suites',
    category: 'Accommodation',
    description: 'Quiet student-friendly rooms, fast Wi-Fi, and budget meal plans.',
    services: ['Rooms', 'Breakfast', 'Laundry', 'Study Lounge'],
    rating: 4.8
  },
  {
    id: 'hotel-2',
    name: 'Library Cafe & Snacks',
    category: 'Food',
    description: 'Fresh coffee, smoothies, sandwiches, and late-night snacks.',
    services: ['Coffee', 'Snacks', 'Takeaway', 'Delivery'],
    rating: 4.6
  },
  {
    id: 'hotel-3',
    name: 'Sports Bar & Drinks',
    category: 'Drinks',
    description: 'Cold drinks, energy boosters, and quick bites near campus.',
    services: ['Beverages', 'Juices', 'Energy Bars', 'Events'],
    rating: 4.5
  },
  {
    id: 'hotel-4',
    name: 'Study Spot Deli',
    category: 'Services',
    description: 'Healthy meals, printing, and student service bundles in one place.',
    services: ['Healthy Meals', 'Printing', 'Delivery', 'Event Catering'],
    rating: 4.7
  }
];

function getStoredHotels() {
  const raw = localStorage.getItem(STORAGE_HOTELS);
  if (!raw) return sampleHotels.slice();
  try {
    const data = JSON.parse(raw);
    return Array.isArray(data) && data.length ? data : sampleHotels.slice();
  } catch (err) {
    console.warn('Invalid hotel storage data, resetting to sample:', err);
    return sampleHotels.slice();
  }
}

function saveHotels(hotels) {
  localStorage.setItem(STORAGE_HOTELS, JSON.stringify(hotels));
}

function getSession() {
  const raw = localStorage.getItem(STORAGE_SESSION);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (err) {
    return null;
  }
}

function saveSession(session) {
  localStorage.setItem(STORAGE_SESSION, JSON.stringify(session));
}

function clearSession() {
  localStorage.removeItem(STORAGE_SESSION);
}

function getStudentRecords() {
  const raw = localStorage.getItem(STORAGE_STUDENTS);
  if (!raw) return [];
  try {
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch (err) {
    return [];
  }
}

function saveStudentRecords(records) {
  localStorage.setItem(STORAGE_STUDENTS, JSON.stringify(records));
}

function renderLogin() {
  document.querySelectorAll('.view-section').forEach(el => el.classList.add('hidden'));
  document.getElementById('view-login').classList.remove('hidden');
}

function renderDashboard() {
  const session = getSession();
  if (!session) {
    renderLogin();
    return;
  }

  document.querySelectorAll('.view-section').forEach(el => el.classList.add('hidden'));
  document.getElementById(`view-${session.role}`).classList.remove('hidden');

  document.getElementById('user-greeting').textContent = `Welcome back, ${session.name}!`;
  document.getElementById('current-role').textContent = session.role === 'student' ? 'Student/Customer' : session.role === 'owner' ? 'Hotel Owner' : 'Admin';
  document.getElementById('user-name').textContent = session.name;
  document.getElementById('user-id').textContent = session.studentId || 'None provided';

  if (session.role === 'student') {
    renderHotelCards();
  }
  if (session.role === 'owner') {
    renderOwnerHotels();
  }
  if (session.role === 'admin') {
    renderAdminDashboard();
  }
}

function renderHotelCards(filter = '') {
  const container = document.getElementById('hotel-cards');
  const hotels = getStoredHotels();
  const normalizedFilter = filter.trim().toLowerCase();

  const filtered = hotels.filter(hotel => {
    if (!normalizedFilter) return true;
    return (
      hotel.name.toLowerCase().includes(normalizedFilter) ||
      hotel.category.toLowerCase().includes(normalizedFilter) ||
      hotel.description.toLowerCase().includes(normalizedFilter) ||
      hotel.services.join(' ').toLowerCase().includes(normalizedFilter)
    );
  });

  if (!container) return;
  container.innerHTML = filtered.map(hotel => `
    <article class="card">
      <div class="card-tag">${hotel.category}</div>
      <h3>${hotel.name}</h3>
      <p>${hotel.description}</p>
      <div class="card-services">${hotel.services.map(service => `<span>${service}</span>`).join('')}</div>
      <div class="card-footer">
        <span>Rating: ${hotel.rating.toFixed(1)}</span>
        <button type="button" onclick="toggleFavorite('${hotel.id}')">${isFavorite(hotel.id) ? 'Remove Favorite' : 'Add Favorite'}</button>
      </div>
    </article>
  `).join('');

  if (!filtered.length) {
    container.innerHTML = '<p class="empty-state">No hotels or services matched your search. Try another keyword.</p>';
  }
}

function toggleFavorite(hotelId) {
  const session = getSession();
  if (!session) return;
  const favorites = session.favorites || [];
  const index = favorites.indexOf(hotelId);
  if (index >= 0) {
    favorites.splice(index, 1);
  } else {
    favorites.push(hotelId);
  }
  session.favorites = favorites;
  saveSession(session);
  renderHotelCards(document.getElementById('hotel-search').value || '');
}

function isFavorite(hotelId) {
  const session = getSession();
  if (!session) return false;
  return Array.isArray(session.favorites) && session.favorites.includes(hotelId);
}

function renderOwnerHotels() {
  const container = document.getElementById('owner-hotel-list');
  const hotels = getStoredHotels();
  container.innerHTML = hotels.map(hotel => `
    <div class="owner-item">
      <div>
        <strong>${hotel.name}</strong>
        <span class="small-text">Category: ${hotel.category}</span>
        <p>${hotel.description}</p>
      </div>
      <div><button type="button" onclick="removeHotel('${hotel.id}')" class="danger">Delete</button></div>
    </div>
  `).join('');
}

function removeHotel(id) {
  const hotels = getStoredHotels().filter(hotel => hotel.id !== id);
  saveHotels(hotels);
  renderOwnerHotels();
  renderDashboard();
}

function renderAdminDashboard() {
  const hotelCount = getStoredHotels().length;
  const studentsCount = getStudentRecords().length;
  document.getElementById('admin-hotel-count').textContent = hotelCount;
  document.getElementById('admin-student-count').textContent = studentsCount;
  document.getElementById('admin-hotel-list').innerHTML = getStoredHotels().map(hotel => `
    <li>${hotel.name} — ${hotel.category}</li>
  `).join('');
  document.getElementById('admin-student-list').innerHTML = getStudentRecords().map(student => `
    <li>${student.name} (${student.role})${student.studentId ? ' — ID: ' + student.studentId : ''}</li>
  `).join('');
}

function handleLogin(event) {
  event.preventDefault();
  const name = document.getElementById('login-name').value.trim();
  const studentId = document.getElementById('login-id').value.trim();
  const role = document.querySelector('input[name="role"]:checked').value;

  if (!name) {
    alert('Please enter your name to continue.');
    return;
  }

  const session = { name, studentId, role, favorites: [] };
  saveSession(session);

  const records = getStudentRecords();
  const existing = records.find(record => record.name === name && record.role === role && record.studentId === studentId);
  if (!existing) {
    records.push({ name, studentId, role, lastSeen: new Date().toISOString() });
    saveStudentRecords(records);
  }

  renderDashboard();
}

function handleSearchInput(event) {
  renderHotelCards(event.target.value);
}

function handleAddHotel(event) {
  event.preventDefault();
  const name = document.getElementById('owner-hotel-name').value.trim();
  const category = document.getElementById('owner-hotel-category').value;
  const description = document.getElementById('owner-hotel-description').value.trim();
  const servicesRaw = document.getElementById('owner-hotel-services').value.trim();

  if (!name || !description || !servicesRaw) {
    alert('Please complete all fields to add a new hotel or service listing.');
    return;
  }

  const hotels = getStoredHotels();
  const id = `hotel-${Date.now()}`;
  const serviceList = servicesRaw.split(',').map(value => value.trim()).filter(Boolean);

  hotels.unshift({ id, name, category, description, services: serviceList, rating: 4.5 });
  saveHotels(hotels);
  document.getElementById('owner-hotel-form').reset();
  renderOwnerHotels();
  renderDashboard();
}

function handleLogout() {
  clearSession();
  renderLogin();
}

function resetApplicationData() {
  if (!confirm('This will restore sample hotels and clear student records. Continue?')) return;
  localStorage.removeItem(STORAGE_HOTELS);
  localStorage.removeItem(STORAGE_STUDENTS);
  renderAdminDashboard();
  renderDashboard();
}

function initApp() {
  document.getElementById('login-form').addEventListener('submit', handleLogin);
  document.getElementById('hotel-search').addEventListener('input', handleSearchInput);
  document.getElementById('owner-hotel-form').addEventListener('submit', handleAddHotel);
  document.getElementById('logout-button').addEventListener('click', handleLogout);
  document.getElementById('admin-reset-data').addEventListener('click', resetApplicationData);

  renderDashboard();
}

window.addEventListener('DOMContentLoaded', initApp);
