# CampusHub Kenya Database Schema

## Users
- `users`
  - `id` (UUID or serial)
  - `name`
  - `email`
  - `phone`
  - `role` (student, seller, hotel, delivery, admin)
  - `password_hash`
  - `profile_picture`
  - `status` (active, pending, suspended)
  - `created_at`
  - `updated_at`

## Products
- `products`
  - `id`
  - `title`
  - `description`
  - `category`
  - `price`
  - `vendor_id`
  - `stock`
  - `rating`
  - `tags`
  - `status` (published, draft, pending)
  - `source` (own, imported)
  - `created_at`
  - `updated_at`

## Orders
- `orders`
  - `id`
  - `user_id`
  - `status` (pending, confirmed, shipped, delivered, cancelled)
  - `payment_method` (mpesa, airtel, card, paypal)
  - `total_amount`
  - `delivery_fee`
  - `delivery_address`
  - `delivery_eta`
  - `created_at`
  - `updated_at`

## Order Items
- `order_items`
  - `id`
  - `order_id`
  - `product_id`
  - `quantity`
  - `unit_price`
  - `subtotal`

## Deliveries
- `deliveries`
  - `id`
  - `order_id`
  - `rider_id`
  - `status` (assigned, en_route, completed)
  - `pickup_location`
  - `dropoff_location`
  - `estimated_delivery`
  - `tracking_url`
  - `created_at`
  - `updated_at`

## Hotels & Restaurants
- `hotel_profiles`
  - `id`
  - `owner_id`
  - `name`
  - `type`
  - `description`
  - `menu`
  - `rating`
  - `location`
  - `contact`

## Reviews
- `reviews`
  - `id`
  - `user_id`
  - `product_id`
  - `rating`
  - `comment`
  - `created_at`

## Payments
- `payments`
  - `id`
  - `order_id`
  - `method`
  - `amount`
  - `status`
  - `transaction_ref`
  - `created_at`

## Supplier Integrations
- `supplier_stores`
  - `id`
  - `name`
  - `source_url`
  - `api_key`

- `supplier_products`
  - `id`
  - `supplier_id`
  - `external_id`
  - `title`
  - `price`
  - `sync_status`
  - `last_synced_at`

## API Endpoints
- `GET /api/products`
- `GET /api/products/:id`
- `POST /api/auth/login`
- `POST /api/auth/register`
- `POST /api/orders`
- `GET /api/orders/:id`
- `POST /api/checkout`
- `GET /api/deliveries`
- `POST /api/supplier/import`
- `PUT /api/admin/approve-seller`
