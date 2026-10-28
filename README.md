# ELVÉORA

ELVÉORA is a full-stack luxury perfume e-commerce platform built with the MERN stack. Designed with a refined aesthetic, it delivers a complete shopping experience—from fragrance discovery and category filtering to secure authentication, cart management, and order tracking.

## Tech Stack

- **Frontend:** React, TypeScript, Vite, Material UI (MUI), React Router
- **Backend:** Node.js, Express, TypeScript, JWT, bcrypt
- **Database:** MongoDB, Mongoose

## Features

- **Authentication & Security:** User registration and login with bcrypt password hashing, JWT-based sessions, and protected routes.
- **Product Discovery:** Full fragrance catalog with real-time keyword search, category filtering (For Her / For Him), and featured collections.
- **Product Details:** Detailed pages displaying fragrance notes, descriptions, pricing, and stock status.
- **Shopping Cart:** Add items, adjust quantities, remove products, or clear the cart with real-time total calculation.
- **Wishlist:** Save and manage favorite fragrances with account-level persistence.
- **Checkout & Orders:** Address-validated checkout flow, order confirmation with unique order IDs, and complete order history tracking.

## Getting Started

### Prerequisites

- **Node.js** (v18 or higher recommended)
- **MongoDB** (local MongoDB Community Server or a free MongoDB Atlas cluster)
- **Git**

### 1. Clone the Repository

```bash
git clone https://github.com/AaeshaBedair/E-Commerce_MERN-.git
cd E-Commerce_MERN-
```

### 2. Backend Setup

From the repository root, navigate to the `backend` directory and install dependencies:

```bash
cd backend
npm install
```

Create a `.env` file from the provided template:

```bash
cp .env.example .env
```

Open `.env` and set your configuration:

```env
JWT_SECRET=your_jwt_secret_key
DATABASE_URL=mongodb://127.0.0.1:27017/ecommerce
```

> **Note:** If using MongoDB Atlas, replace `DATABASE_URL` with your Atlas connection URI:  
> `mongodb+srv://<username>:<password>@<cluster-url>/ecommerce?retryWrites=true&w=majority`

Start the backend development server:

```bash
npm run dev
```

The API will run at `http://localhost:3001`.

### 3. Frontend Setup

In a new terminal from the repository root, navigate to the `frontend` directory and start the app:

```bash
cd frontend
npm install
npm run dev
```

The frontend will run at `http://localhost:5173`.

## Database Setup

The application handles product seeding automatically:

- On server startup, the backend verifies whether the `products` collection is empty.
- If no records exist, it seeds the database with the initial perfume catalog (including notes, pricing, stock, and imagery).
- No manual seed scripts or database migrations are required.
