# CampusHub Kenya

CampusHub Kenya is a mobile-first multi-vendor campus marketplace designed for university and college students in Kenya. The platform combines online shopping, student reselling, hotel and restaurant listings, local delivery, and business management into one ecosystem.

## Key Features

- Multi-user authentication: student, seller, hotel owner, delivery rider, admin
- Product marketplace with search, category filters, cart, wishlist, and M-Pesa checkout simulation
- Student reselling system for second-hand items and campus agents
- Hotel and restaurant listing section with menus and delivery options
- Role-based dashboard demo panels for students, sellers, riders, and admins
- Mobile-first responsive UI with Kenyan marketplace styling
- Backend API scaffolding with Express.js, plus database schema documentation

## Project Structure

- `index.html` — main CampusHub Kenya landing page and platform prototype
- `campus.css` — responsive marketplace styles
- `campus-app.js` — marketplace interaction logic, session state, cart and dashboard handling
- `server.js` — Node.js API scaffold for product, auth, and checkout endpoints
- `package.json` — backend dependencies and start script
- `DB_SCHEMA.md` — database schema design for users, products, orders, delivery, and supplier integrations
- `hotel.html` — previous Campus Hotel Connect prototype page

## Getting Started

### Frontend
1. Open `index.html` in your browser
2. Use the login panel to switch roles and explore the dashboards
3. Search products, add to cart, and submit checkout requests

### Backend
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the API server:
   ```bash
   npm start
   ```
3. API will run on `http://localhost:4000`

## API Endpoints

- `GET /api/status` — health check
- `GET /api/products` — sample product list
- `POST /api/auth/login` — mock login endpoint
- `POST /api/checkout` — mock checkout endpoint

## Deployment

This project can be hosted as a static site for the frontend and on services like Render, Railway or AWS for the backend API.

## Notes

The current implementation is a prototype. It includes frontend marketplace behavior and backend scaffolding, ready for further extension into a full production platform with real authentication, payment integration, and database persistence.

## License

MIT License