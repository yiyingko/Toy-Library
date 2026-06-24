![alt text](<Screenshot from 2026-05-11 23-08-53.png>)

# Toy Library

## A full-stack toy lending platform that allows families to browse available toys, submit borrowing requests, and contact the library. Administrators can manage toys, review borrowing requests, and monitor activity through a protected dashboard.

## About The Project

Toy Library was created to simulate a real-world toy lending service while providing a practical environment to develop and deploy a full-stack application.

The project focuses on inventory management, borrowing workflows, authentication, image uploads, and deployment to a production environment.

---

## Live Demo

Frontend: https://toylibrary.netlify.app/

---

## Portfolio Demo

This application is a portfolio project and demonstration environment.
Administrative functionality is protected. Some data may be periodically reset during development and testing.

---

## Screenshots

<p align="center">
  <img src="./screenshot/homepage.png" width="45%" alt="Home Page">
  <img src="./screenshot/toydetails.png" width="45%" alt="Toy Details Page">
</p>

<p align="center">
  <img src="./screenshot/borrowform.png" width="45%" alt="Borrow Page">
  <img src="./screenshot/admin-dashboard.png" width="45%" alt="Admin Dashboard">
</p>

<p align="center">
  <img src="./screenshot/toy-management.png" width="70%" alt="Toy Management Page">
</p>
---

## Features

### Features (V2)

### Public Features

- Browse available toys
- View toy details
- Submit borrowing requests
- Contact the toy library

### Admin Features

- Secure authentication with Auth0
- Protected admin routes
- Dashboard with activity summary
- View and manage borrowing requests
- Approve or reject requests
- Manage toy availability status
- View contact messages
- Add new toys
- Edit existing toys
- Upload toy images using Cloudinary

---

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- React Router DOM
- React Hook Form
- CSS (BEM methodology)

### Backend

- Node.js
- Express.js
- MySQL

### Authentication

- Auth0

### Media Storage

- Cloudinary

### Deployment

- Netlify (Frontend)
- Railway (Backend API)
- Aiven (Managed MySQL)

---

## Architecture

```txt
React + TypeScript (Netlify)
            ↓
      Express API
         (Railway)
            ↓
      MySQL (Aiven)

Auth0 ───────┘
Cloudinary ──┘
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

## Database Design

### Toys

Stores toy information including:

- Name
- Description
- Age group
- Tags
- Image URL
- Availability status

### Borrow Requests

Stores borrowing requests including:

- Borrower details
- Requested toy
- Request status
- Submission date

### Contact Messages

Stores enquiries submitted through the contact form.

---

## Borrowing Workflow

### Pending

Request has been submitted and awaits review.

### Approved

Request has been approved and the toy becomes unavailable.

### Rejected

Request has been reviewed but not approved.

### Completed

Toy has been returned and becomes available again.

---

## Authentication & Security

Admin functionality is protected using Auth0 authentication.

Only authenticated users can access:

- Dashboard
- Toy management
- Borrow request management
- Message management

Backend routes are secured using JWT validation.

---

## Environment Variables

### Client

Create `client/.env`

```env
VITE_API_URL=http://localhost:3001

VITE_AUTH0_DOMAIN=
VITE_AUTH0_CLIENT_ID=
VITE_AUTH0_AUDIENCE=
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

AUTH0_AUDIENCE=
AUTH0_ISSUER_BASE_URL=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
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

## Future Improvements (V3)

- Advanced toy search and filtering
- Pagination
- Demo user account with permissions
- Email notifications
- AI-assisted toy descriptions
- Borrowing history
- Enhanced analytics dashboard

---

## What I Learned

This project provided hands-on experience with:

- Building a full-stack application using React and Express
- Designing and querying relational databases with MySQL
- Authentication and route protection using Auth0
- Image uploads and cloud storage with Cloudinary
- Deploying production applications using Netlify and Railway
- Debugging real-world deployment and environment configuration issues
- Managing project development using Git branches and pull request workflows

---

## Assets

Some visual assets in this project were AI-generated and edited for project use.

---

## Author

Yi-Ying Ko

GitHub: https://github.com/yiyingko
