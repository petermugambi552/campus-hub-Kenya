const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const sampleProducts = [
  { id: 'p1', name: 'Campus Power Bank', category: 'Electronics', price: 3420, stock: 12 },
  { id: 'p2', name: 'Laptop Sleeve', category: 'Fashion', price: 1590, stock: 18 }
];

app.get('/api/status', (req, res) => {
  res.json({ status: 'ok', platform: 'CampusHub Kenya API' });
});

app.get('/api/products', (req, res) => {
  res.json(sampleProducts);
});

app.post('/api/auth/login', (req, res) => {
  const { name, role, email, phone } = req.body;
  if (!name || !role) {
    return res.status(400).json({ error: 'Name and role are required.' });
  }
  return res.json({ id: `user-${Date.now()}`, name, role, email, phone });
});

app.post('/api/checkout', (req, res) => {
  const { order } = req.body;
  if (!order || !order.items?.length) {
    return res.status(400).json({ error: 'Order is required.' });
  }
  return res.json({ orderId: `ORD-${Date.now()}`, status: 'confirmed', message: 'M-Pesa payment initiated.' });
});

app.listen(port, () => {
  console.log(`CampusHub Kenya API running on http://localhost:${port}`);
});
