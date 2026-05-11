![alt text](<Screenshot from 2026-05-11 23-08-53.png>)

# Toy Library

A full-stack toy borrowing platform built with React, Express, and MySQL.

This project simulates a community toy library where users can browse available toys and submit borrowing requests through a responsive web application.

## Live Demo

Frontend: https://toylibrary.netlify.app/

---

## Features

### Current Features (V1)

- Browse toy collection
- View toy details
- Submit borrow requests
- Submit messages
- Form validation
- REST API integration
- MySQL database persistence
- Cloud deployment

---

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- React Router DOM
- React Hook Form
- CSS (BEM naming convention)

### Backend

- Node.js
- Express
- MySQL2
- dotenv
- CORS

### Database

- MySQL (Aiven managed database)

### Deployment

- Netlify (Frontend)
- Railway (Backend API)
- Aiven (Managed MySQL)

---

## Architecture

```txt
Client (React/Vite)
        ↓
Express API (Railway)
        ↓
MySQL Database (Aiven)
```

---

## Project Structure

```txt
toy-library/
├── client/
│   ├── src/
│   ├── public/
│   └── ...
│
├── server/
│   ├── routes/
│   ├── db.js
│   ├── server.js
│   └── ...
│
└── netlify.toml
```

---

## Environment Variables

### Client

Create `client/.env`

```env
VITE_API_URL=http://localhost:3001
```

### Server

Create `server/.env`

```env
PORT=3001

DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=
```

---

## Local Development

### Clone the repository

```bash
git clone https://github.com/yiyingko/Toy-Library.git
cd Toy-Library
```

---

### Install frontend dependencies

```bash
cd client
npm install
```

### Install backend dependencies

```bash
cd ../server
npm install
```

---

### Run backend

```bash
npm run dev
```

---

### Run frontend

```bash
cd ../client
npm run dev
```

---

## API Endpoints

### Get all toys

```http
GET /toys
```

### Get toy by ID

```http
GET /toys/:toyId
```

### Submit borrow request

```http
POST /borrow-requests
```

Example request body:

```json
{
  "toy_id": 1,
  "borrower_name": "Jane Doe",
  "borrower_email": "jane@example.com",
  "message": "Interested in borrowing this toy."
}
```

---

## Future Improvements (V2)

- Admin dashboard
- Authentication & authorization
- Image upload & cloud storage
- Borrow request management
- Pagination
- Search & filtering
- Email notifications

---

## Learning Goals

This project was built to practice:

- Full-stack application architecture
- REST API design
- Database integration
- Cloud deployment workflow
- Environment variable management
- Frontend/backend separation

---

## Author

Yi-Ying Ko

GitHub: https://github.com/yiyingko
